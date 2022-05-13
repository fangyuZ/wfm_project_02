export class Order {
    id: String;
    ski: String;
    customer: String;

    constructor(id: String, ski: String, customer: String) {
        this.id = id;
        this.ski = ski;
        this.customer = customer;
    }
}