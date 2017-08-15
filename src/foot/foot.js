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
            content:"Model:TWSC-10/12/16 ©BoFeng",
            hideReturn:"none",
            hideBack:"none",
            hideConfigure:"none",
            hideSave:"none",
            hideCalibration:"none",
            hideTozero:"none",
            hideDebug:"none",
            hideDelete:"none",
            hideExport:"none",
            hideLanguage:"none",
            callbackBack:null,
            callbackSave:null,
            callbackTozero:null,
            callbackDelete:null,
            disabled:"",
            loginfo:"xxxxxxxxx",
            language:{
                "content":"Model:TWSC-10/12/16 ?BoFeng"
            }
        }
    }
    update_language(language){
        this.setState({language:language});
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
    update_callback_save(callback){
        this.setState({callbackSave:callback})
    }
    update_callback_tozero(callback){
        this.setState({callbackTozero:callback})
    }
    update_callback_delete(callback){
        this.setState({callbackDelete:callback})
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
    show_debug_button(input){
        if(input===true){
            this.setState({hideDebug:"block"});}
        else{
            this.setState({hideDebug:"none"});
        }
    }
    show_calibration_button(input){
        if(input===true){
            this.setState({hideCalibration:"block"});}
        else{
            this.setState({hideCalibration:"none"});
        }
    }
    show_save_button(input){
        if(input===true){
            this.setState({hideSave:"block"});}
        else{
            this.setState({hideSave:"none"});
        }
    }
    show_to_zero_button(input){
        if(input===true){
            this.setState({hideTozero:"block"});}
        else{
            this.setState({hideTozero:"none"});
        }
    }
    show_delete_button(input){
        if(input===true){
            this.setState({hideDelete:"block"});}
        else{
            this.setState({hideDelete:"none"});
        }
    }
    show_export_button(input){
        if(input===true){
            this.setState({hideExport:"block"});}
        else{
            this.setState({hideExport:"none"});
        }
    }
    show_language_button(input){
        if(input===true){
            this.setState({hideLanguage:"block"});}
        else{
            this.setState({hideLanguage:"none"});
        }
    }
    hide_all(){
        this.setState({hideReturn:"none",hideConfigure:"none",hideBack:"none",hideSave:"none",hideCalibration:"none",hideTozero:"none",hideDebug:"none",hideDelete:"none",hideExport:"none",hideLanguage:"none"});
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
    handle_click_debug(){
        //console.log("click");
        if(this.props.footcallbackdebug){
            this.props.footcallbackdebug();
        }
    }
    handle_click_calibration(){
        //console.log("click");
        if(this.props.footcallbackcalibration){
            this.props.footcallbackcalibration();
        }
    }
    handle_click_to_zero(){
        //console.log("click");
        this.state.callbackTozero();
    }
    handle_click_save(){
        this.state.callbackSave();

    }
    handle_click_delete(){
        this.state.callbackDelete();

    }
    handle_click_export(){
        //console.log("click");
        if(this.props.footcallbackexport){
            this.props.footcallbackexport();
        }
    }
    handle_click_language(){
        if(this.props.footcallbacklanguage){
            this.props.footcallbacklanguage();
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
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'67%',display:'table',float:"left"}}>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideBack}} disabled={this.state.disabled} onClick={this.handle_click_back.bind(this)}>
                        <i className="fa fa-arrow-left" style={{fontSize:25}}></i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideReturn}} disabled={this.state.disabled} onClick={this.handle_click_return.bind(this)}>
                        <i className="fa fa-sign-out" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideConfigure}} disabled={this.state.disabled} onClick={this.handle_click_configure.bind(this)}>
                        <i className="fa fa-gear" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideSave}} disabled={this.state.disabled} onClick={this.handle_click_save.bind(this)}>
                        <i className="fa fa-save" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideCalibration}} disabled={this.state.disabled} onClick={this.handle_click_calibration.bind(this)}>
                        <i className="fa fa-wrench" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideTozero}} disabled={this.state.disabled} onClick={this.handle_click_to_zero.bind(this)}>
                        <i className="fa fa-recycle" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideDelete}} disabled={this.state.disabled} onClick={this.handle_click_delete.bind(this)}>
                        <i className="fa fa-trash-o" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideExport}} disabled={this.state.disabled} onClick={this.handle_click_export.bind(this)}>
                        <i className="fa fa-outdent" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideLanguage}} disabled={this.state.disabled} onClick={this.handle_click_language.bind(this)}>
                        <i className="fa fa-language" style={{fontSize:25}}> </i>
                    </button>
                    <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height-10),width:(this.state.height-10)*1.6,display:this.state.hideDebug}} disabled={this.state.disabled} onClick={this.handle_click_debug.bind(this)}>
                        <i className="fa fa-bug" style={{fontSize:25}}> </i>
                    </button>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                        < span className="headlabel" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>&nbsp;</span>
                    </a>
                </div>

                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>
                        < span className="headlabel pull-right" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>{this.state.language.content}</span>
                    </a>
                </div>
            </div>
        );
    }
}