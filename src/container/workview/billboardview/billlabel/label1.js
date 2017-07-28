/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Label1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"New Sign ups",
            note:"Note",
            color:"#73879c",
            value:"0"
        };
    }
    updateprop(color,value){
        this.setState({color:color,value:value});
    }
    initialize(title,note){
        this.setState({title:title,note:note});
    }
    render() {
        return (
            <div className="animated flipInY" style={{paddingTop:15}}>
                <div className="tile-stats">
                    <div className="count" style={{fontSize:32,color:this.state.color}}>{this.state.value}</div>
                    <h3 style={{fontSize:14,paddingTop:10,marginRight:5,color:"#3498db"}} className="pull-right">{this.state.title}</h3>
                    <p style={{fontSize:14,paddingTop:25}}>{this.state.note}</p>
                </div>
            </div>
        );
    }
}