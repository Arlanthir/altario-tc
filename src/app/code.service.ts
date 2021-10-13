import { Injectable } from '@angular/core';

/**
 * Generates security codes for payments.
 */
@Injectable({
    providedIn: 'root'
})
export class CodeService {
    /** Stores the most recently generated character grid. */
    grid?: string[][];

    /** Stores the most recently generated code. */
    code = '';

    /** The characters that can appear in the generated grid. */
    possibleChars = 'abcdefghijklmnopqrstuvwxyz';

    /**
     * Class constructor.
     *
     * Initializes the grid to an empty one (filled with space characters).
     * */
    constructor() {
        this.grid = this.generateGrid(true);
    }

    /**
     * Called by components to initialize the grid generation.
     *
     * @param bias The bias character chosen by the user. Will bias each cell to be that character
     * with 20% probability.
     */
    triggerGeneration(bias?: string) {
        this.grid = this.generateGrid(false, bias);
    }

    /**
     * Generates a new grid.
     *
     * @param empty Whether the grid should be empty (used before user clicks on the Generate button).
     * @param bias The bias character chosen by the user. Will bias each cell to be that character
     * with 20% probability.
     * @returns The generated grid.
     */
     generateGrid(empty = false, bias?: string): string[][] {
        let grid = [];
        for (let i = 0; i < 10; ++i) {
            let row = [];
            for (let j = 0; j < 10; ++j) {
                row.push(empty? ' ' : this.generateRandomChar(bias));
            }
            grid.push(row);
        }
        this.code = this.calculateCode(grid);
        return grid;
    }

    /**
     * Generates a random character to fill a single grid cell.
     *
     * @param bias The bias character chosen by the user. Will bias each cell to be that character
     * with 20% probability.
     * @returns The random character.
     */
    generateRandomChar(bias?: string) {
        let availableChars = this.possibleChars;
        if (bias?.length == 1) {
            // Keeping bias character in available chars would increase odds by about 4%, so we remove it
            availableChars = availableChars.replace(bias, '');
            // Return bias character 20% of the time
            if (Math.random() < 0.2) {
                return bias;
            }
        }
        let charIndex = Math.floor(Math.random() * availableChars.length);
        let char = availableChars.charAt(charIndex);
        return char;
    }

    /**
     * Calculates the two digit code based on a grid and the system clock.
     *
     * From the requirements, the algorithm is as follows:
     *
     * 1. Get the 2 digit seconds from the clock, like so: 12:40:36.
     * 2. Get the matching grid cell values for the positions [3,6] and [6,3], like so: “v” and “c”.
     * 3. Count the occurrences of “v” and “c” on the entire grid, like so: v = 7, c = 9.
     * 4. If the count is larger than 9, divide the count by the lowest integer possible in order to
     *    get a value lower or equal to 9. *roundup the result if decimal.
     * 5. Done! That is your code: 79
     *
     * @param grid The character grid.
     * @param instant The instant from which to get the seconds (current time by default).
     *                Useful as a parameter to redo, validate or test calculations.
     */
    calculateCode(grid: string[][], instant = new Date()): string {
        const seconds = instant.getSeconds().toString().padStart(2, '0');
        const s0 = parseInt(seconds[0], 10);
        const s1 = parseInt(seconds[1], 10);
        const firstChar = grid[s0][s1];
        const secondChar = grid[s1][s0];
        let firstCharCount = 0;
        let secondCharCount = 0;
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                if (grid[i][j] === firstChar) {
                    firstCharCount++;
                }
                if (grid[i][j] === secondChar) {
                    secondCharCount++;
                }
            }
        }
        return '' + this.truncateCharCount(firstCharCount) + this.truncateCharCount(secondCharCount);
    }

    /**
     * Truncates the character count of the grid when it's >= 10,
     * according to the requirements:
     *
     * If the count is larger than 9, divide the count by the lowest integer possible in order to
     * get a value lower or equal to 9. *roundup the result if decimal.
     *
     * To find such an integer, we round up the division by 9,
     * instead of looping through the integers.
     *
     * @param charCount The character count.
     * @returns The truncated count.
     */
    truncateCharCount(charCount: number) {
        if (charCount < 9) {
            return charCount;
        }
        const denominator = Math.ceil(charCount / 9);
        return Math.ceil(charCount / denominator);
    }
}

