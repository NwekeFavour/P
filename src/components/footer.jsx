import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import Knownly from "../assets/images/knownly.svg"
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4">
              <img className='w-25 rounded-md sm:rounded-full h-25' src={Knownly} alt="" />
            </h4>
            <p className="text-sm leading-relaxed">
              Helping Nigerian university students launch world-class tech careers
              through practical training, mentorship, and real-world projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={"/knownly/talents"} className="hover:text-white">Talent</Link></li>
              <li><Link to={"/internship"} className="hover:text-white">Internship</Link></li>
              <li><Link to={"/contact-us"} className="hover:text-white">Contact Us</Link></li>
              <li><Link to={"#faq"} className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@knownly.tech
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +234 916 343 1707
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Abuja, Nigeria
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/knownlyhq" target="_blank" rel="noreferrer" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} knownly. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
