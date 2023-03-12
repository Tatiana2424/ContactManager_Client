import logo from './logo.svg';
import './App.css';
import { ContactManagerComponent } from './PageComponents/ContactManagerPage/ContactManagerComponent';
import UploadFileCSV from './PageComponents/ContactManagerPage/UploadFileCSV';


function App() {
  return (
     <div className='contactManager'>
         
      
     {/* <UploadFile/> */}
     <ContactManagerComponent/>
    </div>
  );
}

export default App;
