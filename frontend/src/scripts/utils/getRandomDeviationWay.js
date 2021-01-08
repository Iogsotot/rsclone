import { RANDOM_WAY_COEFFICIENT } from '../constants/constants';

export default function getRandomDeviationWay() {
  return ((Math.random() < 0.5) ? -1 : 1) * (RANDOM_WAY_COEFFICIENT + Math.random());
}

// export {
//   getRandomDeviationWay,
// };
