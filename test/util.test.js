import { evaluateRegex, InvalidRegexError } from '../src/util';

describe('evaluateRegex()', () => {
  it('should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

    expect.assertions(4);

    try {
      evaluateRegex(unsafeRegex);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidRegexError);
      expect(error.message).toBe(`This ${unsafeRegex} is unsafe dude`);
      expect(error).toEqual(new InvalidRegexError(unsafeRegex));
    }

    expect(() => evaluateRegex(unsafeRegex)).toThrowError();
  });

  it('should not throw an error using a safe regex', () => {
    const regex = /^([a-z])$/;
    const safeRegex = evaluateRegex(regex);

    expect.assertions(2);

    expect(safeRegex).toBe(regex);
    expect(() => evaluateRegex(safeRegex)).not.toThrowError();
  });
});
