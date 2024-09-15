import { Prisma } from "@prisma/client";

import { AddressesRepository } from "../addresses-repository";

import prisma from "@/lib/prisma";

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data,
    });

    return address;
  }

  async index() {
    const address = await prisma.address.findMany();

    return address;
  }

  async findByOrgId(orgId: string) {
    const address = await prisma.address.findFirst({
      where: {
        orgId,
      },
    });

    return address;
  }

  async filterByState(state: string) {
    const addresses = await prisma.address.findMany({
      where: {
        state,
      },
    });

    return addresses;
  }
}
