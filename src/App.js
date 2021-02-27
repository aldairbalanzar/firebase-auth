import './App.css';
import { Container } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
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
                <Route exact path='/' component={Dashboard} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
