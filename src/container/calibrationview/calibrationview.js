/**
 * Created by hyj on 2017/5/15.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './calibrationview.css';
import CaliUnit from './calibrationunit/calibrationunit.js';


export default class calibrationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            key:"calibrationbutton",
            key2:"calibrationlight"
        }
        //this.keyboard_initialize();
    }
    update_language(language){
        for(let i=0;i<16;i++){
            this.refs['Light'+(i+1)].updatelanguage(language.calibrationunit);
        }
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
        for(let i=1;i<9;i++){
            this.refs['Light'+(2*i-1)].initialize("left",width,footheight);
            this.refs['Light'+(2*i)].initialize("right",width,footheight);
        }

    }
    update_callback(callbackzero,callbackcountweight){
        for(let i=0;i<16;i++){
            this.refs['Light'+(i+1)].updatecallback(callbackzero,callbackcountweight);
        }
    }
    update_balance_status(balanceNo,status,weight){
        this.refs['Light'+(parseInt(balanceNo))].setstatus(status,weight);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
        for(let i=0;i<16;i++){
            this.refs['Light'+(i+1)].updatebalance(i+1);
        }
    }
    render() {

        let unitlist = [];
        for (let i = 1; i < 17; i++) {
            let key = "Light" + i;
            unitlist.push(<div key={key}>
                <CaliUnit ref={key}/>
            </div>);
        }

        return (
            <div
                style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>

                <div key="rightpanel"
                     style={{width:this.state.width,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.05}}>

                    <div key="Lightboard"
                         style={{width:this.state.width*0.9,float: "left",position:"relative"}}>
                        {unitlist}
                    </div>
                </div>
            </div>
        );
    }
}