const clickedIngredient = (state = [], action) => {
  switch (action.type) {
    case "CLICK_INGREDIENT":
      return [...state, action.payload];
      case "RESET_INGREDIENT":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default clickedIngredient;
