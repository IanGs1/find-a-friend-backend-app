import { Prisma } from "@prisma/client";

import { PetsRepository } from "../pets-repository";

import prisma from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async index() {
    const pets = await prisma.pet.findMany();

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }

  async findByOrgId(orgId: string) {
    const pet = await prisma.pet.findMany({
      where: {
        orgId,
      },
    });

    return pet;
  }
}
