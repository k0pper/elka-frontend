import { Address } from '../model/address';

export class AddressFactory {
  constructor() {}

  static getAddress(): Address {
    let address: Address = new Address()
          .setStreet('Musterstraße')
          .setHouseNumber(6)
          .setCity('Karlsruhe')
          .setCountryCode('DE');
    return address;
  }
}
