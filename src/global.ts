const lastElement = <S>(array: S[]): S => array[array.length - 1];

// Random num from "min" to "max".
const intRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

const choice = <T>(array: T[]): T => array[intRandom(0, array.length)];
const randomString = (len: number): string => {
  const results = [];
  const alphabets = [..."abcdefghijklmnopqrstuvwxyz"];
  const strs = [
    alphabets,
    alphabets.map((char) => char.toUpperCase()),
    ..."1234567890",
  ];
  for (let i = 0; i < len; i++) results.push(strs[intRandom(0, strs.length)]);

  return results.toString();
};

const isInclude = (min: number, value: number, max: number): boolean =>
  min <= value && max >= value;

const shake = <U>(...prevList: U[]): U[] => {
  const results: U[] = [];

  while (results.length !== prevList.length) {
    const result = choice<U>(prevList);
    if (prevList.includes(result)) continue;
    results.push(result);
  }

  return results;
};

export { intRandom, randomString, isInclude, choice, shake, lastElement };
