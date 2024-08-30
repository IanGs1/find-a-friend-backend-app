import { Photo, Prisma } from "@prisma/client";

export interface PetsRepository {
  upload(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>
  findByPetId(petId: string): Promise<Photo[] | null>
};