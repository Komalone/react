import { useState, useContext, useEffect } from 'react';
import Cart from '../Cart/Cart';
import './Header.css';
import CartContext from '../../store/store-context';
const CartBtn=()=>{
    const cartCtx= useContext(CartContext);
    const [cartItemLen, setCarItemLen]= useState(0);
    const [showCartbtn, setShow]=useState(false);
    const showCartHandler=()=>{
        setShow(true);
    }
    const hideCartHandler=()=>{
        setShow(false);
    }
    useEffect(()=>{

        fetch('https://crudcrud.com/api/9dc169aec764414599ab6dfafd3c6998/addTocart', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data)
            setCarItemLen(data.length);
         });

    },[showCartbtn])

    const quantity= cartCtx.items.reduce((curr)=>{
        return curr+1;
    }, cartItemLen);

    return (
        <>
        <button className="cart-holder" onClick={showCartHandler}>
            Cart
            <span className='cart-number'>{quantity}</span>
        </button>
        {showCartbtn && <Cart onClose={hideCartHandler}/>}
        </>
    );
}
export default CartBtn;