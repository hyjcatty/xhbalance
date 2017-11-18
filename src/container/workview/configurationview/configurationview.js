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
            head:"none",
            switchlist:[],
            language:{
                "configurename":"CONFIG NAME",
                "icon":"icon:",
                "preemption":"Preemption:",
                "detailparameter":"Detail Parameter:"
            },
            drag:null
        }
        this._iconcallback = this.handle_icon_selection.bind(this);
        //this.keyboard_initialize();

    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        //console.log("configurationview width:"+width+",height:"+height);


    }
    update_iconlist(iconlist){
        this.setState({iconlist:iconlist});

    }
    update_sub_props(){
        for(let i=0;i<this.state.iconlist.length;i++){
            this.refs[this.state.key3+i].updateprop(this.state.iconlist[i],this.state.bricksize);
        }
    }
    update_drag(drag){
        this.setState({drag:drag});
    }
    hide(){
        this.setState({hide:"none"});
        //this.switchery_distory();
    }
    show(){
        this.setState({hide:"block"},this.handdrag);

    }
    handdrag(){

        this.state.drag("configurationview");
        this.state.drag("iconselectview");
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

        //console.log("choice icon:"+icon);
        this.setState({defaulticon:icon,configuration:tempconfigure});
        this.module_hide();
    }
    save_configuration(){
        return this.state.configuration;
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

            $('#ConfigureName_Input').keyboard({
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
            $('.configure_input').each(function(){
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

        });

    }
    switchery_initialize(){
        /*
         for(let i=0;i<16;i++){
         var switchery = new Switchery($("#Configure_Balance_"+i), {
         color: '#26B99A'
         });
         this.state.switchlist.push(switchery);
         }
         console.log("switchery list lenght:"+this.state.switchlist.length);*/
        let switchery_list = $("#preemption_tab").find("span").each(function(html){
            $(this).remove();
        });

        /*
        if ($(".switchery-default")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery-default'));
            //console.log("switchery list lenght:"+elems.length);
            elems.forEach(function (html) {
                html.remove();
            });
        }*/
        if(this.state.configuration!==null){

            for(let i=0;i<16;i++){
                $("#Configure_Balance_"+i).prop("checked",this.state.configuration.parameter.preemption[i]);
            }
        }

        if ($(".configure-js-switch")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.configure-js-switch'));
            console.log("switchery list lenght:"+elems.length);
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A'
                });
            });
        }
    }
    componentDidMount(){
        //this.keyboard_initialize();

    }
    componentDidUpdate(){
        this.switchery_initialize();
        this.keyboard_initialize();
    }
    getUpdatedValue(){
        let output = this.state.configuration;
        let name = $("#ConfigureName_Input").val();
        if(name === "" && output.name ===""){
            $("#ConfigureName_Input").focus();
            return "";
        }else if(name !== ""){

            output.name=name;
        }

        $('.configure_input').each(function(){
            let group_sequence = $(this).attr("data-group");
            let para_sequence = $(this).attr("data-parameter");
            //console.log("group_sequence:"+group_sequence+"para_sequence:"+para_sequence);
            let value=$(this).val();
            //console.log(output);
            output.parameter.groups[parseInt(group_sequence)].list[parseInt(para_sequence)].value = value;
        });
        $('.configure_choice').each(function(){
            let group_sequence = $(this).attr("data-group");
            let para_sequence = $(this).attr("data-parameter");
            //console.log("group_sequence:"+group_sequence+"para_sequence:"+para_sequence);
            let value=$(this).get(0).selectedIndex+"";//val();.val();
            //console.log(output);
            output.parameter.groups[parseInt(group_sequence)].list[parseInt(para_sequence)].value = value;
        });
        for(let i=0;i<16;i++){
            //console.log($("#Configure_Balance_"+i));
            //console.log($("#Configure_Balance_"+i).is(":checked"));
            this.state.configuration.parameter.preemption[i]=$("#Configure_Balance_"+i).is(":checked");
        }
        return output;
    }
    handleChange(e){
    }
    handleChangecheck(e){
        /*
        for(let i=0;i<16;i++){
            //console.log($("#Configure_Balance_"+i));
            console.log("Configure_Balance_"+i+":"+$("#Configure_Balance_"+i).is(":checked"));
            //this.state.configuration.parameter.preemption[i]=$("#Configure_Balance_"+i).is(":checked");
        }
        $("#Configure_Balance_1").prop("checked",true);

        for(let i=0;i<16;i++){
            //console.log($("#Configure_Balance_"+i));
            console.log("Configure_Balance_"+i+":"+$("#Configure_Balance_"+i).is(":checked"));
            //this.state.configuration.parameter.preemption[i]=$("#Configure_Balance_"+i).is(":checked");
        }*/
        /*
        let handleid = e.currentTarget.getAttribute("id");
        console.log(handleid);
        $("#"+handleid).checked=!($("#"+handleid).checked);*/
    }
    handleBlur(e){/*
        let handleid = e.currentTarget.getAttribute("id");
        console.log(handleid);
        let handle = $("#"+handleid);
        console.log("key="+handle.val()+";min="+handle.attr("data-min")+";max="+handle.attr("data-max"));
        let max = parseFloat(handle.attr("data-max"));
        let min = parseFloat(handle.attr("data-min"));
        let value = parseFloat(handle.val());
        console.log("key="+value+";min="+min+";max="+max);
        if(value<min){
            handle.val(min);
        }
        else if(value>max){
            handle.val(max);
        }else  {
            handle.val(value);
        }*/
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
                if(this.state.configuration.parameter.groups[i].list[j].max!==""){
                    let contentline = "["+this.state.configuration.parameter.groups[i].list[j].min+"->"+this.state.configuration.parameter.groups[i].list[j].max+"]:"+this.state.configuration.parameter.groups[i].list[j].note;
                    content.push(<div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+i+"p"+j+"1"}>{this.state.configuration.parameter.groups[i].list[j].paraname}</div>);
                    content.push(<h3 style={{fontSize:14,marginRight:5}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>);
                    content.push(<input type="text" className="form-control configure_input" placeholder="CONFIG Value" aria-describedby="basic-addon1" key={this.state.key2+"G"+i+"P"+j+"input"} id={"Para_G"+i+"P"+j+"_input"} data-group={i} data-parameter={j} value={this.state.configuration.parameter.groups[i].list[j].value} onChange={this.handleChange} onBlur={this.handleBlur} data-min={this.state.configuration.parameter.groups[i].list[j].min} data-max={this.state.configuration.parameter.groups[i].list[j].max}/>);
                }else{
                    this.state.configuration.parameter.groups[i].list[j].defaultvalue = this.state.configuration.parameter.groups[i].list[j].items[parseInt(this.state.configuration.parameter.groups[i].list[j].value)];

                    let contentline = this.state.configuration.parameter.groups[i].list[j].note;
                    content.push(<div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+i+"p"+j+"1"}>{this.state.configuration.parameter.groups[i].list[j].paraname}</div>);
                    content.push(<h3 style={{fontSize:14,marginRight:5}}  key={this.state.key2+i+"p"+j+"2"}>{contentline}</h3>);
                    let choice_items = [];
                    for(let k=0;k<this.state.configuration.parameter.groups[i].list[j].items.length;k++){
                        /*
                        if(this.state.configuration.parameter.groups[i].list[j].value === this.state.configuration.parameter.groups[i].list[j].items[k]){
                            choice_items.push(<option value={this.state.configuration.parameter.groups[i].list[j].items[k]} selected="selected" key={"choice_item_"+i+"_"+j+"_"+k}>{this.state.configuration.parameter.groups[i].list[j].items[k]}</option>);

                        }else{
                            choice_items.push(<option value={this.state.configuration.parameter.groups[i].list[j].items[k]} key={"choice_item_"+i+"_"+j+"_"+k}>{this.state.configuration.parameter.groups[i].list[j].items[k]}</option>);
                        }*/
                        choice_items.push(<option value={this.state.configuration.parameter.groups[i].list[j].items[k]} key={"choice_item_"+i+"_"+j+"_"+k}>{this.state.configuration.parameter.groups[i].list[j].items[k]}</option>);

                    }
                    content.push(<select className="form-control configure_choice" placeholder="CONFIG Value" aria-describedby="basic-addon1" key={this.state.key2+"G"+i+"P"+j+"Choice"} id={"Para_G"+i+"P"+j+"_Choice"} data-group={i} data-parameter={j} onChange={this.handleChange}
                                         defaultValue={this.state.configuration.parameter.groups[i].list[j].defaultvalue} >{choice_items}</select>);

                }

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
        let preemption =[];
        for(let i=0;i<this.state.configuration.parameter.preemption.length;i++){
            if(this.state.configuration.parameter.preemption[i]){
                let temp =<div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i} >
                    <label>
                        <input type="checkbox" id={"Configure_Balance_"+i} className="js-switch configure-js-switch" defaultChecked="checked" onChange={this.handleChangecheck} data-switchery="true" value="on"/> {"balance_"+i}
                    </label>
                </div>;
                preemption.push(temp);
            }else{
                let temp = <div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i} >
                    <label>
                        <input type="checkbox" id={"Configure_Balance_"+i} className="js-switch configure-js-switch"  data-switchery="false" value="off" onChange={this.handleChangecheck}/> {"balance_"+i}
                    </label>
                </div>;
                preemption.push(temp);
            }

        }
/*
        for(let i=0;i<this.state.configuration.parameter.preemption.length;i++){
            if(this.state.configuration.parameter.preemption[i]){
                let temp =<div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i} ><label>
                        <input type="checkbox" className="js-switch" id={"Configure_Balance_"+i}  defaultChecked="checked" onChange={this.handleChangecheck} data-switchery="true" style={{display: "none"}}/>
                        <span className="switchery switchery-default" style={{borderColor: "#26b99a", boxshadow: "#26b99a 0px 0px 0px 11px inset", transition: "border 0.4s, box-shadow 0.4s, background-color 1.2s", backgroundColor: "#26b99a"}}>
                        <small style={{left: "12px", transition: "background-color 0.4s, left 0.2s", backgroundColor: "#ffffff"}}></small>
                        </span> {"balance_"+i}
                        </label></div>;
                preemption.push(temp);
            }else{
                let temp = <div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i} ><label>
                    <input type="checkbox" className="js-switch" id={"Configure_Balance_"+i}   onChange={this.handleChangecheck} data-switchery="true" style={{display: "none"}}/>
                        <span className="switchery switchery-default" style={{borderColor: "#dfdfdf", boxshadow: "#dfdfdf 0px 0px 0px 11px inset", transition: "border 0.4s, box-shadow 0.4s", backgroundColor: "#FFFFFF"}}>
                        <small style={{left: "0px", transition: "background-color 0.4s, left 0.2s"}}></small>
                        </span> {"balance_"+i}
                </label></div>;
                preemption.push(temp);
            }

        }*/
        /*
        for(let i=0;i<this.state.configuration.parameter.preemption.length;i++){
            if(this.state.configuration.parameter.preemption[i]){
                let temp = <div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i} >
                    <label>
                        <input type="checkbox"  id={"Configure_Balance_"+i} className="flat" defaultChecked="checked" onChange={this.handleChangecheck} /> {"balance_"+i}
                    </label>
                </div>;
                preemption.push(temp);
            }else{
                let temp = <div className = "col-xs-3 col-md-3 col-sm-3 col-lg-3" key={"preemption_"+i}>
                    <label>
                        <input type="checkbox" id={"Configure_Balance_"+i} className="flat" onChange={this.handleChangecheck}/> {"balance_"+i}
                    </label>
                </div>;
                preemption.push(temp);
            }

        }*/
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div className="x_content" id = 'configurationview'  style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'scroll',overflowX:'hidden'}}>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{display:this.state.head}}>
                        <h4>&nbsp;</h4>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head}}>
                            <div className="input-group">
                                <span className="input-group-addon" id="CONFIG_NAME" style={{minWidth: "150px"}}>{this.state.language.configurename}</span>
                                <input type="text" className="form-control" placeholder={this.state.language.configurename} aria-describedby="basic-addon1" id="ConfigureName_Input" value="" />
                            </div>
                        </div>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head,margonTop:50}}>
                            <h4>{this.state.language.icon}</h4>
                            <div  style={{marginTop:this.state.bricksize/5,marginLeft:this.state.bricksize/5,marginRight:this.state.bricksize/5,marginBottom:this.state.bricksize/5,
                            width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                                <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.module_show.bind(this)}><i>
                                    <img src={"./svg/"+this.state.configuration.icon}  style={{height:this.state.bricksize*0.5,width:this.state.bricksize*0.5,marginTop:0}} ></img><br/>
                                </i></button>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                            <h4>{this.state.language.preemption}</h4>
                        </div>
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 "  id="preemption_tab">
                            {preemption}
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                            <h4>{this.state.language.detailparameter}</h4>
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
                            <div id='iconselectview' className="modal-body" style={{height:this.state.height*0.75,maxHeight:this.state.height*0.75,overflow:"scroll",overflowX:"hidden"}}>

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
