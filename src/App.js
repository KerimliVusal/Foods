import './App.css';
import Menu from './Containers/menu';
import { CartProvider } from './context';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
