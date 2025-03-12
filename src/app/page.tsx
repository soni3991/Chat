import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  MessageSquare,
  RefreshCw,
  DollarSign,
  Share2,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Exchange Platform
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a secure and efficient way to exchange RMB and INR with
              real-time support and competitive rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <RefreshCw className="w-6 h-6" />,
                title: "Live Exchange Rates",
                description: "Real-time RMB to INR conversion rates",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Transactions",
                description: "End-to-end encrypted exchange process",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "24/7 Chat Support",
                description: "Connect with service agents anytime",
              },
              {
                icon: <Share2 className="w-6 h-6" />,
                title: "Social Referrals",
                description: "Earn bonuses through our referral program",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exchange Rate Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Exchange Rates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the most competitive RMB to INR exchange rates in the market
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                    ¥
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chinese Yuan (RMB)</p>
                    <p className="text-2xl font-bold">1.00</p>
                  </div>
                </div>

                <div className="text-2xl text-gray-400">=</div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    ₹
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Indian Rupee (INR)</p>
                    <p className="text-2xl font-bold">12.45</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-4">
                  Last updated: {new Date().toLocaleString()}
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Exchange
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">₹50M+</div>
              <div className="text-blue-100">Exchange Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Satisfied Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Transaction Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple process makes currency exchange easy and secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Verify</h3>
              <p className="text-gray-600">
                Create an account and complete the verification process
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Initiate Exchange</h3>
              <p className="text-gray-600">
                Select amount and currency direction for your exchange
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Complete Transaction
              </h3>
              <p className="text-gray-600">
                Process payment and receive your exchanged currency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">
                Real-Time Chat Support
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with our service agents through our secure, end-to-end
                encrypted chat system for immediate assistance with your
                exchanges.
              </p>
              <ul className="space-y-3">
                {[
                  "Get help with your transactions",
                  "Ask questions about exchange rates",
                  "Resolve issues in real-time",
                  "Available 24/7 for your convenience",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="font-medium">Chat Support</h3>
                </div>
                <div className="p-4 h-64 bg-gray-50 flex flex-col justify-end">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-bl-none mb-3 max-w-xs">
                    Hello! How can I help you with your currency exchange today?
                  </div>
                  <div className="self-end bg-blue-600 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                    I'd like to know the current exchange rate for RMB to INR.
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <button
                      className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
                      disabled
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Earn Through Our Referral Program
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Invite friends and earn bonuses when they complete transactions
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  How Our Referral System Works
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: <Share2 className="w-5 h-5" />,
                      text: "Share your unique referral link with friends",
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      text: "Friends register using your referral link",
                    },
                    {
                      icon: <DollarSign className="w-5 h-5" />,
                      text: "Earn bonuses when they complete transactions",
                    },
                    {
                      icon: <RefreshCw className="w-5 h-5" />,
                      text: "Track your referrals and earnings in real-time",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3 p-1.5 bg-blue-100 rounded-full text-blue-600">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                    <DollarSign className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-semibold">Referral Bonus</h4>
                  <p className="text-gray-600">Earn up to</p>
                  <div className="text-3xl font-bold text-blue-600 my-2">
                    ₹500
                  </div>
                  <p className="text-gray-600">per successful referral</p>
                </div>

                <a
                  href="/dashboard"
                  className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors"
                >
                  Start Referring Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Exchanging?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their RMB to INR
            currency exchange needs.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Account
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
