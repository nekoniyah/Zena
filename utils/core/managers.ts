import Zena from "../../index";
import path from "path";
import { GatherEvents } from "./EventGatherer";
import { recursiveReadDir, listenEvents } from "../helpers";

export default async function Manager(zena: Zena) {
  const interactionsFolderPath = path.join(
    process.cwd(),
    zena.interactionsFolder,
  );

  const registersFolderPath = path.join(process.cwd(), zena.registersFolder);
  const eventsFolderPath = path.join(process.cwd(), zena.eventsFolder);
  const events = recursiveReadDir(eventsFolderPath);

  let gathered = await GatherEvents(Zena._decoratedEventHandlers, events);

  listenEvents(zena, gathered);
}
