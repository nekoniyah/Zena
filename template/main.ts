// //@ts-ignore
import Zena from "..";

export default class Main extends Zena {
  override eventsFolder = "./events";
  override interactionsFolder = "./interactions";
  override registersFolder = "./registers";

  @Zena.On("ready")
  async onReady(client: Zena) {
    console.log(`Logged in as ${client.user!.username} (${client.user!.id})`);

    const guilds = await client.rest.getGuilds();
    console.log(guilds);
  }
}
