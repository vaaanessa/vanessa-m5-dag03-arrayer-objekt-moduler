// Dag 3, del 2: Funktioner som arbetar med menyn. Gör alla tester gröna på tests.html.
// Använd filter, map, find, reduce och sort där det passar.
// Typerna (Ratt, OrderRad) finns i typer.ts. Röda understrykningar tills du skrivit return är normalt.
import { formateraPris } from "./pris";
import type { Ratt, OrderRad } from "./typer";

// Jag vet inte ännu vilken array-metod som passar.

// 1. Alla vegetariska rätter (filter). Returnerar en ny array.
export function vegetariskaRatter(meny: Ratt[]): Ratt[] {
  return meny.filter((ratt) => ratt.vegetarisk === true);
}

// 2. Bara namnen, som en array av text (map). ["Kardemummabulle", ...]
export function rattNamn(meny: Ratt[]): string[] {
  return meny.map((ratt) => ratt.namn);
}

// 3. En prislista som text: "Kardemummabulle – 35 kr" (map + formateraPris)
export function prislista(meny: Ratt[]): string[] {
  return meny.map((ratt) => {
    const prisText = formateraPris(ratt.pris);
    return `${ratt.namn} – ${prisText}`;
  });
}
// 4. Hitta en rätt via id (find). Returnerar objektet, eller undefined om det saknas.
export function hittaRatt(meny: Ratt[], id: number): Ratt | undefined {
  return meny.find((ratt) => ratt.id === id);
}

// 5. Den billigaste rätten (reduce). Returnerar objektet. Tom lista ger undefined.
export function billigast(meny: Ratt[]): Ratt | undefined {
  if (meny.length === 0) {
    return undefined;
  }

  return meny.reduce((billigaste, ratt) => {
    if (ratt.pris < billigaste.pris) {
      return ratt;
    } else {
      return billigaste;
    }
  });
}

// 6. Sortera efter pris, billigast först. Returnerar en NY array.
//    Den ursprungliga listan får INTE ändras (sort ändrar originalet, så kopiera först).
export function sorteraEfterPris(meny: Ratt[]): Ratt[] {
  const kopia = [...meny];

  kopia.sort((a, b) => a.pris - b.pris);

  return kopia;
}

// 7. Totalpris för en order. order = [{ id: 1, antal: 2 }, { id: 5, antal: 1 }]
//    Slå upp priset för varje id i menyn. Okända id räknas som 0 kr.
export function totalPris(order: OrderRad[], meny: Ratt[]): number {
  let total: number = 0;

  for (const rad of order) {
    const ratt = meny.find((ratt) => ratt.id === rad.id);

    if (ratt !== undefined) {
      total = total + ratt.pris * rad.antal;
    }
  }

  return total;
}

// 8. Antal rätter per kategori som ett objekt: { bakverk: 3, dryck: 2, lunch: 3 } (reduce)
export function perKategori(meny: Ratt[]): Record<string, number> {
  return meny.reduce(
    (antal, ratt) => {
      const kategori = ratt.kategori;

      if (antal[kategori] === undefined) {
        antal[kategori] = 1;
      } else {
        antal[kategori] = antal[kategori] + 1;
      }

      return antal;
    },
    {} as Record<string, number>,
  );
}

// 9. En kopia av rätten med nytt pris. Originalet får INTE ändras (spread: { ...ratt }).
export function medNyttPris(ratt: Ratt, nyttPris: number): Ratt {
  return { ...ratt, pris: nyttPris };
}
