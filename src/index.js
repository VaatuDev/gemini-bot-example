import { Client, Events, GatewayIntentBits } from "discord.js";
import { getResponse } from "./gemini.js";
import { TOKEN } from "./config.js";

// Intents for message content permission in discord.
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once(Events.ClientReady, (readyEvent) => {
  console.log(`Ready! Logged in as ${readyEvent.user.tag}`);
});

// The bot is serving with discord messages
client.on(Events.MessageCreate, async (messageEvent) => {
  const args = messageEvent.content.split(" ");
  if (args[0].startsWith("$") && args[0].includes("prompt") && args.length >= 2) {
    let completeMessage = "";
    const originalResponse = await messageEvent.reply({ content: "Infering..." });
    try {
      const geminiResponse = await getResponse(args.reduce((prev, current) => prev+current, 1));
      const textStream = geminiResponse.stream;
      for await (const textChunk of textStream) {
        completeMessage += textChunk.text();
        originalResponse.edit({ content: completeMessage });
      }
    } catch (exception) {
      console.log("Captured exception:", exception);
      originalResponse.edit({ content: "😥 Error at infering..." });
    }
  }
});

client.login(TOKEN);
