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
     * @param newValue The new value.
     */
    onModelChange(newValue: string) {
        if (this.codeService.possibleChars.indexOf(newValue) !== -1) {
            this.biasDisabled = true;
            setTimeout(() => this.biasDisabled = false, 4000);
        } else {
            setTimeout(() => this.bias = '', 0);
        }
    }
}
