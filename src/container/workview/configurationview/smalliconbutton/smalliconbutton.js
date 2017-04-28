/**
 * Created by hyj on 2016/12/22.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import "./smalliconbutton.css"
import '../../../../../resource/css/font-awesome.min.css';
export default class Smalliconbutton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bricksize:800,
            icon:"shopper.svg",
            type:"conf"
        };
    }
    updateprop(icon,bricksize){
        //console.log("SetIcon:"+icon);
        this.setState({icon:icon,bricksize:bricksize});
    }
    handle_click(){
        //console.log("click");
        this.props.iconcallback(this.state.icon);
    }
    render() {
        let icon = "./svg/"+this.state.icon;

        return (
            <div  style={{position:"relative",flex:1,width:this.state.bricksize,boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD"}} >
                <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.handle_click.bind(this)} >
                    <i>
                        <img src={icon}  style={{height:this.state.bricksize*0.5,width:this.state.bricksize*0.5,marginTop:0}}></img>
                    </i>
                </button>
            </div>
        );
    }
}