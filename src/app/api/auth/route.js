import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        try {
          // ✅ Initialize auth within the function
          const auth = getAuth(app);

          // ✅ Authenticate using Firebase Auth
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          if (user) {
            // ✅ Return user object for session
            return {
              id: user.uid,
              email: user.email,
              name: user.displayName || "User",
            };
          } else {
            throw new Error("No user found with this email.");
          }
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional: Custom sign-in page
    error: "/auth/error", // Optional: Error page
  },
  session: {
    strategy: "jwt", // Use JWT for session storage
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.uid;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
