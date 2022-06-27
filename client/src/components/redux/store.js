import allReducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

export const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));
