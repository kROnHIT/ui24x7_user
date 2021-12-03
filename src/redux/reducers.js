import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';
import auth from './auth/reducer';
import classified from './classified/reducer';


const reducers = combineReducers({
  toast,
  auth,
  classified,
});

export default reducers;