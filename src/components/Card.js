/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import TaskActions from '../redux/TaskRedux'
import PomodoroActions from '../redux/PomodoroRedux'

import EditModal from './EditModal'
import TimerModal from './TimerModal'

import tomato from '../tomato.png';

var Moment = require('moment');


export class TaskCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            openEditModal: false,
            editTaskName: null,
            item: this.props.item,
            showStop: this.props.showStop,
        }

    }

    // handle edit of task name
    handleTaskEdit(task){
        // this.setState({openEditModal: true, editTaskName: task.title, toBeUpdatedTask: task})
        this.props.editTask(task, true)
    }

    // handle start task button click
    // Will push the tasks for progressTasks state
    handleStartTask(task){
        this.props.updateTaskStarted(task.id, true)
    }

    // handle deletion of the task
    handleTaskDelete(taskId){
        // console.log(taskId)
        this.props.deleteTask(taskId)
        // this.props.getTasks()
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps !== this.props)
        this.setState({item:this.props.item})
    }

    handleTaskStop(task){
        this.props.updateTaskStarted(task.id, false)
    }

    handleStartPomodoro(task){
        this.props.showHideTimerModal(task, true)
    }

    render(){
        let {item, showStop} = this.state
        let created = Moment(item.created).format("Do MMM YYYY")
        console.log(showStop)
        return (
            <Card className="task-card" key={`task-${item.id}`}>
                <EditModal/>
                <TimerModal/>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {item.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {created}
                    </Typography>
                    <Typography color="textSecondary">
                        {Array(item.count).fill().map((_, i) => (
                            <Tooltip id="tooltip-icon" title="Finished Pomodoro's" key={`tooltip-${item.id}-${i}`}>
                                <img src={tomato} className="pomodoro-image" alt="pomodoro" />
                            </Tooltip>
                        ))}
                    </Typography>
                </CardContent>
                <CardActions>
                    {showStop ? 
                    (
                        <div>
                            <Button size="small" color="secondary" onClick={this.handleStartPomodoro.bind(this, item)}>
                                Start Pomodoro
                            </Button>                            
                        </div>
                    ): 
                    (
                    ''
                    )}
                    
                </CardActions>
                <CardActions>
                    {showStop ? 
                    (
                        <div>
                        <Button size="small" color="primary" onClick={this.handleTaskEdit.bind(this, item)}>Edit</Button>                            
                        <Button size="small" color="primary" onClick={this.handleTaskStop.bind(this, item)}>Stop Task</Button>
                        </div>
                    ): 
                    (
                    <div>
                        <Button size="small" color="primary" onClick={this.handleTaskEdit.bind(this, item)}>Edit</Button>
                        <Button size="small" color="primary" onClick={this.handleStartTask.bind(this, item)}>Start Task</Button>
                        <Button size="small" color="secondary" onClick={this.handleTaskDelete.bind(this, item.id)}>Delete</Button>
                    </div>
                    )}
                    
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(TaskActions.fetchTasks()),
        deleteTask: (taskId) => dispatch(TaskActions.deleteTask(taskId)),
        editTask: (currentTask, openEditModal) => dispatch(TaskActions.editTask(currentTask, openEditModal)),
        updateTaskStarted: (taskId, started) => dispatch(TaskActions.updateTaskStarted(taskId,started)),
        showHideTimerModal: (currentTask, openTimerModal) => dispatch(PomodoroActions.showTimerModal(currentTask, openTimerModal))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskCard)
