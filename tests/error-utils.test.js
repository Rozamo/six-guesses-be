const { throwIfError } = require("../services/error-utils");

const ARGS = {
  ERROR: {
    status: 400,
    message: "Message",
  },
  PARAMS: {
    DATA: "DATA",
  },
  MULTIPLE_PARAMS: {
    DATA1: "DATA1",
    DATA2: "DATA2",
    DATA3: "DATA3",
  },
};

describe('Tests for throwIfError utility function', () => {
  test("Returns params if no error", () => {
    expect(throwIfError({ error: null, ...ARGS.PARAMS })).toStrictEqual(
      ARGS.PARAMS
    );
  });
  
  test("Returns multiple params if no error", () => {
    expect(throwIfError({ error: null, ...ARGS.MULTIPLE_PARAMS })).toStrictEqual(
      ARGS.MULTIPLE_PARAMS
    );
  });
  
  test("Throws error if error with single param", () => {
    expect(() => {
      throwIfError({ error: ARGS.ERROR, ...ARGS.PARAMS });
    }).toThrow(new Error(null, { cause: ARGS.ERROR }));
  });
  
  test("Throws error if error with single param", () => {
    expect(() => {
      throwIfError({ error: ARGS.ERROR, ...ARGS.MULTIPLE_PARAMS });
    }).toThrow(new Error(null, { cause: ARGS.ERROR }));
  });
});
