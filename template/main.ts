// //@ts-ignore
import Zena from "..";

export default class Main extends Zena {
  @Zena.On("ready")
  async onReady(client: Zena) {
    console.log(`Logged in as ${client.user.username} (${client.user.id})`);
  }
}
