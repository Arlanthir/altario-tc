import { Injectable } from '@angular/core';

/**
 * Generates security codes for payments.
 */
@Injectable({
    providedIn: 'root'
})
export class CodeService {
    /** Stores the most recently generated code table. */
    grid?: string[][];

    /** The characters that can appear in the generated grid. */
    possibleChars = 'abcdefghijklmnopqrstuvwxyz';

    /**
     * Class constructor.
     *
     * Initializes the grid to an empty one (filled with space characters).
     * */
    constructor() {
        this.grid = this.generateTable(true);
    }

    /**
     * Called by components to initialize the grid generation.
     *
     * @param bias The bias character chosen by the user. Will bias each cell to be that character
     * with 20% probability.
     */
    triggerGeneration(bias?: string) {
        this.grid = this.generateTable(false, bias);
    }

    /**
     * Generates a new grid.
     *
     * @param empty Whether the grid should be empty (used before user clicks on the Generate button).
     * @param bias The bias character chosen by the user. Will bias each cell to be that character
     * with 20% probability.
     * @returns The generated grid.
     */
    generateTable(empty = false, bias?: string): string[][] {
        let grid = [];
        for (let i = 0; i < 10; ++i) {
            let row = [];
            for (let j = 0; j < 10; ++j) {
                row.push(empty? ' ' : this.generateRandomChar(bias));
            }
            grid.push(row);
        }
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
        let charIndex = Math.floor(Math.random() * this.possibleChars.length);
        let char = this.possibleChars.charAt(charIndex);
        return char;
    }
}
