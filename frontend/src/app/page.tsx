export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          AI Automate Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Enterprise Workflow Automation with AI
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </a>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
