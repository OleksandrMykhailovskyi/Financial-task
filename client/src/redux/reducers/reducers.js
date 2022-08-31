let initialState = {
  financeData: [],
  selectedQuotes: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_QUOTES":
      return{
        ...state,
        financeData: [...action.payload]
      }
    case "ADD_QUOTE":
      return{
        ...state,
        selectedQuotes: [...state.selectedQuotes, action.payload]
      }
    case "UPDATE_QUOTE":
      return{
        ...state,
        selectedQuotes: [...action.payload]
      }
    case "REMOVE_QUOTE":
      const updatedArray = state.selectedQuotes.filter(el => el !== action.payload);
      return{
        ...state,
        selectedQuotes: updatedArray
      }
    default:
      return state;
  }
}

export default rootReducer;
