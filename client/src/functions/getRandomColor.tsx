function getRandomColor(): string {
  const red: number = Math.floor(Math.random() * 256);
  const green: number = Math.floor(Math.random() * 256);
  const blue: number = Math.floor(Math.random() * 256);
  const hexString: string =
    "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  return hexString;
}

export default getRandomColor;
