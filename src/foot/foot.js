/**
 * Created by hyj on 2016/9/28.
 */
import React, {
    Component,
    PropTypes
    } from 'react';
/*
 import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 PixelRatio
 } from 'react-native';*/
import classNames from 'classnames';
import '../../resource/css/font-awesome.min.css';
import './foot.css';

export default class foot extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:50,
            content:"©小慧科技",
            hideReturn:"none",
            hideBack:"none",
            hideConfigure:"none",
            callbackBack:null,
            disabled:"",
            loginfo:"xxxxxxxxx"
        }
    }
    write_log(log){
        if(log===undefined){
            return;
        }
        let loginfo=log;
        if(log.length>20){
            loginfo=log.substring(0,20)+"...";
        }
        this.setState({loginfo:loginfo});
    }
    update_size(height){
        this.setState({height:height})
    }
    update_content(content){
        this.setState({content:content})
    }
    update_callback_back(callback){
        this.setState({callbackBack:callback})
    }
    show_return_button(input){
        if(input===true){
            this.setState({hideReturn:"block"});}
        else{
            this.setState({hideReturn:"none"});
        }
    }
    show_back_button(input){
        if(input===true){
            this.setState({hideBack:"block"});}
        else{
            this.setState({hideBack:"none"});
        }
    }
    show_configure_button(input){
        if(input===true){
            this.setState({hideConfigure:"block"});}
        else{
            this.setState({hideConfigure:"none"});
        }
    }
    hide_all(){
        this.setState({hideReturn:"none",hideConfigure:"none",hideReturn:"none"});
    }
    handle_click_return(){
        //console.log("click");
        if(this.props.footcallbackreturn){
            this.props.footcallbackreturn();
        }
    }
    handle_click_back(){
        //console.log("click");
        this.state.callbackBack();
    }
    handle_click_configure(){
        //console.log("click");
        if(this.props.footcallbackconfigure){
            this.props.footcallbackconfigure();
        }
    }
    disable(b_input){
        if(b_input){
            this.setState({disabled:"disabled"});
        }else{
            this.setState({disabled:""});
        }
    }
    render() {
        return (
            /*
            <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'100%',display:'table'}}>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideBack}} disabled={this.state.disabled} onClick={this.handle_click_back.bind(this)}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideReturn}} disabled={this.state.disabled} onClick={this.handle_click_return.bind(this)}>
                        <i className="fa fa-sign-out"> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideConfigure}} disabled={this.state.disabled} onClick={this.handle_click_configure.bind(this)}>
                        <i className="fa fa-gear"> </i>
                    </button>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                        < span className="headlabel pull-right" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>{this.state.content}</span>
                    </a>
            </div>*/

            <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'100%',display:'table'}}>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideBack}} disabled={this.state.disabled} onClick={this.handle_click_back.bind(this)}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideReturn}} disabled={this.state.disabled} onClick={this.handle_click_return.bind(this)}>
                        <i className="fa fa-sign-out"> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10),display:this.state.hideConfigure}} disabled={this.state.disabled} onClick={this.handle_click_configure.bind(this)}>
                        <i className="fa fa-gear"> </i>
                    </button>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                        < span className="headlabel" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>&nbsp;</span>
                    </a>
                </div>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle',textAlign:"center"}}>
                        < span className="headlabel" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>{this.state.loginfo}</span>
                    </a>
                </div>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                        < span className="headlabel pull-right" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>{this.state.content}</span>
                    </a>
                </div>
            </div>
        );
    }
}