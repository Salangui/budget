import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

const users = [
  {
    id: "1",
    email: "samirah@gangat.com",
    password: "$2b$10$X9rJ9kX8jJ5X5X5X5X5X5OX9rJ9kX8jJ5X5X5X5X5X5X5X5X5X", // hashed password: R2x9P$m7Kq
  },
  {
    id: "2",
    email: "aslam@gangat.com",
    password: "$2b$10$Y0rK0kY9kY0kY0kY0kY0kOY0rK0kY9kY0kY0kY0kY0kY0kY0kY", // hashed password: T3y8L#n2Fz
  },
]

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(user => user.email === credentials.email)

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return { id: user.id, email: user.email }
      }
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

