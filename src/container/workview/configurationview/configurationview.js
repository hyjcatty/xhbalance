/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import Smalliconbutton from './smalliconbutton/smalliconbutton';
import '../../../../resource/css/font-awesome.min.css';
import './configurationview.css';



export default class configurationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            configuration:null,
            hide:"block",
            key1:"tabkey",
            key2:"contentkey",
            key3:"iconkey",
            bricksize:75,
            iconlist:[],
            defaulticon:"sugar1.svg",
            head:"none"
        }
        this._iconcallback = this.handle_icon_selection.bind(this);

    }
    update_size(width,height){
        this.setState({height:height,width:width});
        console.log("configurationview width:"+width+",height:"+height);


    }
    update_iconlist(iconlist){
        this.setState({iconlist:iconlist});

    }
    update_sub_props(){
        for(let i=0;i<this.state.iconlist.length;i++){
            this.refs[this.state.key3+i].updateprop(this.state.iconlist[i],this.state.bricksize);
        }
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        console.log(this.state.configuration);
        this.setState({hide:"block"});
    }
    module_show(){
        this.update_sub_props();
        $('#IconSelectionModel').modal('show');
    }
    module_hide(){
        $('#IconSelectionModel').modal('hide');
    }
    new_view(configuration){
        this.setState({head:"block"});
        this.setState({configuration:configuration,defaulticon:"./svg/"+configuration.icon});
        this.show();
    }
    modify_view(configuration){
        this.setState({head:"none"});
        this.setState({configuration:configuration,defaulticon:"./svg/"+configuration.icon});
        this.show();
    }
    handle_icon_selection(icon){
        let tempconfigure = this.state.configuration;
        tempconfigure.icon=icon;

        console.log("choice icon:"+icon);
        this.setState({defaulticon:icon,configuration:tempconfigure});
        this.module_hide();
    }
    save_configuration(){
        return this.state.configuration;
    }
    render() {
        if(this.state.configuration === null){
            return (
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>

                </div>
            );
        }
        let tabs = [];
        for(let i=0;i<this.state.configuration.parameter.groups.length;i++){
            let href="#"+this.state.configuration.parameter.groups[i].groupname;
            let temp;
            if(i==0){
                temp = <li className="active" key={this.state.key1+i}><a href={href} data-toggle="tab">{this.state.configuration.parameter.groups[i].groupname}</a></li>;}
            else{
                temp = <li key={this.state.key1+i}><a href={href} data-toggle="tab">{this.state.configuration.parameter.groups[i].groupname}</a></li>;}
            tabs.push(temp);
        }
        let panes=[];
        for(let i=0;i<this.state.configuration.parameter.groups.length;i++){
            let content=[];
            for(let j=0;j<this.state.configuration.parameter.groups[i].list.length;j++){
                let contentline = "Max:["+this.state.configuration.parameter.groups[i].list[j].max+"]Min:["+this.state.configuration.parameter.groups[i].list[j].min+"]Value:["+this.state.configuration.parameter.groups[i].list[j].value+"]";
                content.push(<p className="lead" key={this.state.key2+i+"p"+j+"1"}>{this.state.configuration.parameter.groups[i].list[j].paraname}</p>);
                content.push(<p key={this.state.key2+i+"p"+j+"2"}>{contentline}</p>);
            }
            let temp;
            if(i==0){
                temp = <div className="tab-pane active" key={this.state.key2+i} id={this.state.configuration.parameter.groups[i].groupname}>{content}</div>;}
            else{
                temp = <div className="tab-pane" id={this.state.configuration.parameter.groups[i].groupname} key={this.state.key2+i} >{content}</div>;}
            panes.push(temp);
        }
        let conficons = [];
        for(let i=0;i<this.state.iconlist.length;i++){
            let tempkey = "iconbutton"+i;
            let icon = "./svg/"+this.state.iconlist[i];
            conficons.push(
                <div key={this.state.key+"basebutton"+i} style={{marginTop:this.state.bricksize/5,marginLeft:this.state.bricksize/5,marginRight:this.state.bricksize/5,marginBottom:this.state.bricksize/5,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                    <Smalliconbutton ref={this.state.key3+i} iconcallback={this._iconcallback}/>
                </div>);
        }
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="x_content" >
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{display:this.state.head}}>
                        <h4>&nbsp;</h4>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head}}>
                            <div className="input-group">
                                <span className="input-group-addon" id="Username" style={{minWidth: "150px"}}>CONFIG NAME</span>
                                <input type="text" className="form-control" placeholder="CONFIG NAME" aria-describedby="basic-addon1" id="Username_Input"/>
                            </div>
                        </div>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head,margonTop:50}}>
                            <h4>Icon:</h4>
                            <div  style={{marginTop:this.state.bricksize/5,marginLeft:this.state.bricksize/5,marginRight:this.state.bricksize/5,marginBottom:this.state.bricksize/5,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                                <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.module_show.bind(this)}><i>
                                    <img src={"./svg/"+this.state.configuration.icon}  style={{height:this.state.bricksize*0.5,width:this.state.bricksize*0.5,marginTop:0}}></img><br/>
                                </i></button>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>


                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " style={{display:"block"}}>
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " style={{display:"block"}}>
                            <h4>Detail Parameter:</h4>
                        </div>
                        <div className="col-xs-3 col-md-3 col-sm-3 col-lg-3">
                            <ul className="nav nav-tabs tabs-left">
                                {tabs}
                            </ul>
                        </div>

                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9">
                            <div className="tab-content">
                                {panes}
                            </div>
                        </div>
                    </div>


                    <div className="clearfix"></div>

                </div>
                <div className="modal fade" id="IconSelectionModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{width:'100%'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" >Please select a icon</h4>
                            </div>
                            <div className="modal-body" style={{height:this.state.height*0.75,maxHeight:this.state.height*0.75,overflow:"scroll",overflowX:"hidden"}}>

                                <div className="col-md-12">
                                    <div style={{position:"relative",background:"#FFFFFF",width:'100%'}}>
                                        {conficons}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
