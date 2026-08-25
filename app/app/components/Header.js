'use client'

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-dark-hover">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Hyzu<span className="text-red-accent">Finds</span>
        </a>
        
        <nav className="flex items-center gap-6">
          <a href="#featured" className="hover:text-red-accent transition-colors">Featured</a>
          <a href="#new" className="hover:text-red-accent transition-colors">New</a>
          <a href="#trending" className="hover:text-red-accent transition-colors">Trending</a>
          
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-red-accent hover:bg-red-hover px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-accent rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
