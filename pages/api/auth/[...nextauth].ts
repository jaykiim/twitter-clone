import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let tag;
      if (session.user?.name) {
        tag = session.user.name.split(" ").join("").toLocaleLowerCase();
      }

      // @ts-ignore
      session.user.tag = tag;

      // @ts-ignore
      session.user.uid = token.sub;

      console.log(session);

      return session;
    },
  },
});
