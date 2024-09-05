import { Prisma, Requirement } from "@prisma/client";

export interface RequirementsRepository {
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>;
  findByPetId(petId: string): Promise<Requirement[] | null>;
  index(): Promise<Requirement[]>;
};