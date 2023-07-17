export const deleteFirstNumber = (str: string): string => {
  if (Number(str[0])) {
    return str.split(" ").slice(1).join(" ");
  }
  return str;
};
