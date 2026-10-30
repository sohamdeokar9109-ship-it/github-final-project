import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartItems,
  selectCartTotal,
} from "./CartSlice.jsx";

const money = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [checkoutStarted, setCheckoutStarted] = useState(false);

  if (items.length === 0) {
    return (
      <main className="cart-page content-width">
        <div className="cart-heading"><p className="eyebrow">Your little green corner</p><h1>Shopping cart</h1></div>
        <section className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">✿</span>
          <h2>Your cart is ready to grow.</h2>
          <p>There are no plants here just yet. Let's find one you'll love.</p>
          <Link className="button button-dark" to="/plants">Continue shopping <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page content-width">
      <div className="cart-heading"><p className="eyebrow">Your little green corner</p><h1>Shopping cart <span>({items.length})</span></h1></div>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Items in your cart">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                alt={item.name}
                onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/plant-fallback.svg"; }}
              />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{money(item.price)} <span>each</span></p>
                <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                  <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1}>−</button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
              </div>
              <div className="cart-line-total"><strong>{money(item.price * item.quantity)}</strong><button className="remove-button" type="button" onClick={() => dispatch(removeItem(item.id))}>Remove</button></div>
            </article>
          ))}
          <Link className="text-link continue-link" to="/plants">← Continue shopping</Link>
        </section>
        <aside className="order-summary">
          <p className="eyebrow">A fresh start</p><h2>Order summary</h2>
          <div className="summary-line"><span>Items ({items.reduce((count, item) => count + item.quantity, 0)})</span><span>{money(total)}</span></div>
          <div className="summary-line"><span>Shipping</span><span className="shipping-note">Calculated at checkout</span></div>
          <div className="summary-total"><span>Subtotal</span><strong>{money(total)}</strong></div>
          <button className="button button-dark checkout-button" type="button" onClick={() => setCheckoutStarted(true)} disabled={checkoutStarted}>
            {checkoutStarted ? "Coming Soon" : "Checkout"} <span aria-hidden="true">↗</span>
          </button>
          {checkoutStarted && <p className="checkout-message" role="status">Online checkout is coming soon. Thanks for growing with us!</p>}
        </aside>
      </div>
    </main>
  );
}
