import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './FormContext'

export default class Input extends Component {
    // 必须拥有静态属性 contextType, 应该赋值为创建的上下文对象
    static contextType = ctx;

    static defaultProps = {
        type: 'text'
    }
    static propTypes = {
        name: PropTypes.string.isRequired, // 文本框的名称
        type: PropTypes.string.isRequired  // 文本框的类型
    }
  render() {
    return (
      <input 
        value={this.context.formData[this.props.name] || ""} 
        onChange={e => {
            this.context.changeFormData && this.context.changeFormData(this.props.name, e.target.value)
        }}
        type={this.props.type} 
        name={this.props.name} />
    )
  }
}
