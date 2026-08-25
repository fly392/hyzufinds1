'use client'

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'bags', name: 'Bags' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'watches', name: 'Watches' },
]

export default function Filters({ 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  priceRange,
  setPriceRange 
}) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {/* Category dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-dark-card border border-dark-hover rounded-lg px-4 py-2 focus:outline-none focus:border-red-accent"
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Sort dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-dark-card border border-dark-hover rounded-lg px-4 py-2 focus:outline-none focus:border-red-accent"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name: A-Z</option>
      </select>

      {/* Price range */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
          className="w-24 bg-dark-card border border-dark-hover rounded-lg px-3 py-2 focus:outline-none focus:border-red-accent"
        />
        <span className="text-gray-400">to</span>
        <input
          type="number"
          placeholder="Max"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
          className="w-24 bg-dark-card border border-dark-hover rounded-lg px-3 py-2 focus:outline-none focus:border-red-accent"
        />
      </div>
    </div>
  )
}
