import clipboardy from "clipboardy";

export const clipboard = async (message: string) => {
  await clipboardy.write(message);
};
