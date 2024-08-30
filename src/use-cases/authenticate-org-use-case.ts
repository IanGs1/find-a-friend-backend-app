import { OrgsRepository } from "@/repositories/orgs-repository";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

import { compare } from "bcryptjs";

interface AuthenticateOrgRequest {
  email: string;
  password: string;
};

export class AuthenticateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
  ) {};

  async execute({ email, password }: AuthenticateOrgRequest) {
    const org = await this.orgsRepository.findByEmail(email);
    if (!org) {
      throw new InvalidCredentialsError();
    };

    const passwordMatch = await compare(password, org.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    };

    return {
      org,
    }
  };
};