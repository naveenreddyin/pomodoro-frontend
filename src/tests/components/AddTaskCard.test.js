import React from 'react';

import { shallow, mount } from 'enzyme';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import AddTaskCardConnect, {AddTaskCard} from '../../components/AddTaskCard';

import { Provider} from 'react-redux';

import configureStore from 'redux-mock-store';


describe('AddTaskCard', () => {

    const initialState = {task: {fetching: false}}
    const mockStore = configureStore()
    let store,container, wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        const createTask = jest.fn()
        wrapper = shallow(<AddTaskCard createTask={createTask}/>);   
    })

    it('wraps all the contents in a div with .task-card class', () => {
        expect(wrapper.find('.task-card').length).toEqual(1);
    });

    it('has .add-task class', () => {
        expect(wrapper.find('.add-task').length).toEqual(1);
    });

    it('if button clicked without filling anything, should show error', () => {
        // before simulating button click it should be false
        expect(wrapper.state().showError).toBeFalsy();
        // simulate button click
        wrapper.find(Button).simulate('click')
        expect(wrapper.state().showError).toBeTruthy();
    });

    it('Fill up the taskName state and showError should not be true', () => {
        // before simulating button click it should be false
        expect(wrapper.state().showError).toBeFalsy();

        // add task name
        wrapper.setState({taskName: "first task"})
        // simulate button click
        wrapper.find(Button).simulate('click')
        expect(wrapper.state().showError).toBeFalsy();
    })

   
  })


