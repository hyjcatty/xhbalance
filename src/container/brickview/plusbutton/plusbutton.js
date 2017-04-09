/**
 * Created by hyj on 2016/12/22.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import "./plusbutton.css"
import '../../../../resource/css/font-awesome.min.css';
export default class plusbutton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bricksize:800
        };
    }
    updateprop(bricksize,callback){
        this.setState({bricksize:bricksize});
    }
    handle_click(){
        //console.log("click");
        this.props.setclick()
        //this.state.callback(this.state.configuration);
    }
    render() {
        return (
            <div  style={{position:"relative",flex:1,width:this.state.bricksize,boxShadow:"5px 5px 5px #FFFFFF",background:"#FFFFFF"}} >
                <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle",fontSize:this.state.bricksize/2,border:"5px dashed #73839c",background:"#FFFFFF"}} onClick={this.handle_click.bind(this)}>
                    <i className="fa fa-plus" > </i>
                </button>
            </div>
        );
    }
}