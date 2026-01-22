import Zena from "../../index";
import { ParserElement, toPascalCase, toScreamCase } from "../types/types";
import { parseEventParams } from "./argParser";
import { GatewayDispatchEvents } from "discord-api-types/v10";

export default async function listenEvents(
  zena: Zena,
  handlers: ParserElement[],
) {
  for (let handler of handlers) {
    let parsedEventName = toPascalCase(
      toScreamCase(handler.name as keyof typeof GatewayDispatchEvents),
    );

    if (parsedEventName === "Ready") {
      zena.user = await zena.internal.rest.getMe();
    }

    zena.internal.client!.on(
      GatewayDispatchEvents[parsedEventName],
      async (...args: any[]) => {
        const parsedArgs = parseEventParams(parsedEventName, zena, args);
        await handler.execute(...parsedArgs);
      },
    );
  }
}
