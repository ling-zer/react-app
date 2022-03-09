import React, { Component } from 'react'
import { Provider } from './FormContext'
import Input from './Input'
import PropTypes from 'prop-types'
import Button from './Button'

export default class Form extends Component {
    state = {
        formData: { //表单数据对象

        },
        // 修改formData中的数据
        changeFormData: (name, val) => {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [name]: val //要进行覆盖的参数
                }
            })
        },
        submit: () => {
            this.props.onSubmit && this.props.onSubmit(this.state.formData);
        }
    }
    static propTyeps = {
        onSubmit: PropTypes.func
    }
    render() {
        return (
            <div>
                <Provider value={this.state}>
                    {this.props.children}
                </Provider>

            </div>

        )
    }
}

Form.Input = Input;
Form.Button = Button;