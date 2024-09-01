import { Prisma, Photo } from "@prisma/client";

import { PhotosRepository } from "../photos-repository";

import { randomUUID } from "node:crypto";

export class InMemoryPhotosRepository implements PhotosRepository {
  photos: Photo[] = [];
  
  async upload(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: randomUUID(),
      ...data,
    };

    this.photos.push(photo);

    return photo;
  };
  
  async findByPetId(petId: string) {
    const photo = this.photos.filter(photo => photo.petId === petId);

    return photo;
  };
};