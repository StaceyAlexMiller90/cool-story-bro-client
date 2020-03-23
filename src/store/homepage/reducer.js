const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HOMEPAGES_FETCHED':
      return [...state, ...action.payload];

    default:
      return state;
  }
};