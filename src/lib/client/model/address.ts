export class Address {
    street: string;
    zip: string;
    city: string;
    country: string;

    constructor(street: string, zip: string, city: string, country: string) {
        this.street = street;
        this.zip = zip;
        this.city = city;
        this.country = country;
    }
}