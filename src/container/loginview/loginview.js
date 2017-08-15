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
            margintop:20,
            language:{
                "title":"System Login",
                "username":"UserName",
                "password":"PassWord",
                "confirm":"Login"
            }
        }
        //this.keyboard_initialize();
    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        var _modal = document.getElementById("kuang");
        var module_height = _modal.offsetHeight;
        if(((height - module_height)/2)>0){
            //console.log("Login marginTop:"+parseInt((height - module_height)/2));
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
    componentDidMount(){
        this.keyboard_initialize();
        //$("#Password").blur();
    }
    componentDidUpdate(){
        //this.switchery_initialize();
        //this.keyboard_initialize();
    }
    keyboard_initialize(){
        $.extend( $.keyboard.altKeys, {
            1   : '\u2460 \u2474 \u2488 \u2776 \u278a \u2780',
            '!' : '\u00a1 \u2762 \u2763', // adding two more exclamation points!
            2   : '\u2461 \u2475 \u2489 \u2777 \u278b \u2781',
            3   : '\u2462 \u2476 \u248a \u2778 \u278c \u2782',
            4   : '\u2463 \u2477 \u248b \u2779 \u278d \u2783',
            5   : '\u2464 \u2478 \u248c \u277a \u278e \u2784',
            6   : '\u2465 \u2479 \u248d \u277b \u278f \u2785',
            7   : '\u2466 \u247a \u248e \u277c \u2790 \u2786',
            8   : '\u2467 \u247b \u248f \u277d \u2791 \u2787',
            9   : '\u2468 \u247c \u2490 \u277e \u2792 \u2788',
            0   : '\u2469 \u247d \u2491 \u277f \u2793 \u2789',
            '[' : '\u25c0 \u25c1 \u25c2 \u25c3 \u25c4 \u25c5 \u261a \u261c', // left arrows
            ']' : '\u25b6 \u25b7 \u25b8 \u25b9 \u25ba \u25bb \u261b \u261e', // right arrows
            // action keys the "!!" makes the button get the "ui-state-active" (set by the css.buttonActive option)
            'enter' : '{!!clear} {!!a} {!!c}',
            // smileys, card suits, & other symbols
            '\u263a' : '\u2639 \u263b \u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2766 \u2767 \u263c \u263d \u263e \u2605 \u2606',
            // symbols with 4+ arms
            '\u2719' : '\u271a \u271b \u271c \u271d \u271e \u271f \u2720 \u2721 \u2722 \u2723 \u2724 \u2725 \u2726 \u2727 \u2729 \u272a \u272b \u272c \u272d \u272e \u272f \u2730 \u2731 \u2732 \u2733 \u2734 \u2735 \u2736 \u2737 \u2738 \u2739 \u273a \u273b \u273c \u273d \u273e \u273f \u2740 \u2741 \u2742 \u2743 \u2744 \u2745 \u2746 \u2747 \u2748 \u2749 \u274a \u274b \u2756'
        });

        $(function(){
            $('.login_password').keyboard({
                display: {
                    'bksp': "\u2190",
                    'accept': 'accept',
                    'normal': 'ABC',
                    'meta1': '.?123',
                    'meta2': '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // input & preview
                    input: 'form-control input-sm',
                    // keyboard container
                    container: 'center-block dropdown-menu', // jumbotron
                    // default state
                    buttonDefault: 'btn btn-default',
                    // hovered button
                    buttonHover: 'btn-primary',
                    // Action keys (e.g. Accept, Cancel, Tab, etc);
                    // this replaces "actionClass" option
                    buttonAction: 'active',
                    // used when disabling the decimal button {dec}
                    // when a decimal exists in the input area
                    buttonDisabled: 'disabled'
                },
                customLayout: {
                    'normal': [
                        'q w e r t y u i o p {bksp}',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'shift': [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M ! ? {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'meta1': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        '- / : ; ( ) \u20ac & @ {enter}',
                        '{meta2} . , ? ! \' " {meta2}',
                        '{normal} {space} {normal} {accept}'
                    ],
                    'meta2': [
                        '[ ] { } # % ^ * + = {bksp}',
                        '_ \\ | ~ &lt; &gt; $ \u00a3 \u00a5 {enter}',
                        '{meta1} . , ? ! \' " {meta1}',
                        '{normal} {space} {normal} {accept}'
                    ]
                },
                visible: function(e, keyboard, el) {
                    //console.log(keyboard.$preview);
                    keyboard.$preview.val("");
                }
            });
            $('.login_user').keyboard({
                display: {
                    'bksp': "\u2190",
                    'accept': 'accept',
                    'normal': 'ABC',
                    'meta1': '.?123',
                    'meta2': '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // input & preview
                    input: 'form-control input-sm',
                    // keyboard container
                    container: 'center-block dropdown-menu', // jumbotron
                    // default state
                    buttonDefault: 'btn btn-default',
                    // hovered button
                    buttonHover: 'btn-primary',
                    // Action keys (e.g. Accept, Cancel, Tab, etc);
                    // this replaces "actionClass" option
                    buttonAction: 'active',
                    // used when disabling the decimal button {dec}
                    // when a decimal exists in the input area
                    buttonDisabled: 'disabled'
                },
                customLayout: {
                    'normal': [
                        'q w e r t y u i o p {bksp}',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'shift': [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M ! ? {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'meta1': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        '- / : ; ( ) \u20ac & @ {enter}',
                        '{meta2} . , ? ! \' " {meta2}',
                        '{normal} {space} {normal} {accept}'
                    ],
                    'meta2': [
                        '[ ] { } # % ^ * + = {bksp}',
                        '_ \\ | ~ &lt; &gt; $ \u00a3 \u00a5 {enter}',
                        '{meta1} . , ? ! \' " {meta1}',
                        '{normal} {space} {normal} {accept}'
                    ]
                },
                visible: function(e, keyboard, el) {
                    keyboard.$preview[0].select();
                }
            });
        });

    }
    render() {
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden',backgroundImage: "url(./resource/image/ctw.png)"}}>
                <div className="container">
                    <div className="leaderboard" style={{marginTop: this.state.margintop}}>
                        <div className="panel panel-default" id="kuang" >
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.state.language.title}</h3>
                            </div>
                            <div className="panel-body">
                                <div className="input-group">
                                    <span className="input-group-addon" id="Username" style={{minWidth: "100px",fontSize:"15px"}}>{this.state.language.username}</span>
                                    <input type="text" className="form-control login_user" placeholder={this.state.language.username} aria-describedby="basic-addon1" id="Username_Input"/>
                                </div>
                                <p></p>
                                <div className="input-group">
                                    <span className="input-group-addon" id="Password" style={{minWidth: "100px",fontSize:"15px"}}>{this.state.language.password}</span>
                                    <input type="password" className="form-control login_password" placeholder={this.state.language.password} aria-describedby="basic-addon1" id="Password_Input"/>
                                </div>
                                <p></p>
                                <button type="button" id="Login_Comfirm" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px"}} onClick={this.handle_login.bind(this)} >
                                    {this.state.language.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}