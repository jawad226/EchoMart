"use client";
import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { token, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setError("");

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      const shippingAddress = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        street: formData.get('address'),
        apartment: formData.get('apartment'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
        phone: formData.get('phone'),
      };

      // Create single order with all items
      const orderData = {
        items: cart.map(item => ({
          productId: parseInt(item.id),
          quantity: item.qty,
        })),
        paymentMethod: selectedPayment === 'cod' ? 'COD' : 'Online',
        shippingAddress,
      };

      const res = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await res.json();
      localStorage.setItem('lastOrderId', data.orderNumber);
      clearCart();
      router.push("/order/success");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // CALCULATE SUBTOTAL & TOTAL ITEMS
  // --------------------------

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const [selectedPayment, setSelectedPayment] = useState("payfast");
  const [billingAddress, setBillingAddress] = useState("same");
  const [billingAddressDetails, setBillingAddressDetails] = useState({
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    city: "",
    postalCode: "",
    country: "PK",
    vatNumber: ""
  });

  // And update the onChange handlers to:
  const handlePaymentChange = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-white ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">

          <form onSubmit={handleCompleteOrder} className="max-w-2xl mx-auto p-4 md:p-6 overflow-y-auto border-r ">
            {/* Contact Section */}
            <section className="mb-8 ">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact</h2>

              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or mobile number *
                </label>
                <input
                  type="email"
                  id="contact"
                  name="contact"
                  required
                  placeholder="Enter your email or phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  name="marketingEmails"
                  className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="marketingEmails" className="text-sm text-gray-600 leading-tight">
                  Keep me updated about exclusive offers, new arrivals, and styling tips
                </label>
              </div>
            </section>

            {/* Delivery Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Delivery</h2>

              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country/Region *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
                >
                  <option value="PK">Pakistan</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  placeholder="House number and street name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, suite, unit, etc. (optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  placeholder="Apartment, suite, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Karachi"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Postal code *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    placeholder="75500"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="0300 1234567"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">For delivery updates only</p>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Method</h2>
              <div className="border border-gray-300 rounded-lg p-4 hover:border-black transition duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Standard Shipping</h3>
                    <p className="text-sm text-gray-600">Delivery in 5-7 business days</p>
                  </div>
                  <span className="font-semibold text-lg">Free</span>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="mb-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
              </div>

              <div className="space-y-4">
                {/* PAYFAST */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="payfast"
                        defaultChecked
                        className="h-5 w-5 accent-black"
                        onChange={() => setSelectedPayment("payfast")}
                      />
                      <span className="font-medium text-gray-800">
                        PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Image src="https://res.cloudinary.com/dcfzqdk58/image/upload/v1765623313/vecteezy_visa-logo-png-visa-icon-transparent-png_20975570_aglbre.png" className="h-6" width={40} height={40} alt="VISA" />
                      <Image src="https://res.cloudinary.com/dcfzqdk58/image/upload/v1765623313/vecteezy_mastercard-icon-symbol-logo_55687058_c9kvfz.png" className="h-6" width={40} height={40} alt="Mastercard" />
                      <Image src="https://res.cloudinary.com/dcfzqdk58/image/upload/v1765623313/8fbdc8d8-1bea-468b-817a-4c48ec030e9a_fiddvh.png" className="h-6" width={40} height={40} alt="UnionPay" />
                    </div>
                  </label>

                  {/* Redirect box - Only show when PAYFAST is selected */}
                  {selectedPayment === "payfast" && (
                    <div className="bg-gray-50 border-t p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-14 border-2 border-gray-400 rounded relative">
                          <span className="absolute right-[-18px] top-1/2 -translate-y-1/2 text-xl">
                            →
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        After clicking <b>“Pay now”</b>, you will be redirected to
                        <b> PAYFAST</b> (Pay via Debit/Credit/Wallet/Bank Account) to
                        complete your purchase securely.
                      </p>
                    </div>
                  )}
                  {/* Cash on Delivery */}
                  <div className="border border-gray-300  p-4 cursor-pointer">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="h-5 w-5 accent-black"
                        onChange={() => setSelectedPayment("cod")}
                      />
                      <span className="font-medium text-gray-800">
                        Cash On Delivery
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Billing Address Section */}
            <section className="mb-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Billing Address</h2>
              </div>

              <div className="">
                {/* Option 1: Same as shipping */}
                <div
                  className={`border rounded-t-lg p-4 cursor-pointer transition duration-200 ${billingAddress === "same"
                    ? "border-black bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                  onClick={() => setBillingAddress("same")}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="billingAddress"
                      value="same"
                      checked={billingAddress === "same"}
                      className="h-5 w-5 accent-black"
                      onChange={() => setBillingAddress("same")}
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        Same as shipping address
                      </span>
                    </div>
                  </label>
                </div>
                {/* Option 2: Different billing address */}
                <div
                  className={`border rounded-b-lg p-4 cursor-pointer transition duration-200 ${billingAddress === "different"
                    ? "border-black bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                  onClick={() => setBillingAddress("different")}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="billingAddress"
                      value="different"
                      checked={billingAddress === "different"}
                      className="h-5 w-5 accent-black"
                      onChange={() => setBillingAddress("different")}
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        Use a different billing address
                      </span>
                    </div>
                  </label>
                  {/* Different Address Form - Shows inside the same card */}
                  {billingAddress === "different" && (
                    <div className="p-6 bg-gray-50 animate-fadeIn">
                      <div className="flex justify-between items-center mb-6">
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First name *
                            </label>
                            <input
                              type="text"
                              required
                              value={billingAddressDetails.firstName || ""}
                              onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, firstName: e.target.value })}
                              placeholder="John"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last name *
                            </label>
                            <input
                              type="text"
                              required
                              value={billingAddressDetails.lastName || ""}
                              onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, lastName: e.target.value })}
                              placeholder="Doe"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company (optional)
                          </label>
                          <input
                            type="text"
                            value={billingAddressDetails.company || ""}
                            onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, company: e.target.value })}
                            placeholder="Company name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street address *
                          </label>
                          <input
                            type="text"
                            required
                            value={billingAddressDetails.street || ""}
                            onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, street: e.target.value })}
                            placeholder="House number and street name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={billingAddressDetails.city || ""}
                              onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, city: e.target.value })}
                              placeholder="Karachi"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Postal code *
                            </label>
                            <input
                              type="text"
                              required
                              value={billingAddressDetails.postalCode || ""}
                              onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, postalCode: e.target.value })}
                              placeholder="75500"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country *
                            </label>
                            <select
                              required
                              value={billingAddressDetails.country || "PK"}
                              onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, country: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                              <option value="PK">Pakistan</option>
                              <option value="US">United States</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AE">United Arab Emirates</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            VAT Number (optional)
                          </label>
                          <input
                            type="text"
                            value={billingAddressDetails.vatNumber || ""}
                            onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, vatNumber: e.target.value })}
                            placeholder="Enter VAT number if applicable"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">For business purchases only</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </section>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Pay now Rs. ${subtotal.toLocaleString()}`}
            </button>




            <p className="text-center text-sm text-gray-500 mt-4">
              By completing your purchase, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-800">Terms of Service</a>
            </p>
          </form>

          {/* RIGHT SECTION - Sticky */}
          <div className="relative">
            <div className="sticky top-15  h-fit">

              <div className="max-h-53 border-b overflow-y-auto pr-2 space-y-2 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        width={55}
                        height={55}
                        alt={item.title}
                        className="rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-sm ">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.qty} × Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-sm">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* SUBTOTAL + ITEMS */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>
                    Subtotal · {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                  <p>Rs. {subtotal.toLocaleString()}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <p>Shipping</p>
                  <p>FREE</p>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between text-lg font-semibold pt-3">
                  <p>Total</p>
                  <p>Rs. {subtotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute >
  );
}
