

/*export const AdminDashboard = () => {

    const { user } = useContext(AuthContext);
  const navigate = useNavigate();

   useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    }, [user, navigate]);

    const cardStyle = {
    padding: '25px',
    background: '#18181b',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#f97316'
  };

    return(
        <>
         <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
        <img src="/ShopNestLogo.png" alt="Logo" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 0px 10px rgba(249, 115, 22, 0.3))' }} />
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
      </div>
      <p style={{ color: '#a1a1aa', marginBottom: '30px', fontSize: '1.1rem' }}>Welcome back, <span style={{color: '#fff'}}>{user?.name}</span></p>
      
      {/*stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Orders</h4>
            <div style={numberStyle}>{stats.totalOrders}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Products</h4>
            <div style={numberStyle}>{stats.totalProducts}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Users</h4>
            <div style={numberStyle}>{stats.totalUsers}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#a1a1aa', fontSize: '1rem' }}>Total Revenue</h4>
            <div style={numberStyle}>₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', margin: '50px 0', color: '#f97316' }}>Loading metrics...</div>
      )} 

      <div style={{ marginTop: '40px', padding: '30px',
       background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ marginBottom: '25px', color: '#f97316' }}>Administrative Controls</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
          <button className="btn" onClick={() => navigate('/admin/products')} style={{ background: '#3f3f46' }}>📦 Manage Products</button>
          <button className="btn" onClick={() => navigate('/admin/orders')} style={{ background: '#3f3f46' }}>🚚 Manage Orders</button>
          <button className="btn" onClick={() => navigate('/admin/users')} style={{ background: '#3f3f46' }}>👥 Users Directory</button>
        </div>
      </div>
    </div>
        </>
    )
}*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const AdminDashboard = () => {

  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            withCredentials: true,
          }
        );

        setStats(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchDashboard();

  }, []);

  if (!stats) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8">

  <h3 className="text-2xl font-semibold text-orange-500 mb-6">
    Administrative Controls
  </h3>

  <div className="flex flex-wrap gap-4">

    <Link
      to="/admin/add-product"
      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-medium transition"
    >
      ➕ Add Product
    </Link>

    <Link
      to="/admin/products"
      className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-3 rounded-lg font-medium transition"
    >
      📦 Manage Products
    </Link>

    <Link
      to="/admin/orders"
      className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-3 rounded-lg font-medium transition"
    >
      🚚 Manage Orders
    </Link>

    <Link
      to="/admin/users"
      className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-3 rounded-lg font-medium transition"
    >
      👥 Users Directory
    </Link>

  </div>

</div>

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Products
          </h3>
          <p className="text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Users
          </h3>
          <p className="text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Orders
          </h3>
          <p className="text-3xl font-bold">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Revenue
          </h3>
          <p className="text-3xl font-bold">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white shadow rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-3">
                Customer
              </th>

              <th className="text-left p-3">
                Amount
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {stats.recentOrders.map((order) => (

              <tr
                key={order._id}
                className="border-b"
              >
                <td className="p-3">
                  {order.userId?.name}
                </td>

                <td className="p-3">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">
                  {order.status}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

