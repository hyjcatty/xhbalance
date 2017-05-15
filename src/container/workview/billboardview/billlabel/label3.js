/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Label3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"Average Time",
            color:"#73879c",
            value:"0",
            width:100,
            icon:"fa fa-clock-o"
        };
    }
    updateprop(color,value){
        this.setState({color:color,value:value});
    }
    initialize(title,icon,width){
        this.setState({title:title,icon:icon,width:width});
    }
    render() {
        let cage=[];
        cage.push(
            <div key="label2" style={{width:this.state.width*0.42,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
            <span key = "count-top" className="count_top"><i className={this.state.icon}></i> {this.state.title}</span>
            <div className="count" style={{color:this.state.color}}>{this.state.value}</div>
        </div>);

        return (
            <div>
                {cage}
            </div>
        );
    }
}