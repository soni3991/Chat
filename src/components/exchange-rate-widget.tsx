"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function ExchangeRateWidget() {
  const [rate, setRate] = useState(12.45);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate fetching exchange rate
  const fetchExchangeRate = () => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a slightly different rate to simulate real-time changes
      const newRate = (12.45 + (Math.random() * 0.2 - 0.1)).toFixed(2);
      setRate(parseFloat(newRate));
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Initial fetch
    fetchExchangeRate();

    // Set up interval to refresh rate every 60 seconds
    const interval = setInterval(fetchExchangeRate, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Current Exchange Rate</h3>
          <button
            onClick={fetchExchangeRate}
            disabled={loading}
            className="p-2 text-blue-600 hover:text-blue-800 transition-colors rounded-full hover:bg-blue-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-3">
              ¥
            </div>
            <div>
              <p className="text-xs text-gray-500">RMB</p>
              <p className="text-xl font-bold">1.00</p>
            </div>
          </div>

          <div className="text-xl text-gray-400">=</div>

          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              ₹
            </div>
            <div>
              <p className="text-xs text-gray-500">INR</p>
              <p className="text-xl font-bold">{rate.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
