import './App.css';
import { Container } from 'react-bootstrap';
import Register from './components/Register';
import AuthProvider from './utils/authContext';

function App() {
  return (
    <div className="App">
     waddup

    <AuthProvider>
      <Container 
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <Register />
        </div>
      </Container>
    </AuthProvider>
    </div>
  );
}

export default App;
