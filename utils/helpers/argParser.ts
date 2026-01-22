import Zena from "../../index";
import type ZenaNS from "../types/namespace";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import {
  DiscordChannel,
  DiscordMessage,
  DiscordMessageAuthor,
  DiscordUser,
} from "../types/types";

export function parseEventParams(
  event: keyof typeof GatewayDispatchEvents,
  zena: Zena,
  args: any[],
): any[] {
  switch (event) {
    case "Ready":
      return [zena];
    case "MessageCreate":
      return [parseMessage(args[0])];
    case "ChannelCreate":
      return [parseChannel(args[0])];
    // Add more cases as needed for different events
    default:
      return args;
  }
}

export function parseAuthor(authorData: DiscordMessageAuthor): ZenaNS.User {
  const user: ZenaNS.User = {
    id: authorData.id,
    username: authorData.username,
    discriminator: authorData.discriminator,
    bot: authorData.bot ?? false,
  };
  return user;
}

export function parseGuild(args: { data: any }): ZenaNS.Guild {
  const guildData = args.data;
  console.log(guildData);
  const guild: ZenaNS.Guild = {
    id: guildData.id,
    name: guildData.name,
  };
  return guild;
}

export function parseUser(args: { data: DiscordUser }): ZenaNS.User {
  const userData = args.data;

  const user: ZenaNS.User = {
    id: userData.id,
    username: userData.username,
    discriminator: userData.discriminator,
    bot: userData.bot ?? false,
  };
  return user;
}

export function parseChannel(args: {
  data: DiscordChannel;
}): ZenaNS.GuildChannel {
  const channelData = args.data;
  const channel: ZenaNS.GuildChannel = {
    id: channelData.id,
    name: channelData.name,
    guild: {
      id: channelData.guild_id,
      name: "", // You might want to fetch or pass the guild name separately
    },
    send: async (options: ZenaNS.SendMessageOptions | string) => {
      // Placeholder for send logic
      return {} as ZenaNS.Message;
    },
  };
  return channel;
}

export function parseMessage(args: { data: DiscordMessage }): ZenaNS.Message {
  const messageData = args.data;
  const message: ZenaNS.Message = {
    id: messageData.id,
    content: messageData.content,
    author: parseAuthor(messageData.author),
    guildId: messageData.guild_id,
    tts: messageData.tts,
    edit: async (options: ZenaNS.EditMessageOptions) => {
      // Placeholder for edit logic
      return message;
    },
  };

  return message;
}
