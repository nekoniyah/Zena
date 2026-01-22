import Zena from "../../index";
import { ParserElement, toPascalCase, toScreamCase } from "../types/types";
import { parseEventParams } from "./argParser";
import { GatewayDispatchEvents } from "discord-api-types/v10";

export default function listenEvents(zena: Zena, handlers: ParserElement[]) {
  for (let handler of handlers) {
    let parsedEventName = toPascalCase(
      toScreamCase(handler.name as keyof typeof GatewayDispatchEvents),
    );
    zena.internal.client!.on(
      GatewayDispatchEvents[parsedEventName],
      (...args: any[]) => {
        const parsedArgs = parseEventParams(parsedEventName, zena, args);
        handler.execute(...parsedArgs);
      },
    );
  }
}
