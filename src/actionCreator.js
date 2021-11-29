import { PERSONAL_INFO } from "./action";

export function persnalInfo(state = {}, action) {
  if (action.type === PERSONAL_INFO) {
    return action.payload;
  }
  return state;
}

export function getPersonalInfo(product) {
  return { type: PERSONAL_INFO, payload: product };
}
