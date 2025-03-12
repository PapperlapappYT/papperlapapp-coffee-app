import { roundNumber } from "@/state/reducer";
import { Bohne } from "@/state/state";
import { predictPrice } from "@papperlapappyt/papperlapapp-coffee-prediction/dist/index.js";

export const calculate = (newBohne: Bohne) => {
  const rabatt = newBohne.rabatt || 0.0;
  const vkp = roundNumber(newBohne.vkp);
  const vkpRabatt = roundNumber(vkp - vkp * (rabatt / 100));
  const ekp = roundNumber(newBohne.ekp);
  const marge = roundNumber((vkpRabatt / ekp - 1) * 100);
  const predictedVKP = predictPrice(ekp);
  return {
    id: newBohne.id,
    art: newBohne.art,
    vkp,
    vkpRabatt,
    marge,
    ekp,
    rabatt,
    predictedVKP,
  };
};
