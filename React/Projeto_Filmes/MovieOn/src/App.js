import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

//function
function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
