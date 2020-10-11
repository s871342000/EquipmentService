import React, { Fragment, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Costumers } from './Customers';
import NavBar from './nav/NavBar';

export const Login = () => {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [login, setLogin] = useState(false);

  let loginCheck = () => {
    if (uid == "admin" && pwd == "admin") {
      return true;
    }

    return false;
  }

  return (
    <Fragment>
      <NavBar login={login} setLogin={value => setLogin(value)} />
      {login ? <Costumers login={login} /> :
        // <Login setLogin={value => setLogin(value)}/> 
        <Segment id="login">
          <Form >
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

            <Button content="登入" primary onClick={() => { setLogin(loginCheck()) }} />
          </Form>
        </Segment>
      }
    </Fragment>


  )
}

export default Login;