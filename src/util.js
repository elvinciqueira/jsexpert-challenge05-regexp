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
