export class OrgNotFoundError extends Error {
  constructor() {
    super("Org not found! Please, provide a valid Org ID");
  };
};