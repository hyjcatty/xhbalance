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
import './head.css';

export default class head extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:50,
            username:"no login",
            "loginfo":"xxxxxxxxx",
            language:{
                "icon":"",
                "nologin":"no login",
                "title":"Combinational Target Weigher",
                "greet":"Hello"
            }
        }
    }
    update_language(language){
        this.setState({language:language,username:language.nologin});
    }
    update_size(height){
        this.setState({height:height})
    }
    update_username(username){
        this.setState({username:username})
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
    render() {
        let temp = this.state.language.greet+this.state.username;
        return (
            <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'100%',display:'table'}}>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle',width:this.state.height}}><i style={{marginLeft:this.state.height*0.3,fontSize:this.state.height*0.5,color:"#62b900"}}><img src="./svg/chili2.svg"  style={{height:this.state.height*0.8,width:this.state.height*0.8,zIndex: -1}}></img></i>
                    </a>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}><span className="headlabel" style={{fontSize:this.state.height*0.3,marginLeft:20}}>{this.state.language.title}</span></a>
                </div>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle',textAlign:"center"}}>
                        < span className="headlabel" style={{fontSize:this.state.height*0.3,marginRight:this.state.height*0.3}}>{this.state.loginfo}</span>
                    </a>
                </div>
                <div style={{position:"relative",background:"#eeeeee",height:this.state.height,width:'33%',display:'table',float:"left"}}>
                    <a style={{position:"relative",height:this.state.height,display:'table-cell',verticalAlign:'middle'}}>< span className="headlabel pull-right" style={{fontSize:this.state.height*0.2,marginRight:this.state.height*0.3}}>{temp}</span></a>
                </div>
            </div>
        );
    }
}