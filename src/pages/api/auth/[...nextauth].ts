import { API } from "@/services/api";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      let response = true;
      login(account.access_token);

      // Use a regular function to handle the API call
      return response;
    },
  },
};

async function login(accessToken: string) {
  const response = await API.postLogin(accessToken);
  return response;
}

export default NextAuth(authOptions);
