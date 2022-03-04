import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImgContainer extends Component {

    static defaultProps = {
        imgSrcs: [],
        imgWidth: 520,
        imgHeight: 280
    }
    static propTypes = {
        imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, // 图片路径
        imgWidth: PropTypes.number.isRequired, // 单张图片宽度
        imgHeight: PropTypes.number.isRequired, // 单张图片高度
        duration: PropTypes.number.isRequired // 在多长时间完成切换
    }

    // componentDidMount时调用
    containerRef = el => {
        this.div = el;

    }

    // 计时器间隔时间
    tick = 16
    timer = null;
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    /**
     * 切换到第几张图片
     * 调用该函数，此组件会经过一段动画完成切换
     * @param index 图片下标
     */
    switchTo(index) {
        if (index < 0) {
            index = 0;
        }
        if (index > this.props.length - 1) {
            index = this.props.length - 1;
        }
        // 根据index，计算div最终的marginLeft
        const targetLeft = - index * this.props.imgWidth;
        // 得到当前的marginLeft
        let curLeft = parseInt(getComputedStyle(this.div).marginLeft);
        // 计算运动的次数
        const times = Math.ceil(this.props.duration / this.tick);
        let curTimes = 0; // 当前运动的次数
        // 计算每次运动的距离
        const totalDis = targetLeft - curLeft; // 总距离
        const dis = totalDis / times; // 每次运动的距离
        // 启动之前停止之前的动画
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            curTimes ++;
            curLeft += dis;
            this.div.style.marginLeft = curLeft + "px";
            if(curTimes === times) {
                // 停止运动
                this.div.style.marginLeft = targetLeft + "px";
                clearInterval(this.timer);
            }
        }, this.tick)

    }

    render() {
        const imgs = this.props.imgSrcs.map((src, i) => <img src={src} key={i} alt="" style={{
            width: this.props.imgWidth,
            height: this.props.imgHeight,
            float: 'left'
        }} />)
        return (
            <div style={{
                width: this.props.imgWidth * this.props.imgSrcs.length,
                height: this.props.imgHeight
            }} ref={this.containerRef}>
                {imgs}
            </div>
        )
    }
}
