import { PetsRepository } from "@/repositories/pets-repository";

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

    return {
      pets
    };
  };
}