import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
// import {
//   syncUserCreation,
//   syncUserUpdate,
//   syncUserDeletion,
// } from "@/inngest/functions";
import {
  helloWorld,
  syncUserCreation,
  syncUserSession,
  logAllClerkEvents,
} from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, syncUserCreation, syncUserSession, logAllClerkEvents],
});
