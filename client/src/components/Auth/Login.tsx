import React, {useEffect, useState} from 'react';
import "./auth.css"
import {useDispatch, useSelector} from "react-redux";
import {authActions, login} from '../../redux/reducers/auth-reducer';
import {AppStateType} from "../../redux/Store";
import {Button, Card, Form, Input, Layout, notification, Row} from "antd";


const Login: React.FC = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppStateType>(state => state.auth.error) as string
    const [cid, setCid] = useState("")
    const [password, setPassword] = useState("")
    const showError = () => {
        if(error) {
            notification.error({
                message: 'Authentication error',
                description: error,
                placement: 'topLeft',
                duration: 10,
            });
            dispatch(authActions.setAuthError(''))
        }
    }
    useEffect(showError,[error])
    function onFinish() {
        dispatch(login(cid,password))
    }
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card className="card">
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="ID"
                            name="ID"
                            rules={[{required: true, message: 'Please enter you ID'}]}
                        >
                            <Input onChange={(e) => setCid(e.target.value)} value={cid}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please enter your password!'}]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)}
                                            value={password}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;