export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-slate-400">Last updated: January 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                By accessing and using Yaddu's Network services, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">2. Service Description</h2>
              <p className="text-slate-300 leading-relaxed">
                Yaddu's Network provides game server hosting services, including but not limited to Minecraft servers,
                voice servers, and related gaming infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">3. User Responsibilities</h2>
              <ul className="text-slate-300 space-y-2">
                <li>• Maintain the confidentiality of your account credentials</li>
                <li>• Use services in compliance with applicable laws</li>
                <li>• Respect other users and maintain appropriate conduct</li>
                <li>• Report any security vulnerabilities or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">4. Payment Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                All payments are processed securely. Refunds are available within 7 days of purchase, subject to our
                refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">5. Contact Information</h2>
              <p className="text-slate-300 leading-relaxed">
                For questions about these Terms of Service, please contact us at legal@yaddusnetwork.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
