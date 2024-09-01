import { Address, Prisma } from "@prisma/client";

export interface AddressesRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
  filterByState(state: string): Promise<Address[]>;
};