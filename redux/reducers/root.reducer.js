import { combineReducers } from 'redux';
import MedicationReducer from './medication.reducer';
import ContraindicationReducer from './contraindication.reducer';

export default combineReducers({
  MedicationReducer,
  ContraindicationReducer
});