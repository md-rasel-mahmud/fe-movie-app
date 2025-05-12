"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

export default function AuthButton() {
  const { data: session } = useSession();

  console.log("session", session);

  return session ? (
    <>
      <p>Signed in as {session.user?.email}</p>
      <button className="btn btn-error" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  ) : (
    <button className="btn btn-primary" onClick={() => signIn("google")}>
      <FaGoogle /> Sign in with Google
    </button>
  );
}
