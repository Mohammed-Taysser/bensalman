interface LoginInfoJson {
  email: string;
  'bad-email': string;
  'non-exist-email': string;
  password: string;
}

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
  }
}
