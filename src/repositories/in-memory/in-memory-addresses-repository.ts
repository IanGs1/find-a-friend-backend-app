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
};