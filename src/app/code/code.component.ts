import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

/**
 * Renders the generated code, along with a "code generator live" indicator.
 */
@Component({
  selector: 'aio-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

    /**
     * Class constructor
     *
     * @param codeService Dependency injection.
     */
    constructor(public codeService: CodeService) { }

    ngOnInit(): void {
    }

}
