"use client";

import React from "react";
import { Linkedin, Mail, Briefcase, Users, Target } from "lucide-react";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300">
            Build the future of e-commerce with Looks Shop. We're looking for passionate individuals to join our journey.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Equal Opportunity Section */}
        <section className="mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Equal Opportunity</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            We are an organization that believes in equal opportunity and encourage diversity in our workforce. 
            At Looks Shop, we celebrate different perspectives and are committed to creating an inclusive environment 
            for all employees.
          </p>
        </section>

        {/* Stay Updated Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Linkedin size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">LinkedIn Updates</h3>
            </div>
            <p className="text-gray-600 mb-8 flex-grow">
              Stay updated about our latest job postings and company news by following us on LinkedIn.
            </p>
            <a 
              href="https://www.linkedin.com/company/looksshop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition-colors"
            >
              Review LinkedIn Profile
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Send Your CV</h3>
            </div>
            <p className="text-gray-600 mb-8 flex-grow">
              Don't see a role that fits? Send us your professional CV anyway, and we'll keep you in mind for future openings.
            </p>
            <a 
              href="mailto:hr@looksshop.com" 
              className="inline-flex items-center justify-center bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
            >
              Email Professional CV
            </a>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">Why Work With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 text-blue-600">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-gray-800">Innovation</h4>
              <p className="text-sm text-gray-500 mt-2">Constantly evolving and embracing new tech</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 text-blue-600">
                <Briefcase size={24} />
              </div>
              <h4 className="font-bold text-gray-800">Growth</h4>
              <p className="text-sm text-gray-500 mt-2">Clear path for career progression</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 text-blue-600">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-gray-800">Culture</h4>
              <p className="text-sm text-gray-500 mt-2">Collaborative and diverse environment</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
