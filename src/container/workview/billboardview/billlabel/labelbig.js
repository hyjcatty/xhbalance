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
        };
    }
    updateprop(status){
        this.setState({status:status});
    }
    initialize(title,note){
        this.setState({title:title,note:note});
    }
    render() {
        return (
            <div className="tile-stats">
                <h3 style={{paddingTop:10,color:"#3498db"}}>{this.state.title}</h3>
                <div key="statuspanel" className="count" style={{fontSize:48,paddingTop:20,paddingBottom:20,textAlign:"center"}}>{this.state.status}</div>
                <p className="pull-right" style={{fontSize:14,paddingRight:10}}>{this.state.note}</p>
            </div>
        );
    }
}