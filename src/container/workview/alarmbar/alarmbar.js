/**
 * Created by hyj on 2017/6/28.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import './alarmbar.css';



export default class alarmbar extends Component {
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
            button:"REMOVE",
            content:"ERROR",
            content1:"ERROR",
            content2:"ERROR",
            content3:"ERROR",
            language:{
                "button":"REMOVE",
                "content":"ERROR",
                "content1":"ERROR",
                "content2":"ERROR",
                "content3":"ERROR"
            }
        }
    }
    update_language(language){
        this.setState({language:language});
        this.setState({button:language.button});
        this.setState({content:language.content});
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
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    setError(error){
        let error_title=error.split(":")[0];
        let error_conent=(error.split(":")[1]).split(";");
        this.setState({content:error_title,content1:error_conent[0],content2:error_conent[1],content3:error_conent[2]});
    }
    handle_click(){
        this.props.buttonclick();
    }
    render() {
        return (
            <div style={{position:"relative",background:"#FFFF6F",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{marginTop:this.state.margintop,marginLeft:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative",borderStyle:"solid none solid none",borderWidth:"5px"}}>
                    <form style={{marginTop:this.state.bricksize*0.2,position:"relative",height:this.state.bricksize*0.8,width:this.state.bricksize,textAlign:'center'}}>
                        <h1  style={{fontSize:this.state.bricksize*0.1,marginLeft:0,textAlign:'center'}}>
                            {this.state.content}
                        </h1>
                            <p></p><h3 className="framelabel"  style={{fontSize:this.state.bricksize*0.05,marginLeft:0,textAlign:'center'}}>
                            {this.state.content1}
                        </h3>
                            <p></p><h3 className="framelabel"  style={{fontSize:this.state.bricksize*0.05,marginLeft:0,textAlign:'center'}}>
                            {this.state.content2}
                        </h3>
                            <p></p><h3 className="framelabel"  style={{fontSize:this.state.bricksize*0.05,marginLeft:0,textAlign:'center'}}>
                            {this.state.content3}
                        </h3>


                    </form>
                </div>

                <div style={{marginTop:this.state.margintop,marginLeft:this.state.marginsize,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative",display:this.state.button2hide}}>
                    <button type="button" className="btn" style={{background:"#D94600",height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.handle_click.bind(this)}><i>
                        <a style={{position:"relative",height:this.state.bricksize*0.3,display:'table-cell',verticalAlign:'middle'}}>
                        <span className="framelabel"  style={{fontSize:this.state.bricksize*0.1,marginLeft:0,color:"#000000"}}>
                            {this.state.button}
                        </span>
                        </a>

                    </i></button>
                </div>
            </div>
        );
    }
}