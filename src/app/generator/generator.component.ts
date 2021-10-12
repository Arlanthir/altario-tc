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

    constructor(private codeService: CodeService) { }

    ngOnInit(): void {
    }

}
