
// You can import items here to use in your initial state or reducer!! Here is an example:
// import castor from '../assets/castor.jpg';

const initialState = {
  contraindications: []
}

const ContraindicationReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'GET_CONTRAINDICATIONS':
      return {
        ...state,
        contraindications: action.payload
      }
    default:
      return state;
  }
}

export default ContraindicationReducer;