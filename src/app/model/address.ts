export class Address {
  street: string;
  houseNumber: number;
  city: string;
  countryCode: string;

  constructor() {}

  setStreet(street: string): Address {
    this.street = street;
    return this;
  }
  setHouseNumber(houseNumber: number): Address {
    this.houseNumber = houseNumber;
    return this;
  }
  setCity(city: string): Address {
    this.city = city;
    return this;
  }
  setCountryCode(countryCode: string): Address {
    this.countryCode = countryCode;
    return this;
  }
}
