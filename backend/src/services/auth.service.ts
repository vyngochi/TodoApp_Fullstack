import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.users.findUnique({
    where: { Email: email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      AuthProviders: {
        create: {
          Provider: "local",
          PasswordHash: hashPassword,
        },
      },
    },
    select: {
      Id: true,
      Email: true,
      FirstName: true,
      LastName: true,
    },
  });

  return { user: newUser, message: "User registered successfully" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { Email: email },
    include: { AuthProviders: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.AuthProviders.length === 0) {
    throw new Error("Invalid email or password");
  }

  const passwordHash = user.AuthProviders[0].PasswordHash;
  if (!passwordHash) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = await createToken(user.Id, user.Email);

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
  };
};

export const createToken = async (userId: number, email: string) => {
  const token = jwt.sign({ userId, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ userId, email }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  await prisma.refreshTokens.create({
    data: {
      UserId: userId,
      Token: refreshToken,
      ExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken: token, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }
  const stored = await prisma.refreshTokens.findFirst({
    where: { Token: refreshToken },
  });

  if (!stored) {
    throw new Error("Invalid refresh token");
  }

  if (stored.ExpiresAt < new Date()) {
    throw new Error("Refresh token has expired");
  }

  const user = await prisma.users.findUnique({ where: { Id: stored.UserId } });

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign({ userId: user.Id, email: user.Email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { accessToken: token };
};
