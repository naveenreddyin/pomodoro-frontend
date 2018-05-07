import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from "sinon";

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import TaskCardConnect, {TaskCard} from '../../components/Card';

import { Provider} from 'react-redux';

import configureStore from 'redux-mock-store';

import EditModal from '../../components/EditModal'
import TimerModal from '../../components/TimerModal'


describe('AddTaskCard', () => {
    let task = {
            "id": 89,
            "title": "4",
            "created": "2018-05-06T07:43:23.236172Z",
            "started": true,
            "done": false,
            "count": 0
    }
    

    const initialState = {}
    const mockStore = configureStore()
    let store,container, wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = shallow(<TaskCard item={task}/>);   
    })

    it('wraps all the contents in a div with .task-card class', () => {
        expect(wrapper.find('.task-card').length).toEqual(1);
    });

    it('has 0 tomato images', () => {
        expect(wrapper.find('img').length).toEqual(0);
    });

    it('increase count in state to 1 and should  1 tomato image', () => {
        task = {
            "id": 89,
            "title": "4",
            "created": "2018-05-06T07:43:23.236172Z",
            "started": true,
            "done": false,
            "count": 1
        }
        wrapper.setState({item: task})
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('start podomodor button doesnt appear until showStop state is true', () => {
        expect(wrapper.find(CardActions).at(0).children().equals(<span></span>)).toBeTruthy()
        // set showstop to true
        wrapper.setState({showStop: true})
        expect(wrapper.find(CardActions).at(0).children().type()).toBe('div')
        expect(wrapper.find(CardActions).at(0).children().children().type()).toBe(Button)
    });

    it('edit button simulate', () => {
        wrapper.setProps({deleteTask: jest.fn()})
        wrapper.find(CardActions).at(1).children().children().at(2).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });

    it('edit button simulate', () => {
        wrapper.setProps({deleteTask: jest.fn()})
        wrapper.find(CardActions).at(1).children().children().at(2).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });

    it('start button simulate', () => {
        wrapper.setProps({updateTaskStarted: sinon.spy()})
        wrapper.find(CardActions).at(1).children().children().at(1).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });

    
   
  })


