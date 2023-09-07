const ingredientReducer = (state = [], action) => {
    switch (action.type) {
        case 'DISPLAY_INGREDIENT':
            return action.payload;
        default:
            return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default ingredientReducer;