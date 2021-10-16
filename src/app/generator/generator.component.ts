import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { throttleTime } from 'rxjs/operators';
import { CodeService } from '../code.service';

/**
 * Displays the code generation table to the user.
 */
@Component({
    selector: 'aio-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

    /** Stores the bias character chosen by the user (if any). */
    bias = '';

    /** Whether the bias input should be disabled (while waiting for the 4 second timeout). */
    biasDisabled = false;

    /**
     * Class constructor.
     */
    constructor(public codeService: CodeService) { }

    /**
     * Component initializer.
     */
    ngOnInit(): void {
    }

    /**
     * Reacts to bias input changes.
     *
     * When entering a new bias, if the code generation is already running, we refresh
     * the grid immediately (instead of waiting for the next cycle). We also disable the field
     * for 4 seconds to prevent bias spamming.
     *
     * @param newValue The new value.
     */
    onModelChange(newValue: string) {
        if (this.codeService.possibleChars.indexOf(newValue) !== -1) {
            if (this.codeService.code) {
                // Grid generation is already running
                this.codeService.triggerGeneration(this.bias);
                this.biasDisabled = true;
                setTimeout(() => this.biasDisabled = false, 4000);
            }
        } else {
            // Discard unrecognized characters by clearing bias after Angular's data binding
            setTimeout(() => this.bias = '', 0);
        }
    }

    /**
     * Starts generating codes, or changes the bias character and refreshes the grid.
     *
     * @see {@link CodeService.triggerGeneration}
     */
    triggerGeneration() {
        this.codeService.triggerGeneration(this.bias);
    }
}
