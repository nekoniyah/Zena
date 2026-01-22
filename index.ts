import { GatewayIntentBits } from "discord-api-types/v10";
import { WebSocketManager } from "@discordjs/ws";
import { Client } from "@discordjs/core";
import type ZenaNS from "./utils/types/namespace";
import type ZenaEventsMap from "./utils/types/ZenaEventsMap";
import Manager from "./utils/core/managers";
import ZenaRest from "./utils/core/rest";

export default class Zena {
  static _decoratedEventHandlers: Map<Zena, Map<string, string>> = new Map();

  private _user: ZenaNS.User | null = null;

  get user() {
    return this._user!;
  }

  set user(user: ZenaNS.User) {
    this._user = user;
  }

  get internal() {
    return this.__internal__;
  }

  public eventsFolder = "events";
  public interactionsFolder = "interactions";
  public registersFolder = "registers";

  public rest: ZenaRest;

  public __internal__!: {
    intents: GatewayIntentBits | 0;
    parsers: Map<
      string,
      (payload: ZenaNS.SendMessageOptions) => ZenaNS.SendMessageOptions
    >;
    client: Client | null;
    rest: ZenaRest;
    manager: WebSocketManager;
  };

  constructor(private intents: GatewayIntentBits | 0 = 0) {
    const rest = new ZenaRest();

    this.rest = rest;

    const manager = new WebSocketManager({
      token: process.env.TOKEN,
      intents: this.intents,
      rest: rest,
    });

    const client = new Client({
      rest: rest,
      gateway: manager,
    });

    (async () => {
      this.__internal__ = {
        intents: this.intents,
        parsers: new Map(),
        client,
        rest,
        manager,
      };

      this._user = await this.__internal__.rest.getMe();

      await Manager(this);
    })();
  }

  static async Run(path: string, intents: GatewayIntentBits | 0 = 0) {
    let cl = (await import(process.cwd() + "/" + path)).default as typeof Zena;

    let bot = new cl(intents);

    await bot.__internal__.manager.connect();
  }

  static On<K extends keyof ZenaEventsMap>(event: K) {
    return function (
      target: Zena,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      if (!Zena._decoratedEventHandlers.has(target)) {
        Zena._decoratedEventHandlers.set(target, new Map());
      }
      Zena._decoratedEventHandlers.get(target)!.set(event, propertyKey);
      return descriptor;
    };
  }

  static SlashCommand(definition: ZenaNS.SlashCommandOptions) {
    return function (
      target: Zena,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {};
  }
}
