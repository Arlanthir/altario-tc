import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

/**
 * Models a payment to store in the payments table.
 */
 export type Payment = {
    id?: number,
    name: string,
    amount: number,
    code: string,
    grid: string[][]
};

/**
 * Stores and retrieves payments from the server.
 */
@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    /** Mocks the server payment list while we have no real external API. */
    mockServerPayments: Payment[] = [
        {
            id: 1,
            name: "Old payment",
            amount: 10,
            code: '79',
            grid: [
                ['v', 'v', 'v', 'v', 'v', 'v', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'v', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
                ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
            ]
        }
    ];

    /** Mocks the server payment id counter so we can generate fake ids. */
    mockIdCounter = 1;

    constructor() { }

    /**
     * Gets the payment list from the server.
     *
     * @returns The list of payments.
     */
    getPayments(): Observable<Payment[]> {
        // Shallow clone the list so the component keeps a separate reference and can push at will.
        return of(this.mockServerPayments.map(r => { return {...r} as Payment }));
    }

    /**
     * Adds a payment to the server list.
     *
     * @param payment The new payment.
     * @returns The created payment (with the generated id).
     */
    addPayment(payment: Payment): Observable<Payment> {
        let shallowClone = {...payment};
        shallowClone.id = ++this.mockIdCounter;
        this.mockServerPayments.push(shallowClone);
        return of(shallowClone);
    }
}
