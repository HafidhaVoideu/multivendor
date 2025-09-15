import { Inngest } from "inngest";

// Create an Inngest client
export const inngest = new Inngest({
  id: "go-carteu",
  apiKey: process.env.INNGEST_SIGNING_KEY,
});
