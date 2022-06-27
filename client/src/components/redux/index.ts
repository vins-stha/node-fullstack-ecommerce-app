import {combineReducers} from "redux";
import allReducer from "./reducer";

const  rootReducer = combineReducers({allReducer});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
