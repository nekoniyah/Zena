import { GatewayDispatchEvents, MappedEvents } from "@discordjs/core";

// 1. Transforme "WORD" en "Word"
export type PascalCase<S extends string> = S extends `${infer P1}_${infer P2}`
  ? `${Capitalize<Lowercase<P1>>}${PascalCase<P2>}`
  : Capitalize<Lowercase<S>>;

// 2. Transforme "SNAKE_CASE" en "snakeCase"
export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}`
  ? `${Lowercase<P1>}${PascalCase<P2>}`
  : Lowercase<S>;

// Application à l'Enum
export type DiscordEventTypes = CamelCase<GatewayDispatchEvents>;

export type DiscordEventMap = {
  [K in keyof MappedEvents as CamelCase<K & string>]: (
    data: MappedEvents[K],
  ) => void;
};

// ready => READY
// channelCreate => CHANNEL_CREATE
export type ScreamCase<T extends string> = T extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Uppercase<P1>}${ScreamCase<P2>}`
    : `${Uppercase<P1>}_${ScreamCase<P2>}`
  : T extends ""
    ? ""
    : Uppercase<T>;

export function toPascalCase<T extends string>(str: T): PascalCase<T> {
  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "_") {
      capitalizeNext = true;
    } else if (capitalizeNext) {
      result += char?.toUpperCase();
      capitalizeNext = false;
    } else {
      result += char?.toLowerCase();
    }
  }

  // channelCreate should become ChannelCreate

  return result as PascalCase<T>;
}

export function toScreamCase<T extends string>(str: T): ScreamCase<T> {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === char?.toUpperCase() && i !== 0) {
      result += "_" + char;
    } else {
      result += char?.toUpperCase();
    }
  }
  return result as ScreamCase<T>;
}

export type DiscordMessageAuthor = {
  id: string;
  username: string;
  discriminator: string;
  bot?: boolean;
  global_name?: string;
  avatar?: string;
};

export type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  bot?: boolean;
  global_name?: string;
  avatar?: string;
};

export type DiscordChannel = {
  id: string;
  name: string;
  type: number;
  guild_id: string;
};

export type DiscordMessage = {
  tts: boolean;
  content: string;
  nonce?: string;
  pinned?: boolean;
  id: string;
  type: number;
  author: DiscordMessageAuthor;
  guild_id: string;
};

export type DiscordGuild = {
  id: string;
  name: string;
};

export type ParserElement = {
  name: string;
  execute: (...args: any[]) => void;
};
