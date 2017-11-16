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
                    <h3 style={{fontSize:16,paddingTop:10,marginRight:5,color:"#000000",width:"100%",fontWeight:"bold"}} className="pull-left">{this.state.title}</h3>
                    <div className="count" style={{fontSize:32,color:this.state.color,textAlign:"center",width:"100%",marginLeft:"0px"}}>{this.state.value}</div>
                    <p style={{fontSize:16,paddingTop:0,fontWeight:"bold",color:"#000000",marginRight:"10px",marginTop:"-5px"}} className="pull-right">{this.state.note}</p>
                </div>
            </div>
        );
    }
}