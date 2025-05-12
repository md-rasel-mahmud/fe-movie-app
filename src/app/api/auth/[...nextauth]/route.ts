import { ProvidersEnum } from "@/enums/providers.enum";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_APP_GOOGLE_AUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_APP_BACKEND_API_URL}/api/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: ProvidersEnum.GOOGLE,
            }),
          }
        );

        const data = await res.json();

        if (data.code === 409) {
          console.log("User already exists");
          return true;
        }

        if (!res.ok) {
          console.error("Backend error:", await res.text());
          return false;
        }

        return true;
      } catch (error) {
        console.error("Google SignIn error:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
