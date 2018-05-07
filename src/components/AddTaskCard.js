/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import TaskActions from '../redux/TaskRedux'


export class AddTaskCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            showError: false
        }

    }

    // to handle adding new task onclick event
    handleAddTask(){
        const {taskName} = this.state

        if(taskName != null){
            this.setState({fetching: true, taskName: null})
            this.props.createTask(taskName)
        }else{
            this.setState({showError: true})
        }
    }

    render(){
        let {showError} = this.state
        return (
            <Card className="task-card">
                <CardContent>
                    <TextField
                        id="task-textfield-id"
                        label="Task Name"
                        placeholder="Task Name"
                        className="task-textfield"
                        value={this.state.taskName == null ? '' : this.state.taskName}
                        margin="normal"
                        onChange={e => this.setState({taskName: e.target.value})}
                    />
                    {showError ? (
                        <Typography color="textSecondary">
                            Please enter a task name
                        </Typography>
                    ): ('')}                
                </CardContent>
                <CardActions className="add-task">
                    <Button size="small" color="primary" onClick={this.handleAddTask.bind(this)}>Add</Button>

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
        createTask: (title) => dispatch(TaskActions.createTask(title)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddTaskCard)
