import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { TargetUrl } from '../models/DirectUrl';
import { Costumers } from './Customers';
import NavBar from '../layout/nav/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { IUserInfo } from '../redux/reducer';
import { ICustomer } from '../interfaces/ICustomer';

const jwt = require('jsonwebtoken');
const SECRET = 'equipment-service';

export const Login = () => {
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");

  const [login, setLogin] = useState(false);

  const dispatch = useDispatch();


  const userInfo = useSelector(s => s) as IUserInfo;
  useLayoutEffect(() => {
    if (localStorage.getItem("login") === "true") {
      // const decode = jwt.verify(userInfo.token, "equipment-service");
      setLogin(true);
    }
  }, []);

  const loginCheck = () => {
    fetch(TargetUrl("Default", "Login"), {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
        pwd: pwd
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json()
    }).then((result) => {
      if (result) {
        setLogin(result);
        dispatch({ type: "SET_UID", value: uid });
        dispatch({ type: "SET_PWD", value: pwd });

        const payload = { uid: uid, pwd: pwd };
        const token = jwt.sign(payload, SECRET, { expiresIn: '60s' });
        dispatch({ type: "SET_TOKEN", value: token });
        localStorage.setItem("uid", uid);
        localStorage.setItem("pwd", pwd);
        localStorage.setItem("login", "true");
      }
      else {
        alert("帳號或密碼錯誤");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const refresh = useRef<any>();

  return (
    <Fragment>
      <NavBar refresh={refresh} login={login} setLogin={value => setLogin(value)} />
      {login ?
        <Costumers ref={refresh} login={login} /> :
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

                  <Button content="登入" primary onClick={loginCheck} />
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