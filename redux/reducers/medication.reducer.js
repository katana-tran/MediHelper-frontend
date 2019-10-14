const initialState = {
    medications: [],
    usersMedications: []
  }
  
  const MedicationReducer = (state=initialState, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'GET_MEDICATIONS':
        return {
          ...state,
          medications: action.payload        
        }
      case 'GET_USERS_MEDS':
        return {
          ...state,
          usersMedications: action.payload
        }
      default:
        return state;
    }
  
  }

export default MedicationReducer