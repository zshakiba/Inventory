import { useEffect, useState } from 'react';
import './App.css';
import CategoryForm from './components/Category';
import NavBar from './components/NavBar';
import ProductsForm from './components/ProductsForm';
import ProductList from './components/ProductList';
import Filter from './components/Filter';

const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("latest")
  const [selectedCategory, setSelectedCategory] = useState("")

  const [searchValue, setSearchValue] = useState("")

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const sortHandler = (e) => {
    setSort(e.target.value);
  }

  const selectCategoryHandler = (e) => {
    setSelectedCategory(e.target.value);
  }

  const filterSearchTitle = (array) => {
    return array.filter((p) => p.title.toLowerCase().includes(searchValue));
  };

  const filterSelectedCategory = (array) => {
    if(!selectedCategory) return array;
    return array.filter((p) => p.categoryId === selectedCategory);
  };

  const sortDate = (array) => {
    let sortedProducts = [...array]
    return sortedProducts.sort((a, b) => {
      if (sort === "latest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "earliest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    let result = products;
    result = filterSearchTitle(result);
    result = filterSelectedCategory(result);
    result = sortDate(result);
    setFilteredProducts(result);
  }, [products, sort, searchValue,selectedCategory]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setProducts(savedProducts);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    if (categories.length) { localStorage.setItem("categories", JSON.stringify(categories)); }
  }, [categories]);

  useEffect(() => {
    if (products.length) { localStorage.setItem("products", JSON.stringify(products)); }
  }, [products]);

  return (
    <div className="App">
      <div className="bg-slate-800 min-h-screen">
        <NavBar />
        <div className="container max-w-screen-sm mx-auto p-4">
          <CategoryForm setCategories={setCategories} />
          <ProductsForm categories={categories} setProducts={setProducts} />
          <Filter
            onSearch={searchHandler}
            onSort={sortHandler}
            sort={sort}
            searchValue={searchValue}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={selectCategoryHandler} />
          <ProductList products={filteredProducts} categories={categories} setProducts={setProducts} />
        </div>
      </div>
    </div>
  );
}

export default App;
