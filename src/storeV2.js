import {combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/custmers/customerSlice";


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer);

export default store;
