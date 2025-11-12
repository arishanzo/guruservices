
import { BrowserRouter as Router } from 'react-router-dom';
import Routeer from './router/Router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <div>
  <AuthProvider>
        <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#ffffff',
            color: '#1E3A8A',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        }}
      />
      <Router>
        <Routeer/>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App