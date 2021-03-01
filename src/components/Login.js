import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currUser } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        let email = emailRef.current.value
        let password = passwordRef.current.value
        e.preventDefault()

        try {
            setIsLoading(true)
            await login(email, password)
            history.push('/')
        } catch {
            setIsLoading(false)
            setError('Failed to sign in...')
        }
    }

    console.log(currUser)

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <h4>{currUser ? currUser.email : ''}</h4>
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
                </Card.Body>
            </Card>
            <div>
                <Link to='/register'>Need an account?</Link>
            </div>
        </>
    )
}

export default Login
