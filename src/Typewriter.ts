/*
 * @Description:
 * @Author: wangchao
 * @Date: 2022-11-08 16:26:57
 */

type QueueItem = () => Promise<void>;

export default class Typewriter {
  #queue: QueueItem[] = [];
  #element: HTMLElement;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(
    parent: HTMLElement,
    { loop = true, typingSpeed = 50, deletingSpeed = 50 } = {}
  ) {
    this.#element = document.createElement("div");
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#addToQueue(resolve => {
      let i = 0;
      let interval = setInterval(() => {
        this.#element.append(string[i]);
        i++;
        if (i >= string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue(resolve => {
      let num = number;
      let interval = setInterval(() => {
        this.#element.textContent = this.#element.textContent!.substring(
          0,
          this.#element.textContent!.length - 1
        );
        num--;
        if (!num) {
          clearInterval(interval);
          resolve();
        }
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteAll(deletingSpeed = this.#deletingSpeed) {
    this.#addToQueue(resolve => {
      let interval = setInterval(() => {
        this.#element.textContent = this.#element.textContent!.substring(
          0,
          this.#element.textContent!.length - 1
        );
        if (!this.#element.textContent!.length) {
          clearInterval(interval);
          resolve();
        }
      }, deletingSpeed);
    });
    return this;
  }

  pauseFor(duration: number) {
    this.#addToQueue(resolve => {
      setTimeout(resolve, duration);
    });
    return this;
  }

  async start() {
    let cb = this.#queue.shift();
    while (cb != null) {
      await cb();
      if (this.#loop) this.#queue.push(cb);
      cb = this.#queue.shift();
    }
    return this;
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => new Promise(cb));
  }
}
