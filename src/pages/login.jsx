import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Đăng nhập</legend>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống!'
                                    },
                                    {
                                        type: "email",
                                        message: "Sai định dạng email kìa ô cháu"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password không được để trống!'
                                    }
                                ]}
                            >
                                <Input.Password
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter')
                                            form.submit()
                                    }}
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Login
                                    </Button>
                                    <Link to={"/"}>Go to homepage <ArrowRightOutlined /></Link>
                                </div>
                            </Form.Item>
                        </Form>

                        <Divider />

                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <a href="/register">Đăng ký tại đây</a>
                        </div>
                    </fieldset>
                </Col>
            </Row>

        </>
    )
}

export default LoginPage