import { combineReducers, createStore } from 'redux';
import apiErrorReducer from './reducers/apiErrorReducer';
import ontologyReducer from './reducers/ontologyReducer';
import fullscreenReducer from './reducers/fullscreenReducer';
import loginReducer from './reducers/loginReducer';
import languageReducer from './reducers/languageReducer';

const rootReducer = combineReducers({
  apiError: apiErrorReducer,
  ontology: ontologyReducer,
  fullscreenStatus: fullscreenReducer,
  login: loginReducer,
  languages: languageReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
