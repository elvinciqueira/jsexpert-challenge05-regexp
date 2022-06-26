import { evaluateRegex, map, split, filter } from './util.js';

export class TextProcessorFluentApi {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractHeaders() {
    const [headers] = this.#content.match(evaluateRegex(/(?:(?!\n).)*/));

    this.#content = {
      headers,
      content: this.#content,
    };

    return this;
  }

  extractContent() {
    const { content } = this.#content;

    this.#content.content = content.match(evaluateRegex(/(?<=\n).*/g));

    return this;
  }

  splitValues() {
    const words = split(evaluateRegex(/;/gim));
    const toArray = filter((item) => !!item);

    this.#content = {
      headers: toArray(words(this.#content.headers)),
      content: this.#content.content.map((word) => toArray(words(word))),
    };

    return this;
  }

  build() {
    return this.#content;
  }
}
