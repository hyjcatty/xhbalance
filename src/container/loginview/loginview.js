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
import '../../../resource/css/font-awesome.min.css';
import './loginview.css';



export default class unlockview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            hide:"block",
            callback:null,
            margintop:20
        }
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        var _modal = document.getElementById("kuang");
        var module_height = _modal.offsetHeight;
        if(((height - module_height)/2)>0){
            this.setState({margintop:parseInt((height - module_height)/2)});
        }
    }
    update_callback(callback){
        this.setState({callback:callback});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handle_login(){
        let username=document.getElementById("Username_Input").value;
        let password=document.getElementById("Password_Input").value;
        if (username === "") {
            document.getElementById("Username_Input").focus();
            return;
        }
        if (password === "") {
            document.getElementById("Password_Input").focus();
            return;
        }
        this.state.callback(username,password);
    }
    render() {
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="container">
                    <div className="leaderboard" style={{marginTop: this.state.margintop}}>
                        <div className="panel panel-default" id="kuang" >
                            <div className="panel-heading">
                                <h3 className="panel-title">系统登陆</h3>
                            </div>
                            <div className="panel-body">
                                <div className="input-group">
                                    <span className="input-group-addon" id="Username" style={{minWidth: "100px"}}>用户名</span>
                                    <input type="text" className="form-control" placeholder="用户名" aria-describedby="basic-addon1" id="Username_Input"/>
                                </div>
                                <p></p>
                                <div className="input-group">
                                    <span className="input-group-addon" id="Password" style={{minWidth: "100px"}}>密码</span>
                                    <input type="password" className="form-control" placeholder="密码" aria-describedby="basic-addon1" id="Password_Input"/>
                                </div>
                                <p></p>
                                <button type="button" id="Login_Comfirm" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px"}} onClick={this.handle_login.bind(this)} >
                                    登陆
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}