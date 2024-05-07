import AuthSignIn from "@/components/auth/auth.signin";
import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    //redirect from home
    redirect("/");
  }
  return (
    <>
      <AuthSignIn />
    </>
  );
};

export default SignInPage;
