import { TextProcessorFluentApi } from './textProcessorFluentAPI.js';
export class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentApi(text);
  }

  getProjectsFromCSV() {
    return this.#textProcessorFluentAPI
      .extractHeaders()
      .extractContent()
      .splitValues()
      .mapRawObject()
      .mapProjects()
      .build();
  }
}
