import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
  index(): Promise<Org[]>;
}
