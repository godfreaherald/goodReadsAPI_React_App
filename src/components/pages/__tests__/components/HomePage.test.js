import React from 'react';
import { shallow,mount } from 'enzyme';
import {Provider} from 'react-redux'
import ConnectedHomePage, {HomePage} from '../../HomePage.js';
import configureStore from 'redux-mock-store'
import { createStore} from "redux";
import renderer from 'react-test-renderer'

import rootReducer from "../../../../reducers/rootReducer";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../../../reduxActionTypes";
import { loginUser, logoutUser } from "../../../../actions/user";


let logoutFn =jest.fn();

 let mockStore =configureStore();


 describe("Snapshot Testing ",()=>{
  it('+++capturing Snapshot of HomePage', () => {
    const renderedValue =  renderer.create(<HomePage isAuthenticated= {true} logout ={logoutFn}/>);
    expect(renderedValue).toMatchSnapshot();
});
})



 
describe('HomePage DUMB component', () => {
  let component;
 beforeEach(()=>{
   component = shallow(<HomePage isAuthenticated= {true} logout ={logoutFn} />);
 });

   it(" Dumb page is rendered" ,()=>{
       expect(component.length).toEqual(1);
   });
   it(" snapshot is matching ",()=>{
     expect(component).toMatchSnapshot();
   });

  it('Has Logout button when authenticated', () => {
    
    const text = component.find('button').text();
   expect(text).toEqual('Logout');
   
  });

  it(' Logout button click should call logout function', () => {
    
     component.find('button').simulate('click');
   expect(logoutFn).toHaveBeenCalled();
   
  });
});


describe('using redux store  to', () => {
  let store ;
  //let wrapper;
  let innitialState = { isAuthenticated:true}
  beforeEach(()=>{
   store = mockStore(innitialState)

it('+++ check action on dispatching ', () => {
  let action
  store.dispatch(loginUser({name:"herald"}))
  store.dispatch(logoutUser())
  action = store.getActions()
  expect(action[0].type).toBe(USER_LOGGED_IN)
  expect(action[1].type).toBe(USER_LOGGED_OUT)
});
});


// describe('ConnectedHomePage component using Shallow', () => {
//   let store ;let component;
//   let innitialState = { isAuthenticated:true}
//   beforeEach(()=>{
//    store = mockStore(innitialState)
//     component = shallow(<ConnectedHomePage store= {store} logout ={logoutFn} />);
//   });
 
//     it(" is rendered properly" ,()=>{
//         expect(component.length).toEqual(1);
//     });
//     it(" has isAuthenticated Prop equal to the initial state ",()=>{
//       expect(component.prop('isAuthenticated')).toEqual(innitialState.isAuthenticated);
//     });

//     it(" snapshot is matching ",()=>{
//       expect(component).toMatchSnapshot();
//     });
 
//    it('Has Logout button when authenticated', () => {
//      if(innitialState.isAuthenticated === true){

//        const text = component.find('button').text();
//       expect(text).toEqual('Logout');
//      }
//      else {
//       const text = component.find('button').text();
//       expect(text).toEqual('Login');
//      }
    
//    });
//  });




 //describe('ConnectedHomePage component using mount + provider', () => {

  // let store ;
  // //let wrapper;
  // let innitialState = { isAuthenticated:true}
  // beforeEach(()=>{
  //  store = mockStore(innitialState)
   //wrapper = mount( <Provider store={store}><ConnectedHomePage logout ={logoutFn} /></Provider>);
  });
 
//     it(" is rendered properly" ,()=>{
//         expect(wrapper.find(ConnectedHomePage).length).toEqual(1);
//     });
//     it(" has isAuthenticated Prop equal to the initial state ",()=>{
//       expect(wrapper.find(HomePage).prop('isAuthenticated')).toEqual(innitialState.isAuthenticated);
//     });

//     it(" snapshot is matching ",()=>{
//       expect(component).toMatchSnapshot();
//     });
 
//    it('Has Logout button when authenticated', () => {
//      if(innitialState.isAuthenticated === true){

//        const text = wrapper.find('button').text();
//       expect(text).toEqual('Logout');
//      }
//      else {
//       const text = component.find('button').text();
//       expect(text).toEqual('Login');
//      }
    
//    });

//    it('+++ check action on dispatching ', () => {
//     let action
//     store.dispatch(loginUser({name:"herald"}))
//     store.dispatch(logoutUser())
//     action = store.getActions()
//     expect(action[0].type).toBe(USER_LOGGED_IN)
//     expect(action[1].type).toBe(USER_LOGGED_OUT)
// });
//  });


//  describe('>>>H O M E --- REACT-REDUX (actual Store + reducers) more of Integration Testing',()=>{
  
//   let innitialState = { isAuthenticated:true}
//   let store,wrapper
//   beforeEach(()=>{
//       store = createStore(rootReducer)
//       wrapper = mount( <Provider store={store}><ConnectedHomePage logout ={logoutFn} /></Provider> )
//   });

//   it('+++ check Prop matches with initialState', () => {
//       store.dispatch(logoutUser())
//      expect(wrapper.find('button').text().toBe('Login')); 
// });

// });

