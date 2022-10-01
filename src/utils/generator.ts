import { shuffle, sum } from "lodash";
import {
  MERGABLES,
  STARTING_NUMS,
  START_NUM_2,
  START_NUM_3,
  START_NUM_DIFF_THRESHOLD,
} from "./constants";

/**
 *
 * @returns
 */
export const generateTileValue = (
  merged: { [key in number]: number },
  generated: { [key in number]: number },
  moves: number
): number => {
  // At the beginning of the game, randomly return 2 or 3
  if (Object.keys(merged).length === 0) {
    return randomStartingNum(generated);
  }

  // Decide if we want to randomly return one of the other values
  const numMerges = sum(Object.values(merged));
  if (Math.random() <= numMerges / 5 / moves) {
    if (Math.random() <= 0.5) {
      return randomStartingNum(generated);
    }

    // TODO - this could be memoized and not recalculated each time

    const probabilities: { [key in number]: number } = {};
    for (let key in merged) {
      const multiplier = MERGABLES.indexOf(Number(key)) + 1;
      const probability = 1 / Math.pow(2, multiplier);
      probabilities[key] = probability;
    }

    const probabilitiesSum = sum(Object.values(probabilities)) + 0.5;

    const choices = [];
    for (let key in merged) {
      const num = Math.floor((probabilities[key] / probabilitiesSum) * 100);
      choices.push(...Array(num).fill(key));
    }
    return Number(shuffle(choices)[0]);
  }

  return randomStartingNum(generated);
};

/**
 *
 * @param generated
 * @returns
 */
const randomStartingNum = (generated: { [key in number]: number }) => {
  // Try to balance between 2's and 3's
  if (
    Math.abs(generated[START_NUM_2] - generated[START_NUM_3]) >
    START_NUM_DIFF_THRESHOLD
  ) {
    if (generated[START_NUM_2] > generated[START_NUM_3]) {
      return START_NUM_3;
    } else {
      return START_NUM_2;
    }
  }

  // Randomly return 2 or 3
  return shuffle(STARTING_NUMS)[0];
};
