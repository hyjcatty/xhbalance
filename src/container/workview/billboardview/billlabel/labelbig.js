/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Labelbig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:"New Sign ups",
            note:"Status Report",
            status:"- - - -",
            warning:"- - - -",
            error:"- - - -"
        };
    }
    updateprop(status,warning,error){
        this.setState({status:status,warning:warning,error:error});
    }
    initialize(title,note){
        this.setState({title:title,note:note});
    }
    render() {
        return (
            <div className="tile-stats">
                <div key="statuspanel" className="count" style={{fontSize:24}}>{"状态："+this.state.status}</div>
                <div key="warningpanel" className="count" style={{fontSize:24}}>{"告警："+this.state.warning}</div>
                <div key="errorpanel" className="count" style={{fontSize:24}}>{"错误："+this.state.error}</div>
                <h3>{this.state.title}</h3>
                <p>{this.state.note}</p>
            </div>
        );
    }
}