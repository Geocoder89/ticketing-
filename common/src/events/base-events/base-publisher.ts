import { Stan } from "node-nats-streaming";
import { Subjects } from "../subjects/subjects";

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  // method to publish the class
  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      const newData = JSON.stringify(data);
      this.client.publish(this.subject, newData, (err) => {
        if (err) {
          return reject(err);
        }
        console.log("Event Published to subject", this.subject);
        resolve();
      });
    });
  }
}
