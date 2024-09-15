import { Photo, Prisma } from "@prisma/client";

export interface PhotosRepository {
  upload(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>;
  findByPetId(petId: string): Promise<Photo[] | []>;
  index(): Promise<Photo[]>;
}
