import type { EmbedBuilder } from "@discordjs/builders";

namespace ZenaNS {
  export type MessageOptionsType = "send" | "edit";
  export type EditMessageOptions = UniversalMessageOptions;
  export type FilePayload = {
    name: string;
    data: Buffer | Uint8Array | ArrayBuffer | string;
  };

  export type Embed = EmbedBuilder;
  export type ActionRow = {
    components: Component[];
  };

  export type Component = ButtonComponent | SelectMenuComponent;
  export type ButtonComponent = {
    style: number;
    label: string;
    custom_id: string;
    disabled?: boolean;
    emoji?: EmojiPayload;
    url?: string;
  };

  export type SelectMenuComponent = {
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
  };

  export type EmojiPayload = {
    name: string;
    id?: string;
    animated?: boolean;
  };

  export type MessageReferenceOptions = {
    guildId?: string;
    channelId?: string;
    messageId?: string;
  };

  export type SelectOption = {
    label: string;
    emoji?: EmojiPayload;
    value: string;
    default?: boolean;
  };

  export type UniversalMessageOptions = {
    content?: string;
    embeds?: Embed[];
    components?: ActionRow[];
    files?: FilePayload[];
  };

  export type MentionFlags = {
    users?: boolean;
    roles?: boolean;
    everyone?: boolean;
  };

  export type MessageMentionFlags = {
    allow?: MentionFlags;
    deny?: MentionFlags;
  };

  export type SendMessageOptions = UniversalMessageOptions & {
    tts?: boolean;
    allowMentions?: MessageMentionFlags;
    parserId?: string;
  };

  export type Guild = {
    id: string;
    name: string;
  };

  export type Member = {
    id: string;
    user: User;
    guild: Guild;
  };

  export type User = {
    id: string;
    username: string;
    discriminator: string;
    bot?: boolean;
  };

  export type Message = {
    id: string;
    content: string;
    author: User;
    edit: (options: EditMessageOptions) => Promise<Message>;
    guildId: string;
    tts: boolean;
  };

  export type GuildChannel = {
    id: string;
    name: string;
    guild: Guild;
    send: (options: SendMessageOptions | string) => Promise<Message>;
  };

  export type ApplicationCommandOption<
    T =
      | "sub_command"
      | "sub_command_group"
      | "string"
      | "integer"
      | "boolean"
      | "user"
      | "channel"
      | "role"
      | "mentionable"
      | "number",
  > = T extends "sub_command" | "sub_command_group"
    ? {
        type: T;
        name: string;
        description: string;
        options?: ApplicationCommandOption[];
      }
    : {
        type: T;
        name: string;
        description: string;
        required?: boolean;
      };

  export type SlashCommandOptions = {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
  };
}

export default ZenaNS;
