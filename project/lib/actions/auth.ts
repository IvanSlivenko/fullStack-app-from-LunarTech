"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
// import { redirect } from "next/dist/server/api-utils";
// import { success } from "zod";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowclient } from "../workflow";
import config from "../config";

export const singInWitchCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "SignIn error");
    return { success: false, error: "SignIn error" };
  }
};

// export const singUp = async (params: AuthCredentials) => {
//   const { fullName, email, universityId, password, universityCard } = params;

//   const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
//   const { success } = await ratelimit.limit(ip);

//   if (!success) return redirect("/too-fast");

//   const existingUser = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, email))
//     .limit(1);

//   if (existingUser.length > 0) {
//     return { success: false, error: "User already exists" };
//   }

//   const hashedPassword = await hash(password, 10);

//   try {
//     await db.insert(users).values({
//       fullName,
//       email,
//       universityId,
//       password: hashedPassword,
//       universityCard,
//     });

//     // await workflowclient.trigger({
//     //   url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
//     //   body: {
//     //     email,
//     //     fullName,
//     //   },
//     // });

//     const baseUrl =
//     process.env.NODE_ENV === "production"
//     ? config.env.prodApiEndpoint
//     : config.env.apiEndpoint_2; // localhost або інший dev URL

//     await workflowclient.trigger({
//       url: `${baseUrl}/api/workflows/onboarding`,
//       body: { email, fullName },
//     });

//     await singInWitchCredentials({ email, password });
//     return { success: true };
//   } catch (error) {
//     console.log(error, "Signup error");
//     return { success: false, error: "Signup error" };
//   }
// };


// ----------------------------------------------------------------- var 2

export const singUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    // ------------------------------------------------------------- var 1
    // const baseUrl =
    //   process.env.NODE_ENV === "production"
    //     ? config.env.prodApiEndpoint
    //     : config.env.apiEndpoint_2;

    // await workflowclient.trigger({
    //   url: `${baseUrl}/api/workflows/onboarding`,
    //   body: { email, fullName },
    // });
    
    // ---------------------------------------------------------- var 2
    // const baseUrl =
    // process.env.NODE_ENV === "production"
    // ? config.env.prodApiEndpoint
    // : config.env.apiEndpoint;

    // await workflowclient.trigger({
    //   url: `${baseUrl}/api/workflows/onboarding`,
    //   body: { email, fullName },
    // });

    // ----------------------------------------------------------- var 3
    const baseUrl = config.env.prodApiEndpoint;

    await workflowclient.trigger({
      url: `${baseUrl}/api/workflows/onboarding`,
      body: { email, fullName },
    })

    await singInWitchCredentials({ email, password });

    return { success: true };
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.code === "23505") {
      return { success: false, error: "This university ID is already registered" };
    }

    return { success: false, error: error.message || "Signup error" };
  }
};
