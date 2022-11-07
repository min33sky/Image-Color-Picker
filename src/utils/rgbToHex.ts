export function rgbToHex(r: string, g: string, b: string) {
  return (
    '#' + [r, g, b].map((x) => Number(x).toString(16).padStart(2, '0')).join('')
  );
}
