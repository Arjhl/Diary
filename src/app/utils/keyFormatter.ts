export const keyFormatter = (key: string) => {
  const formattedKey: number[] = [
    ...key.split("").map((e) => Number(e)),
    ...key.split("").map((e) => Number(e)),
  ];
  return formattedKey;
};
