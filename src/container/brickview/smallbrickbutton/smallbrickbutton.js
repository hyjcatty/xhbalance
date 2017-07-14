/**
 * Created by hyj on 2016/12/22.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import "./smallbrickbutton.css"
import '../../../../resource/css/font-awesome.min.css';
export default class Smallbrickbutton extends Component {

    constructor(props) {
        super(props);
        let default_conf = {
            name:"default",
            icon:"shopper.svg",
            owner:"no user",
            description:"not initialized"
        }
        this.state = {
            bricksize:800,
            configuration:default_conf,
            type:"configure"
        };
    }
    updateprop(configuration,type,bricksize){
        this.setState({configuration:configuration,type:type,bricksize:bricksize});
    }
    handle_click(){
        //console.log("click");
        this.props.smalliconclick(this.state.configuration,this.state.type);
    }
    render() {
        let icon = "./svg/"+this.state.configuration.icon;
        let name = this.state.configuration.name;
        if(this.state.type=="base"){name = "base"+this.state.configuration.name;}

        return (
            <div  style={{position:"relative",flex:1,width:this.state.bricksize/2,boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD"}} >
                <button type="button" className="btn" style={{height:this.state.bricksize/2,width:this.state.bricksize/2,verticalAlign:"middle"}} onClick={this.handle_click.bind(this)} >
                    <i>
                        <img src={icon}  style={{height:this.state.bricksize*0.25,width:this.state.bricksize*0.25,marginTop:0}}></img><br/>
                        <a style={{position:"relative",height:this.state.bricksize*0.15,display:'table-cell',verticalAlign:'middle'}}>
                                <span className="framelabel"  style={{fontSize:this.state.bricksize*0.05,marginLeft:0}}>
                                    {name}
                                </span>
                        </a>
                    </i>
                </button>
            </div>
        );
    }
}