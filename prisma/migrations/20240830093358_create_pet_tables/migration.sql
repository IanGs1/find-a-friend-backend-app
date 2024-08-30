-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('Puppy', 'Adult', 'Old');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('Little', 'Normal', 'Big');

-- CreateEnum
CREATE TYPE "PetIndependencyLevel" AS ENUM ('Low', 'Middle', 'High');

-- CreateEnum
CREATE TYPE "PetSpace" AS ENUM ('Small', 'Normal', 'Wide');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "PetAge" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" INTEGER NOT NULL,
    "independencyLevel" "PetIndependencyLevel" NOT NULL,
    "space" "PetSpace" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
