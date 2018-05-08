import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from "sinon";

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import PomodoroConnect, {Pomodoro} from '../../components/Pomodoro';

import { Provider} from 'react-redux';

import configureStore from 'redux-mock-store';

import EditModal from '../../components/EditModal'
import TimerModal from '../../components/TimerModal'



describe('Pomodoro', () => {
    let task = {
            "id": 89,
            "title": "4",
            "created": "2018-05-06T07:43:23.236172Z",
            "started": true,
            "done": false,
            "count": 0
    }
    

    const initialState = {time: 0, breakTime: 0}
    const mockStore = configureStore()
    let store,container, wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        const settings = {pomodoro_timer: 25, break_timer: 5, big_break_timer: 15}
        wrapper = shallow(<Pomodoro task={task} settings={settings}/>);   
    })

    it('wraps all the contents in a div with class .pomodoro-block', () => {
        expect(wrapper.find('.pomodoro-block').length).toEqual(1);
    });

    it('test start pomodoro button click', () => {
        wrapper.find('.start-pomodoro-block').children().find(Button).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });

    it('test start break button click', () => {
        wrapper.setState({activateBreak: true})
        wrapper.find('.start-break-block').children().find(Button).simulate('click')
        expect(wrapper).toMatchSnapshot();
    });

 
  })


