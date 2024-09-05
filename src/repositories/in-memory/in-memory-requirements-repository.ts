import { randomUUID } from "node:crypto";

import { Requirement, Prisma } from "@prisma/client";

import { RequirementsRepository } from "../requirements-repository";


export class InMemoryRequirementsRepository implements RequirementsRepository {
  requirements: Requirement[] = [];

  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      ...data,
    } as Requirement;

    this.requirements.push(requirement);

    return requirement;
  };

  async findByPetId(petId: string) {
    const requirements = this.requirements.filter(requirement => requirement.petId === petId);

    return requirements;
  };

  async index() {
    return this.requirements;
  };
};