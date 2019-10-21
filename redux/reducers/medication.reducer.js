const initialState = {
    medications: [1],
    filterTerm: ""
  }
  
  const MedicationReducer = (state=initialState, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'GET_MEDICATIONS':
        return {
          ...state,
          medications: action.payload        
        }
      case 'SET_FILTER_TERM':
        return {
          ...state,
          filterTerm: action.payload
        }
      case 'CLEAR_SEARCH':
        return initialState
      default:
        return state;
    }
  
  }

export default MedicationReducer