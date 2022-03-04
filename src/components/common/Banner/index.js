import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'
import ImgContainer from './ImgContainer' 
import SwitchArrow from './SwitchArrow'
import SwitchDot from './SwitchDot'

export default class Banner extends Component {

    static defaultProps = {
        width: 520,
        height: 280,
        imgSrcs: [],
        autoDuration: 3000,
        duration: 500
    }

    static propTypes ={
        width: PropTypes.number.isRequired,  // 容器宽度
        height: PropTypes.number.isRequired,  // 容器高度
        imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, // 图片地址
        autoDuration: PropTypes.number.isRequired, // 自动切换的间隔时间 
        duration: PropTypes.number.isRequired, // 完成一次切换的时间
    }

    timer = null; // 自动切换的计时器

    autoSwitch() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let cur = this.state.curIndex;
            cur ++;
            if(cur > this.props.imgSrcs.length - 1) {
                cur = 0
            }
            this.handleSwitch(cur)
        }, this.props.autoDuration)
    }
    componentDidMount() {
        this.autoSwitch();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    state = {
        curIndex: 0 // 当前图片的索引
    }

    imgContainerRef = el => {
        this.imgContainer = el;
    }
    /**
     * 切换到
     */
    handleSwitch = index => {
        this.imgContainer.switchTo(index)
        this.setState({
            curIndex: index
        })
    }
    /**
     * 处理左右切换
     * @param {*} type 
     */
    handleArrowChange = type => {
        let cur = this.state.curIndex
        if(type === 'left') {
            cur --;
            if(cur < 0) {
                cur = this.props.imgSrcs.length - 1;
            }
        } else if(type === 'right') {
            cur ++;
            if(cur > this.props.imgSrcs.length - 1) {
                cur = 0;
            }
        }
        
        this.handleSwitch(cur);
    }

  render() {
    return (
      <div className="banner-container" style={{
          width: this.props.width,
          height: this.props.height
          }}
          onMouseEnter={()=>{
              clearInterval(this.timer);
          }}
          onMouseLeave={()=> {
              this.autoSwitch();
          }}>
          <ImgContainer
            ref={this.imgContainerRef} 
            imgSrcs={this.props.imgSrcs} 
            imgWidth={this.props.width} 
            imgHeight={this.props.height}
            duration={this.props.duration}/>
            <SwitchArrow width={this.props.width} onChange={this.handleArrowChange}/>
            <SwitchDot 
                total={this.props.imgSrcs.length} 
                curIndex={this.state.curIndex}
                onChange={this.handleSwitch}/>
      </div>
    )
  }
}
