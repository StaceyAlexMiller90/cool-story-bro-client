const initialState = {
  stories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    
    case 'SINGLE_HOMEPAGE_DETAILS_FETCHED':
      return {...action.payload};
  
    default:
      return state;
  }
};