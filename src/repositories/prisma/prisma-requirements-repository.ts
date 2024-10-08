import { Prisma } from "@prisma/client";

import { RequirementsRepository } from "../requirements-repository";

import prisma from "@/lib/prisma";

export class PrismaRequirementsRepository implements RequirementsRepository {
  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = await prisma.requirement.create({
      data,
    });

    return requirement;
  }

  async index() {
    const requirements = await prisma.requirement.findMany();

    return requirements;
  }

  async findByPetId(petId: string) {
    const requirements = await prisma.requirement.findMany({
      where: {
        petId,
      },
    });

    return requirements;
  }
}
