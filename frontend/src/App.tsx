import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import AppContainer from './components/AppContainer';
import InputNotes from './pages/InputNotes';
import Roadmap from './pages/Roadmap';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <Routes>
      <Route path='*' element={<h1>404 Not Found</h1>} />
      <Route path='/' element={<AppContainer />} >
        <Route index path='/' element={<Home />} />
        <Route index path='/inputNotes' element={<InputNotes />} />
        <Route index path='/roadmap' element={<Roadmap />} />
        <Route index path='/login' element={<Login />} />
        <Route index path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
