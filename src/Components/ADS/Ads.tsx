import React from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  uploadDate: string;
}

export default function Ads() {
  const products: Product[] = [
    {
      _id: "1",
      name: "Product 1",
      image: "https://picsum.photos/500/300?random=10",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      uploadDate: "2024-11-01",
    },
    {
      _id: "2",
      name: "Product 2",
      image: "https://picsum.photos/500/300?random=19",
      startDate: "2024-02-10",
      endDate: "2024-03-10",
      uploadDate: "2024-11-05",
    },
    {
      _id: "3",
      name: "Product 3",
      image: "https://picsum.photos/500/300?random=29",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      uploadDate: "2024-11-10",
    },
    {
      _id: "4",
      name: "Product 4",
      image: "https://picsum.photos/500/300?random=39",
      startDate: "2024-04-20",
      endDate: "2024-05-20",
      uploadDate: "2024-11-15",
    },
    {
      _id: "5",
      name: "Product 5",
      image: "https://picsum.photos/500/300?random=49",
      startDate: "2024-05-25",
      endDate: "2024-06-25",
      uploadDate: "2024-11-20",
    },
  ];

  const deleteHandle = (product: Product) => {
    console.log(`Deleting product: ${product.name}`);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Ads</h1>
        <Link
          to="/ads/uploadads"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Ad
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">
              Start Date: {product.startDate}
            </p>
            <p className="text-sm text-gray-600">
              End Date: {product.endDate}
            </p>
            <p className="text-sm text-gray-600">
              Uploaded On: {product.uploadDate}
            </p>

            <div className="flex justify-between mt-4">
              <Link
                to={`edit/${product._id}`}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteHandle(product)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
