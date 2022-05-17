import type { Address } from "./address";

export class Customer {
    firstname: string;
    lastname: string;
    fullname: string;
    address: Address;

    constructor(firstname: string, lastname: string, address: Address) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = this.firstname + " " + this.lastname;
        this.address = address;
    }

    static fromVariables(customer: any) {
        return new Customer(customer.value.firstname, customer.value.lastname, customer.value.address)
    }
}