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
                <h3 style={{paddingTop:10,color:"#000000",fontWeight:"bold"}}>{this.state.title}</h3>
                <div key="statuspanel" className="count" style={{color:"#000000",fontSize:84,marginTop:-10,marginBottom:-10,textAlign:"center",fontWeight:900}}>{this.state.status}</div>
                <p className="pull-right" style={{fontSize:30,fontWeight:"bold",paddingRight:10,marginTop:0}}>{this.state.note}</p>
            </div>
        );
    }
}