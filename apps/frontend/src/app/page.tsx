export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <h1 className="text-4xl font-bold text-blue-400">Cloud Incident Copilot</h1>
      <p className="text-gray-400 text-lg">AI-powered incident response platform</p>
      <div className="mt-6 flex gap-3">
        <a
          href="/dashboard"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Go to Dashboard
        </a>
        <a
          href="/api/health"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
        >
          Health Check
        </a>
      </div>
      {/* TODO Phase 5: replace with real dashboard redirect */}
    </main>
  );
}
