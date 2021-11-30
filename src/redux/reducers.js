import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';
import auth from './auth/reducer';
import security from './security/reducer';
import profile from './profile/reducer';
import quickAction from './quickAction/reducer';
import complain from './complain/reducer';
import home from './home/reducer';


const reducers = combineReducers({
  toast,
  auth,
  security,
  profile,
  quickAction,
  complain,
  home,
});

export default reducers;