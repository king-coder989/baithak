"use client";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Database, Lock, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white-pattern">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pb-10 md:pb-20">
        {/* Header */}
        <div className="flex justify-between items-center pt-20 md:pt-32 container mx-auto px-4 md:px-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
              <span className="text-[hsl(var(--accent))] text-2xl font-bold">☕</span>
            </div>
            <span className="font-funnel-display text-2xl font-bold text-[hsl(var(--primary))]">
              Baithak
            </span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="pt-10 md:pt-20">
            <div className="space-y-6 mb-16 max-w-4xl">
              <h1 className="font-funnel-display text-5xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--primary))] text-balance">
                AI ki Baithak
              </h1>
              <p className="font-funnel-display text-xl md:text-2xl text-gray-600">
                A decentralized space for AI creators — where models meet chai.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl">
                Store, share, and collaborate on datasets, models, prompts, and configs. 
                Powered by Filecoin and Lighthouse for permanent, secure, decentralized storage.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <Database className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
                <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-2">
                  Decentralized Storage
                </h3>
                <p className="text-sm text-gray-600">
                  Permanent IPFS storage via Filecoin
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <Lock className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
                <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-2">
                  Encryption & Access Control
                </h3>
                <p className="text-sm text-gray-600">
                  Private files with granular access
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <Globe className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
                <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-2">
                  Web3 Native Auth
                </h3>
                <p className="text-sm text-gray-600">
                  Wallet-based authentication
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <Zap className="w-10 h-10 text-[hsl(var(--accent))] mb-4" />
                <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-sm text-gray-600">
                  Optimized retrieval and caching
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-funnel-display text-gray-900 text-lg">
                Start exploring or upload your first asset
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Link href="/browse" className="w-full md:w-auto">
                <div className="w-full md:w-[200px] py-3 px-6 bg-white border border-gray-200 hover:border-gray-400 transition-smooth text-center font-funnel-display font-semibold text-gray-900">
                  Browse Assets
                </div>
              </Link>
              <Link href="/upload" className="w-full md:w-auto">
                <div className="w-full md:w-[200px] py-3 px-6 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth text-center font-funnel-display font-semibold text-[hsl(var(--primary))]">
                  Upload Asset
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
