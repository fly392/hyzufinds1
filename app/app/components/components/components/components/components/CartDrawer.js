'use client'

import { useState } from 'react'

const agents = [
  { id: 'hipobuy', name: 'HipoBuy', url: 'https://hipobuy.com/cart/add?url=' },
  { id: 'usfans', name: 'USFans', url: 'https://www.usfans.com/cart/add?url=' },
  { id: 'acbuy', name: 'ACBuy', url: 'https://www.acbuy.com/cart/add?url=' },
  { id: 'oopbuy', name: 'OopBuy', url: 'https://oopbuy.com/cart/add?url=' },
  { id: 'ikako', name: 'Ikako', url: 'https://ikako.vip/cart/add?url=' },
]

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onUpdateQuantity, 
  onClear, 
  totalPrice 
}) {
  const [selectedAgent, setSelectedAgent] = useState('hipobuy')

  const handleCheckout = () => {
    const agent = agents.find(a => a.id === selectedAgent)
    if (!agent || cart.length === 0) return

    // Open each product URL in new tab
    cart.forEach(item => {
      window.open(agent.url + encodeURIComponent(item.product_url), '_blank')
    })

    // Clear cart after checkout
    onClear()
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-dark-card z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b border-dark-hover flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 bg-dark rounded-lg p-3">
                  <div className="w-16 h-16 bg-dark-hover rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-red-accent font-bold mt-1">¥{item.price_cny}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-dark-hover rounded hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-dark-hover rounded hover:bg-gray-700"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-accent"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-dark-hover">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Total:</span>
              <span className="text-xl font-bold text-red-accent">¥{totalPrice}</span>
            </div>

            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full bg-dark border border-dark-hover rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-red-accent"
            >
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  Checkout with {agent.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleCheckout}
                className="flex-1 bg-red-accent hover:bg-red-hover text-white py-2 rounded-lg transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={onClear}
                className="px-4 bg-dark-hover hover:bg-gray-700 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
