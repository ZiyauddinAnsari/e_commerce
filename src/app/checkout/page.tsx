"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ShoppingBag,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/utils/format";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: "card" | "paypal" | "apple_pay" | "google_pay";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [selectedShipping, setSelectedShipping] = useState("standard");

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 0,
      time: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 15,
      time: "2-3 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 30,
      time: "1 business day",
    },
  ];

  const shippingCost =
    shippingOptions.find((opt) => opt.id === selectedShipping)?.price || 0;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [items.length, orderPlaced, router]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  // Don't render checkout if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Please Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to access checkout.
            </p>
            <Link
              href="/auth?redirect=/checkout"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Validation functions
  const validateShippingAddress = () => {
    const errors: { [key: string]: string } = {};

    if (!shippingAddress.firstName.trim())
      errors.firstName = "First name is required";
    if (!shippingAddress.lastName.trim())
      errors.lastName = "Last name is required";
    if (!shippingAddress.email.trim()) errors.email = "Email is required";
    if (!shippingAddress.phone.trim())
      errors.phone = "Phone number is required";
    if (!shippingAddress.address.trim()) errors.address = "Address is required";
    if (!shippingAddress.city.trim()) errors.city = "City is required";
    if (!shippingAddress.state.trim()) errors.state = "State is required";
    if (!shippingAddress.zipCode.trim())
      errors.zipCode = "ZIP code is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      shippingAddress.email.trim() &&
      !emailRegex.test(shippingAddress.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // Phone format validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (
      shippingAddress.phone.trim() &&
      !phoneRegex.test(shippingAddress.phone)
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentMethod = () => {
    const errors: { [key: string]: string } = {};

    if (!paymentMethod.cardholderName?.trim())
      errors.cardholderName = "Cardholder name is required";
    if (!paymentMethod.cardNumber?.trim())
      errors.cardNumber = "Card number is required";
    if (!paymentMethod.expiryDate?.trim())
      errors.expiryDate = "Expiry date is required";
    if (!paymentMethod.cvv?.trim()) errors.cvv = "CVV is required";

    // Card number validation (basic length check)
    const cardNumber = paymentMethod.cardNumber?.replace(/\s/g, "") || "";
    if (cardNumber && (cardNumber.length < 13 || cardNumber.length > 19)) {
      errors.cardNumber = "Please enter a valid card number";
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (
      paymentMethod.expiryDate?.trim() &&
      !expiryRegex.test(paymentMethod.expiryDate)
    ) {
      errors.expiryDate = "Please enter expiry date in MM/YY format";
    }

    // CVV validation (3-4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (paymentMethod.cvv?.trim() && !cvvRegex.test(paymentMethod.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStepNavigation = (nextStep: number) => {
    if (nextStep === 2) {
      // Validate shipping address before proceeding to payment
      if (validateShippingAddress()) {
        setCurrentStep(nextStep);
      }
    } else if (nextStep === 3) {
      // Validate payment method before proceeding to review
      if (validatePaymentMethod()) {
        setCurrentStep(nextStep);
      }
    } else {
      // No validation needed for going back or to final step
      setCurrentStep(nextStep);
    }
  };

  const handlePlaceOrder = async () => {
    // Final validation before placing order
    if (!validateShippingAddress() || !validatePaymentMethod()) {
      setLoading(false);
      alert("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      // Prepare items for Stripe
      const stripeItems = items.map((item) => ({
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      }));

      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: stripeItems,
          successUrl: window.location.origin + "/checkout/success",
          cancelUrl: window.location.origin + "/checkout/cancelled",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { sessionId, url } = await response.json();

      // Clear cart before redirecting
      clearCart();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        // Fallback: use Stripe.js to redirect
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            throw new Error(error.message);
          }
        }
      }
    } catch (error) {
      console.error("Order failed:", error);
      // Show more specific error message to user
      alert(
        `Checkout failed: ${error instanceof Error ? error.message : "Something went wrong. Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: ShoppingBag },
    { id: 4, name: "Complete", icon: Check },
  ];

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View Orders
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            firstName: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.firstName
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            lastName: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.lastName
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            email: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.email
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.phone
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            address: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.address
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Street address"
                        required
                      />
                      {validationErrors.address && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.city
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.city && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            state: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.state
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.state && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            zipCode: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          validationErrors.zipCode
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        required
                      />
                      {validationErrors.zipCode && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                      </label>
                      <select
                        value={shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Shipping Method
                    </h3>
                    <div className="space-y-4">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) =>
                              setSelectedShipping(e.target.value)
                            }
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {option.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {option.time}
                                </p>
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {option.price === 0
                                  ? "Free"
                                  : formatCurrency(option.price)}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => handleStepNavigation(2)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Payment Method
                  </h2>

                  {/* Payment Options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { id: "card", name: "Credit Card", icon: CreditCard },
                      { id: "paypal", name: "PayPal", icon: CreditCard },
                      { id: "apple_pay", name: "Apple Pay", icon: CreditCard },
                      {
                        id: "google_pay",
                        name: "Google Pay",
                        icon: CreditCard,
                      },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() =>
                          setPaymentMethod({
                            ...paymentMethod,
                            type: method.id as any,
                          })
                        }
                        className={`p-4 border-2 rounded-xl transition-all ${
                          paymentMethod.type === method.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        <method.icon className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod.type === "card" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={paymentMethod.cardholderName}
                          onChange={(e) =>
                            setPaymentMethod({
                              ...paymentMethod,
                              cardholderName: e.target.value,
                            })
                          }
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                            validationErrors.cardholderName
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="John Doe"
                          required
                        />
                        {validationErrors.cardholderName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {validationErrors.cardholderName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={paymentMethod.cardNumber}
                          onChange={(e) =>
                            setPaymentMethod({
                              ...paymentMethod,
                              cardNumber: e.target.value,
                            })
                          }
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                            validationErrors.cardNumber
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        {validationErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {validationErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={paymentMethod.expiryDate}
                            onChange={(e) =>
                              setPaymentMethod({
                                ...paymentMethod,
                                expiryDate: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                              validationErrors.expiryDate
                                ? "border-red-500 dark:border-red-400"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="MM/YY"
                            required
                          />
                          {validationErrors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {validationErrors.expiryDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={paymentMethod.cvv}
                            onChange={(e) =>
                              setPaymentMethod({
                                ...paymentMethod,
                                cvv: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                              validationErrors.cvv
                                ? "border-red-500 dark:border-red-400"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="123"
                            required
                          />
                          {validationErrors.cvv && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                              {validationErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleStepNavigation(3)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Review Your Order
                  </h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                            {item.selectedColor &&
                              ` • Color: ${item.selectedColor}`}
                            {item.selectedSize &&
                              ` • Size: ${item.selectedSize}`}
                          </p>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Shipping Address
                    </h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {shippingAddress.address}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {shippingAddress.city}, {shippingAddress.state}{" "}
                        {shippingAddress.zipCode}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {shippingAddress.country}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Method
                    </h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {paymentMethod.type.replace("_", " ")}
                      </p>
                      {paymentMethod.type === "card" &&
                        paymentMethod.cardNumber && (
                          <p className="text-gray-600 dark:text-gray-400">
                            •••• •••• •••• {paymentMethod.cardNumber.slice(-4)}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? "Placing Order..."
                        : `Place Order • ${formatCurrency(finalTotal)}`}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shippingCost === 0
                        ? "Free"
                        : formatCurrency(shippingCost)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax
                    </span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
