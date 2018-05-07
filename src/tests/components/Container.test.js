import React from 'react';

import { shallow, mount } from 'enzyme';

import ContainerConnect, {Container} from '../../components/Container';

import configureStore from 'redux-mock-store';


describe('Container', () => {
    let wrapper;
    let mountWrapper;

    beforeEach(()=>{
        wrapper = shallow(<Container />);
        
    })
    it('wraps all the contents in a div with .grid-root class', () => {
        expect(wrapper.find('.grid-root').length).toEqual(1);
    });

    it('has .task-list class', () => {
        expect(wrapper.find('.task-list').length).toEqual(1);
    });

    it('has .task-list-view class', () => {
        expect(wrapper.find('.task-list-view').length).toEqual(1);
    });

    it('has .create-task class', () => {
        expect(wrapper.find('.create-task').length).toEqual(1);
    });

  })

//   describe('Container - Redux', () => {

//     const initialState = {fetching: false}
//     const mockStore = configureStore()
//     let store,container

//     beforeEach(()=>{
//         store = mockStore(initialState)
//         container = shallow(<ContainerConnect store={store} /> )  
//     })

   
//   })

