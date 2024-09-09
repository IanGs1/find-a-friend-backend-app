import { AddressesRepository } from "@/repositories/addresses-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";

interface FetchPetByTheirCharacteristicsUseCaseRequest {
  age?: "Puppy" | "Adult" | "Old" ; 
  size?: "Little" | "Normal" | "Big";
  energy?: number;
  independencyLevel?: "Low" | "Middle" | "High";
  space?: "Normal" | "Small" | "Wide";
};

export class FetchPetByTheirCharacteristicsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private addressesRepository: AddressesRepository,
    private requirementsRepository: RequirementsRepository,
    private photosRepository: PhotosRepository,
  ) {};

  async execute({ age, size, energy, independencyLevel, space }: FetchPetByTheirCharacteristicsUseCaseRequest) {
    let pets = await this.petsRepository.index();

    pets = pets.map(pet => {
      const petCharacteristics = {
        age: age ? pet.age : null,
        size: size ? pet.size : null,
        energy: energy ? pet.energy : null,
        independencyLevel: independencyLevel ? pet.independencyLevel : null,
        space: space ? pet.space : null,
      };

      const JSONPetCharacteristics = JSON.stringify(petCharacteristics);
      const JSONFetchPetByTheirCharacteristicsUseCaseRequest = JSON.stringify({
        age: age ? age : null,
        size: size ? size : null,
        energy: energy ? energy : null,
        independencyLevel: independencyLevel ? independencyLevel : null,
        space: space ? space : null,
      });

      if (JSONPetCharacteristics !== JSONFetchPetByTheirCharacteristicsUseCaseRequest) {
        return;
      };

      return pet;
    });

    pets = pets.filter(pet => pet !== undefined);


    let requirements = await this.requirementsRepository.index();
    let photos = await this.photosRepository.index();
    let addresses = await this.addressesRepository.index();

    const petsWithPhotosAddressesAndRequirements = pets.map(pet => {
      const petRequirements = requirements.filter(requirement => requirement.petId === pet.id);
      const petPhotos = photos.filter(photo => photo.petId === pet.id);
      const [petAddresses] = addresses.filter(address => address.orgId === pet.orgId);

      return {
        ...pet,
        address: petAddresses,
        requirements: petRequirements,
        photos: petPhotos,
      };
    });

    return {
      pets: petsWithPhotosAddressesAndRequirements
    };
  };
}