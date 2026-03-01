import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, increment, decrement, total, clearCart } = useCart()
  const navigate = useNavigate()

  const handleRemove = (id, title) => {
    removeItem(id)
    toast.success(`Removed "${title}"`)
  }

  const handleCheckout = () => {
    clearCart()
    toast.success('Order placed! 🎉')
    navigate('/dashboard')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 text-zinc-400">
        <ShoppingBag size={56} className="mb-4 opacity-20" />
        <h2 className="font-display text-xl font-semibold text-zinc-700 dark:text-zinc-200">Your cart is empty</h2>
        <p className="text-sm mt-1 mb-6">Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex items-center gap-4 animate-fade-in">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-zinc-100"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm truncate">{item.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  ${item.price.toFixed(2)} × {item.qty} ={' '}
                  <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => decrement(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center text-sm font-semibold font-display">
                  {item.qty}
                </span>
                <button
                  onClick={() => increment(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id, item.title)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="card p-5 sticky top-4">
            <h2 className="font-display font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-zinc-500">
                  <span className="truncate mr-2">
                    {item.title.length > 20 ? item.title.slice(0, 20) + '…' : item.title} ×{item.qty}
                  </span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mb-4">
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full">
              Place Order
            </button>

            <button
              onClick={clearCart}
              className="text-xs text-zinc-400 hover:text-red-500 w-full mt-3 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}