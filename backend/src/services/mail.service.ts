import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { generateOtp } from "../utils/otpHelper";

import nodemailer from "nodemailer";

export const sendOtp = async (email: string) => {
  const user = await prisma.users.findFirst({ where: { Email: email } });

  if (!user) {
    throw new Error("Email is not exist");
  }

  const otp = generateOtp();

  const otpExpireTime = new Date(Date.now() + 5 * 60 * 1000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.MAIL_NAME, pass: process.env.MAIL_PASS },
  });

  const mailOptions = {
    to: email,
    subject: "Mã xác thực OTP của bạn",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Xác thực tài khoản</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
        <p>Mã này có hiệu lực trong <b>5 phút</b>. Vui lòng không cung cấp mã này cho bất kỳ ai.</p>
      </div>
    `,
  };

  try {
    await prisma.users.update({
      where: { Email: email },
      data: { otpCode: otp, otpExpires: otpExpireTime },
    });
    transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const verifyOtp = async (otp: string, email: string) => {
  const user = await prisma.users.findFirst({
    where: { Email: email, otpExpires: { gt: new Date() } },
  });

  if (!user) {
    throw new Error("Otp is expired" + otp);
  }

  if (user.otpCode !== otp) {
    throw new Error("Incorrect OTP! Try again!" + otp);
  }

  try {
    await prisma.users.update({
      where: { Email: email },
      data: { otpCode: "0", otpExpires: new Date() },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const changePassword = async (password: string, email: string) => {
  try {
    const user = await prisma.users.findUnique({ where: { Email: email } });

    if (!user) {
      throw new Error("User not found!");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.authProviders.updateMany({
      where: { UserId: user.Id, Provider: "local" },
      data: {
        PasswordHash: passwordHash,
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
