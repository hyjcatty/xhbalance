/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import './buttonbar.css';



export default class buttonbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            hide:"block",
            configuration:null,
            bricksize:100,
            marginsize:5,
            margintop:5,
            status:0,
            button1:"",
            button2:"",
            button2hide:"block",
            language:{
                "run_configure":{
                    "button1":"START",
                    "button2":"MODIFY"
                },
                "calibration_configure":{
                    "button1":"TO_ZERO",
                    "button2":"CALIBRATION"
                },
                "modify_configure":{
                    "button1":"SAVE",
                    "button2":"ABORT"
                },
                "new_configure":{
                    "button1":"SAVE",
                    "button2":"ABORT"
                },
                "running_configure":{
                    "button1":"STOP",
                    "button2":"STOP"
                }
            }
        }
    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width},this.calculatesize);
        //console.log("button bar width:"+width+",height:"+height);
    }
    calculatesize(){
        let size = (this.state.width);
        let marginsize = size*0.1;
        let bricksize = size-marginsize*2;
        let margintop = (this.state.height-bricksize*2)/3
        //console.log("bricksize:"+bricksize+",marginsize:"+marginsize);
        this.setState({bricksize:bricksize,marginsize:marginsize,margintop:margintop});
    }
    run_configure(){
        this.showbutton2();
        this.setState({button1:this.state.language.run_configure.button1,button2:this.state.language.run_configure.button2,status:0});
    }
    calibration_configure(){
        this.showbutton2();
        this.setState({button1:this.state.language.calibration_configure.button1,button2:this.state.language.calibration_configure.button2,status:0});
    }
    modify_configure(){
        this.showbutton2();
        this.setState({button1:this.state.language.modify_configure.button1,button2:this.state.language.modify_configure.button2,status:1});
    }
    new_configure(){
        this.showbutton2();
        this.setState({button1:this.state.language.new_configure.button1,button2:this.state.language.new_configure.button2,status:1});
    }
    running_configure(){
        this.hidebutton2();
        this.setState({button1:this.state.language.running_configure.button1,button2:this.state.language.running_configure.button2,status:1});
    }
    hidebutton2(){
        this.setState({button2hide:"none"});
    }
    showbutton2(){
        this.setState({button2hide:"block"});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handle_click1(){
        this.props.button1click();
    }
    handle_click2(){
        this.props.button2click();
    }
    render() {
        return (
            <div style={{position:"relative",background:"#73839c",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{marginTop:this.state.margintop,marginLeft:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                    <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.handle_click1.bind(this)}><i>
                        <a style={{position:"relative",height:this.state.bricksize*0.3,display:'table-cell',verticalAlign:'middle'}}>
                        <span className="framelabel"  style={{fontSize:this.state.bricksize*0.2,marginLeft:0}}>
                            {this.state.button1}
                        </span>
                        </a>

                    </i></button>
                </div>

                <div style={{marginTop:this.state.margintop,marginLeft:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative",display:this.state.button2hide}}>
                    <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.handle_click2.bind(this)}><i>
                        <a style={{position:"relative",height:this.state.bricksize*0.3,display:'table-cell',verticalAlign:'middle'}}>
                        <span className="framelabel"  style={{fontSize:this.state.bricksize*0.2,marginLeft:0}}>
                            {this.state.button2}
                        </span>
                        </a>

                    </i></button>
                </div>
            </div>
        );
    }
}