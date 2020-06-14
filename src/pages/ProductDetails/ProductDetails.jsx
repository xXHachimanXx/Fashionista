import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { closeDrawerAction } from "../../store/actions/drawerActions";
import { getProducts } from "../../store/actions/productsActions";
import { addProductToCart, updateCartProductQuantity } from "../../store/actions/cartActions";
import { setProductToBuy, setSizeProductToBuy } from "../../store/actions/productActions";

import { DEFAULT_PRODUCT_IMAGE } from "../../utils/constants";

import Badge from '../../components/Badge/Badge';

import './ProductDetails.css';

const ProductDetails = () => {

  const { products } = useSelector(store => store.productsReducer);
  const productDetails = useSelector(state => state.productReducer);
  const { cart } = useSelector(state => state.cartReducer);

  const product = productDetails.product_info === null ?
    getProductFromLocalStorage() :
    productDetails.product_info;

  const dispatch = useDispatch();
  const { code_color } = useParams();

  const [sizeSelected, setSizeSelected] = useState(true);

  const productSize = product === null ? 'NOT' : (product.size || null);


  useEffect(() => {

    async function init() {

      dispatch(closeDrawerAction());
      // Fechar o drawer antes de tudo
      if (products.length === 0 || product === null) {
        var productJSON = localStorage.getItem('@fashionista/product');

        // Se a store estiver vazia, faça uma nova requisição
        if (productJSON === null) getProducts(dispatch);

        dispatch(setProductToBuy(JSON.parse(productJSON))); // convertendo para JSON
        return;
      }
      let productAux = products.find((product) => product.code_color === code_color);

      dispatch(setProductToBuy(productAux));
      var productString = JSON.stringify(productAux); //converter para salvar
      localStorage.setItem('@fashionista/product', productString);

    }
    init();
  }, []);

  // Toast de notificação de compra
  const notifyProductAdded = () => toast("Produto adicionado ao carrinho :)", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "dark"
    }
  );

  const notifySizeNotSelected = () => {
    toast.warn('Ecolha um tamanho para o produto!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  async function getProductFromLocalStorage() {
    var productJSON = localStorage.getItem('@fashionista/product');

    if (productJSON === null) {

      await getProducts(dispatch);

      productJSON = await products.find((p) => p.code_color === code_color);

      var productString = JSON.stringify(productJSON); //converter para salvar
      localStorage.setItem('@fashionista/product', productString); // armazenar
    }

    return productJSON;
  }


  async function handleAddProductToCart() {

    // adicionar novo campo 'size'
    await dispatch(setProductToBuy(product));

    if (productSize === null || productSize === 'NOT') {
      setSizeSelected(false);
      notifySizeNotSelected();
      return;
    }

    const pAux = cart.find(p =>
      p.product_info.code_color === productDetails.product_info.code_color &&
      p.product_info.size === productDetails.product_info.size
    );
    if (pAux)
      await dispatch(updateCartProductQuantity(pAux.product_info.code_color, pAux.product_info.size, 1));
    else
      await dispatch(addProductToCart(productDetails));

    notifyProductAdded();
  }


  return (
    <div className="app__container">
      <div className="product__details">
        <figure className="product__details__image">

          {product.discount_percentage && <Badge discount={product.discount_percentage} />}
          <img
            src={product.image || DEFAULT_PRODUCT_IMAGE}
            alt="Produto VESTIDO TRANSPASSE BOW"
            title="VESTIDO TRANSPASSE BOW"
          />
        </figure>

        <div className="product__details__content">
          <h3 className="product__details__name">{product.name}</h3>

          <div className="product__details__price">
            {
              product.discount_percentage &&
              <span className="product__details__price product__details__price--from">{product.regular_price}</span>
            }
            <span className="product__details__price product__details__price--to">{product.actual_price}</span>
            <span className="product__details__price product__details__price--installments"> em até {product.installments}</span>
          </div>

          <div className="product__details__sizes">
            <p className="product__details__title">Escolha o tamanho:</p>
            {
              !sizeSelected &&
              <p className="product__details__warning">É necessário escolher um tamanho</p>
            }
            <div className="product__details__btnGroup">
              {
                product.sizes &&
                product.sizes.map((s, index) =>
                  <button
                    key={index}
                    onClick={() => { dispatch(setSizeProductToBuy(s.size)); setSizeSelected(true); }}
                    className={`${productSize === s.size ? 'onClick' : 'sizeButton'}`}
                  >
                    {s.size}
                  </button>
                )
              }
            </div>
          </div>

          <div className="product__details__actions">
            <button className="product__details__addToCart" onClick={() => handleAddProductToCart()}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
      <div>

        <ToastContainer />
      </div>
    </div>
  )
}
export default ProductDetails;

