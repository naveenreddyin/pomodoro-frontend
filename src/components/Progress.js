/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import TaskActions from '../redux/TaskRedux'
import TaskCard from './Card'


export class Progress extends Component{

    constructor(props){
        super(props)

    }

    

    render(){
        let {progressTasks} = this.props
        // if progressTasks is empty return empty string
        if(progressTasks.length <= 0)
            return ('')

    
        return (
            <Paper className="task-list-view">
                <List className="task-list">
                    {progressTasks && progressTasks.map((item,i) => (
                        <ListItem key={item.id}>
                            <TaskCard item={item} key={`item-${item.id}`} showStop={true}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      progressTasks: state.task.progressTasks
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStarted: (taskId, started) => dispatch(TaskActions.updateTaskStarted(taskId,started)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Progress)
