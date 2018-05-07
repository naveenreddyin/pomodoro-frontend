/* eslint-disable import/first */

import React, { Component } from 'react';

import { connect } from 'react-redux'

import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import TaskActions from '../redux/TaskRedux'
import TaskCard from './Card'
import AddTaskCard from './AddTaskCard'

export class StartColumn extends Component{

    constructor(props){
        super(props)

        this.state = {
            tasks: this.props.tasks
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.tasks !== this.props.tasks){
            this.setState({tasks: this.props.tasks})
        }

    }

    render(){
        if(this.props.tasks)
            this.props.tasks.map(i => console.log(i.title))
        let {tasks} = this.state
        return (
            <Paper className="task-list-view">
                <List className="task-list">
                    {tasks && tasks.map((item,i) => (
                        <ListItem key={item.id}>
                            <TaskCard item={item} key={`item-${item.id}`}/>
                        </ListItem>
                    ))}
                </List>
                <AddTaskCard/>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      tasks: state.task.tasks
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(StartColumn)
