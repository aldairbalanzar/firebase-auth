import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../utils/authContext';
import { Link, useHistory } from 'react-router-dom';

function Dashboard() {
    const { currUser, logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            history.pushState('/login')
        } catch {
            setError('Failed to log out...')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error &&  <Alert variant='danger'>{error}</Alert>}
                    <strong>Email:</strong> {currUser.email}
                    <Link link='/update-profile' className='btn btn-primary w-100 mt-3'>
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div>
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
