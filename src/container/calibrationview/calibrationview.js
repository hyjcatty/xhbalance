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
import Light from '../workview/billboardview/billlabel/light.js';


export default class calibrationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            key:"calibrationbutton",
            key2:"calibrationlight",
        }
        //this.keyboard_initialize();
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
}