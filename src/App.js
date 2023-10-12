import './App.css';
import { CartProvider } from './context';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Containers/Menu';


function App() {
  return (
    <div className="App">
      <CartProvider >
        <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </CartProvider>
    </div>
  );
}

export default App;
