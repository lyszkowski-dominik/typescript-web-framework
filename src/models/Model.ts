import { AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

interface HasId {
  id?: number;
}

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  // this can only work if we initialize attributes,events and sync in the constructor
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  //   get on() {
  //     return this.events.on;
  //   }
  //   get trigger() {
  //     return this.events.trigger;
  //   }
  //   get get() {
  //     return this.attributes.get;
  //   }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (!id) throw new Error('Cannot fetch without an id');
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
