import safeRegex from 'safe-regex';

export class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This ${exp} is unsafe dude`);
    this.name = 'InvalidRegexError';
  }
}

export const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);

  if (!isSafe) throw new InvalidRegexError(exp);

  return exp;
};

export const map = (fn) => (array) => array.map(fn);

export const filter = (fn) => (array) => array.filter(fn);

export const reduce = (fn) => (array) => array.reduce(fn);

export const split = (pattern) => (str) => str.split(pattern);
