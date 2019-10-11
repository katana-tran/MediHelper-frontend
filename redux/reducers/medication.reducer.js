const initialState = {
    medications: []
  }
  
  const MedicationReducer = (state=initialState, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'GET_MEDICATIONS':
        return {
          medications: action.payload
        }
      default:
        return state;
    }
  
  }

export default MedicationReducer