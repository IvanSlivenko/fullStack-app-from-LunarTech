import { serve } from "@upstash/workflow/nextjs";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
  
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail("Welcome to the platform", email);
    // console.log("first step ran");
  });

  await context.sleep("wait-for-3-day", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState();
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("Email to non-active users", email);
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email);
      });
    }
    await context.sleep("wait-for-1-moth", 60 * 60 * 24 * 30);
  }
});

async function sendEmail(message: string, email: string) {
  console.log(`Sending ${message} email to ${email}`);

  // throw new Error("Function not implemented.");
}

type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  return "non-active";
  //   throw new Error("Function not implemented.");
};
