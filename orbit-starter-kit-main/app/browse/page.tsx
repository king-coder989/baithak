"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import AssetCard from "@/components/AssetCard";
import { WalletConnect } from "@/components/walletConnect";
import { useAccount } from "wagmi";
import { getAssets, searchAssets, filterAssetsByType, sortAssets } from "@/lib/storage";
import { AssetMetadata } from "@/lib/metadata";
import { Search, Filter } from "lucide-react";

export default function Browse() {
  const { isConnected, address } = useAccount();
  const [assets, setAssets] = useState<AssetMetadata[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name" | "size">("newest");

  useEffect(() => {
    loadAssets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [assets, searchQuery, filterType, sortBy]);

  const loadAssets = () => {
    const allAssets = getAssets();
    setAssets(allAssets);
  };

  const applyFilters = () => {
    let result = assets;

    // Search
    if (searchQuery.trim()) {
      result = searchAssets(searchQuery);
    }

    // Filter by type
    if (filterType !== "all") {
      result = result.filter(asset => asset.type === filterType);
    }

    // Sort
    result = sortAssets(result, sortBy);

    setFilteredAssets(result);
  };

  return (
    <div className="min-h-screen bg-white-pattern flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center pt-20 md:pt-32 container mx-auto px-4 md:px-16 mb-12">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
              <span className="text-[hsl(var(--accent))] text-2xl font-bold">☕</span>
            </div>
            <span className="font-funnel-display text-2xl font-bold text-[hsl(var(--primary))]">
              Baithak
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/upload" className="hidden md:block">
            <div className="px-6 py-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))]">
              Upload
            </div>
          </Link>
          {isConnected && address && (
            <Link href="/profile">
              <div className="px-6 py-2 bg-white border border-gray-200 hover:border-gray-400 transition-smooth font-funnel-display text-gray-900">
                Profile
              </div>
            </Link>
          )}
          <WalletConnect />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-16 pb-20">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-funnel-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-4">
            Browse AI Assets
          </h1>
          <p className="text-lg text-gray-600">
            Discover datasets, models, prompts, and configs from the community
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="dataset">Datasets</option>
                <option value="model">Models</option>
                <option value="prompt">Prompts</option>
                <option value="config">Configs</option>
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="size">Size (Largest)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="md:col-span-1 flex items-center justify-center">
              <span className="text-sm text-gray-600 font-semibold">
                {filteredAssets.length}
              </span>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-funnel-display text-2xl font-bold text-gray-900 mb-2">
              No assets found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterType !== "all" 
                ? "Try adjusting your filters or search query"
                : "Be the first to upload an asset!"}
            </p>
            <Link href="/upload">
              <div className="inline-block px-8 py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))]">
                Upload First Asset
              </div>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
