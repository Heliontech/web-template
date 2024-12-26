import { Prisma, PrismaClient } from "@prisma/client";

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

// export prisma instance
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma ?? createPrismaClient();

// export prisma client
export * from "@prisma/client";

// export catchPrismaError function
export function catchPrismaError(error: unknown, message: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return {
        meta: {
          code: 400,
          message: message || "Failed to execute operation, please try again.",
        },
      };
    }
  }

  // error message is not from Prisma
  return {
    meta: {
      code: 500,
      message:
        error instanceof Error
          ? error.message
          : "Failed to execute operation, please contact support.",
    },
  };
}
