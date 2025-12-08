import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../constants';
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/footer/all`);
        setFooter(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Failed to load footer:", error);
      }
    };
    fetchFooter();
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-gray-900 text-white py-6 mt-4">
      <div className="max-w-7xl mx-auto px-4">

        {/* Logo + Description + Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            {footer.logoUrl && (
              <img
                src={footer.logoUrl}
                alt="Logo"
                className="h-20 mx-auto md:mx-0"
              />
            )}
            <p className="mt-4 max-w-md text-sm text-gray-300">
              {footer.description}
            </p>

            <ul className="flex gap-4 mt-4 justify-center md:justify-start text-white text-xl">
              {footer.socialLinks?.map((link, index) => (
                <li key={index}>
                  <Link className="text-white" to={link.url} target="_blank" rel="noopener noreferrer">
                    <i className={link.iconClass}></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-xl text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start gap-2">
              <img src="/images/envelope-outline.svg" alt="Newsletter" className="h-6" />
              {footer.newsletter?.title}
            </h3>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={footer.newsletter?.placeholderName}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <input
                type="email"
                placeholder={footer.newsletter?.placeholderEmail}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                {footer.newsletter?.buttonText}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-300 mb-12">
          {footer.quickLinks?.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold !text-pink-500 mb-3">{section.section}</h4>
              <ul className="space-y-2">
                {section.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link className="text-white" to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} {footer?.copyrightText} | Designed by{" "}
            <a href="https://web4businesssolutions.com" className="!text-pink-500 hover:underline">Web4BusinessSolutions.com</a>
          </p>
          <div className="flex justify-center md:justify-end gap-6 md:mt-0">
            {footer.bottomLinks?.map((item, i) => (
              <Link key={i} className="!text-pink-500" to={item.path}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
