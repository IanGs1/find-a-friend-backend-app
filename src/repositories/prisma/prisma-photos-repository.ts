import { Prisma } from "@prisma/client";

import { PhotosRepository } from "../photos-repository";

import prisma from "@/lib/prisma";

export class PrismaPhotosRepository implements PhotosRepository {
  async upload(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = await prisma.photo.create({
      data,
    });

    return photo;
  }

  async index() {
    const photos = await prisma.photo.findMany();

    return photos;
  }

  async findByPetId(petId: string) {
    const photos = await prisma.photo.findMany({
      where: {
        petId,
      },
    });

    return photos;
  }
}
