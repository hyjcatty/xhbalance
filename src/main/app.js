/**
 * Created by hyj on 2016/9/28.
 */

import React,  {
    Component,
    PropTypes
    }from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames';
import Foot from "../foot/foot"
import Head from "../head/head"
import Loginview from "../container/loginview/loginview"
import Languageview from "../container/languageview/languageview"
import Sysconfview from "../container/sysconfview/sysconfview"
import Sysdebug from "../container/debugview/sysdebug"
import Exportview from "../container/exportview/exportview"
import Calibrationview from "../container/calibrationview/calibrationview"
import Brickview from "../container/brickview/brickview"
import Workview from "../container/workview/workview"
import './App.css';

import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();


var winWidth;
var winHeight;
var basic_address = getRelativeURL()+"/";
var request_head= basic_address+"request.php";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: 1024,
            height: 768,
            headfootheight: 50,
            headfootminheight: 50,
            canvasheight: 700,
            userid: "user",
            username:"Please login",
            buttonlist: [],
            iconlist:[],
            runcallback:null,
            stopcallback:null,
            savenewback:null,
            savemodback:null,
            forceflashback:null,
            language:{
                "app":{
                    "modalhead":"Warning",
                    "modaltips":"Are u want do delete this configuration?",
                    "modalconfirm":"confirm",
                    "modalcancel":"cancel",
                    "userunknown":"Please login"
                },
                "message":{
                    "alert1":"System Error, please contract Admin!",
                    "alert2":"Login Fail, please try again!",
                    "alert3":"Can not get mandatory information, please contract Admin!",
                    "alert4":"Fail while start case, please contract Admin!",
                    "alert5":"Fail while stop case, please contract Admin!",
                    "alert6":"Run error, system is shutting down!",
                    "alert7":"Can not save new config!",
                    "alert8":"Modify config save error!",
                    "alert9":"System config save error!",
                    "alert10":"Debug command error!",
                    "message1":"Warning:Delete Fail!!!",
                    "message2":"Delete successfully!",
                    "message3":"run successfully!",
                    "message4":"Save successfully!",
                    "message5":"",
                    "message6":"",
                    "message7":"",
                    "message8":"",
                    "message9":"",
                    "message10":"",
                    "title1":"Balance Calibration",
                    "title2":"new Configuration",
                    "title3":"System debug",
                    "title4":"System Configuration",
                    "title5":"Please Login",
                    "title6":"Log Export",

                }
            },
        };
        this._footcallbackreturn=this.loginview.bind(this);
        this._footcallbackconfigure=this.sysconfview.bind(this);
        this._footcallbackdebug=this.sysdebugview.bind(this);
        this._footcallbackexport=this.exportview.bind(this);
        this._footcallbackcalibration=this.calibrationview.bind(this);
        this._footcallbacklanguage=this.languageview.bind(this);
        this._workstartcase=this.startcase.bind(this);
        this._workstopcase=this.stopcase.bind(this);
        this._workcontrolfoot=this.footButtonShow.bind(this);
        this._worksavenewcase=this.savenewcase.bind(this);
        this._worksavemodcase=this.savemodcase.bind(this);
    }
    updateLanguage(language){
        this.setState({language:language});
        this.refs.Loginview.update_language(language.loginview);
        this.refs.head.update_language(language.head);
        this.refs.foot.update_language(language.foot);
        this.refs.Sysdebugview.update_language(language.sysdebugview);
        this.refs.Exportview.update_language(language.exportview);
        this.refs.Brickview.update_language(language.brickview);
        this.refs.Workview.update_language(language.workview);
        this.refs.Calibrationview.update_language(language.calibrationview);
    }
    updateVersion(version){
        this.refs.foot.updateversion(version);
    }
    initializeSize(width,height){
        let winlength= (width>height)?width:height;
        let headfootheight = (parseInt(winlength/20)>this.state.headfootminheight)?parseInt(winlength/20):this.state.headfootminheight;
        let canvasheight = height - 2*headfootheight;
        console.log("headfootheight:"+headfootheight+"canvasheight:"+canvasheight);
        this.setState({width:width,height:height,headfootheight:headfootheight,canvasheight:canvasheight});
        this.refs.head.update_size(headfootheight);
        this.refs.foot.update_size(headfootheight);
        this.refs.Loginview.update_size(width,canvasheight);
        this.refs.Brickview.update_size(width,canvasheight);
        this.refs.Languageview.update_size(width,canvasheight);
        this.refs.Workview.update_size(width,canvasheight);
        this.refs.Sysconfview.update_size(width,canvasheight,headfootheight);
        this.refs.Sysdebugview.update_size(width,canvasheight,headfootheight);
        this.refs.Exportview.update_size(width,canvasheight,headfootheight);
        this.refs.Calibrationview.update_size(width,canvasheight,headfootheight);
    }
    initializesysconf(callback,configure){
        this.refs.Sysconfview.update_callback(callback);
        this.refs.Sysconfview.update_config(configure);
    }
    initializesysdebug(callback,configure){
        this.refs.Sysdebugview.update_callback(callback);
        this.refs.Sysdebugview.update_config(configure);
    }
    initializeExport(callback,configure){
        this.refs.Exportview.update_callback(callback);
        this.refs.Exportview.update_config(configure);
    }
    initializeLogin(callback){
        this.refs.Loginview.update_callback(callback);
    }
    initializeCalibration(callbackzero,callbackcountweight){
        this.refs.Calibrationview.update_callback(callbackzero,callbackcountweight);
    }
    initializeBrick(Bricklist,Baselist,callback,newchoicecallback){
        this.refs.Brickview.update_buttonlist(Bricklist,Baselist,callback,newchoicecallback);
    }
    initializeLanguageview(Languagelist,callback){
        this.refs.Languageview.update_buttonlist(Languagelist,callback);
    }
    initializehead(){
        this.refs.head.update_username(this.state.username);
    }
    initializefoot(callback_back,callback_save,callback_tozero,callback_delete){
        this.refs.foot.hide_all();
        //this.refs.foot.update_callback_return(callback_return);
        this.refs.foot.update_callback_back(callback_back);
        this.refs.foot.update_callback_save(callback_save);
        this.refs.foot.update_callback_tozero(callback_tozero);
        this.refs.foot.update_callback_delete(callback_delete);
        //this.refs.foot.update_callback_configure(callback_configure);
    }
    initializerunstop(runcallback,stopcallback){
        this.setState({runcallback:runcallback,stopcallback:stopcallback});
    }
    initializerunsave(newsave,modsave){
        this.setState({savenewback:newsave,savemodback:modsave});
    }
    initializeforceflash(forceflash){
        this.setState({forceflashback:forceflash});
    }
    showalarm(alarmcontent){
        this.refs.Workview.showalarm(alarmcontent);
    }
    hidealarm(){
        this.refs.Workview.hidealarm();
    }
    footButtonShow(breturn,bback,bconfigure,bsave,bcalibration,btozero,bdebug,bdelete,bexport,blanguage){
        this.refs.foot.show_return_button(breturn);
        this.refs.foot.show_back_button(bback);
        this.refs.foot.show_configure_button(bconfigure);
        this.refs.foot.show_save_button(bsave);
        this.refs.foot.show_calibration_button(bcalibration);
        this.refs.foot.show_to_zero_button(btozero);
        this.refs.foot.show_debug_button(bdebug);
        this.refs.foot.show_delete_button(bdelete);
        this.refs.foot.show_export_button(bexport);
        this.refs.foot.show_language_button(blanguage);
    }
    initializeWork(work2brickcallback,work2alarmremovecallback){
        this.refs.Workview.update_callback(work2brickcallback,work2alarmremovecallback);
    }
    loginview(){
        this.removeuser();
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.show();
        this.refs.foot.hide_all();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,false,false,false,false,false,false,false,false,true);
        //console.log(this.state.language);
        this.tipsinfo(this.state.language.message.title5);
    }
    brickview(){
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.show();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        if(this.state.username === "admin")
            this.footButtonShow(true,false,true,false,true,false,true,false,true,false);

        else
        this.footButtonShow(true,false,true,false,true,false,false,false,false,false);

    }
    languageview(){
        this.refs.Languageview.show();
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.footButtonShow(false,false,false,false,false,false,false,false,false,false);
        this.tipsinfo("");
    }
    workview_run(configure){
        //this.refs.Workview.billboardview();
        this.refs.Calibrationview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,true,false,true,false,false);
        this.refs.Workview.runview(configure);
        if(configure!=null) this.tipsinfo(configure.name);
        this.state.forceflashback();
    }
    workview_running(configure){
        //this.refs.Workview.billboardview();
        this.refs.Calibrationview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,false,false,false,false,false,false,false,false,false);
        this.refs.Workview.runningview(configure);
        if(configure!=null) this.tipsinfo(configure.name);
    }
    workview_mod(configure){
        //this.refs.Workview.billboardview();
        this.refs.Calibrationview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,false,false,false,false,false);
        this.refs.Workview.modview(configure);
        if(configure!=null) this.tipsinfo(configure.name);
    }
    sysconfview(){
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        //this.refs.foot.hide_all();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.show();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,true,false,false,false,false,false,false);
        this.tipsinfo(this.state.language.message.title4);
    }
    sysdebugview(){
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        //this.refs.foot.hide_all();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.show();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,false,false,false,false,false);
        this.tipsinfo(this.state.language.message.title3);
    }
    exportview(){
        this.refs.Calibrationview.hide();
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        //this.refs.foot.hide_all();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.show();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,false,false,false,false,false);
        this.tipsinfo(this.state.language.message.title6);
    }
    workview_new(configure){
        //this.refs.Workview.billboardview();
        this.refs.Calibrationview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,false,false,false,false,false);
        this.refs.Workview.newview(configure);
        this.tipsinfo(this.state.language.message.title2);
    }
    calibrationview(){
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        //this.refs.foot.hide_all();
        this.refs.Brickview.hide();
        this.refs.Sysconfview.hide();
        this.refs.Sysdebugview.hide();
        this.refs.Exportview.hide();
        this.refs.Calibrationview.show();
        this.refs.Languageview.hide();
        this.footButtonShow(false,true,false,false,false,false,false,false,false,false);
        this.tipsinfo(this.state.language.message.title1);
    }
    update_status(status){
        this.refs.Workview.update_billboard_status(status);
    }
    get_active_configuration(){
        return this.refs.Workview.get_active_configuration();
    }
    update_light(light){
        this.refs.Workview.update_billboard_light(light);
    }
    update_cali_status(balanceNo,status,weight){
        this.refs.Calibrationview.update_balance_status(balanceNo,status,weight);
    }
    configureview(){
        alert("not support yet!");
    }
    work_modify(){
        this.refs.Workview.configurationview();
    }
    work_run(){
        this.refs.Workview.billboardview();
    }
    setuser(username,userid){
        this.setState({userid:userid,username:username});
        this.refs.head.update_username(username);

    }
    seticonlist(iconlist){
        this.setState({iconlist:iconlist});
        this.refs.Workview.update_configuration(iconlist);
    }
    removeuser(){
        this.setState({userid:"user",username:this.state.language.app.userunknown});
        this.refs.head.update_username(this.state.language.app.userunknown);
    }
    getuser(){
        return this.state.userid;
    }
    startcase(configure){
        this.state.runcallback(true,configure);
    }
    stopcase(configure){
        this.state.runcallback(false,configure);
    }
    savenewcase(configure){
        this.state.savenewback(configure);
    }
    savemodcase(configure){
        this.state.savemodback(configure);
    }
    getsysconfset(){
        return this.refs.Sysconfview.getUpdatedValue();
    }
    tipsinfo(tips){
        this.refs.head.write_log(tips);
    }
    debug_label_update(msg){
        this.refs.Sysdebugview.update_msg(msg);
    }
    export_label_update(msg){
        this.refs.Exportview.update_msg(msg);
    }
    render() {
        return(
        <div>
            <div>
                <Head ref="head"/>
            </div>
            <div>
                <Sysconfview ref="Sysconfview"/>
                <Sysdebug ref="Sysdebugview"/>
                <Exportview ref="Exportview"/>
                <Calibrationview ref="Calibrationview"/>
                <Languageview ref="Languageview"/>
                <Loginview ref="Loginview"/>
                <Brickview ref="Brickview"/>
                <Workview ref="Workview" workstartcase={this._workstartcase} workstopcase={this._workstopcase} workcontrolfoot={this._workcontrolfoot} worksavenewcase={this._worksavenewcase} worksavemodcase={this._worksavemodcase}/>
            </div>
            <div>
                <Foot ref="foot" footcallbackreturn={this._footcallbackreturn} footcallbackconfigure={this._footcallbackconfigure} footcallbackdebug={this._footcallbackdebug} footcallbackexport={this._footcallbackexport} footcallbackcalibration={this._footcallbackcalibration}
                      footcallbacklanguage={this._footcallbacklanguage}/>
            </div>
            <div className="modal fade" id="ExpiredAlarm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="ExpiredAlertModalLabel">{this.state.language.app.modalhead}</h4>
                        </div>
                        <div className="modal-body" id="ExpiredAlertModalContent">
                            {this.state.language.app.modaltips}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.language.app.modalcancel}</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" id="ExpiredConfirm">{this.state.language.app.modalconfirm}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }


}
var bricklist=[];
var baselist=[];
var IconList=[];
var Running=false;
var Alarming=false;
var wait_time_short=300;

var activeconf = null;
var language=null;
var language_list = null;
var default_language="en";
var react_element;
var app_handle;

react_element = <App/>;

get_size();
app_handle = ReactDOM.render(react_element,document.getElementById('app'));
app_handle.initializeSize(winWidth,winHeight);
var runcycle=setInterval(xhbalancegetstatus,250);
var alarmcycle=setInterval(balance_get_alarm,1000);
var lightcycle=setInterval(xhbalancegetlight,250);
var versioncycle=setInterval(sysversionfetch,3000);

//syslanguagefetch();
syslanguagelistfetch();
function systemstart(){
    xhbalanceiconlist();

    sysconffetch();
    sysdebugfetch();
    exportfetch();
    //app_handle.initializeUrl(request_head);





//app_handle.initializefoot(footcallback_return,footcallback_back,footcallback_configure);
    app_handle.initializefoot(footcallback_back,footcallback_save,xhbalancetozeroshortcut,show_expiredModule);
    app_handle.initializehead();
    app_handle.initializeLogin(xhbalancelogin);
    app_handle.initializeWork(newviewabort,balance_clear_alarm);
    app_handle.initializerunstop(xhbalancestartcase,xhbalancestartcase);
    app_handle.initializerunsave(xhbalancesavenewconf,xhbalancesavemodconf);
    app_handle.initializeforceflash(xhbalanceforceflashstatus);
    app_handle.initializeCalibration(balance_to_zero,balance_to_countweight);
    app_handle.loginview();



    $('#ExpiredConfirm').on('click',delete_configure);
}

//var footcallback_return= function(){
//    app_handle.loginview();
//}
var footcallback_back= function(){
    xhbalanceconfiglist();
    tips("");
}
//var footcallback_configure= function(){
//    alert("Not support yet!");
//}






//fetchtest();
function get_size(){
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    console.log("winWidth = "+winWidth);
    console.log("winHeight= "+winHeight);
}
window.onresize= function(){
    location.reload(true);
}
function tips(tip){
    app_handle.tipsinfo(tip);
}
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}/*
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};*/
function getRelativeURL(){
    var url = document.location.toString();
    var arrUrl= url.split("://");
    var start = arrUrl[1].indexOf("/");
    var reUrl=arrUrl[1].substring(start);
    if(reUrl.indexOf("?")!=-1) {
        reUrl = reUrl.split("?")[0];
    }
    var end = reUrl.lastIndexOf("/");
    reUrl=reUrl.substring(0,end);

    reUrl=reUrl.replace(/\/\/*/, "/");
    return reUrl;

}

function jsonParse(res) {
    return res.json().then(jsonResult => ({ res, jsonResult }));
}
function fetchtest(){

    var listreq = {
        action:"XH_Balance_test",
        type:"query",
        user:null
    };
    fetch(request_head,
    {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(listreq)
    }).then(jsonParse)
    .then(xhbalancetestcallback)
    .catch( (error) => {
        console.log('request error', error);
        return { error };
    });
}
function xhbalancetestcallback(){

}
function newviewabort(){
    xhbalanceconfiglist();
    tips("");
}
function xhbalanceconfiglist(){

    var listreq = {
        action:"XH_Balance_config_list",
        type:"query",
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(listreq)
        }).then(jsonParse)
        .then(xhbalanceconfiglistcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function fun_mode(){app_handle.work_modify()};
function fun_run(){app_handle.work_run()};
function brickclickfetch(configuration,type){
    var body = {
        type:type,
        file:configuration.name
    };
    var map={
        action:"XH_Balance_config_detail",
        type:"query",
        lang:default_language,
        body: body,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(brickclickcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function brickclickcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;

    app_handle.workview_run(configuration);
    //app_handle.workview();
}
function bricknewclickfetch(configuration,type){
    var body = {
        type:type,
        file:configuration.name
    };
    var map={
        action:"XH_Balance_config_detail",
        type:"query",
        lang:default_language,
        body: body,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(bricknewclickcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function bricknewclickcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;
    //console.log(configuration);
    app_handle.workview_new(configuration);
    //app_handle.workview();
}
function xhbalanceconfiglistcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    bricklist = res.jsonResult.ret.configure;
    baselist = res.jsonResult.ret.base;
    app_handle.initializeBrick(bricklist,baselist,brickclickfetch,bricknewclickfetch);
    app_handle.brickview();
}
function xhbalancelogin(username,password){

    var body = {
    username:username,
    password:b64_sha1(password)
    };
    var map={
        action:"XH_Balance_Login",
        type:"query",
        lang:default_language,
        body: body,
        user:"null"
    };

    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancelogincallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancelogincallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert2);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let userinfo = res.jsonResult.ret;
    app_handle.setuser(userinfo.username,userinfo.userid);
    xhbalanceconfiglist();
    tips("");
}
function xhbalanceiconlist(){
    var map={
        action:"XH_Balance_get_svg_list",
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalanceiconlistcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalanceiconlistcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert3);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    IconList = res.jsonResult.ret;
    app_handle.seticonlist(IconList);
}
function xhbalancestartcase(boolinput,configure){
    let body;
    let actioncallback;
    if(boolinput){
        //console.log("start a case");
        body={
            action:"start",
            configure:configure
        }
        actioncallback=xhbalancestartcasecallback;
    }else{
        //console.log("stop a case");
        body={
            action:"stop"
        }
        actioncallback=xhbalancestopcasecallback;
    }
    var map={
        action:"XH_Balance_Run",
        body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(actioncallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancetozeroshortcut(){
    //let body;
    let actioncallback;
    /*
    body={
        configure:configure
    };*/
    actioncallback=xhbalancetozeroshortcutcallback;
    var map={
        action:"XH_Balance_to_zero_shortcut",
        //body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(actioncallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function xhbalancetozeroshortcutcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert4);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    xhbalanceforceflashstatus();
}
function xhbalanceforceflashstatus(){
    xhbalancegetstatus_force();
    xhbalancegetlight_force();

}
function xhbalancestartcasecallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert4);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    Running=true;
    app_handle.workview_running(null);
}
function xhbalancestopcasecallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert5);
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        Running=false;
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    Running=false;
    app_handle.workview_run(null);
}

function xhbalancegetstatus(){
    if(Running===false)return;
    activeconf = app_handle.get_active_configuration();
    let body;
    body={
        configurename:activeconf.name
    };
    var map={
        action:"XH_Balance_status",
        body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancestatuscallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function xhbalancegetstatus_force(){
    //if(Running===false)return;
    activeconf = app_handle.get_active_configuration();
    let body;
    body={
        configurename:activeconf.name
    };
    var map={
        action:"XH_Balance_status",
        body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancestatuscallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function xhbalancestatuscallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert6+res.jsonResult.msg);
        Running=false;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let detailstatus = res.jsonResult.ret;
    app_handle.update_status(detailstatus);
}

function xhbalancegetlight(){
    if(Running===false)return;
    activeconf = app_handle.get_active_configuration();
    let body;
    body={
        configurename:activeconf.name
    };
    var map={
        action:"XH_Balance_light",
        body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancelightcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function xhbalancegetlight_force(){
    activeconf = app_handle.get_active_configuration();
    let body;
    body={
        configurename:activeconf.name
    };
    var map={
        action:"XH_Balance_light",
        body:body,
        type:"query",
        lang:default_language,
        user:"null"
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancelightcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function xhbalancelightcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert6+res.jsonResult.msg);
        Running=false;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let detailstatus = res.jsonResult.ret;
    app_handle.update_light(detailstatus);
}
function checkrename(name){
    for(let i=0;i<bricklist.length;i++){
        if(name === bricklist[i].name) return true;
    }
    return false;
}
function xhbalancesavenewconf(configure){
    if(configure =="") return;
    if(checkrename(configure.name)) {
        alert(language.message.alert7);
        return;
    }
    var map={
        action:"XH_Balance_save_new_conf",
        type:"mod",
        lang:default_language,
        body:configure,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancesavenewconfcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancesavenewconfcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert7);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    xhbalanceconfiglist();
    tips(language.message.message4);
}

function xhbalancesavemodconf(configure){

    var map={
        action:"XH_Balance_save_mod_conf",
        type:"mod",
        lang:default_language,
        body:configure,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancesavemodconfcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancesavemodconfcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert8);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    xhbalanceconfiglist();
    tips(language.message.message4);
}

function xhbalancesavesysconf(configure){

    var map={
        action:"XH_Balance_sys_config_save",
        type:"mod",
        lang:default_language,
        body:configure,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancesavesysconfcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancesavesysconfcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert9);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    xhbalanceconfiglist();
    sysconffetch();
    tips(language.message.message4);
}
function xhbalancerunsysdebug(configure){

    var map={
        action:"XH_Balance_sys_debug_run",
        type:"mod",
        lang:default_language,
        body:configure,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancerunsysdebugcallback)
        //.then(fetchlist)
        .catch( (error) => {
        console.log('request error', error);
    return { error };
});
}

function xhbalancerunsysdebugcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert10);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    app_handle.debug_label_update(res.jsonResult.msg);
    tips(language.message.message3);
}


function xhbalancerunexport(configure){

    var map={
        action:"XH_Balance_export_run",
        type:"mod",
        lang:default_language,
        body:configure,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(xhbalancerunexportcallback)
        //.then(fetchlist)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}

function xhbalancerunexportcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert10);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    app_handle.export_label_update(res.jsonResult.msg);
    tips(language.message.message3);
}

function sysconffetch(){
    var map={
        action:"XH_Balance_sys_config",
        type:"query",
        lang:default_language,
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(sysconffetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function sysconffetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;

    app_handle.initializesysconf(xhbalancesavesysconf,configuration);
    //app_handle.workview();
}
function sysdebugfetch(){
    var map={
        action:"XH_Balance_sys_debug",
        type:"query",
        lang:default_language,
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(sysdebugfetchcallback)
        .catch( (error) => {
        console.log('request error', error);
    return { error };
});
}
function sysdebugfetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;

    app_handle.initializesysdebug(xhbalancerunsysdebug,configuration);
    //app_handle.workview();
}

function exportfetch(){
    var map={
        action:"XH_Balance_export",
        type:"query",
        lang:default_language,
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(exportfetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function exportfetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert(language.message.alert1);
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let configuration = res.jsonResult.ret;

    app_handle.initializeExport(xhbalancerunexport,configuration);
    //app_handle.workview();
}




function footcallback_save(){
    xhbalancesavesysconf(app_handle.getsysconfset());

}
function balance_to_zero(balanceno){
    var body={
        balance:(balanceno)+""
    }
    var map={
        action:"XH_Balance_cali_to_zero",
        body:body,
        type:"query",
        lang:default_language,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(balance_to_zero_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function balance_to_zero_callback(res){
    let balanceNo= res.jsonResult.ret.balance;
    if(res.jsonResult.status == "false"){
        app_handle.update_cali_status(balanceNo,3,"");
        return;
    }
    if(res.jsonResult.auth == "false"){
        app_handle.update_cali_status(balanceNo,3,"");
        return;
    }
    app_handle.update_cali_status(balanceNo,1,res.jsonResult.msg);
}
function balance_to_countweight(balanceno,callback){
    var body={
        balance:(balanceno)+""
    }
    var map={
        action:"XH_Balance_cali_to_countweight",
        body:body,
        type:"query",
        lang:default_language,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(balance_to_countweight_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function balance_to_countweight_callback(res){
    let balanceNo= res.jsonResult.ret.balance;
    if(res.jsonResult.status == "false"){
        app_handle.update_cali_status(balanceNo,3,"");
        return;
    }
    if(res.jsonResult.auth == "false"){
        app_handle.update_cali_status(balanceNo,3,"");
        return;
    }
    app_handle.update_cali_status(balanceNo,2,res.jsonResult.msg);
}

function balance_get_alarm(){
    if(Running===false)return;
    if(Alarming===true) return;
    var map={
        action:"XH_Balance_get_alarm",
        type:"query",
        lang:default_language,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(balance_get_alarm_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function balance_get_alarm_callback(res){
    if(res.jsonResult.status == "true"){

        //console.log("No alarm!");
        return;
    }else{

        //console.log("Find alarm!");
        Alarming=true;
        app_handle.showalarm(res.jsonResult.msg);
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
}
function balance_clear_alarm(){
    var map={
        action:"XH_Balance_clear_alarm",
        type:"query",
        lang:default_language,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(balance_clear_alarm_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function balance_clear_alarm_callback(res){
    if(res.jsonResult.status == "true"){

        app_handle.hidealarm();
        Alarming=false;
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
}
function modal_middle(modal){

    setTimeout(function () {
        var _modal = $(modal).find(".modal-dialog");
        if(parseInt(($(window).height() - _modal.height())/2)>0){

            _modal.animate({'margin-top': parseInt(($(window).height() - _modal.height())/2)}, 300 );
        }
    },wait_time_short);
}

function show_expiredModule(){
    activeconf = app_handle.get_active_configuration();
    if(activeconf === null) return;
    let warning_content =  language.message5+" ["+activeconf.name+"]?";
    $('#ExpiredAlertModalContent').empty();
    $('#ExpiredAlertModalContent').append(warning_content);
    modal_middle($('#ExpiredAlarm'));
    $('#ExpiredAlarm').modal('show') ;
}

function delete_configure(){
    if(activeconf === null) return;
    var body = {
        file:activeconf.name
    };
    var map={
        action:"XH_Balance_config_delete",
        type:"mod",
        lang:default_language,
        body: body,
        user:app_handle.getuser()
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(delete_configure_callback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function delete_configure_callback(res){
    if(res.jsonResult.status == "true"){

        xhbalanceconfiglist();
        tips(language.message.message2);
        return;
    }
    if(res.jsonResult.auth == "false"){
        xhbalanceconfiglist();
        tips(language.message.message1);
        return;
    }
}
function syslanguagefetch(language_list){
    var map={
        action:"XH_Balance_sys_language",
        type:"query",
        lang:default_language,
        user:null,
        body:language_list
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(syslanguagefetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function syslanguagefetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    if(res.jsonResult.auth == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    language = res.jsonResult.ret;
    //console.log(language);
    app_handle.updateLanguage(language);
    systemstart();
    //app_handle.workview();
}

function syslanguagelistfetch(){
    var map={
        action:"XH_Balance_sys_language_list",
        type:"query",
        lang:default_language,
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(syslanguagelistfetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function syslanguagelistfetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    if(res.jsonResult.auth == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    language_list=res.jsonResult.ret;
    default_language = language_list.default;

    app_handle.initializeLanguageview(language_list.national,language_brick_callback);
    syslanguagefetch(language_list);

}
function language_brick_callback(language_conf){
    language_list.default = language_conf.abbreviation;
    default_language = language_list.default;
    syslanguagefetch(language_list);
}

function sysversionfetch(){
    var map={
        action:"XH_Balance_sys_version",
        type:"query",
        lang:default_language,
        user:null
    };
    fetch(request_head,
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(map)
        }).then(jsonParse)
        .then(sysversionfetchcallback)
        .catch( (error) => {
            console.log('request error', error);
            return { error };
        });
}
function sysversionfetchcallback(res){
    if(res.jsonResult.status == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    if(res.jsonResult.auth == "false"){
        alert("Fetal Error, Can not get language file!");
        windows.close();
    }
    let version=res.jsonResult.ret;
    app_handle.updateVersion(version);

}



function searchlanguage(key){
    if(key === null || key === undefined|| key ==""){
        return "";
    }
    if(language === null || language === undefined){
        return key;
    }
    for(var i in language.message){
        if(i==key) return language.message[key];
    }
    return key;
}




var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase     */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode    */
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}
/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test() {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}
/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}
/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    return bin;
}
/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
    return str;
}
/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
}
/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}