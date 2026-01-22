import type Zena from "../../index";
import type ZenaEventsMap from "../types/ZenaEventsMap";

type Event = {
  name: keyof ZenaEventsMap;
  execute: (...args: any[]) => void;
};

export async function GatherEvents(
  decorated: Map<Zena, Map<string, string>>,
  filePaths: string[],
) {
  let gatheredEventHandlers: Array<{
    name: keyof ZenaEventsMap;
    execute: (...args: any[]) => void;
  }> = [];

  let importedEvents = (await Promise.all(
    filePaths.map(async (file) => {
      const mod = await import(file);
      return mod.default;
    }),
  )) as Event[];

  importedEvents.forEach((mod) => {
    const eventName = mod.name as keyof ZenaEventsMap;

    gatheredEventHandlers.push({ name: eventName, execute: mod.execute });
  });

  decorated.forEach((map, instance) => {
    map.forEach((methodName, eventName) => {
      gatheredEventHandlers.push({
        name: eventName as keyof ZenaEventsMap,
        execute: (instance as any)[methodName].bind(instance),
      });
    });
  });

  return gatheredEventHandlers;
}
