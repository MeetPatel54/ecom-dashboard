import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    })
  }

  return (
    <div className="card flex flex-col group hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 10 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-zinc-500">{product.rating?.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display font-bold text-lg">${product.price}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-150 active:scale-95"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}