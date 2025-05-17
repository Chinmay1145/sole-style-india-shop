
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { allProducts, brands, categories } from "@/data/products";
import { BadgeIndianRupee, Filter, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"));
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(searchParams.get("gender"));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Get min and max prices from all products
  const minPrice = 0;
  const maxPrice = 10000;

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...allProducts];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Apply brand filter
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Apply gender filter
    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender || p.gender === "unisex");
    }

    // Apply price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(result);

    // Update URL search params
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedGender) params.set("gender", selectedGender);
    if (searchParams.get("filter")) params.set("filter", searchParams.get("filter")!);
    
    setSearchParams(params);

  }, [selectedCategory, selectedBrand, selectedGender, priceRange, searchParams.get("filter")]);

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedGender(null);
    setPriceRange([minPrice, maxPrice]);
    navigate("/products");
  };

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Shoes</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => setIsFilterVisible(!isFilterVisible)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Only visible on larger screens or when toggled */}
            <aside
              className={`w-full md:w-64 lg:w-72 space-y-6 transition-all ${
                isFilterVisible
                  ? "block"
                  : "hidden md:block"
              }`}
            >
              {/* Filter Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="rounded text-accent focus:ring-accent"
                        />
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="font-medium mb-3">Brands</h3>
                <ul className="space-y-2">
                  {brands.map((brand) => (
                    <li key={brand}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="rounded text-accent focus:ring-accent"
                        />
                        <span>{brand}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Gender */}
              <div>
                <h3 className="font-medium mb-3">Gender</h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === "men"}
                        onChange={() => setSelectedGender("men")}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Men</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === "women"}
                        onChange={() => setSelectedGender("women")}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Women</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === "unisex"}
                        onChange={() => setSelectedGender("unisex")}
                        className="rounded text-accent focus:ring-accent"
                      />
                      <span>Unisex</span>
                    </label>
                  </li>
                </ul>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2 pb-4">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={maxPrice}
                    min={minPrice}
                    step={100}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      <span>{formatPrice(priceRange[0])}</span>
                    </div>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Close Button */}
              <div className="md:hidden">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsFilterVisible(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-1">
              {/* Active Filters */}
              {(selectedCategory || selectedBrand || selectedGender || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <div className="mb-4 flex flex-wrap gap-2 animate-fade-in">
                  {selectedCategory && (
                    <div className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      <span>Category: {selectedCategory}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setSelectedCategory(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {selectedBrand && (
                    <div className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      <span>Brand: {selectedBrand}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setSelectedBrand(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {selectedGender && (
                    <div className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      <span>Gender: {selectedGender}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setSelectedGender(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                    <div className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      <span>
                        Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setPriceRange([minPrice, maxPrice])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Products */}
              <ProductGrid
                products={filteredProducts}
                showFilters={false}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Products;
