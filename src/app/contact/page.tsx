'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {

  useEffect(() => {
              document.title = 'Akrasol - Contact';
            }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const sendInquiry = async () => {
    setIsLoading(true);

    try {
      if (!formData.email) {
        alert("Please provide your email before sending the inquiry.");
        setIsLoading(false);
        return;
      }
  
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Your inquiry has been sent successfully!");
        window.location.href = '/';
      } else {
        alert(`Failed to send inquiry: ${data.message}`);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred while sending your inquiry.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-48 max-[888px]:px-16">
      <div className="flex flex-col mt-12 mx-auto md:justify-center md:flex-row bg-gray-50 rounded-md shadow-md md:py-8 p-8">
        <div className="md:w-2/5 md:flex md:flex-col md:justify-evenly p-6 mb-8 space-y-6">
            <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 text-2xl" />
            <div>
                <h3 className="text-xl font-semibold text-gray-700">Our Main Office</h3>
                <p className="text-gray-500 text-sm">Podmeje 23, Kaštela</p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faPhone} className="text-blue-600 text-2xl" />
            <div>
                <h3 className="text-xl font-semibold text-gray-700">Phone Number</h3>
                <p className="text-gray-500 text-sm">091-110-9101</p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-2xl" />
            <div>
                <h3 className="text-xl font-semibold text-gray-700">Email</h3>
                <p className="text-gray-500 text-sm">akrasol@info.com</p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faClock} className="text-blue-600 text-2xl" />
            <div>
                <h3 className="text-xl font-semibold text-gray-700">Business Hours</h3>
                <p className="text-gray-500 text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
            </div>
            </div>
        </div>

        <div className="md:w-2/5 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
            <p className="text-gray-500 text-sm mb-3">Fields marked <span className="text-blue-600">*</span> are required.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block mb-3 w-full  md:pr-5">
                    <span className="text-gray-700">Name<span className="text-blue-600 text-xl">*</span></span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
                <label className="block mb-3 w-full  md:pr-5">
                    <span className="text-gray-700">Email<span className="text-blue-600 text-xl">*</span></span>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter a valid email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
            
                <label className="block mb-3 w-full  md:pr-5">
                    <span className="text-gray-700">Message<span className="text-blue-600 text-xl">*</span></span>
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-3 px-2 block w-full h-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>

          
            <button
                type="submit"
                onClick={sendInquiry}
                disabled={!formData.message || !formData.email || !formData.email || isLoading}
                className="px-4 mt-5 block py-2 ml-auto bg-blue-600 text-white rounded-md enabled:hover:bg-blue-700 disabled:opacity-80 disabled:pointer-disabled disabled:cursor-not-allowed"
            >
                {isLoading && (
                  <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4 mr-3" />
                )}
                Submit
            </button>
        </form>
      </div>
    </div>
    </div>
  );
}
