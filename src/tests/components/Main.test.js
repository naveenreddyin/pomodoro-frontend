import React from 'react';

import { shallow, mount } from 'enzyme';

import {Main} from '../../components/Main'
import ContainerConnect, {Container} from '../../components/Container';

import configureStore from 'redux-mock-store';
import { Provider, connect} from 'react-redux';

describe('Main', () => {
    
    let wrapper;
    let mountWrapper;
    it('wraps all the contents in a div with .App class', () => {
        wrapper = shallow(<Main />);
        expect(wrapper.find('.App').length).toEqual(1);
    });

    it('wraps content of header in a div with .App-header class', () => {
        wrapper = shallow(<Main />);
        expect(wrapper.find('.App-header').length).toEqual(1);
    });

  })
