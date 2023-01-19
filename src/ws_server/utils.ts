export const mapStrArrayToNumArray = (array: string[]) =>
  array.map((item) => (typeof Number(item) === 'number' ? Number(item) : 0));
