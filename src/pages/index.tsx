import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Shake App</title>
        <meta name="description" content="Manage and create shakes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 ${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundImage: "url('/images/mainbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.6)",
        }}
      >
        <main className="text-center flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-lg max-w-2xl w-full">
          <h1 className="text-4xl font-bold">Welcome to the Shake App 🥤</h1>
          <p className="text-xl text-gray-700">
            Create, view, and manage your favorite shakes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/createshake"
              className="rounded-xl px-6 py-3 text-white font-medium shadow-lg bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
            >
              Go to Create Page
            </Link>

            <Link
              href="/showshakes"
              className="rounded-xl px-6 py-3 text-white font-medium shadow-lg bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
            >
              Go to Data Page
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
