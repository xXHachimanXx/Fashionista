import React from 'react';
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { DEFAULT_PRODUCT_IMAGE } from "../../utils/constants";
import { removeCartProduct, updateCartProductQuantity } from "../../store/actions/cartActions";

import './CartProduct.css';

// true -> cart
// false -> search
function CartProduct({ product_info, context = false }) {

  const product = context ? product_info.product_info : product_info;

  const dispatch = useDispatch();

  const handleUpdateQuantity = async (id, size, value) => {
    if (value < 0 && product_info.quantity === 1)
      dispatch(removeCartProduct(id, size));
    else
      dispatch(updateCartProductQuantity(id, size, value));
  }

  return (
    <div className="cart__product">

      <Link to={`/produto/${product.code_color}`}>
        <div className="cart__product__content">

          <figure className="cart__product__image">
            <img src={product.image || DEFAULT_PRODUCT_IMAGE} alt={product.name} />
          </figure>

          <div className="cart__product__info">
            <p className="cart__product__name">{product.name}</p>
            {
              context &&
              <>
                <p className="cart__product__size"><span>Tam.: {product.size}</span></p>
                <div className="cart__product__quantity">
                  <button className="cart__product__icons" onClick={() => { handleUpdateQuantity(product.code_color, product.size, -1) }}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <div className="cart__product__input">{
                    product_info.quantity
                  }</div>
                  <button className="cart__product__icons" onClick={() => { handleUpdateQuantity(product.code_color, product.size, +1) }}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </>
            }
          </div>

          <div className="cart__product__pricing">
            <div className="cart__product__price">{product.actual_price}</div>
            <div className="cart__product__installments">{product.installments}</div>
          </div>

        </div>
      </Link>
      {
        context &&
        <div className="cart__product__remove" onClick={() => dispatch(removeCartProduct(product.code_color, product.size))}>
          <span> Remover item </span>
        </div>
      }
    </div>
  );
}

export default CartProduct;