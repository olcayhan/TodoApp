import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useTodo } from '../contexts/TodoContext';
import { useNavigate } from "react-router-dom"

export default function SignUpScreen() {

    const { registerUser, user } = useTodo()
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        fullname: "",
        password: "",
        phoneNumber: "",
        email: "",
    })

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (
            formData.password.length >= 8 &&
            formData.fullname.length >= 3 &&
            formData.phoneNumber.length >= 10 &&
            formData.email.length >= 5
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [formData])

    return (
        <Container className='signup-screen'>
            <Row className='justify-content-center'>
                <Col xs={12} md={6}>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        registerUser(formData)
                        if(user !== null) navigate("/signin")
                    }}>
                        <Form.Group className='mb-3 mt-4 text-light' controlId='formBasicEmail'>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} type='text' placeholder='Enter name' />
                        </Form.Group>

                        <Form.Group className='mb-3 text-light' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='Enter email' />
                        </Form.Group>

                        <Form.Group className='mb-3 text-light' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password' />
                        </Form.Group>

                        <Form.Group className='mb-3 text-light' controlId='formBasicPassword'>
                            <Form.Label>Password Again</Form.Label>
                            <Form.Control type='password' placeholder='Enter password again' />
                        </Form.Group>

                        <Form.Group className='mb-3 text-light' controlId='formBasicPassword'>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} type='text' placeholder='Phone number' />
                        </Form.Group>

                        <Form.Group className='d-grid'>
                            <Button disabled={disabled} type='submit' variant='primary' size='lg' style={{ backgroundColor: "#AC4425", border: "none", marginTop: "15px" }}>
                                Sign Up
                            </Button>
                            <Form.Text className='text-center text-light mt-2'>
                                Do you have an Account ?
                                <Link to="/" className='little-signin'>Sign In</Link>
                            </Form.Text>

                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}
