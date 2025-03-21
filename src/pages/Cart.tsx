import React, { useEffect } from "react";
import "../styles/Cart.css";
import vector13 from "../assets/Vector-13.svg";
import vector1313 from "../assets/Vector-13.1.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  deleteItem,
  increaseAmount,
  selectCartItems,
  selectTotalAmount,
  setGetTotals,
} from "../rtk/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { GoDash, GoPlus } from "react-icons/go";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../rtk/store";
import { CartItem } from "../rtk/slices/cartSlice";

const Cart: React.FC = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) =>
    selectCartItems(state)
  );
  const totalAmount: number = useSelector((state: RootState) =>
    selectTotalAmount(state)
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  return (
    <div className='cart-container'>
      <div className='container'>
        <div className='row position-relative text-center align-items-center'>
          <div className='col-lg-12'>
            <div className='cart-vector-holder'>
              <img className='vector-13' src={vector13} alt='' />
              <img className='vector-1313' src={vector1313} alt='' />
            </div>
            <div className='cart-text-holder'>
              <h1>Your Cart</h1>
              <p>Review Your Items</p>
            </div>
          </div>
        </div>
        <section className='pt-5 px-2'>
          {totalAmount > 0 ? (
            <div className='row gap-3 pt-5 cart-items'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='d-flex justify-content-around cart-products'
                >
                  <div className='col-lg-2'>
                    <img
                      src={`https://test-ecomerce.xn--hrt-w-ova.de/${item.productimage?.[0]?.link}`}
                      alt={item.title}
                    />
                  </div>
                  <div className='col-lg-8'>
                    <div className='d-flex align-items-center justify-content-between cart-holder'>
                      <div>
                        <h5>{item.title ?? "No Title"}</h5>
                        <p className='product-information'>
                          {item.information ?? "No description available"}
                        </p>
                      </div>
                      <div>
                        <div className='d-flex justify-content-center align-items-center gap-3 cart-icons'>
                          <button
                            className='products-delete'
                            onClick={() => {
                              Swal.fire({
                                title: `You Want To Delete ${item.title}?`,
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                                heightAuto: false,
                                backdrop: true,
                                customClass: {
                                  confirmButton: "your-confirm-button",
                                  cancelButton: "your-cancel-button",
                                  title: "your-title-text",
                                },
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(deleteItem(item));
                                }
                              });
                            }}
                          >
                            <FaTrash size={28} />
                          </button>
                          <div className='d-flex align-items-center gap-3 quantity-cart'>
                            <button
                              className='products-add'
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(decreaseAmount(item));
                                  toast.success("Decreased Successfully");
                                }
                              }}
                            >
                              <GoDash size={28} />
                            </button>
                            <h4>{item.quantity}</h4>
                            <button
                              className='products-add'
                              onClick={() => {
                                dispatch(increaseAmount(item));
                                toast.success("Increased Successfully");
                              }}
                            >
                              <GoPlus size={28} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-2'>
                    <div>
                      <h4 className='text-center cart-price m-0'>
                        &euro;{item.price * item.quantity}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              <div className='d-flex flex-column pt-4'>
                <div className='cart-line'></div>
                <div className='d-flex justify-content-around pt-4 pb-4'>
                  <h5>Total:</h5>
                  <h5>&euro;{totalAmount}</h5>
                </div>
                <div className='text-center'>
                  <Link to={"/checkout"} className='place-order'>
                    Place Order
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className='pt-5 d-flex align-items-center flex-column'>
              <h1>Your Cart Is Empty</h1>
              <Link
                to={"/products"}
                className='text-decoration-none text-white continue-shopping btn rounded-1 border-0'
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Cart;
