export const getState = (state) => state;

export const getGood = (state) => getState(state).good;

export const getNeutral = (state) => getState(state).ok;

export const getBad = (state) => getState(state).bad;
