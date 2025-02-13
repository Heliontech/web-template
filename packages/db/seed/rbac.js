const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  try {
    // clean up
    await prisma.rolesOnUsers.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});

    console.log("Cleared existing data");

    // Create roles
    const roles = await Promise.all([
      prisma.role.create({
        data: {
          name: "admin",
          description: "Administrator role with full access",
          created_by: "system",
        },
      }),
      prisma.role.create({
        data: {
          name: "user",
          description: "Regular user role",
          created_by: "system",
        },
      }),
    ]);

    // Create users with different roles
    const hashedPassword = await hash("Password@123", 12);

    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "admin@example.com",
          username: "admin",
          password: hashedPassword,
          roles: {
            create: {
              role_id: roles[0].id,
              assigned_by: "system",
            },
          },
        },
      }),
      prisma.user.create({
        data: {
          email: "demo@gmail.com",
          username: "demo",
          password: hashedPassword,
          roles: {
            create: {
              role_id: roles[1].id,
              assigned_by: "system",
            },
          },
        },
      }),
    ]);

    console.log("Seed users created successfully:");
    console.log(
      "Users:",
      users.map((user) => ({ email: user.email, username: user.username }))
    );
  } catch (error) {
    console.error(error);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
