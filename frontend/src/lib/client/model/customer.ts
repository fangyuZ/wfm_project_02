export class Customer {
    name: string;
    address: string;
    city: string;
    country: string;
    level: string;
    weight: number;
    zip: string;

    constructor(name: any, address: any, city: any, country: any, level: any, weight: any, zip: any) {
        this.name = name.value;
        this.address = address.value;
        this.city = city.value;
        this.country = country.value;
        this.level = level.value;
        this.weight = weight.value;
        this.zip = zip.value;
    }
}