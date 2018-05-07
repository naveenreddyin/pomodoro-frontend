/* eslint-disable import/first */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';

import Modal from 'react-responsive-modal';

var Moment = require('moment');

import TaskActions from '../redux/TaskRedux'
import PomodoroActions from '../redux/PomodoroRedux'

import ProgressColumn from './Progress'
import StartColumn from './StartColumn'

import { connect } from 'react-redux'

import '../styles/main.css';


export class Container extends Component{

    constructor(props){
        super(props);

        this.state = {
            fetching: this.props.fetching,
            taskName: null,
            showError: false,
            openEditModal: false,
            editTaskName: null,
            showUpdateError: false,
            toBeUpdatedTask: null,
            progressTasks:[],
            tasks: []
        }

    }
    componentDidMount(){
        this.props.getTasks()
        // get pomodoro timer settings
        this.props.fetchSettings()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState({fetching: this.props.fetching, 
            tasks: this.props.tasks})
        }
    }
    
    render(){
        let {fetching, progressTasks} = this.state

        return (
            <div className="grid-root">

                <Grid container spacing={24}>
                    <Grid item xs={3} sm={3}>
                        <StartColumn/>
                        {fetching ? (<LinearProgress color="secondary" />): ('')}
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <ProgressColumn progressTasks={progressTasks}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      fetching: state.task.fetching,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(TaskActions.fetchTasks()),
        deleteTask: (taskId) => dispatch(TaskActions.deleteTask(taskId)),
        fetchSettings: () => dispatch(PomodoroActions.fetchSettings())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Container)