import type Zena from "../../index";
import type ZenaNS from "./namespace";

export default interface ZenaEventsMap {
  ready: [client: Zena];
  channelCreate: [channel: ZenaNS.GuildChannel];
  channelUpdate: [
    oldChannel: ZenaNS.GuildChannel,
    newChannel: ZenaNS.GuildChannel,
  ];
  channelDelete: [channel: ZenaNS.GuildChannel];
  messageCreate: [message: ZenaNS.Message];
  messageUpdate: [oldMessage: ZenaNS.Message, newMessage: ZenaNS.Message];
  messageDelete: [message: ZenaNS.Message];
  guildMemberAdd: [member: ZenaNS.Member];
  guildMemberRemove: [member: ZenaNS.Member];
  guildCreate: [guild: ZenaNS.Guild];
  guildDelete: [guild: ZenaNS.Guild];
}
