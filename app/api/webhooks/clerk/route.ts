import { createUser } from "@/app/actions/user.action";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
    console.log("Webhook hit");
    
  const payload = await req.text();
  const headerList = await headers();

  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  const wh = new Webhook(process.env.WEBHOOK_SECRET!);

  let event;

  try {
    event = wh.verify(payload, {
      "svix-id": svix_id!,
      "svix-timestamp": svix_timestamp!,
      "svix-signature": svix_signature!,
    });

    console.log("Verified Event", event);
    
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    console.log("Creating User");
    
    const { id, email_addresses, first_name, last_name } = event.data;

    await createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
    });

    console.log("User created");
    
  }

  return new Response("OK", { status: 200 });
}
