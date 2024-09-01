export class PetNotFoundError extends Error {
  constructor() {
    super("Pet not found! Please, provide a valid Pet ID");
  };
};