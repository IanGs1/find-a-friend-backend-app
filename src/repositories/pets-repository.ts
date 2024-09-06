import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByOrgId(orgId: string): Promise<Pet[] | []>;
  index(): Promise<Pet[]>;
};