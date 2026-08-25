'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ItemCard from '@/components/ItemCard'
import SearchBar from '@/components/SearchBar'
import Filters from '@/components/Filters'
import CartDrawer from '@/components/CartDrawer'

export default function Home() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('hyzufinds_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('hyzufinds_cart', JSON.stringify(cart))
  }, [cart])

  // Mock data - replace with Supabase
  useEffect(() => {
    const mockItems = [
      {
        id: 5,
        name: 'Nike Dunk Low Panda',
        price_cny: 199,
        category: 'shoes',
        image_url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
        description: 'Classic Panda colorway',
        product_url: 'https://example.com/panda',
      },
      {
        id: 7,
        name: 'Supreme Box Logo Hoodie',
        price_cny: 299,
        category: 'clothing',
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
        description: 'FW23 Collection',
        product_url: 'https://example.com/supreme',
      },
      {
        id: 8,
        name: 'Rolex Submariner',
        price_cny: 499,
        category: 'watches',
        image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
        description: 'Premium quality rep',
        product_url: 'https://example.com/rolex',
      },
    ]
    setItems(mockItems)
    setFilteredItems(mockItems)
  }, [])

  // Filter and sort items
  useEffect(() => {
    let result = [...items]

    // Search
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory)
    }

    // Price range
    result = result.filter(item => 
      item.price_cny >= priceRange.min && 
      item.price_cny <= priceRange.max
    )

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price_cny - b.price_cny)
        break
      case 'price-desc':
        result.sort((a, b) => b.price_cny - a.price_cny)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // newest
        result.sort((a, b) => b.id - a.id)
    }

    setFilteredItems(result)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, sortBy, priceRange, items])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price_cny * item.quantity), 0)

  return (
    <main className="min-h-screen">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Hyzu<span className="text-red-accent">Finds</span>
          </h1>
          <p className="text-gray-400">Curated items with best prices</p>
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Filters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {currentItems.map(item => (
            <ItemCard 
              key={item.id}
              item={item}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-red-accent text-white'
                    : 'bg-dark-card hover:bg-dark-hover'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClear={clearCart}
        totalPrice={totalPrice}
      />
    </main>
  )
}
