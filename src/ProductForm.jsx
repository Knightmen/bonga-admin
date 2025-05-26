"use client"

export default function ProductForm({ form, onChange, onSubmit, editingId, onCancel }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
            placeholder="Enter product title"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-gray-900"
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Seller ID</label>
          <input
            name="seller_id"
            type="number"
            value={form.seller_id}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
            placeholder="Enter seller ID"
            required
          />
        </div>
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {editingId ? "Update" : "Create"} Product
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
