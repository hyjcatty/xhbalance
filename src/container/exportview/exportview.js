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
import './exportview.css';



export default class exportview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            callback:null,
            margintop:20,
            configure:null,
            key:"sys_export_key",
            key2:"sys_export_input",
            retmsg:"message return:",
            language:{
                "consoletitle":"Export result",
                "sendbutton":"export",
                "retmsg":"message return:"
            },
        }
        //this.keyboard_initialize();
    }
    update_language(language){
        this.setState({language:language,retmsg:language.retmsg});
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
    }
    update_callback(callback){
        this.setState({callback:callback});
    }
    update_config(configure){
        this.setState({configure:configure});
    }
    update_msg(msg){
        this.setState({retmsg:msg});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handle_click_send(){
        this.state.callback(this.getUpdatedValue());
    }
    componentDidMount(){
        //this.keyboard_initialize();
    }
    componentDidUpdate(){
        this.switchery_initialize();
        this.keyboard_initialize();
    }
    handleChange(){

    }
    handleBlur(){

    }
    handleSave(){

    }
    switchery_initialize(){
        $(".sys-conf-checkbox-label").each(function(){
            $(this).find("span").each(function(){
                $(this).remove();
            });
        });
        /*
        let switchery_list = $("#preemption_tab").find("span").each(function(){
            $(this).remove();
        });*/
        if(this.state.configure!==null){

            for(let i=0;i<this.state.configure.parameter.groups.length;i++){
                for(let j=0;j<this.state.configure.parameter.groups[i].list.length;j++){
                    if(this.state.configure.parameter.groups[i].list[j].type === "checkbox"){
                        $("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).prop("checked",this.state.configure.parameter.groups[i].list[j].value);
                    }
                }

            }
        }

        if ($(".sys_conf_checkbox")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.sys_conf_checkbox'));
            console.log("switchery list lenght:"+elems.length);
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A'
                });
            });
        }
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

            $(".sys_debug_input_string").keyboard({
                display: {
                    'bksp'   :  "\u2190",
                    'accept' : 'accept',
                    'normal' : 'ABC',
                    'meta1'  : '.?123',
                    'meta2'  : '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // keyboard container
                    container: 'center-block well', // jumbotron
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
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'q w e r t y u i o p ',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        ' {space} {accept}'
                    ],
                    'shift': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'Q W E R T Y U I O P ',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M _ - {s}',
                        ' {space}  {accept}'
                    ]
                },
                visible: function(e, keyboard, el) {
                    keyboard.$preview[0].select();
                },
                validate: function(e, key, el) {

                    let max = e.$el.attr("data-max");
                    if(key.length>parseInt(max)){
                        e.$el.val(key.substr(0,parseInt(max)));
                        return false;
                    }else{
                        return true;
                    }

                }
            });
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
                }
            );
            $(".sys_debug_input_float").each(function(){
                $(this).keyboard({
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
                        // keyboard container
                        container: 'center-block well', // jumbotron
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
                            '1 2 3 {b}',
                            '4 5 6 -',
                            '7 8 9 .',
                            '0 {a} {c}'
                        ]
                    },
                    visible: function(e, keyboard, el) {
                        keyboard.$preview[0].select();
                    },
                    validate: function(e, key, el) {

                        let max = e.$el.attr("data-max");
                        let min = e.$el.attr("data-min");
                        if(parseFloat(key)>parseFloat(max)){
                            e.$el.val(parseFloat(max));
                            return false;
                        }else if(parseFloat(key)<parseFloat(min)){
                            e.$el.val(parseFloat(min));
                            return false;
                        }else{
                            e.$el.val(parseFloat(key));
                            return true;
                        }

                    }
                });
            });
            $(".sys_debug_input_int").each(function(){
                $(this).keyboard({
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
                        // keyboard container
                        container: 'center-block well', // jumbotron
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
                            '1 2 3 {b}',
                            '4 5 6 -',
                            '7 8 9 0',
                            '{a} {c}'
                        ]
                    },
                    visible: function(e, keyboard, el) {
                        keyboard.$preview[0].select();
                    },
                    validate: function(e, key, el) {

                        let max = e.$el.attr("data-max");
                        let min = e.$el.attr("data-min");
                        if(parseInt(key)>parseInt(max)){
                            e.$el.val(parseInt(max));
                            return false;
                        }else if(parseInt(key)<parseInt(min)){
                            e.$el.val(parseInt(min));
                            return false;
                        }else{
                            e.$el.val(parseInt(key));
                            return true;
                        }

                    }
                });
            });
        });

    }
    getUpdatedValue(){
        let config = this.state.configure;
        for(let i=0;i<1;i++){
            for(let j=0;j<config.parameter.groups[i].list.length;j++){
                if(config.parameter.groups[i].list[j].type === "int"){
                    config.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+config.parameter.groups[i].list[j].type).val();
                }
                if(config.parameter.groups[i].list[j].type === "float"){
                    config.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "string"){
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "choice"){
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).get(0).selectedIndex+"";//val();
                }
                if(this.state.configure.parameter.groups[i].list[j].type === "checkbox"){
                    this.state.configure.parameter.groups[i].list[j].value=$("#"+this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type).is(":checked");
                }
            }
        }
        return config;
    }
    render() {
        let groups1 = [];
        let grougs1size=0;
        let groups2 = [];
        let groups2size=0;
        if(this.state.configure!= null){

            for(let i=0;i<1;i++){
                let param = [];
                for(let j=0;j<this.state.configure.parameter.groups[i].list.length;j++){
                    if(this.state.configure.parameter.groups[i].list[j].type === "int"){
                        let contentline = "["+this.state.configure.parameter.groups[i].list[j].min+"->"+this.state.configure.parameter.groups[i].list[j].max+"]:"+this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_debug_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           value={this.state.configure.parameter.groups[i].list[j].value} onChange={this.handleChange} onBlur={this.handleBlur}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "float"){
                        let contentline = "["+this.state.configure.parameter.groups[i].list[j].min+"->"+this.state.configure.parameter.groups[i].list[j].max+"]:"+this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_debug_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon" style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           value={this.state.configure.parameter.groups[i].list[j].value} onChange={this.handleChange} onBlur={this.handleBlur}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "string"){
                        let contentline = this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_debug_input_"+this.state.configure.parameter.groups[i].list[j].type;
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                           key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                           value={this.state.configure.parameter.groups[i].list[j].value} onChange={this.handleChange} onBlur={this.handleBlur}
                                           data-min={this.state.configure.parameter.groups[i].list[j].min} data-max={this.state.configure.parameter.groups[i].list[j].max}/>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);
                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "choice"){
                        let contentline = this.state.configure.parameter.groups[i].list[j].note;
                        let className="form-control "+"sys_conf_choice";
                        let choice_items = [];
                        this.state.configure.parameter.groups[i].list[j].defaultvalue = this.state.configure.parameter.groups[i].list[j].items[parseInt(this.state.configure.parameter.groups[i].list[j].value)];
                        for(let k=0;k<this.state.configure.parameter.groups[i].list[j].items.length;k++){
                            choice_items.push(<option value={this.state.configure.parameter.groups[i].list[j].items[k]} key={"choice_item_"+i+"_"+j+"_"+k}>{this.state.configure.parameter.groups[i].list[j].items[k]}</option>);

                        }
                        param.push(
                            <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div className="input-group">
                                    <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configure.parameter.groups[i].list[j].paraname+":"}</span>
                                    <select className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                            key={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} data-group={i} data-parameter={j}
                                            onChange={this.handleChange} onBlur={this.handleBlur}
                                            defaultValue={this.state.configure.parameter.groups[i].list[j].defaultvalue} >{choice_items}</select>
                                </div>
                                <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>
                            </div>);



                    }
                    if(this.state.configure.parameter.groups[i].list[j].type === "checkbox"){
                        if(this.state.configure.parameter.groups[i].list[j].value){

                            let temp =<div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div>
                                <label className="sys-conf-checkbox-label" style={{fontSize: "16px",color:"#555"}}>
                                    {this.state.configure.parameter.groups[i].list[j].paraname+":"}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} className="js-switch sys_conf_checkbox" defaultChecked="checked" onChange={this.handleChangecheck} data-switchery="true" value="on"/>
                                </label>
                            </div></div>;
                            param.push(temp);
                        }else{
                            let temp = <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} key={this.state.key+i+"p"+j+"l"}>
                                <div>
                                <label className="sys-conf-checkbox-label" style={{fontSize: "16px",color:"#555"}}>
                                    {this.state.configure.parameter.groups[i].list[j].paraname+":"}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id={this.state.key2+"G"+i+"P"+j+this.state.configure.parameter.groups[i].list[j].type} className="js-switch sys_conf_checkbox" onChange={this.handleChangecheck} data-switchery="true" value="on"/>
                                </label>
                            </div></div>;
                            param.push(temp);
                        }
                    }
                }
                    groups1.push(
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+i+"p"}>
                            <div className="tile-stats" key={"debug_group_"+this.state.configure.parameter.groups[i].groupname} style={{marginTop:"15px"}}>
                                <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.configure.parameter.groups[i].groupname}</div>
                                {param}
                            </div>
                        </div>
                    );
                    grougs1size = grougs1size+this.state.configure.parameter.groups[i].list.length;
                


            }
            groups2.push(
            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+"output"}>
                <div className="tile-stats" key={"debug_group_right"} style={{marginTop:"15px"}}>
                    <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.consoletitle}</div>
                    <label  style={{width:"90%",height:this.state.height*0.65,marginLeft:"15px"}}>{this.state.retmsg}</label>
                    <button  type="button" className="btn btn-warning btn-sm pull-right" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height*0.1),width:(this.state.height*0.1)}} onClick={this.handle_click_send.bind(this)}>
                        <i style={{color:"#333",fontSize:"15px",fontWeight:"bold"}}> {this.state.language.sendbutton}</i>
                    </button>
                </div>
            </div>
            );

        }

        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="container">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups1}
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups2}
                    </div>
                </div>
            </div>
        );
    }
}