import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

/**
 * Models a payment to store in the payments table.
 */
type Payment = {
    name: string,
    amount: number,
    code: string,
    grid: string[][]
};

/**
 * Displays the payments table to the user.
 */
@Component({
    selector: 'aio-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

    /** The payment name being currently written. */
    currentPayment = '';

    /** The payment amount being currently written. */
    currentAmount = '';

    /** The list of saved payments. */
    payments: Payment[] = [];

    /**
     * Class constructor.
     *
     * @param codeService Dependency injection.
     */
    constructor(public codeService: CodeService) { }

    ngOnInit(): void {
    }

    // TODO validate, block button, live status
    /**
     * Adds a payment to the list.
     */
    addPayment() {
        this.payments.push({
            name: this.currentPayment,
            amount: parseInt(this.currentAmount, 10),
            code: this.codeService.code,
            // No need to duplicate the grid: each new grid is a new reference
            grid: this.codeService.grid!
        });
    }

}
