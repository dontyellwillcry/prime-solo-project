const favoriteReducer = (state = [], action) => {
    switch (action.type) {
        case 'COLLECT_FAVORITE':
            return action.payload;
        default:
            return state;
    }
  };
  

  export default favoriteReducer;