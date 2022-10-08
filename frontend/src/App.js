
import { Home } from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { PaymentSuccess } from './pages/PaymentSuccess';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={  <Home/>}></Route>
        <Route path="/paymentsuccessfull" element={  <PaymentSuccess/>}></Route>

      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
