import './App.css';
import { Container } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';
import AuthProvider from './utils/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     waddup

      <Container 
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute path='/update-profile' component={UpdateProfile} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
