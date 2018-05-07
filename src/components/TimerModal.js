/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Modal from 'react-responsive-modal';

import Button from 'material-ui/Button';

import TaskActions from '../redux/TaskRedux'
import PomodoroActions from '../redux/PomodoroRedux'

import Pomodoro from './Pomodoro'


export class TimerModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            open: this.props.open,
            taskName: '',
            task: null,
            showUpdateError: false,
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.open !== this.props.open){
            this.setState({open: this.props.open})
        }

        if(prevProps.task !== this.props.task){
            this.setState({task: this.props.task, taskName: this.props.task.title})
        }

    }

    handleClose(){
        let {task} = this.state
        this.props.showHideTimerModal(task, false)
    }
    

    render(){
        const {open, taskName, task} = this.state

        return (
            <Modal open={open} onClose={this.handleClose.bind(this)} closeOnOverlayClick={false}>
                <h2>Pomodoro Timer</h2>
                <div className="container">
                    
                    <Pomodoro task={task}/>
                </div>
            </Modal>
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.pomodoro.currentTask,
        open: state.pomodoro.openTimerModal
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        showHideTimerModal: (currentTask, openTimerModal) => dispatch(PomodoroActions.showTimerModal(currentTask, openTimerModal))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TimerModal)
