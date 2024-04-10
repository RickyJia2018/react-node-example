import { PrismaClient } from '@prisma/client';

export default class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {
    // I see you. You are valid. And you deserve rest.
  }

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }

    return PrismaSingleton.instance;
  }
}
