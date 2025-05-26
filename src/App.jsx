"use client"

import { useEffect, useState } from "react"
import ProductForm from "./ProductForm"

const API_URL = "http://go.megafinders.xyz/api/v1/products"

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ title: "", description: "", seller_id: "" })
  const [editingId, setEditingId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data)
      setError("")
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Create or update product
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          seller_id: Number(form.seller_id),
        }),
      })
      if (!res.ok) throw new Error("Failed to save product")
      setForm({ title: "", description: "", seller_id: "" })
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Edit product
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description,
      seller_id: product.seller_id,
    })
    setEditingId(product.id)
  }

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete product")
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your products with ease</p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              setForm({ title: "", description: "", seller_id: "" })
              setEditingId(null)
              setIsModalOpen(true)
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Add New Product
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full bg-white rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-left font-semibold">Seller ID</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">📦</span>
                        </div>
                        <p className="text-lg font-medium">No products found</p>
                        <p className="text-sm">Add your first product to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{product.id}</td>
                      <td className="px-6 py-4 text-gray-800">{product.title}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{product.description}</td>
                      <td className="px-6 py-4 text-gray-800">{product.seller_id}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => {
                              handleEdit(product)
                              setIsModalOpen(true)
                            }}
                            className=" bg-blue-500 px-4 py-2 rounded-lg font-medium shadow-md transform transition-all duration-200 hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transform transition-all duration-200 hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <div className="p-6">
                <ProductForm
                  form={form}
                  onChange={handleChange}
                  onSubmit={(e) => {
                    handleSubmit(e)
                    setIsModalOpen(false)
                  }}
                  editingId={editingId}
                  onCancel={() => {
                    setForm({ title: "", description: "", seller_id: "" })
                    setEditingId(null)
                    setIsModalOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
