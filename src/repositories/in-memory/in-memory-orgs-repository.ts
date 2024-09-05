import { randomUUID } from "node:crypto";

import { Org, Prisma } from "@prisma/client";

import { OrgsRepository } from "../orgs-repository";


export class InMemoryOrgsRepository implements OrgsRepository {
  orgs: Org[] = [];

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      ...data,
    } as Org;

    this.orgs.push(org);

    return org;
  };

  async findByEmail(email: string) {
    const org = this.orgs.find(org => email === org.email);

    return org;
  };

  async findById(id: string) {
    const org = this.orgs.find(org => id === org.id);

    return org;
  };

  async index() {
    return this.orgs;
  };
};