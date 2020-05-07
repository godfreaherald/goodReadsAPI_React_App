
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../../../reduxActionTypes";
import { loginUser, logoutUser } from "../../../../actions/user";


describe("login and logout actions",()=>{
    
    it("the loginUser action",()=>{
        let user ={name:"herald",password :"testpwd"};
        let login = loginUser(user);
         expect(login).toEqual({type:USER_LOGGED_IN,user})

    })

    it("the logout action",()=>{
        
        let login = logoutUser();
        expect(login).toEqual({type:USER_LOGGED_OUT})

    })
})