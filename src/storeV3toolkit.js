import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/custmers/customerSlice"
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;
