import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-900/80 text-white py-12 px-4 md:px-8 glass-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">IIT Indore Athletics Club</h3>
            <p className="mb-4">
              Promoting sports excellence and fitness culture at IIT Indore since 2009.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="glow-icon text-xl hover:text-blue-300 transition">
                <i className="fab fa-facebook" />
              </a>
              <a href="#" className="glow-icon text-xl hover:text-blue-300 transition">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="glow-icon text-xl hover:text-blue-300 transition">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="glow-icon text-xl hover:text-blue-300 transition">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-300 transition">Home</a></li>
              <li><a href="#competitions" className="hover:text-blue-300 transition">Competitions</a></li>
              <li><a href="#achievements" className="hover:text-blue-300 transition">Achievements</a></li>
              <li><a href="#records" className="hover:text-blue-300 transition">Records</a></li>
              <li><a href="#athletes" className="hover:text-blue-300 transition">Athletes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2" />
                <span>Sports Complex, IIT Indore, Khandwa Road, Indore 453552</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2" />
                <span>+91 6281179541</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2" />
                <span>athletic.iiti@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for updates on events and achievements.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p>&copy; 2023 IIT Indore Athletics Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}