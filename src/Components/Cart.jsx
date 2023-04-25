import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import alanBtn from "@alan-ai/alan-sdk-web";
const Cart = () => {
  const [mainCart, setMaincart] = useState([]);
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);

  const modalFooter = () => {
    setModal(!modal);
  };

  const modalHandler = () => {
    setModal(true);
  };
  const addCartHandler = (cart) => {
    setCart((prev) => {
      return [...prev, cart];
    });
    toast.dark("Product added successfully");
  };

//   console.log(cart);
//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((json) => setMaincart(json));
//   }, []);

  useEffect(() => {
    alanBtn({
      key: "c90652cbb0a5b23d0a02a23564de48112e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setMaincart(commandData.data);
        }
      },
    });
  }, []);
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mainCart.map((cart) => {
            return (
              <div className="col" key={cart.id}>
                <div className="card shadow-sm p-3">
                  <div className="card-title">
                    <h4 className="text-muted text-center" key={cart.id}>
                      Product #{cart.id}
                    </h4>
                  </div>
                  <img
                    src={cart.image}
                    alt={cart.title}
                    className="bg-placeholder card-image-top"
                    width="100%"
                    height="400px"
                  />
                  <div className="card-body">
                    <div className="card-text">
                      <p>{cart.title.slice(0, 20)}</p>
                      <p className="card-text fw-lighter">
                        {cart.description.slice(0, 100)}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div>
                        <span>{cart.category}</span>
                      </div>
                      <div className="text-muted">$ {cart.price}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addCartHandler(cart)}
                    className="mt-3 btn btn-outline-primary"
                  >
                    Add cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="fixed-top m-3">
          <button
            onClick={() => modalHandler()}
            type="button"
            className="btn btn-primary position-relative"
          >
            Card
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </div>
      {modal && (
        <div
          className="modal"
          style={{ display: "block", background: "rgba(0,0,0,.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {cart.map((item) => {
                  return (
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="cart-title">{item.title}</h5>
                            <p className="card-text text-muted">
                              {item.description.slice(0, 100)}
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                ${item.price}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-footer">
                <button
                  onClick={modalFooter}
                  type="button"
                  className="btn btn-danger"
                  data-bs-miss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
