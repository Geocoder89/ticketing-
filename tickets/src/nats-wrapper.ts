import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if(!this._client) {
      throw new Error('Cannot access Nats Client before connecting')
    }

    return this._client
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    this._client;

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

// create a single instance of the nats wrapper which gets shared across the app.
export const natsWrapper = new NatsWrapper();
