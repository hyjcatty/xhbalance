/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Label2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"Average Time",
            note:"From last Count",
            color:"#73879c",
            subcolor:"#73879c",
            value:"0",
            subvalue:"0%",
            location:"left",
            width:100
        };
    }
    updateprop(color,subcolor,value,subvalue){
        this.setState({color:color,value:value,subcolor:subcolor,subvalue:subvalue});
    }
    initialize(title,note,location,width){
        this.setState({title:title,note:note,location:location,width:width});
    }
    render() {
        let cage=[];
        if(this.state.location != "left"){
            cage.push(
                <div key="label2" style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02,borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                <span key = "count-top" className="count_top"><i className="fa fa-clock-o"></i> {this.state.title}</span>
                <div className="count" style={{color:this.state.color}}>{this.state.value}</div>
                <span key = "count-bottom" className="count_bottom"><i className="green" style={{color:this.state.subcolor}}>{this.state.subvalue} </i> {this.state.note}</span>
            </div>);
        }else{
            cage.push(
                <div key="label2" style={{width:this.state.width*0.20,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                <span key = "count-top" className="count_top"><i className="fa fa-clock-o"></i> {this.state.title}</span>
                <div className="count" style={{color:this.state.color}}>{this.state.value}</div>
                <span key = "count-bottom" className="count_bottom"><i className="green" style={{color:this.state.subcolor}}>{this.state.subvalue} </i> {this.state.note}</span>
            </div>);
        }
        return (
            <div>
                {cage}
            </div>
        );
    }
}