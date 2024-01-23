import React from 'react'
import { ChevronDown, ChevronUp } from '../icons'
import { useDispatch } from 'react-redux'
import { decreaseItem, increaseItem, removeItem } from '../features/cart/cartSlice'

export const CartItem = ({ id, img, title, price, amount }) => {

  const disptach = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() => disptach(removeItem(id))}
        >
          remove
        </button>
      </div>

      <div>
        <button
          className="amount-btn"
          onClick={() => disptach(increaseItem({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              disptach(removeItem(id));
              return;
            }
            disptach(decreaseItem({ id }))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}
