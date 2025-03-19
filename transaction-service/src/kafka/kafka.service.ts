import { Kafka, Consumer, Producer } from 'kafkajs';

export class KafkaService {
  private kafka: Kafka;
  private producer?: Producer;
  private consumer?: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'payment-system',
      brokers: [process.env.KAFKA_BROKER || ''],
    });
  }

  async connectProducer() {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }
  }

  async sendMessage(topic: string, message: any) {
    if (!this.producer) {
      await this.connectProducer();
    }
    await this.producer!.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async connectConsumer(
    topic: string,
    callback: (message: any) => Promise<void>,
  ) {
    if (!this.consumer) {
      this.consumer = this.kafka.consumer({ groupId: `${topic}-group` });
      await this.consumer.connect();
    }
    await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const parsed = message.value
          ? JSON.parse(message.value.toString())
          : {};
        await callback(parsed);
      },
    });
  }
}
