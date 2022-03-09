import React, { Component } from 'react'
import Form from '.'
export default class Test extends Component {
  render() {
    return (
      <div>
          <Form onSubmit={datas => {
              console.log(datas)
          }}>
              <div>
                  账号：<Form.Input name="loginId"/>
              </div>
              <div>
                  密码：<Form.Input name="loginPwd" type="password"/>
              </div>
              <div>
                  提交：<Form.Button>提交</Form.Button>
              </div>
          </Form>
      </div>
    )
  }
}
