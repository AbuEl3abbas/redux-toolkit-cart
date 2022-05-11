import Navbar from './components/Navbar';
import { CartContainer } from './components/CartContainer';
import { Modal } from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCartItems, calculateTotalAndAmount } from './features/cart/cartSlice';



function App() {

  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCartItems("marwan abbas"))
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(calculateTotalAndAmount());
  }, [cartItems])// eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <div className="loading">
    <h1>loading...</h1>
  </div>

  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
}
export default App;
