import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { parseGuild, parseUser } from "../helpers";
import { DiscordGuild, DiscordUser } from "../types/types";

export default class ZenaRest extends REST {
  constructor() {
    super({ version: "10" });
    this.setToken(process.env.TOKEN!);
  }

  async getMe() {
    return parseUser({
      data: (await this.get(Routes.user())) as DiscordUser,
    });
  }

  async editMe(data: { username?: string; avatar?: string }) {
    return parseUser({
      data: (await this.patch(Routes.user(), {
        body: data,
      })) as DiscordUser,
    });
  }

  async getGuild(id: string) {
    return parseGuild({
      data: (await this.get(Routes.guild(id))) as DiscordGuild,
    });
  }

  async getUser(id: string) {
    return parseUser({
      data: (await this.get(Routes.user(id))) as DiscordUser,
    });
  }

  async getGuilds() {
    let discordguilds = (await this.get(Routes.userGuilds())) as DiscordGuild[];

    return discordguilds.map((guild) => parseGuild({ data: guild }));
  }

  async getMembers(guildId: string) {
    let discordmembers = (await this.get(
      Routes.guildMembers(guildId),
    )) as DiscordUser[];

    return discordmembers.map((member) => parseUser({ data: member }));
  }
}
