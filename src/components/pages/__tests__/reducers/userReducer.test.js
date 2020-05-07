import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../../../reduxActionTypes";

import userReducer from '../../../../reducers/user'

describe("Test user Reducer  ", ()=>{
    let state = {username:"herald"};
it("case log in",()=>{
    state = userReducer(state,{type:USER_LOGGED_IN,user:{username:"wambua"}});

    expect(state).toEqual({username:"wambua"})
    
    
})

it("case log out",()=>{
    state = userReducer(state,{type:USER_LOGGED_OUT});

    expect(state).toEqual({})
    
    
})
})
