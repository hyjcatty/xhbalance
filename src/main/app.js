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
            username:"未登录用户",
            buttonlist: [],
            iconlist:[],
            runcallback:null,
            stopcallback:null,
        };
        this._footcallbackreturn=this.loginview.bind(this);
        this._footcallbackconfigure=this.configureview.bind(this);
        this._workstartcase=this.startcase.bind(this);
        this._workstopcase=this.stopcase.bind(this);
        this._workcontrolfoot=this.footButtonShow.bind(this);
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
        this.refs.Workview.update_size(width,canvasheight);
    }
    initializeLogin(callback){
        this.refs.Loginview.update_callback(callback);
    }
    initializeBrick(Bricklist,Baselist,callback,newchoicecallback){
        this.refs.Brickview.update_buttonlist(Bricklist,Baselist,callback,newchoicecallback);
    }
    initializehead(){
        this.refs.head.update_username(this.state.username);
    }
    initializefoot(callback_back){
        this.refs.foot.hide_all();
        //this.refs.foot.update_callback_return(callback_return);
        this.refs.foot.update_callback_back(callback_back);
        //this.refs.foot.update_callback_configure(callback_configure);
    }
    initializerunstop(runcallback,stopcallback){
        this.setState({runcallback:runcallback,stopcallback:stopcallback});
    }
    footButtonShow(breturn,bback,bconfigure){
        this.refs.foot.show_return_button(breturn);
        this.refs.foot.show_back_button(bback);
        this.refs.foot.show_configure_button(bconfigure);
    }
    initializeWork(work2brickcallback){
        this.refs.Workview.update_callback(work2brickcallback);
    }
    loginview(){
        this.removeuser();
        this.refs.Workview.hide();
        this.refs.Loginview.show();
        this.refs.foot.hide_all();
        this.refs.Brickview.hide();

    }
    brickview(){
        this.refs.Workview.hide();
        this.refs.Loginview.hide();
        this.refs.Brickview.show();
        this.footButtonShow(true,false,true);
    }
    workview_run(configure){
        //this.refs.Workview.billboardview();

        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.footButtonShow(false,true,false);
        this.refs.Workview.runview(configure);
    }
    workview_running(configure){
        //this.refs.Workview.billboardview();

        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.footButtonShow(false,false,false);
        this.refs.Workview.runningview(configure);
    }
    workview_mod(configure){
        //this.refs.Workview.billboardview();

        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.footButtonShow(false,true,false);
        this.refs.Workview.modview(configure);
    }
    workview_new(configure){
        //this.refs.Workview.billboardview();

        this.refs.Loginview.hide();
        this.refs.Brickview.hide();
        this.footButtonShow(false,true,false);
        this.refs.Workview.newview(configure);
    }
    update_status(status){
        this.refs.Workview.update_billboard_status(status);
    }
    update_light(light){
        this.refs.Workview.update_billboard_light(light);
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
        this.setState({userid:"user",username:"未登录用户"});
        this.refs.head.update_username("未登录用户");
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
    render() {
        return(
        <div>
            <div>
                <Head ref="head"/>
            </div>
            <div>
                <Loginview ref="Loginview"/>
                <Brickview ref="Brickview"/>
                <Workview ref="Workview" workstartcase={this._workstartcase} workstopcase={this._workstopcase} workcontrolfoot={this._workcontrolfoot}/>
            </div>
            <div>
                <Foot ref="foot" footcallbackreturn={this._footcallbackreturn} footcallbackconfigure={this._footcallbackconfigure}/>
            </div>
        </div>
        );
    }


}

var IconList=[];
var Running=false;
var runcycle=setInterval(xhbalancegetstatus,250);
var lightcycle=setInterval(xhbalancegetlight,3000);
get_size();
xhbalanceiconlist();
var react_element = <App/>;
var app_handle = ReactDOM.render(react_element,document.getElementById('app'));
//var footcallback_return= function(){
//    app_handle.loginview();
//}
var footcallback_back= function(){
    xhbalanceconfiglist();
}
//var footcallback_configure= function(){
//    alert("Not support yet!");
//}

//app_handle.initializeUrl(request_head);
app_handle.initializeSize(winWidth,winHeight);




//app_handle.initializefoot(footcallback_return,footcallback_back,footcallback_configure);
app_handle.initializefoot(footcallback_back);
app_handle.initializehead();
app_handle.initializeLogin(xhbalancelogin);
app_handle.initializeWork(xhbalanceconfiglist);
app_handle.initializerunstop(xhbalancestartcase,xhbalancestartcase);
app_handle.loginview();
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
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function getRelativeURL(){
    var url = document.location.toString();
    var arrUrl= url.split("//");
    var start = arrUrl[1].indexOf("/");
    var reUrl=arrUrl[1].substring(start);
    if(reUrl.indexOf("?")!=-1) {
        reUrl = reUrl.split("?")[0];
    }
    var end = reUrl.lastIndexOf("/");
    reUrl=reUrl.substring(0,end);
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
        alert("系统错误，请联系管理员！");
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
        alert("系统错误，请联系管理员！");
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
        alert("系统错误，请联系管理员！");
        app_handle.initializeLogin(xhbalancelogin);
        app_handle.loginview();
        return;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let bricklist = res.jsonResult.ret.configure;
    let baselist = res.jsonResult.ret.base;
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
        alert("登陆失败，请再次尝试登陆！");
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
}
function xhbalanceiconlist(){
    var map={
        action:"XH_Balance_get_svg_list",
        type:"query",
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
        alert("无法获得系统关键信息！请和管理员联系");
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
        console.log("start a case");
        body={
            action:"start",
            configure:configure
        }
        actioncallback=xhbalancestartcasecallback;
    }else{
        console.log("stop a case");
        body={
            action:"stop"
        }
        actioncallback=xhbalancestopcasecallback;
    }
    var map={
        action:"XH_Balance_Run",
        body:body,
        type:"query",
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

function xhbalancestartcasecallback(res){
    if(res.jsonResult.status == "false"){
        alert("启动用例失败！请和管理员联系");
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
        alert("停止用例失败！请和管理员联系");
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
    var map={
        action:"XH_Balance_status",
        type:"query",
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
        alert("运行错误，设备已停止运行"+res.jsonResult.msg);
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
    var map={
        action:"XH_Balance_light",
        type:"query",
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
        alert("运行错误，设备已停止运行"+res.jsonResult.msg);
        Running=false;
    }
    if(res.jsonResult.auth == "false"){
        return;
    }
    let detailstatus = res.jsonResult.ret;
    app_handle.update_light(detailstatus);
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