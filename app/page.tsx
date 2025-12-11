'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Task Management System</h1>

        <p className="text-gray-600 mb-6">
          Organize your tasks, track progress, and boost productivity.
        </p>

        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
