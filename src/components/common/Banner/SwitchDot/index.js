import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class SwitchDot extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,  // 小点数量
        curIndex: PropTypes.number.isRequired, // 当前索引
        onChange: PropTypes.func
    }
  render() {
    let dots = [];  
    for(let i = 0; i < this.props.total; i ++) {
        dots.push(<span key={i} className={i===this.props.curIndex?'active':''}
            onClick={() => {
                this.props.onChange && this.props.onChange(i);
            }}></span>);
    }
    return (
      <div className='dot-container'>
          {dots}
      </div>
    )
  }
}
