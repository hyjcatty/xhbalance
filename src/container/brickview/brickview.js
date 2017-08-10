/**
 * Created by hyj on 2016/12/22.
 */

/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import Brickbutton from './brickbutton/brickbutton';
import Smallbrickbutton from './smallbrickbutton/smallbrickbutton';
import Plusbutton from './plusbutton/plusbutton';
//import Rodal    from './rodal/rodal';
import '../../../resource/css/font-awesome.min.css';
import './brickview.css';



export default class brickview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            buttonlist:[],
            baselist:[],
            hide:"block",
            bricksize:100,
            marginsize:5,
            key:"brick",
            callback:null,
            newchoicecallback:null,
            moduleshow:false,
            moduleanimation:'door',
            language:{
                "modaltitle":"Please select a configure as base",
                "baseconftitle":"Base template",
                "userconftitle":"User Configuration",
                "modalconfirm":"confirm",
                "modalcancel":"cancel"
            }
        }
        this._newmoduleclick=this.module_show.bind(this);
        this._smalliconclick=this.handle_click.bind(this);
    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        //console.log("convas width:"+width+",convas height:"+height);
        this.calculatesize(width);

    }
    calculatesize(width){
        let size = (width-30)/4;
        let marginsize = size*0.05;
        let bricksize = size-marginsize*2;
        //console.log("bricksize:"+bricksize+",marginsize:"+marginsize);
        this.setState({bricksize:bricksize,marginsize:marginsize});
    }
    update_buttonlist(buttonlist,baselist,callback,newchoicecallback){
        this.setState({buttonlist:buttonlist,baselist:baselist,callback:callback,newchoicecallback:newchoicecallback},this.updateprop);
    }
    updateprop(){
        for(let i=0;i<this.state.buttonlist.length;i++) {
            this.refs[this.state.key + i].updateprop(this.state.buttonlist[i],this.state.bricksize,this.state.callback);
            this.refs[this.state.key +"confbutton"+ i].updateprop(this.state.buttonlist[i],"configure",this.state.bricksize);
            //console.log(this.state.Framelist[i]);
        }
        for(let i=0;i<this.state.baselist.length;i++) {
            this.refs[this.state.key +"basebutton"+ i].updateprop(this.state.baselist[i],"base",this.state.bricksize);
            //console.log(this.state.Framelist[i]);
        }
        this.refs.Plusbutton.updateprop(this.state.bricksize);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handle_click(name,type){
        //console.log("icontype:"+type+",iconname:"+name);
        this.module_hide();
        this.state.newchoicecallback(name,type);
    }
    module_hide(){
        $('#NewConfigureModel').modal('hide');
    }
    module_show(){
        $('#NewConfigureModel').modal('show');
    }
    render() {
        let items = [];
        for(let i=0;i<this.state.buttonlist.length;i++){
            let tempkey = "brick"+i;
                items.push(<div key={this.state.key+i} style={{marginTop:this.state.marginsize,marginLeft:this.state.marginsize,marginRight:this.state.marginsize,marginBottom:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                    <Brickbutton  ref={tempkey}/>
                </div>
                );
        }
        let baseicons=[];
        let conficons=[];
        for(let i=0;i<this.state.baselist.length;i++){
            let tempkey = "basebutton"+i;
            let icon = "./svg/"+this.state.baselist[i].icon;
            baseicons.push(
                <div key={this.state.key+"basebutton"+i} style={{marginTop:this.state.marginsize/2,marginLeft:this.state.marginsize/2,marginRight:this.state.marginsize/2,marginBottom:this.state.marginsize/2,width:this.state.bricksize/2,height:this.state.bricksize/2,float: "left",position:"relative"}}>
                    <Smallbrickbutton  ref={this.state.key+"basebutton"+i} smalliconclick={this._smalliconclick}/>

                </div>
            );
        }
        for(let i=0;i<this.state.buttonlist.length;i++){
            let tempkey = "confbutton"+i;
            let icon = "./svg/"+this.state.buttonlist[i].icon;
            conficons.push(
                <div key={this.state.key+"confbutton"+i} style={{marginTop:this.state.marginsize/2,marginLeft:this.state.marginsize/2,marginRight:this.state.marginsize/2,marginBottom:this.state.marginsize/2,width:this.state.bricksize/2,height:this.state.bricksize/2,float: "left",position:"relative"}}>
                    <Smallbrickbutton  ref={this.state.key+"confbutton"+i} smalliconclick={this._smalliconclick}/>

                </div>
            );
        }
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                {items}
                <div key={this.state.key+"plus"} style={{marginTop:this.state.marginsize,marginLeft:this.state.marginsize,marginRight:this.state.marginsize,marginBottom:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}><Plusbutton ref="Plusbutton" setclick={this._newmoduleclick}/></div>
                <div className="modal fade" id="NewConfigureModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{width:'100%'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" >{this.state.language.modaltitle}</h4>
                            </div>
                            <div className="modal-body" style={{height:this.state.height*0.75,maxHeight:this.state.height*0.75,overflow:"scroll",overflowX:"hidden"}}>
                                <div className="col-md-12">
                                    <h3 style={{fontSize:10,marginRight:5}} className="pull-left">{this.state.language.baseconftitle}</h3>
                                </div>
                                <div className="col-md-12">
                                    <div style={{position:"relative",background:"#FFFFFF",width:'100%',display:this.state.hide}}>
                                        {baseicons}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h3 style={{fontSize:10,marginRight:5}} className="pull-left">{this.state.language.userconftitle}</h3>
                                </div>
                                <div className="col-md-12">
                                    <div style={{position:"relative",background:"#FFFFFF",width:'100%',display:this.state.hide}}>
                                        {conficons}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.language.modalcancel}</button>
                                <button type="button" className="btn btn-primary" id="NewConfigureModuleConfirm" >{this.state.language.modalconfirm}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
        /*
         <div className="modal fade" id="NewConfigureModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{height:this.state.height,maxHeight:this.state.height,width:'100%'}}>
         <div className="modal-dialog" role="document">
         <div className="modal-content">
         <div className="modal-header">
         <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <h4 className="modal-title" >Please select a configure as base</h4>
         </div>
         <div className="modal-body" style={{overflow:"scroll",overflowX:"hidden"}}>
         <div className="col-md-12">
         <div style={{position:"relative",background:"#FFFFFF",width:'100%',display:this.state.hide}}>
         {baseicons}
         </div>
         <div style={{position:"relative",background:"#FFFFFF",width:'100%',display:this.state.hide}}>
         {conficons}
         </div>
         </div>
         <div className="modal-footer">
         <button type="button" className="btn btn-default" data-dismiss="modal">·ÅÆú</button>
         <button type="button" className="btn btn-primary" id="NewConfigureModuleConfirm" StatCode="">ÐÞ¸Ä</button>
         </div>
         </div>
         </div>
         </div>
         </div>


        * */
    }
}