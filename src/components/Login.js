import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        let email = emailRef.current.value
        let password = passwordRef.current.value
        e.preventDefault()

        try {
            setError('')
            setIsLoading(true)
            await login(email, password)
            history.push('/')
        } catch {
            setError('Failed to sign in...')
        }

        setIsLoading(false)
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef}/>
                        </Form.Group>

                        <Button disabled={isLoading} className='w-100 text-center mt-2' type='submit'>Log In</Button>
                    </Form>

                    <div className='w-100 text-center mt-3'>
                        <Link to='/forgot-password'>Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/register'>Need an account?</Link>
            </div>
        </>
    )
}

export default Login
