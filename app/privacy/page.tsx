export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400">Last updated: January 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">1. Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, make a purchase,
                or contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">2. How We Use Your Information</h2>
              <ul className="text-slate-300 space-y-2">
                <li>• Provide and maintain our services</li>
                <li>• Process transactions and send related information</li>
                <li>• Send technical notices and support messages</li>
                <li>• Improve our services and develop new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">3. Information Sharing</h2>
              <p className="text-slate-300 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">4. Data Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">5. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at privacy@yaddusnetwork.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
