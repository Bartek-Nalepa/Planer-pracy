import { combineReducers } from "redux";
import { History } from 'history';
import planned from "./planned/reducers"

export default (history: History) => combineReducers({
    planned
});