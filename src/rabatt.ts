export function studentPris(pris: number): number {
  const rabatt = pris * 0.1;
  return pris - rabatt;
}
