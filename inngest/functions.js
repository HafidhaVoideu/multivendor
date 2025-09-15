import { inngest } from "./client";
import prisma from "@/lib/prisma";

// // console.log("the file is loaded");

export const syncUserSession = inngest.createFunction(
  { id: "user-login" },
  { event: "clerk/session.created" }, // triggers when a user logs in
  async ({ event }) => {
    console.log("User logged in:", event.data);
  }
);

export const logAllClerkEvents = inngest.createFunction(
  { id: "log-all-clerk-events" },
  { event: "*" }, // matches any event
  async ({ event }) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
  }
);

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Received user.created event:", event.data);

    // const { data } = event;

    const data = event.data;

    try {
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses[0]?.email_address ?? "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.image_url ?? "",
        },
      });
      console.log("User inserted into Neon:", data.id);
    } catch (err) {
      console.error("Failed to insert user into Neon:", err);
    }
  }
);

// export const syncUserUpdate = inngest.createFunction(
//   { id: "sync-user-update" },
//   { event: "clerk/user.updated" },
//   async ({ event }) => {
//     const { data } = event;
//     await prisma.user.update({
//       where: { id: data.id },
//       data: {
//         id: data.id,
//         email: data.email_addresses[0]?.email_address,
//         name: `${data.first_name} ${data.last_name}`,
//         image: data.image_url,
//       },
//     });

//     return;
//   }
// );
// export const syncUserDeletion = inngest.createFunction(
//   { id: "sync-user-delete" },
//   { event: "clerk/user.deleted" },
//   async ({ event }) => {
//     const { data } = event;
//     await prisma.user.delete({
//       where: { id: data.id },
//     });

//     return;
//   }
// );

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("event :", event);
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);
