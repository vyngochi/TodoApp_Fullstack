import prisma from "../config/prisma";

export const getUserProfile = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: { Id: userId },
    select: {
      Id: true,
      Email: true,
      FirstName: true,
      LastName: true,
      Avatar: true,
    },
  });

  return user;
};
