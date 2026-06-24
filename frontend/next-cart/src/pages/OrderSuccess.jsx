import { Link } from "react-router-dom";

export const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-10 rounded-xl text-center border border-zinc-800">

        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-zinc-400 mb-6">
          Your order has been placed successfully.
        </p>

        <Link
          to="/orders"
          className="bg-orange-500 px-6 py-3 rounded-lg text-white"
        >
          View Orders
        </Link>

      </div>
    </div>
  );
};