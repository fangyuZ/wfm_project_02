import { Customer } from "./customer";
import { Ski } from "./ski";

class Value<T> {
    value: T;

    constructor(value: any) {
        console.log(value)
        this.value = value.value as T;
    }
}

export class Order {
    id: string;
    ski: Ski;
    customer: Customer;

    constructor(id: any, ski: any, customer: any) {
        this.id = id;
        this.ski = ski;
        this.customer = customer;

    }

    static mapper() {
        return (id: string, vars: any): Order => {
            return new Order(id, new Ski(vars.curvature_height_back, vars.curvature_height_front, 
                    vars.edge_radius, vars.height, vars.kernal_material, vars.outside_material, vars.quality, 
                    vars.ski_height, vars.ski_length, vars.skitype), 
                new Customer(vars.name, vars.address, 
                    vars.city, vars.country, vars.level, vars.weight, vars.zip))
        }
    }
}