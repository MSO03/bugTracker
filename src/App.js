import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import { Route, Routes, } from 'react-router-dom';
import { useState, createContext } from 'react';
import useAuth from './hooks/useAuth';
import Navbar from './components/NavBar';
import BugPage from './pages/BugPage';


const projectContext = createContext();

function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  const { user } = useAuth();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const [projectRoute, setProjectRoute] = useState('');

  const setProject = (projectID) => {
    setProjectRoute(projectID);
  };
    

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
	      <Route exact path="/home/*" element={
		      <projectContext.Provider value={setProject}>
            <Home />
		      </projectContext.Provider>
	      }/>
	      <Route path="/project/:id" element={<BugPage projectKey={projectRoute} />} />
      </Routes>
    </>
  );
}

export default App;
export {projectContext};
