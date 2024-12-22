import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  return new PrismaClient({
    transactionOptions: {
      maxWait: 5000,
      timeout: 10000,
    },
    log:
      process.env.NODE_ENV === "production"
        ? ["error"]
        : ["query", "info", "warn", "error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma ?? createPrismaClient();

export * from "@prisma/client";
