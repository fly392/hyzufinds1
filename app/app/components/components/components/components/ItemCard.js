'use client'

import Image from 'next/image'

export default function ItemCard({ item, onAddToCart }) {
  return (
    <div className="bg-dark-card rounded-lg overflow-hidden hover-effect group">
      <div className="relative h-48 overflow-hidden bg-dark-hover">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-red-accent text-white px-2 py-1 rounded text-sm">
          ¥{item.price_cny}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex gap-2">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-red-accent hover:bg-red-hover text-white py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
