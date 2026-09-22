import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from 'src/prisma/prisma';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000'],

  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  //test - remove later
  session: {
    expiresIn: 60, // 60 seconds
    updateAge: 0,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
