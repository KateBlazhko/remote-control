export const mapStrArrayToNumArray = (array: string[]): number[] =>
  array.map((item) => (typeof Number(item) === 'number' ? Number(item) : 0));
