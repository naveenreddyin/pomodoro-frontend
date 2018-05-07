/* eslint-disable import/first */

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import { connect } from 'react-redux'

import tomato from '../tomato.png';

import TaskActions from '../redux/TaskRedux'
import PomodoroActions from '../redux/PomodoroRedux'


export class Pomodoro extends Component{
    constructor(props){
        super(props)

        this.state = {
            time: 0,
            task: this.props.task,
            count: this.props.task.count,
            breakTime: 0,
            activateBreak: false
        }
        this.elapseTime = this.elapseTime.bind(this);
        this.checkCount = this.checkCount.bind(this)
        this.startBreak = this.startBreak.bind(this)
        this.startPomodoro = this.startPomodoro.bind(this)
        this.setDefaultTime = this.setDefaultTime.bind(this)
    }

    componentDidMount() {
        this.setDefaultTime();
    
    }

    setDefaultTime() {
        let {settings} = this.props
        let defaultTime = (settings.pomodoro_timer * 60);
        let defaultBreakTime = (settings.break_timer * 60)
        this.setState({time: defaultTime, 
            breakTime: defaultBreakTime});
    }



    elapseTime() {
        let {activateBreak} = this.state
        if(activateBreak)
        this.startBreak()
        else
        this.startPomodoro()
        
    }

    startBreak(){
        if (this.state.breakTime === 0) {
            console.log("finished ")
            clearInterval(this.interval);
            this.setDefaultTime()
            this.setState({activateBreak: false});
          }else {
            let breakTime = this.state.breakTime - 1;
            this.setState({breakTime});
        }
    }

    startPomodoro(){
        if (this.state.time === 0) {
            console.log("finished ")
            clearInterval(this.interval);
            let {count, task} = this.state
            count+=1
            this.setState({time: 0, count, activateBreak: true});
            this.props.updateTaskPomodoroCount(task.id, count)
            this.checkCount()
          }else {
            let newState = this.state.time - 1;
            this.setState({time: newState});
        }
    }

    restartInterval(){
        clearInterval(this.interval);
        this.interval = setInterval(this.elapseTime, 1000);
    }

    checkCount(){
        let {count, breakTime} = this.state
        let {settings} = this.props
        console.log(count, breakTime)

        if((count % 4) === 0)
            breakTime = (settings.big_break_timer * 60)
        else
            breakTime = (settings.break_timer * 60)
        console.log(count, breakTime)
        this.setState({breakTime})
    }

    handleStart(){
        this.checkCount()
        this.interval = setInterval(this.elapseTime, 1000);
    }

    format(seconds) {
       
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        return timeFormated;
    }

    render(){
        // console.log(this.props, this.state)
        let {task, count, activateBreak} = this.state
        
        return (
            <div>
                {activateBreak ? (
                    <div>
                        <p>Now its Break time! </p>
                        <p>Task name: {task.title}</p>
                            {Array(count).fill().map((_, i) => (
                                <Tooltip id="tooltip-icon" title="Finished Pomodoro's" key={`tooltip-pomodoro-${task.id}-${i}`}>
                                    <img src={tomato} className="pomodoro-image" alt="pomodoro" />
                                </Tooltip>
                            ))}
                        <p className="time-block">{this.format(this.state.breakTime)}</p>
                        <Button size="small" color="secondary" onClick={this.handleStart.bind(this)}>Start Break</Button>
                        <p><small><b>*</b>If you close, the timer will stop.</small></p>
                    </div>
                ) : (
                    <div>
                        <p>Task name: {task.title}</p>
                            {Array(count).fill().map((_, i) => (
                                <Tooltip id="tooltip-icon" title="Finished Pomodoro's" key={`tooltip-pomodoro-${task.id}-${i}`}>
                                    <img src={tomato} className="pomodoro-image" alt="pomodoro" />
                                </Tooltip>
                            ))}
                        <p className="time-block">{this.format(this.state.time)}</p>
                        <Button size="small" color="secondary" onClick={this.handleStart.bind(this)}>Start Pomodoro</Button>
                        <p><small><b>*</b>If you close, the timer will stop.</small></p>
                    </div>
                )}
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.pomodoro.settings
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskPomodoroCount: (taskId, count) => dispatch(TaskActions.updateTaskPomodoroCount(taskId, count))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro)