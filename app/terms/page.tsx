"use client";

import React from "react";
import { FileText, Scale, ShieldAlert, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-gray-900 text-white rounded-2xl">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Terms & Conditions</h1>
            <p className="text-gray-500">Last updated: January 2026</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-12">
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
              <Scale size={20} className="text-blue-600" />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
              <ShieldAlert size={20} className="text-red-500" />
              2. Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy, 
              which also governs the site and informs users of our data collection practices.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
              <CheckCircle size={20} className="text-green-600" />
              3. User Conduct
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All users are expected to behave in a professional and respectful manner. Any misuse of our platform, 
              including fraudulent activities or harassment, will result in immediate termination of account access.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contacting Us</h2>
            <p className="text-gray-600 text-sm">
              If there are any questions regarding these terms and conditions, you may contact us using the information on our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
