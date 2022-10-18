import { createStore,combineReducers,applyMiddleware, compose } from "redux";
import { VanillaiReducer } from "../redux/Reducer/Vanillai_Reducer";
import thunk from "redux-thunk";

const reducer=combineReducers(
	{
		Vanillai:VanillaiReducer,
	}
);
let initalValues = {};
const composeView = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initalValues, composeView(applyMiddleware(thunk)));

export default store;