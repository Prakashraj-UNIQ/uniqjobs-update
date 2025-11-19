"use client";
import { useState } from "react";
import cardDetails from "@/content/courses/index.json";

export default function ContactForm({ onClose }: { onClose?: () => void }) {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    course: "",
    hear: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setValues({ ...values, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://uniqjobs.co.in/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Submit failed");
        return;
      }

      // SUCCESS — SHOW MESSAGE
      alert("Thank you! Your enquiry has been submitted successfully.");

      // CLEAR FORM
      setValues({
        name: "",
        email: "",
        phone: "",
        location: "",
        course: "",
        hear: "",
      });

      // CLOSE MODAL
      onClose?.();
    } catch (err) {
      alert("Submit failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="relative p-5 mx-auto max-w-md bg-white rounded-xl shadow-xl w-full space-y-4">
          {/* Close Button (Pure SVG) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Quick Contact
          </h2>

          <form onSubmit={submit} className="space-y-3">
            <input
              name="name"
              required
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={values.phone}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            />

            <select
              name="location"
              value={values.location}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            >
              <option value="">Select Location</option>
              <option>T. Nagar (Main Branch)</option>
              <option>Chromepet</option>
              <option>Kodambakkam</option>
              <option>Bangalore</option>
              <option>Madurai</option>
              <option>Trichy</option>
              <option>Coimbatore</option>
              <option>Salem</option>
              <option>Thirunelveli</option>
              <option>Puducherry</option>
              <option>Online</option>
            </select>

            <select
              name="course"
              value={values.course}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            >
              <option value="">Select Course</option>
              {cardDetails.courses.map((item, idx) => (
                <option key={idx}>{item.title}</option>
              ))}
            </select>

            <select
              name="hear"
              value={values.hear}
              onChange={handleChange}
              className="w-full py-2.5 px-4 text-sm bg-gray-100 border border-gray-200 
                focus:border-slate-900 focus:bg-white outline-0 transition-all"
            >
              <option value="">How did you hear about UniQ?</option>
              <option>Google Search</option>
              <option>YouTube Video</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>WhatsApp Status</option>
              <option>Friend / Referral</option>
              <option>College Seminar</option>
              <option>Walk-in (T. Nagar / Chromepet)</option>
              <option>Others</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-medium text-white bg-slate-900 
                hover:bg-slate-800 transition rounded"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: scale(0.96);}
          to {opacity: 1; transform: scale(1);}
        }
      `}</style>
    </>
  );
}
