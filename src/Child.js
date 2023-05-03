import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Udashboard from './Usercomponents/Udashboard';
// import Ubundles from './Usercomponents/Ubundles';
import Urepairs from './Usercomponents/Urepairs';
import Ureports from './Usercomponents/Ureports';



function Child(props) {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Udashboard username={props.username} roll={props.roll} />}/>
      {/* <Route path='/Ubundles' element={<Ubundles username={props.username} roll={props.roll} />}/> */}
      <Route path='/Urepairs' element={<Urepairs username={props.username} roll={props.roll} />}/>
      <Route path='/Ureports' element={<Ureports username={props.username} roll={props.roll} />}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default Child;