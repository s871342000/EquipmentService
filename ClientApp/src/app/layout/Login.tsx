import React, { Fragment, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { TargetUrl } from '../models/DirectUrl';
import { Costumers } from './Customers';
import NavBar from '../layout/nav/NavBar';

export const Login = () => {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, setLogin] = useState(false);

  let loginCheck = () => {
    fetch(TargetUrl("Default", "Login"), {
      method: "POST",
      body: JSON.stringify({ Uid: uid, Pwd: pwd }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json()
    }).then((result) => {
      result ? setLogin(result) : alert("帳號或密碼錯誤");
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Fragment>
      <NavBar login={login} setLogin={value => setLogin(value)} />
      {login ? <Costumers login={login} /> :
        <div className="container">
          <div className="row vh-100 align-items-center">
            <div className="col-auto mx-auto">
              <Segment>
                <Form>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='帳號'
                    placeholder='Username'
                    value={uid}
                    onChange={(event) => setUid(event.target.value)}
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='密碼'
                    type='password'
                    value={pwd}
                    onChange={(event) => setPwd(event.target.value)}
                  />

                  <Button content="登入" primary onClick={() => { loginCheck() }} />
                </Form>
              </Segment>
            </div>
          </div>
        </div >
      }
    </Fragment >
  )
}

export default Login;