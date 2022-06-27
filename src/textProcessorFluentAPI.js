import * as R from 'ramda';
import { evaluateRegex } from './util.js';
import { Project } from './project.js';
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
    const filter = R.filter((item) => !!item);
    const words = R.split(evaluateRegex(/;/gim));
    const splitWords = R.compose(filter, words);
    const splitContent = R.compose(R.map(splitWords));

    this.#content = {
      headers: splitWords(this.#content.headers),
      content: splitContent(this.#content.content),
    };

    return this;
  }

  mapRawObject() {
    const { content, headers } = this.#content;

    this.#content = content.map((projects) =>
      projects.reduce(
        (finalObject, field, index) => ({
          ...finalObject,
          [headers[index]]: field,
        }),
        {}
      )
    );

    return this;
  }

  mapProjects() {
    this.#content = this.#content.map((rawObject) => new Project(rawObject));

    return this;
  }

  build() {
    return this.#content;
  }
}
