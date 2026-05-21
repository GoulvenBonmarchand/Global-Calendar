import "server-only";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { findUserByName, verifyPassword } from "@/lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string"
            ? credentials.username.trim()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!username || !password) {
          return null;
        }

        const user = findUserByName(username);
        if (!user) {
          return null;
        }

        const ok = await verifyPassword(user.password_hash, password);
        if (!ok) {
          return null;
        }

        return { id: String(user.id), name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = String(token.id);
        session.user.name = token.name ?? session.user.name;
      }
      return session;
    },
  },
});
