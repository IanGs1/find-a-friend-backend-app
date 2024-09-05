import { randomUUID } from "node:crypto";

import { Address, Prisma } from "@prisma/client";

import { AddressesRepository } from "../addresses-repository";

export class InMemoryAddressesRepository implements AddressesRepository {
  addresses: Address[] = [];
  
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      ...data,
    } as Address;

    this.addresses.push(address);

    return address;
  };

  async filterByState(state: string) {
    const addresses = this.addresses.filter(address => address.state === state);

    return addresses;
  };

  async findByOrgId(orgId: string) {
    const addresses = this.addresses.find(address => address.orgId === orgId);

    return addresses;
  };

  async index() {
    return this.addresses;
  };
};