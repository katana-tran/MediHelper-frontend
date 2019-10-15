import { combineReducers } from 'redux';
import MedicationReducer from './medication.reducer';
import ContraindicationReducer from './contraindication.reducer';
import UserReducer from './user.reducer'

export default combineReducers({
  MedicationReducer,
  ContraindicationReducer,
  UserReducer
});