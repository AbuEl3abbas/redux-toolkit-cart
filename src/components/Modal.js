import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';

export const Modal = () => {

  const dispatch = useDispatch();

  return (
    <aside className="modal-container">
        <div className="modal">
            <h4>remove all items from your shopping cart?</h4>
            <div className="btn-container">
                <button type='button' onClick={() => {dispatch(closeModal());dispatch(clearCart())}} className='btn confirm-btn'>confirm</button>
                <button type='button' onClick={() => dispatch(closeModal())} className='btn clear-btn'>cancel</button>
            </div>
        </div>
    </aside>
  )
}
