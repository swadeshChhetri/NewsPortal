import React, { useState } from "react";
import { NewsletterAPI } from "../../services/api";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      setLoading(true);
      const res = await NewsletterAPI.subscribe(email); // ✅ updated
      toast.success(res.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed! Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-gray-400 mt-10 px-8">
      <div className="max-w-8xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/054/546/989/non_2x/news-globe-icon-design-vector.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm mt-2">
            Best news portal for you, updated every day,
            <br /> can be read anywhere and anytime.
          </p>
        </div>

        <ul className="space-y-2">
          <li>Jobs</li>
          <li>Storage</li>
          <li>About Us</li>
        </ul>

        <ul className="space-y-2">
          <li>Terms of Use</li>
          <li>Newscope</li>
          <li>Transcripts</li>
        </ul>

        {/* Newsletter */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-white">Subscribe to our Newsletter</h3>
          <p className="text-sm text-gray-400">Get the latest news delivered right to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded-l-lg border-none text-black bg-white"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-yellow-500 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs border-t border-gray-700 py-4 text-gray-500">
        © 2025 - Draft by Swadesh WebWorks
      </div>
    </footer>
  );
};

export default Footer;

