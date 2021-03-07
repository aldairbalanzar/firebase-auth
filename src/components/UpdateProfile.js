import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link, useHistory } from 'react-router-dom';

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        let email = emailRef.current.value
        let password = passwordRef.current.value
        let passwordConfirm = passwordConfirmRef.current.value
        e.preventDefault()

        if(password !== passwordConfirm) {
            return setError('Passwords do not match...')
        }

        let promises = []
        setIsLoading(true)
        setError('')

        if( email !== currUser.email) {
            promises.push(updateEmail(email))
        }

        if(password) {
            promises.push(updatePassword(password))
        }

        Promise.all(promises)
        .then(() => {
            history.push('/')
        })
        .catch(() => {
            setError('Failed to update account...')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef}
                            defaultValue={currUser.email}/>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef}
                            placeholder='leave blank to leave the same'/>
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef}
                            placeholder='leave blank to leave the same'/>
                        </Form.Group>

                        <Button disabled={isLoading} className='w-100 text-center mt-2' type='submit'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div>
                <Link to='/'>Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile

