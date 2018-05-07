/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Modal from 'react-responsive-modal';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import TaskActions from '../redux/TaskRedux'


export class EditModal extends Component{

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

    // this will handle task name update
    handleTaskNameUpdate(task){
        const {taskName} = this.state
        if(taskName != null && taskName != ''){ 
            this.setState({open: false})
            this.props.updateTask(task.id, taskName)
        }
        else{
            this.setState({showUpdateError: true})
        }
    }
    
    handleClose(){
        let {task} = this.state
        this.props.editTask(task, false)
    }

    render(){
        const {open, taskName, task} = this.state

        return (
            <Modal open={open} onClose={this.handleClose.bind(this)} closeOnOverlayClick={false}>
                <h2>Edit name</h2>
                <div className="container">
                    <TextField
                        id="task-textfield-id"
                        label="Task Name"
                        placeholder="Task Name"
                        className="task-textfield"
                        margin="normal"
                        value={taskName}
                        onChange={e => this.setState({taskName: e.target.value})}
                        error={this.state.showUpdateError}
                    />
                    <Button size="small" color="secondary" onClick={this.handleTaskNameUpdate.bind(this, task)}>Update</Button>
                </div>
            </Modal>
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task.currentTask,
        open: state.task.openEditModal
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (taskId,title) => dispatch(TaskActions.updateTask(taskId,title)),
        editTask: (currentTask, openEditModal) => dispatch(TaskActions.editTask(currentTask, openEditModal))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
