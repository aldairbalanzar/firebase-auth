import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link, useHistory } from 'react-router-dom';

function Register() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { register } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        let email = emailRef.current.value
        let password = passwordRef.current.value
        let passwordConfirm = passwordConfirmRef.current.value
        e.preventDefault()

        if(password !== passwordConfirm) {
            return setError('Passwords do not match...')
        }

        try {
            setIsLoading(true)
            await register(email, password)
            history.push('/')
        } catch {
            setError('Failed to register...')
        }

        setIsLoading(false)
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
            <div>
                <Link to='/login'>Already have an account? Log In</Link>
            </div>
        </>
    )
}

export default Register
