import React, {SetStateAction} from 'react'
import { Button, Form } from 'semantic-ui-react'

export const Login = (props:{setLogin:React.Dispatch<React.SetStateAction<boolean>>, setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {  
    return (
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />

          <Button content='Login' primary onClick={() => {props.setLogin(true); props.setOpen(false);}}/>
        </Form>
    )
}
