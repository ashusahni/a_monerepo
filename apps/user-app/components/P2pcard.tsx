"use client"

import { useState } from "react"

export default function P2PTransfer() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [recipientError, setRecipientError] = useState("")
  const [amountError, setAmountError] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [toast, setToast] = useState({ show: false, title: "", message: "", type: "" })

  const validateForm = () => {
    let isValid = true

    // Validate recipient
    if (!recipient.trim()) {
      setRecipientError("Recipient is required")
      isValid = false
    } else {
      setRecipientError("")
    }

    // Validate amount
    if (!amount.trim()) {
      setAmountError("Amount is required")
      isValid = false
    } else {
      const numAmount = Number.parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        setAmountError("Amount must be a positive number")
        isValid = false
      } else {
        setAmountError("")
      }
    }

    return isValid
  }

//   const showToast = (title, message, type = "success") => {
//     setToast({ show: true, title, message, type })
//     setTimeout(() => {
//       setToast({ show: false, title: "", message: "", type: "" })
//     }, 3000)
//   }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsTransferring(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success handling
      setIsSuccess(true)
    //   showToast("Transfer successful", `$${amount} has been sent to ${recipient}`)

      // Reset form after 2 seconds
      setTimeout(() => {
        setRecipient("")
        setAmount("")
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
    //   showToast("Transfer failed", "There was an error processing your transfer. Please try again.", "error")
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
            toast.type === "error"
              ? "bg-red-100 border-l-4 border-red-500 text-red-700"
              : "bg-green-100 border-l-4 border-green-500 text-green-700"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {toast.type === "error" ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{toast.title}</p>
              <p className="text-sm mt-1">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Send Money</h3>
          <p className="mt-1 text-sm text-gray-500">Transfer funds to another user instantly.</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                Recipient
              </label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isTransferring || isSuccess}
                placeholder="username or email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">Enter the username or email of the recipient.</p>
              {recipientError && <p className="mt-1 text-xs text-red-600">{recipientError}</p>}
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isTransferring || isSuccess}
                  placeholder="0.00"
                  className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter the amount you want to send.</p>
              {amountError && <p className="mt-1 text-xs text-red-600">{amountError}</p>}
            </div>
            <button
              type="submit"
              disabled={isTransferring || isSuccess}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isTransferring || isSuccess
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isTransferring ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : isSuccess ? (
                <div className="flex items-center">
                  <svg
                    className="-ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sent Successfully
                </div>
              ) : (
                <div className="flex items-center">
                  Send Money
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>
        <div className="px-6 py-3 bg-gray-50 flex justify-between text-xs text-gray-500">
          <p>No transaction fees</p>
          <p>Secure & Instant</p>
        </div>
      </div>
    </div>
  )
}

