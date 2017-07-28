/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Light extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note:"From last Count",
            location:"left",
            colorbrick: "#73879c",
            colornote:"#73879c",
            colorcircle:"#73879c",
            colorbrickname:"GRAY",
            colornotename:"GRAY",
            colorcirclename:"GRAY",
            blingbrick: false,
            blingnote:false,
            blingcircle:false,
            width:100,
            id:"01"
        };
    }
    updateprop(note,colorbrick,colornote,colorcircle,blingbrick,blingnote,blingcircle,colorbrickname,colornotename,colorcirclename){
        this.setState({note:note,colorbrick:colorbrick,colornote:colornote,colorcircle:colorcircle,blingbrick:blingbrick,blingnote:blingnote,blingcircle:blingcircle,colorbrickname:colorbrickname,colornotename:colornotename,colorcirclename:colorcirclename});
    }
    initialize(location,width,id){
        let localid = id;
        if (localid.length < 2) localid = "0"+localid;
        localid= "#"+localid;
        this.setState({location:location,width:width,id:localid});
    }
    render() {
        let light=[];
        let lightbrick1="label label-default";
        let lightnote1="alert alert-success";
        let lightcircle1="badge badge-success";
        if(this.state.blingbrick)  lightbrick1 = "label label-default blingbling-"+this.state.colorbrickname;
        if(this.state.blingnote)  lightnote1 = "alert alert-success blingbling-"+this.state.colornotename;
        if(this.state.blingcircle)  lightcircle1 = "badge badge-success blingbling-"+this.state.colorcirclename;
        if(this.state.location !="left"){
            light.push(


            <div key="light" style={{width:this.state.width*0.22,float: "right",position:"relative"}}>
                <h3 style={{fontSize:14,color:"#3498db",width:this.state.width*0.22,float: "left",paddingBottom:10,textAlign:"right"}} >{this.state.id}</h3>
    <span key = "brick-light" className={lightbrick1} style={{float: "right",position:"relative",top: "50%",backgroundColor:this.state.colorbrick,transform: "translateY(-50%)",marginLeft:5}}>&nbsp;</span>

                <div className={lightnote1} role="alert" style={{float: "right",position:"relative",backgroundColor:this.state.colornote,borderColor:this.state.colornote,padding:5,marginBottom:0,top: "50%",transform: "translateY(-50%)",width:this.state.width*0.15}}>
                    <strong>{this.state.note}</strong>
                </div>
<span key = "circle-light"  className={lightcircle1} style={{float: "right",position:"relative",top: "50%",backgroundColor:this.state.colorcircle,transform: "translateY(-50%)",marginRight:5}}>&nbsp;</span>

</div>);
        }else{

            light.push(

                <div key="light" style={{width:this.state.width*0.22,float: "left",position:"relative"}}>
                    <h3 style={{fontSize:14,color:"#3498db",width:this.state.width*0.22,float: "left",paddingBottom:10}}>{this.state.id}</h3>
                    <span key = "brick-light"   className={lightbrick1} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.state.colorbrick,transform: "translateY(-50%)",marginRight:5}}>&nbsp;</span>

                    <div className={lightnote1} role="alert" style={{float: "left",position:"relative",backgroundColor:this.state.colornote,borderColor:this.state.colornote,padding:5,marginBottom:0,top: "50%",transform: "translateY(-50%)",width:this.state.width*0.15}}>
                        <strong>{this.state.note}</strong>
                    </div>
                    <span key = "circle-light"   className={lightcircle1} style={{float: "left",position:"relative",top: "50%",backgroundColor:this.state.colorcircle,transform: "translateY(-50%)",marginLeft:5}}>&nbsp;</span>


</div>);
        }
        return (
            <div>{light}</div>

        );
    }
}