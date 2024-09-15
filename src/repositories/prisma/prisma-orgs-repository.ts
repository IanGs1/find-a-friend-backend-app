import { Prisma } from "@prisma/client";

import { OrgsRepository } from "../orgs-repository";

import prisma from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }

  async index() {
    const orgs = await prisma.org.findMany();

    return orgs;
  }

  async findById(id: string) {
    const org = await prisma.org.findFirst({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return org;
  }
}
