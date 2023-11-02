import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance : 0,
    loan : 0,
    loanPurpose : "",
};

const initialStateCustomer = {
    fullName : "",
    nationalID : "",
    createdAt : "",
};

function accountReducer(state=initialStateAccount , action) {
    switch(action.type){
        case "account/deposit":
            return{...state, balance: state.balance + action.payload};
        case "account/withdraw":
            return{...state, balance: state.balance - action.payload};
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return{...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose};
        case "account/payLoan":
            return{...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
        default:
            return state;
    }
}

function customerReducer(state=initialStateCustomer , action) {
    switch (action.type) {
        case "customer/createCustomer":
            return{...state, fullName:action.payload.fullName, nationalID:action.payload.nationalID, createdAt:action.payload.createdAt};
        case "customer/updateName":
            return {...state, fullName: action.payload}
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const storeV1 = createStore(rootReducer);

// store.dispatch({type:"account/deposit", payload:500});
// console.log(store.getState());

// store.dispatch({type:"account/withdraw", payload:200});
// console.log(store.getState());

// store.dispatch({type:"account/requestLoan", payload:{amount:1000, purpose:"Buy a car"}});
// console.log(store.getState());

// store.dispatch({type:"account/payLoan"});
// console.log(store.getState());


function deposit(amount) {
    return {type:"account/deposit", payload:amount}
}
function withdraw(amount) {
    return {type:"account/withdraw", payload:amount}
}
function requestLoan(amount , purpose) {
    return {type:"account/requestLoan", payload:{amount, purpose}}
}
function payLoan() {
    return {type:"account/payLoan"}
}

console.log(storeV1.getState());
storeV1.dispatch(withdraw(400));
console.log(storeV1.getState());
storeV1.dispatch(deposit(700));
storeV1.dispatch(requestLoan(1000 , "Buying a car"));
console.log(storeV1.getState());
storeV1.dispatch(payLoan());
console.log(storeV1.getState());




function createCustomer(fullName , nationalID) {
    return{
        type: "customer/createCustomer",
        payload: {fullName , nationalID , createdAt: new Date().toISOString()},
    };
}

function updateName(fullName) {
    return{type: "customer/updateName", payload: fullName,}
}

storeV1.dispatch(createCustomer("hamid seyedabadi" , "0010887040"));
console.log(storeV1.getState());
