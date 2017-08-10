/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import './billboardview.css';
import Label1 from "./billlabel/label1.js"
import Label2 from "./billlabel/label2.js"
import Label3 from "./billlabel/label3.js"
import Labelbig from "./billlabel/labelbig.js"
import Light from "./billlabel/light.js"



export default class billboardview extends Component {
    constructor(props) {
        super(props);

        this.colorlist={
            RED:"#d95349",
            ORANGE:"#f0ad4e",
            BLUE:"#3498db",
            GREEN:"#26b99a",
            GRAY:"#73879c",
            PURPLE:"#9B59B6",
            LBLUE:"#5bc0de",
            LGREEN:"#5cb85c",
            LGRAY:"#2a3f54",
            DBLUE:"#34495e"
        };
        let showlist= {
            statusdetail: {
                status: "123",
                warning: "123",
                error: "123"
            },
            currentweight:{
                value:0
            },

            mainvalue: [{value: 179, color: "RED"}, {value: 179, color: "RED"}, {value: 179, color: "RED"}, {
                value: 179,
                color: "RED"
            }, {value: 179, color: "RED"}, {value: 179, color: "RED"}],
            detailvalue: [{value: 179, color: "RED", subvalue: "3%", subcolor: "RED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"}
            ]};
        let lightlist={
            lightboard: [
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "RED", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true}
            ]
        };

        this.state={
            height:700,
            width:600,
            showlist:showlist,
            lightlist:lightlist,
            defaultshow:showlist,
            defaultlight:lightlist,
            configuration:null,
            hide:"block",
            language:{
                "Label1x1":{
                    "title":"Target Weight",
                    "unit":"g"
                },
                "Label1x2":{
                    "title":"Upper Weight",
                    "unit":"g"
                },
                "Label1x3":{
                    "title":"Total Package",
                    "unit":"pcs"
                },
                "Label1x4":{
                    "title":"Total Weight",
                    "unit":"g"
                },
                "Label1x5":{
                    "title":"Speed Package",
                    "unit":"pcs/min"
                },
                "Label1x6":{
                    "title":"Speed Weight",
                    "unit":"g/min"
                },
                "Labelbigboard":{
                    "title":"Current Weight",
                    "unit":"g"
                }
            }
        };


    }
    update_language(language){
        //console.log(language);
        this.setState({language:language});

        this.refs['Label1x1'].initialize(language.Label1x1.title,language.Label1x1.unit);
        this.refs['Label1x2'].initialize(language.Label1x2.title,language.Label1x2.unit);
        this.refs['Label1x3'].initialize(language.Label1x3.title,language.Label1x3.unit);
        this.refs['Label1x4'].initialize(language.Label1x4.title,language.Label1x4.unit);
        this.refs['Label1x5'].initialize(language.Label1x5.title,language.Label1x5.unit);
        this.refs['Label1x6'].initialize(language.Label1x6.title,language.Label1x6.unit);
        this.refs.Labelbigboard.initialize(language.Labelbigboard.title,language.Labelbigboard.unit);
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        //console.log("billboardview width:"+width+",height:"+height);
        /*
        for(let i=1;i<4;i++){
            this.refs['Label2x'+(2*i-1)].initialize("Average Time","From last Count","left",width);
            this.refs['Label2x'+(2*i)].initialize("Average Time","From last Count","right",width);
        }
        //this.refs['Label3x1'].initialize("Status info","fa fa-bullhorn",width);
        this.refs['Label3x2'].initialize("Warning info","fa fa-warning",width);
        this.refs['Label3x3'].initialize("Error info","fa fa-times",width);*/

        //this.refs.Labelbigboard.initialize("Current Weight","g");
        for(let i=1;i<9;i++){
            this.refs['Light'+(2*i-1)].initialize("left",width,""+(2*i-1));
            this.refs['Light'+(2*i)].initialize("right",width,""+(2*i));
        }

    }
    update_configuration(configuration){
        this.setState({configuration:configuration});
    }
    update_light(lightlist){
        this.setState({lightlist:lightlist},this.flash_light);
    }
    update_status(status){
        this.setState({showlist:status},this.flash_status);
    }
    flash_light(){
        //console.log("flashlight");
        for(let i=1;i<17;i++){
            this.refs['Light'+i].updateprop(this.state.lightlist.lightboard[i-1].note,this.colorlist[this.state.lightlist.lightboard[i-1].colorbrick],this.colorlist[this.state.lightlist.lightboard[i-1].colornote],this.colorlist[this.state.lightlist.lightboard[i-1].colorcircle],this.state.lightlist.lightboard[i-1].blingbrick,this.state.lightlist.lightboard[i-1].blingnote,this.state.lightlist.lightboard[i-1].blingcircle,this.state.lightlist.lightboard[i-1].colorbrick,this.state.lightlist.lightboard[i-1].colornote,this.state.lightlist.lightboard[i-1].colorcircle);
        }
    }
    flash_status(){
        for(let i=1;i<7;i++){
            this.refs['Label1x'+i].updateprop(this.colorlist[this.state.showlist.mainvalue[i-1].color],this.state.showlist.mainvalue[i-1].value);
        }/*
        for(let i=1;i<7;i++){
            this.refs['Label2x'+i].updateprop(this.colorlist[this.state.showlist.detailvalue[i-1].color],this.colorlist[this.state.showlist.detailvalue[i-1].subcolor],this.state.showlist.detailvalue[i-1].value,this.state.showlist.detailvalue[i-1].subvalue);
        }
        //this.refs['Label3x1'].updateprop("#73879c",this.state.showlist.statusdetail.status);
        this.refs['Label3x2'].updateprop("#f0ad4e",this.state.showlist.statusdetail.warning);
        this.refs['Label3x3'].updateprop("#d95349",this.state.showlist.statusdetail.error);*/
        //this.refs.Labelbigboard.updateprop(this.state.showlist.statusdetail.status,this.state.showlist.statusdetail.warning,this.state.showlist.statusdetail.error);
        this.refs.Labelbigboard.updateprop(this.state.showlist.currentweight.value);
    }
    clearbillboard(){
        //this.setState({showlist:this.state.defaultshow});
        this.update_status(this.state.defaultshow);
        this.update_light(this.state.defaultlight);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div key = "leftpanel" style={{width:this.state.width*0.42,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>
                    <div key = "Labelbigboard" style={{width:this.state.width*0.42,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <Labelbig ref="Labelbigboard"/>
                        </div>
                    </div>
                    <div key = "Label1x1" style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x1"/>
                    </div>
                    <div key = "Label1x2" style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x2"/>
                    </div>
                    <div key = "Label1x3" style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x3"/>
                    </div>
                    <div key = "Label1x4"  style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x4"/>
                    </div>
                    <div key = "Label1x5"  style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x5"/>
                    </div>
                    <div key = "Label1x6" style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x6"/>
                    </div>
                </div>
                <div key="rightpanel" style={{width:this.state.width*0.45,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>

                    <div key = "Lightboard" style={{width:this.state.width*0.45,float: "left",position:"relative"}}>
                        <div key ="Light1">
                        <Light  ref="Light1"/>
                        </div>
                        <div key ="Light2">
                        <Light ref="Light2"/>
                        </div>
                        <div key ="Light3">
                        <Light ref="Light3"/>
                        </div>
                        <div key ="Light4">
                        <Light ref="Light4"/>
                        </div>
                        <div key ="Light5">
                        <Light  ref="Light5"/>
                        </div>
                        <div key ="Light6">
                        <Light  ref="Light6"/>
                        </div>
                        <div key ="Light7">
                        <Light ref="Light7"/>
                        </div>
                        <div key ="Light8">
                        <Light ref="Light8"/>
                        </div>
                        <div key ="Light9">
                        <Light ref="Light9"/>
                        </div>
                        <div key ="Light10">
                        <Light ref="Light10"/>
                        </div>
                        <div key ="Light11">
                        <Light ref="Light11"/>
                        </div>
                        <div key ="Light12">
                        <Light ref="Light12"/>
                        </div>
                        <div key ="Light13">
                        <Light ref="Light13"/>
                        </div>
                        <div key ="Light14">
                        <Light  ref="Light14"/>
                        </div>
                        <div key ="Light15">
                        <Light  ref="Light15"/>
                        </div>
                        <div key ="Light16">
                        <Light ref="Light16"/>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div key = "leftpanel" style={{width:this.state.width*0.45,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>
                    <div key = "Label1x1" style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x1"/>
                    </div>
                    <div key = "Label1x2" style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x2"/>
                    </div>
                    <div key = "Label1x3" style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x3"/>
                    </div>
                    <div key = "Label1x4"  style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x4"/>
                    </div>
                    <div key = "Label1x5"  style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <Label1 ref="Label1x5"/>
                    </div>
                    <div key = "Label1x6" style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <Label1 ref="Label1x6"/>
                    </div>
                    <div key = "Label2g1"  style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <Label2 key="Label2x1" ref="Label2x1"/>
                        <Label2 key="Label2x2" ref="Label2x2"/>
                    </div>
                    <div key = "Label2g2" style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <Label2 key="Label2x3" ref="Label2x3"/>
                        <Label2 key="Label2x4" ref="Label2x4"/>
                    </div>
                    <div key = "Label2g3" style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <Label2 key="Label2x5" ref="Label2x5"/>
                        <Label2 key="Label2x6" ref="Label2x6"/>
                    </div>
                    <div key = "Label3g1" style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <Label3 key="Label3x2" ref="Label3x2"/>
                        <Label3 key="Label3x3" ref="Label3x3"/>
                    </div>
                </div>
                <div key="rightpanel" style={{width:this.state.width*0.45,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>
                    <div key = "Labelbigboard" style={{width:this.state.width*0.45,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <Labelbig ref="Labelbigboard"/>
                        </div>
                    </div>
                    <div key = "Lightboard" style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:35}}>
                        <div key ="Light1">
                            <Light  ref="Light1"/>
                        </div>
                        <div key ="Light2">
                            <Light ref="Light2"/>
                        </div>
                        <div key ="Light3">
                            <Light ref="Light3"/>
                        </div>
                        <div key ="Light4">
                            <Light ref="Light4"/>
                        </div>
                        <div key ="Light5">
                            <Light  ref="Light5"/>
                        </div>
                        <div key ="Light6">
                            <Light  ref="Light6"/>
                        </div>
                        <div key ="Light7">
                            <Light ref="Light7"/>
                        </div>
                        <div key ="Light8">
                            <Light ref="Light8"/>
                        </div>
                        <div key ="Light9">
                            <Light ref="Light9"/>
                        </div>
                        <div key ="Light10">
                            <Light ref="Light10"/>
                        </div>
                        <div key ="Light11">
                            <Light ref="Light11"/>
                        </div>
                        <div key ="Light12">
                            <Light ref="Light12"/>
                        </div>
                        <div key ="Light13">
                            <Light ref="Light13"/>
                        </div>
                        <div key ="Light14">
                            <Light  ref="Light14"/>
                        </div>
                        <div key ="Light15">
                            <Light  ref="Light15"/>
                        </div>
                        <div key ="Light16">
                            <Light ref="Light16"/>
                        </div>
                    </div>
                </div>
            </div>
        );*/
    /*





        let lights=[]
        for(let i=0;i<8;i++){
            let lightbrick1="label label-default";
            let lightbrick2="label label-default";
            let lightnote1="alert alert-success";
            let lightnote2="alert alert-success";
            let lightcircle1="badge badge-success";
            let lightcircle2="badge badge-success";
            if(this.state.showlist.lightboard[i*2].blingbrick)  lightbrick1 = "label label-default blingbling-"+this.state.showlist.lightboard[i*2].colorbrick;
            if(this.state.showlist.lightboard[i*2+1].blingbrick)  lightbrick2 = "label label-default blingbling-"+this.state.showlist.lightboard[i*2+1].colorbrick;
            if(this.state.showlist.lightboard[i*2].blingnote)  lightnote1 = "alert alert-success blingbling-"+this.state.showlist.lightboard[i*2].colornote;
            if(this.state.showlist.lightboard[i*2+1].blingnote)  lightnote2 = "alert alert-success blingbling-"+this.state.showlist.lightboard[i*2+1].colornote;
            if(this.state.showlist.lightboard[i*2].blingcircle)  lightcircle1 = "badge badge-success blingbling-"+this.state.showlist.lightboard[i*2].colorcircle;
            if(this.state.showlist.lightboard[i*2+1].blingcircle)  lightcircle2 = "badge badge-success blingbling-"+this.state.showlist.lightboard[i*2+1].colorcircle;
            lights.push(
                <div key={"light"+(i*2)} style={{width:this.state.width*0.22,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                    <span className={lightbrick1} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i].colorbrick],transform: "translateY(-50%)",marginRight:5}}>&nbsp;</span>
                    <div className={lightnote1} role="alert" style={{float: "left",position:"relative",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i].colornote],borderColor:this.colorlist[this.state.showlist.lightboard[2*i].colornote],padding:5,marginBottom:0,top: "50%",transform: "translateY(-50%)",width:this.state.width*0.15}}>
                        <strong>{this.state.showlist.lightboard[2*i].note}</strong>
                    </div>
                    <span className={lightcircle1} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i].colorcircle],transform: "translateY(-50%)",marginLeft:5}}>&nbsp;</span>
                </div>);
            lights.push(
                <div key={"light"+(i*2+1)} style={{width:this.state.width*0.22,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                    <span className={lightcircle2} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i+1].colorcircle],transform: "translateY(-50%)",marginRight:5}}>&nbsp;</span>
                    <div className={lightnote2} role="alert" style={{float: "left",position:"relative",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i+1].colornote],borderColor:this.colorlist[this.state.showlist.lightboard[2*i+1].colornote],padding:5,marginBottom:0,top: "50%",transform: "translateY(-50%)",width:this.state.width*0.15}}>
                        <strong>{this.state.showlist.lightboard[2*i+1].note}</strong>
                    </div>
                    <span className={lightbrick2} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.colorlist[this.state.showlist.lightboard[2*i+1].colorbrick],transform: "translateY(-50%)",marginLeft:5}}>&nbsp;</span>
                </div>);
        }
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{width:this.state.width*0.45,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[0].color]}}>{this.state.showlist.mainvalue[0].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[1].color]}}>{this.state.showlist.mainvalue[1].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[2].color]}}>{this.state.showlist.mainvalue[2].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[3].color]}}>{this.state.showlist.mainvalue[3].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[4].color]}}>{this.state.showlist.mainvalue[4].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:32,color:this.colorlist[this.state.showlist.mainvalue[5].color]}}>{this.state.showlist.mainvalue[5].value}</div>
                                <h3 style={{fontSize:10,marginRight:5}} className="pull-right">New Sign ups</h3>
                                <p>Note</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[0].color]}}>{this.state.showlist.detailvalue[0].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[0].subcolor]}}>{this.state.showlist.detailvalue[0].subvalue} </i> From last Week</span>
                        </div>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02,borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[1].color]}}>{this.state.showlist.detailvalue[1].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[1].subcolor]}}>{this.state.showlist.detailvalue[1].subvalue} </i> From last Week</span>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[2].color]}}>{this.state.showlist.detailvalue[2].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[2].subcolor]}}>{this.state.showlist.detailvalue[2].subvalue} </i> From last Week</span>
                        </div>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02,borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[3].color]}}>{this.state.showlist.detailvalue[3].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[3].subcolor]}}>{this.state.showlist.detailvalue[3].subvalue} </i> From last Week</span>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[4].color]}}>{this.state.showlist.detailvalue[4].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[4].subcolor]}}>{this.state.showlist.detailvalue[4].subvalue} </i> From last Week</span>
                        </div>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02,borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[5].color]}}>{this.state.showlist.detailvalue[5].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[5].subcolor]}}>{this.state.showlist.detailvalue[5].subvalue} </i> From last Week</span>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:this.state.width*0.02}}>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",borderLeft: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[6].color]}}>{this.state.showlist.detailvalue[6].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[6].subcolor]}}>{this.state.showlist.detailvalue[6].subvalue} </i> From last Week</span>
                        </div>
                        <div style={{width:this.state.width*0.20,float: "left",position:"relative",marginLeft:this.state.width*0.02,borderLeft: "2px solid #ADB2B5",borderRight: "2px solid #ADB2B5",paddingLeft:this.state.width*0.02}} className="tile_stats_count">
                            <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
                            <div className="count" style={{color:this.colorlist[this.state.showlist.detailvalue[7].color]}}>{this.state.showlist.detailvalue[7].value}</div>
                            <span className="count_bottom"><i className="green" style={{color:this.colorlist[this.state.showlist.detailvalue[7].subcolor]}}>{this.state.showlist.detailvalue[7].subvalue} </i> From last Week</span>
                        </div>
                    </div>
                </div>
                <div style={{width:this.state.width*0.45,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.03,marginTop:this.state.width*0.03}}>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative"}}>
                        <div className="animated flipInY">
                            <div className="tile-stats">
                                <div className="count" style={{fontSize:24}}>{"状态："+this.state.showlist.statusdetail.status}</div>
                                <div className="count" style={{fontSize:24}}>{"告警："+this.state.showlist.statusdetail.warning}</div>
                                <div className="count" style={{fontSize:24}}>{"错误："+this.state.showlist.statusdetail.error}</div>
                                <h3>New Sign ups</h3>
                                <p>Status Report</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:this.state.width*0.45,float: "left",position:"relative",marginTop:35}}>
                        {lights}
                    </div>
                </div>
            </div>
        );*/
    }
}