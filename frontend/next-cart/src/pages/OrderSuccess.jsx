import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  House,
} from "lucide-react";

export const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[40px] border border-gray-100 bg-white p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.06)]">
        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={52}
            className="text-green-600"
          />
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Order Placed Successfully 🎉
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
            Thank you for shopping with us.
            Your order has been placed and is
            now being processed. You’ll receive
            updates as soon as it’s packed and
            shipped.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <ShoppingBag
                size={22}
                className="text-gray-800"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Order Confirmed
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your order request has been
              received successfully.
            </p>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <CheckCircle2
                size={22}
                className="text-green-600"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Payment Status
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              If paid online, your payment was
              verified successfully. For COD,
              payment will be collected on
              delivery.
            </p>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <ArrowRight
                size={22}
                className="text-gray-800"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              What’s Next?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You can continue shopping or view
              your orders once the orders page is
              ready.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-900"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition hover:border-black hover:bg-gray-50"
          >
            <House size={18} />
            Go to Home
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Need help with your order? Contact our
          support anytime.
        </p>
      </div>
    </div>
  );
};