import { Component, OnInit } from '@angular/core';
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

    /**
     * Class constructor.
     */
    constructor(public codeService: CodeService) { }

    // TODO: improve UX of the input, disallow non-alpha chars and auto-overwrite on typing a new char

    /**
     * Component initializer.
     */
    ngOnInit(): void {
    }
}
