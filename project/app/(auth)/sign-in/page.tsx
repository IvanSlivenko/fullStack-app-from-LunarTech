"use client"
import AuthForm from "@/components/AuthForm";
import { singInWitchCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";
import { email } from "zod";

const Page = () => {
  return (
    <AuthForm 
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={singInWitchCredentials}
    />
  )
}

export default Page;
