import { createContext, useContext, useReducer } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.find((i) => i.id === action.payload.id)
      if (exists) {
        toast('Already in cart — quantity increased!', { icon: '🛒' })
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      toast.success('Added to cart!')
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => i.id !== action.payload)
    case 'INCREMENT':
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      )
    case 'DECREMENT':
      return state
        .map((i) => (i.id === action.payload ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const increment = (id) => dispatch({ type: 'INCREMENT', payload: id })
  const decrement = (id) => dispatch({ type: 'DECREMENT', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increment, decrement, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}