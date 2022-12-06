// import needed library and routers
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useTodo } from '../contexts/TodoContext';
import { useNavigate } from "react-router-dom"


export default function AuthScreen() {

    // navigate to screen
    const { loginUser, signin } = useTodo()
    const navigate = useNavigate()

    signin && navigate("/home")
    //setting form 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    return (

        <Container className="authscreen">
            <Row className='justify-content-center'>
                <Col xs={12} md={6}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        loginUser(formData)
                    }}>
                        <Form.Group className='mb-3 text-light mt-4' controlId='formBasicEmail' >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                type='email'
                                placeholder='Enter email' />
                        </Form.Group>

                        <Form.Group className='mb-3 text-light' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                type='password'
                                placeholder='Password' />
                        </Form.Group>

                        <Form.Group className='d-grid'>
                            <Button
                                disabled={formData.email === "" || formData.password === ""} type='submit' size="lg"
                                style={{ backgroundColor: "#AC4425", border: "none" }}>
                                Sign In
                            </Button>
                            <Form.Text className='text-center mt-2 text-light'>
                                Don't have an Account ?
                                <Link to="/signup" className='little-signup'>Sign Up</Link>
                            </Form.Text>

                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
