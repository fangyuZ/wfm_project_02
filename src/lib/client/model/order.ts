import { Customer } from "./customer";
import type { Ski } from "./ski";

class Value<T> {
    value: T;

    constructor(value: any) {
        this.value = value.value as T;
    }
}

export class Order {
    id: Value<string>;
    ski: Value<Ski>;
    customer: Value<Customer>;

    constructor(id: any, ski: any, customer: any) {
        this.id = new Value<string>(id);
        this.ski = new Value<Ski>(ski);
        this.customer = new Value<Customer>(customer);
    }

    static mapper() {
        return (vars: any): Order => {
            return new Order(vars.id, vars.ski, {
                value: Customer.fromVariables(vars.customer)
            })
        }
    }
}