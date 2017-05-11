/**
 * Created by hyj on 2017/3/10.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import Buttonbar from "./buttonbar/buttonbar"
import Billboardview from "./billboardview/billboardview"
import Configurationview from "./configurationview/configurationview"
import './workview.css';



export default class workview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            leftwidth:150,
            configuration:null,
            rightwidth:450,
            hide:"block",
            iconlist:[],
            status:"run",
            brickviewcallback:null
        }
        this._button1click=this.button1click.bind(this);
        this._button2click=this.button2click.bind(this);

    }
    update_size(width,height){
        this.setState({height:height,width:width,leftwidth:width*0.25,rightwidth:(width-width*0.25)},this.update_subsize);
    }
    update_subsize(){
        this.refs.Buttonbar.update_size(this.state.leftwidth,this.state.height);
        this.refs.Billboardview.update_size(this.state.rightwidth,this.state.height);
        this.refs.Configurationview.update_size(this.state.rightwidth,this.state.height);
    }
    update_configuration(iconlist){
        this.setState({iconlist:iconlist});
        this.refs.Configurationview.update_iconlist(iconlist);
        //this.refs.Buttonbar.update_callbacklist([null,this.billboardview()],[null,this.configurationview()]);
    }
    update_callback(back2brickviewcallback){
        this.setState({brickviewcallback:back2brickviewcallback});
    }
    update_billboard_status(status){
        this.refs.Billboardview.update_status(status);
    }
    update_billboard_light(light){
        this.refs.Billboardview.update_light(light);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    modview(configuration){
        this.props.workcontrolfoot(false,true,false,false);
        this.setState({configuration:configuration,status:"mod"});
        this.refs.Configurationview.modify_view(configuration);
        this.refs.Billboardview.hide();
        this.refs.Buttonbar.modify_configure();
        this.show();
    }
    runview(configuration){
        this.props.workcontrolfoot(false,true,true,false);
        if(configuration!==null){
            this.setState({configuration:configuration,status:"run"});
            this.refs.Billboardview.update_configuration(configuration);
            this.refs.Billboardview.clearbillboard();
        }else{
            this.setState({status:"run"});
        }
        this.refs.Configurationview.hide();
        this.refs.Billboardview.show();
        this.refs.Buttonbar.run_configure();
        this.show();
    }
    newview(configuration){
        this.props.workcontrolfoot(false,true,false,false);
        this.setState({configuration:configuration,status:"new"});
        let configuration_local = configuration;
        configuration_local.name="";
        this.refs.Configurationview.new_view(configuration_local);
        this.refs.Billboardview.hide();
        this.refs.Buttonbar.new_configure();
        this.show();
    }
    runningview(configuration){
        this.props.workcontrolfoot(false,false,false,false);
        if(configuration!==null){
            this.setState({configuration:configuration,status:"running"});
            this.refs.Billboardview.update_configuration(configuration);
        }else{
            this.setState({status:"running"});
        }
        this.refs.Configurationview.hide();
        this.refs.Billboardview.show();
        this.refs.Buttonbar.running_configure();
        this.show();
    }
    back2brickview(){
        this.state.brickviewcallback();
    }
    button1click(){
        if(this.state.status == "run"){
            this.props.workstartcase(this.state.configuration);
        }else if(this.state.status == "running"){
            this.props.workstopcase(this.state.configuration);
        }else if(this.state.status == "new"){
            this.props.worksavenewcase(this.refs.Configurationview.getUpdatedValue());
        }else{
            this.props.worksavemodcase(this.refs.Configurationview.getUpdatedValue());
        }
    }
    button2click(){
        if(this.state.status == "run"){
            this.modview(this.state.configuration);
        }else if(this.state.status == "running"){
            alert("click stop button!");
        }else if(this.state.status == "new"){
            this.back2brickview();
        }else{
            this.runview(this.state.configuration);
        }
    }
    render() {
        return (
            <div style={{position:"relative",background:"#DDDDDD",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:this.state.leftwidth,float: "left"}}>
                    <Buttonbar ref="Buttonbar" button1click={this._button1click} button2click={this._button2click}/>
                </div>
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:this.state.rightwidth,float: "left"}}>
                    <Billboardview ref="Billboardview"/>
                    <Configurationview ref="Configurationview"/>
                </div>
            </div>
        );
    }
}