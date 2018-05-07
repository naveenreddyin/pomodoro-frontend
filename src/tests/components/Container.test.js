import React from 'react';

import { shallow, mount } from 'enzyme';

import ContainerConnect, {Container} from '../../components/Container';

import { Provider} from 'react-redux';

import configureStore from 'redux-mock-store';

import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';

import ProgressColumn from '../../components/Progress'
import StartColumn from '../../components/StartColumn'


describe('Container', () => {
    let wrapper;
    let mountWrapper;
    // Initialize mockstore with empty state
    const mockStore = configureStore();

   const initialState = {task:{fetching: false}}
    beforeEach(()=>{
        const store = mockStore(initialState)
        const mockGetTasks = jest.fn();
        const mockFetchSettings = jest.fn();
        wrapper = shallow(<Container getTasks={mockGetTasks} fetchSettings={mockFetchSettings}/>);
        
    })
    it('wraps all the contents in a div with .grid-root class', () => {
        expect(wrapper.find('.grid-root').length).toEqual(1);
    });

    it('has Grid element', () => {
        expect(wrapper.find(Grid).length).toEqual(3);
    });

    it('has Progress column', () => {
        expect(wrapper.find(ProgressColumn).length).toEqual(1);
    });

    it('has Start column', () => {
        expect(wrapper.find(StartColumn).length).toEqual(1);
    });

    it('has LinearProgress when fetching is set to true', () => {
        wrapper.setState({fetching: true})
        expect(wrapper.find(LinearProgress).length).toEqual(1);
    });

  })

  describe('Container - Redux', () => {

    const initialState = {task: {fetching: false}}
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = mount(<Provider store={store}><ContainerConnect/></Provider> )  
    })
   
  })

