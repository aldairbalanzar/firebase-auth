import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword, currUser } = useAuth()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        let email = emailRef.current.value
        e.preventDefault()

        try {
            setError('')
            setIsLoading(true)
            await resetPassword(email)
            setMessage('Check your inbox for your password reset.')
        } catch {
            setIsLoading(false)
            setError('Failed to reset password...')
        }
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}
            {error && <Alert variant='success'>{message}</Alert>}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    <h4>{currUser ? currUser.email : ''}</h4>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef}/>
                        </Form.Group>

                        <Button disabled={isLoading} className='w-100 text-center mt-2' type='submit'>Reset Password</Button>
                    </Form>

                    <div className='w-100 text-center mt-3'>
                        <Link to='/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/register'>Need an account?</Link>
            </div>
        </>
    )
}

export default ForgotPassword
