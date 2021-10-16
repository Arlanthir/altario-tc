import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { Payment, PaymentsService } from './payments.service';

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

    /** The list of displayed payments. */
    payments: Payment[] = [];

    /** Whether we are loading data from the server. */
    loading = true;

    /**
     * Whether the Add payment button should be disabled.
     *
     * We could also check for code generation being live, but since it's not something
     * that stands out as much as the empty fields, the error message on click seems more
     * reasonable to give feedback on why it didn't work.
     */
    get buttonDisabled() {
        return this.loading || !this.currentPayment || !this.currentAmount;
    }

    /**
     * Class constructor.
     *
     * @param codeService Dependency injection.
     * @param paymentsService Dependency injection.
     */
    constructor(public codeService: CodeService, private paymentsService: PaymentsService) { }

    /**
     * Initializes the component by retrieving the current list of payments
     * from {@link PaymentsService}.
     */
    ngOnInit(): void {
        this.paymentsService.getPayments().subscribe(payments => {
            this.payments = payments;
            this.loading = false;
        });
    }

    /**
     * Adds a payment to the list.
     */
    addPayment() {
        if (!this.codeService.code) {
            // TODO: Non-system error message that can link to generator page.
            alert('Code generation is not live, please start it on the Generator page.');
            return;
        }
        this.loading = true;
        this.paymentsService.addPayment({
            name: this.currentPayment,
            amount: parseInt(this.currentAmount, 10),
            code: this.codeService.code,
            // No need to duplicate the grid: each new grid is a new reference
            grid: this.codeService.grid!
        }).subscribe(payment => {
            this.payments.push(payment);
            this.loading = false;
        }, error => {
            alert(error);
            this.loading = false;
        });
        this.currentPayment = '';
        this.currentAmount = '';
    }

}
