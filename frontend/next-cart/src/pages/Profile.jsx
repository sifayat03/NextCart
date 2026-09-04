import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {

      const res = await axios.get(
        "https://nextcart-backend-kxc0.onrender.com/api/auth/profile",
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
      setProfile(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">
              Name
            </h3>

            <p>{user?.name}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">
              Email
            </h3>

            <p>{user?.email}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">
              Role
            </h3>

            <p className="capitalize">
              {user?.role}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">
              Joined
            </h3>

            <p>
              {new Date(
                user?.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">

  <div className="bg-orange-100 p-5 rounded-lg text-center">

    <h3 className="text-lg font-semibold">
      Orders
    </h3>

    <p className="text-3xl font-bold">
      {profile?.totalOrders}
    </p>

  </div>

  <div className="bg-yellow-100 p-5 rounded-lg text-center">

    <h3 className="text-lg font-semibold">
      Reviews
    </h3>

    <p className="text-3xl font-bold">
      {profile?.totalReviews}
    </p>

  </div>

  <div className="bg-pink-100 p-5 rounded-lg text-center">

    <h3 className="text-lg font-semibold">
      Wishlist
    </h3>

    <p className="text-3xl font-bold">
       {profile?.wishlistCount}
    </p>

  </div>

</div>

<div className="grid md:grid-cols-3 gap-4 mt-8">

  <Link
    to="/orders"
    className="bg-blue-500 text-white p-4 rounded-lg text-center"
  >
    My Orders
  </Link>

  <Link
    to="/wishlist"
    className="bg-pink-500 text-white p-4 rounded-lg text-center"
  >
    <p className="text-3xl font-bold">
 Wishlist
</p>
  </Link>

  <Link
    to="/shop"
    className="bg-green-500 text-white p-4 rounded-lg text-center"
  >
    Continue Shopping
  </Link>

</div>

    </div>
  );
};

