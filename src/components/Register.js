import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';

function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { register } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        let email = emailRef.current.value
        let password = passwordRef.current.value
        let passwordConfirm = passwordConfirmRef.current.value
        e.preventDefault()

        if(password !== passwordConfirm) {
            return setError('Passwords do not match...')
        }

        try {
            setIsLoading(true)
            register(email, password)
        } catch {
            setIsLoading(false)
            setError('Failed to register...')
        }
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef}/>
                        </Form.Group>

                        <Button disabled={isLoading} className='w-100 text-center mt-2' type='submit'>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div>Already have an account? Log In</div>
        </>
    )
}

export default Register