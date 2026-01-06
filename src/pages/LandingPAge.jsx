import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- FIX: Import Link for navigation

/* ---------------- DATA ---------------- */

const features = [
  {
    icon: "📊",
    title: "Smart Attendance Tracking",
    description: "Automatically track attendance with advanced analytics and insights.",
  },
  {
    icon: "👤",
    title: "Face Recognition / QR Check-in",
    description: "Multiple check-in methods including facial recognition and QR codes.",
  },
  {
    icon: "📈",
    title: "Real-time Analytics & Reports",
    description: "Generate detailed reports instantly and monitor trends in real-time.",
  },
  {
    icon: "🔗",
    title: "Seamless Integration",
    description: "Works seamlessly with colleges, offices, and existing systems.",
  },
];

const steps = [
  {
    title: "Register Organization",
    description: "Set up your institution or company in minutes.",
    icon: "🏢",
  },
  {
    title: "Users Check In",
    description: "Check in via face recognition, QR, or mobile.",
    icon: "📱",
  },
  {
    title: "Automatic Reports",
    description: "Attendance is recorded and reports generated instantly.",
    icon: "✅",
  },
];

const benefits = [
  "Saves time and reduces manual errors",
  "Prevents proxy attendance",
  "Works on mobile & desktop",
  "Scales for institutions and companies",
  "Real-time alerts and analytics",
];

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Dean, State University",
    quote: "PresenX completely transformed how we manage attendance.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "HR Manager, Tech Corp",
    quote: "Accurate, fast, and super easy to use.",
    avatar: "MC",
  },
  {
    name: "Emma Williams",
    role: "Principal, Central High",
    quote: "Proxy attendance dropped drastically.",
    avatar: "EW",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function LandingPage() { // Renamed from Home to LandingPage for consistency
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="fixed w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
             {/* FIX: Link logo to the home/login route */}
            <Link to="/login" className="flex items-center gap-2"> 
              <div className="w-8 h-8 bg-blue-600 text-white font-bold flex items-center justify-center rounded-lg">
                P
              </div>
              <span className="font-bold text-blue-600">PresenX</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#benefits">Benefits</a>
            {/* FIX: Add Login/Register links to the navigation bar */}
            <Link to="/login" className="text-gray-900 hover:text-blue-600">Login</Link>
            <Link to="/register" className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-150">
                Register
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Attendance <span className="text-blue-600">Automated.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Smart AI-powered attendance management for institutions and organizations.
        </p>
        <div className="flex justify-center gap-4">
          
          {/* FIX: Link 'Get Started' button to the Registration Page */}
          <Link to="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150">
            Get Started (Register)
          </Link>
          
          {/* FIX: Link 'Request Demo' button to the Login Page */}
          <Link to="/login" className="px-8 py-3 border rounded-lg hover:bg-gray-100 transition duration-150">
            Log In
          </Link>
          
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-center">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Why PresenX?</h2>
        <ul className="max-w-xl mx-auto space-y-4">
          {benefits.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-blue-600">✔</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <p className="italic mb-4">"{t.quote}"</p>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-gray-600">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Simplify Attendance Today</h2>
        {/* FIX: Link the CTA button to the registration page */}
        <Link to="/register" className="px-10 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition duration-150">
          Start Using PresenX
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t">
        © 2026 PresenX. All rights reserved.
      </footer>
    </div>
  );
}