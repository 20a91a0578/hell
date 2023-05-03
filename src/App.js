
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Repairs from './components/Repairs';
import User from './components/User';
import Bundles from './components/Bundles';


function App(props) {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home username={props.username} roll={props.roll}/>}/>
      <Route path='/Login' element={<Login username={props.username} roll={props.roll}/>}/>
      <Route path='/Repairs' element={<Repairs username={props.username} roll={props.roll}/>}/>
      <Route path='/User' element={<User username={props.username} roll={props.roll}/>}/>
      <Route path='/Bundles' element={<Bundles username={props.username} roll={props.roll}/>}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
