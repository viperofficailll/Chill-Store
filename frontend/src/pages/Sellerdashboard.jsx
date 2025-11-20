import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

// Chart.js imports
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function SellerDashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  // -----------------------------
  // Fetch Items & Orders
  // -----------------------------
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/v1/seller/allitems");
        setItems(res.data.items || []);
      } catch (err) {
        setError("Failed to fetch items.");
      } finally {
        setLoadingItems(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/v1/seller/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchItems();
    fetchOrders();
  }, []);

  // -----------------------------
  // Item Handlers
  // -----------------------------
  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/seller/items/${id}`);
      alert(res.data.message);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove the item.");
    }
  };

  const handleEditItem = (id) => navigate(`/edit-item/${id}`);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    navigate("/");
  };

  // -----------------------------
  // Chart Data
  // -----------------------------
  const lineData = {
    labels: orders.map((_, i) => `Order ${i + 1}`),
    datasets: [
      {
        label: "Order Amount (NPR)",
        data: orders.map((o) => o.totalAmount),
        borderColor: "rgba(14,165,233,1)",
        backgroundColor: "rgba(14,165,233,0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Item Price (NPR)",
        data: items.map((item) => item.price),
        backgroundColor: "rgba(34,197,94,0.7)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  const paymentCounts = orders.reduce((acc, order) => {
    const method = order.paymentMethod || "Unknown";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(paymentCounts),
    datasets: [
      {
        label: "Payment Methods",
        data: Object.values(paymentCounts),
        backgroundColor: ["#34D399", "#3B82F6", "#FBBF24", "#F87171"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* ------------------ Sidebar ------------------ */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Seller Panel</h2>

          <nav className="space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left hover:text-teal-400"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/additem")}
              className="block w-full text-left hover:text-teal-400"
            >
              Add Item
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="block w-full text-left hover:text-teal-400"
            >
              Orders
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition"
        >
          Logout
        </button>
      </aside>

      {/* ------------------ Main Content ------------------ */}
      <main className="flex-1 flex flex-col">
        {/* Top */}
        <header className="bg-gray-800 p-4 shadow flex justify-between">
          <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
          <p>Welcome, Seller</p>
        </header>

        {/* ------------------ Body ------------------ */}
        <section className="flex-1 overflow-y-auto p-10">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              title="Total Items"
              value={items.length}
              color="text-teal-400"
            />
            <StatCard title="Total Orders" value={orders.length} />
            <StatCard
              title="Total Earnings"
              value={`NPR ${orders.reduce((t, o) => t + o.totalAmount, 0)}`}
              color="text-green-400"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <ChartCard title="Orders Over Time">
              <Line data={lineData} />
            </ChartCard>
            <ChartCard title="Item Prices">
              <Bar data={barData} />
            </ChartCard>
            <ChartCard title="Payment Methods">
              <Pie data={pieData} />
            </ChartCard>
          </div>

          {/* Items */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Your Vault (Items)</h2>

            {loadingItems ? (
              <p>Loading items...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : items.length === 0 ? (
              <p>No items found. Start adding some!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onEdit={handleEditItem}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Orders & Payments</h2>

            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

/* -----------------------------------------
   COMPONENTS (Cleaner & Reusable)
----------------------------------------- */

function StatCard({ title, value, color = "" }) {
  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
      <h3 className="text-gray-400">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ItemCard({ item, onEdit, onRemove }) {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-400 text-sm">{item.description}</p>
      <p className="text-teal-400 font-bold mt-2">NPR {item.price}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(item._id)}
          className="flex-1 bg-teal-500 text-black px-3 py-1 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onRemove(item._id)}
          className="flex-1 bg-red-500 px-3 py-1 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Order #{order._id}</h3>
        <span className="px-3 py-1 bg-teal-500 text-black rounded-lg">
          {order.orderStatus}
        </span>
      </div>

      <p className="text-gray-400 mt-2">Payment: {order.paymentMethod}</p>
      <p className="text-gray-400">Total: NPR {order.totalAmount}</p>

      <h4 className="mt-4 font-semibold">Buyer:</h4>
      <p className="text-gray-300 text-sm">
        {order.buyer?.username} ({order.buyer?.email})
      </p>

      <p className="text-gray-300 text-sm">
        Phone: {order.buyer?.phone}, Location: {order.buyer?.deliverylocation}
      </p>

      <h4 className="mt-4 font-semibold">Items:</h4>
      <ul className="list-disc ml-5 text-gray-300">
        {order.items.map((i) => (
          <li key={i._id}>
            {i.product?.name} × {i.quantity} (NPR {i.price})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellerDashboard;
