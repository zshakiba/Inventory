import { useState } from "react";

const ProductsForm = ({ categories, setProducts }) => {
    const [productsFormData, setProductsFormData] = useState({
        title: "",
        quantity: 0,
        categoryId: ""
    })
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProductsFormData({ ...productsFormData, [name]: value })
    };

    const addNewProducts = (e) => {
        e.preventDefault();
        const newProduct = {
            ...productsFormData,
            createdAt: new Date().toISOString(),
            id: new Date().getTime()
        }
        setProducts((prevState) => [...prevState, newProduct])
        setProductsFormData({ title: "", quantity: 0, categoryId: "" })
    }

    return (
        <div className="mb-6">
            <h2 className="text-xl text-slate-300 font-bold mb-2">Add New Product</h2>
            <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
                <div>
                    <label htmlFor="product-title" className="block mb-1 text-slate-400">title</label>
                    <input type="text" name="title" id="product-title" value={productsFormData.title} onChange={changeHandler}
                        className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto" />
                </div>
                <div>
                    <label htmlFor="product-quantity" className="block mb-1 text-slate-400">quantity</label>
                    <input className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
                        type="number" name="quantity" id="product-quantity" value={productsFormData.quantity} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="product-category" className="block mb-1 text-slate-400">category</label>
                    <select name="categoryId" id="product-category" value={productsFormData.categoryId} onChange={changeHandler}
                        className="bg-transparent text-slate-400 rounded-xl w-full">

                        <option className="bg-slate-500 text-slate-300" value="">select a category</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.id} className="bg-slate-500 text-slate-300" value={category.id}>{category.title}</option>

                            )
                        })}
                    </select>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    <button id="add-new-product" className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2" onClick={addNewProducts}>Add new
                        Product</button>
                </div>
            </form>
        </div>
    );
}

export default ProductsForm;