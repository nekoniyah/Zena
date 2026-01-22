import { GatewayIntentBits } from "discord-api-types/v10";
import Zena from "..";

Zena.Run(
  "main.ts",
  GatewayIntentBits.Guilds |
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.MessageContent |
    GatewayIntentBits.GuildMembers,
);
