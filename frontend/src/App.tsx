import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import AppContainer from './components/AppContainer';


function App() {

  return (
    <Routes>
      <Route path='/' element={<AppContainer />} >
        <Route index path='/' element={<Home />} />
        <Route index path='/inputNotes' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
