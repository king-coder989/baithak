"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import AssetCard from "@/components/AssetCard";
import { WalletConnect } from "@/components/walletConnect";
import { useAccount } from "wagmi";
import { getAssetsByUploader, getStats } from "@/lib/storage";
import { AssetMetadata, shortenAddress } from "@/lib/metadata";
import { Upload, Database } from "lucide-react";

export default function Profile() {
  const { isConnected, address } = useAccount();
  const [assets, setAssets] = useState<AssetMetadata[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (isConnected && address) {
      const userAssets = getAssetsByUploader(address);
      setAssets(userAssets);
      setStats(getStats(address));
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-white-pattern flex items-center justify-center">
        <div className="text-center"><h2 className="font-funnel-display text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2><p className="text-gray-600 mb-6">View your uploaded assets</p><WalletConnect /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-pattern flex flex-col">
      <div className="flex justify-between items-center pt-20 md:pt-32 container mx-auto px-4 md:px-16 mb-12">
        <Link href="/"><div className="flex items-center gap-3 cursor-pointer"><div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center"><span className="text-[hsl(var(--accent))] text-2xl font-bold">☕</span></div><span className="font-funnel-display text-2xl font-bold text-[hsl(var(--primary))]">Baithak</span></div></Link>
        <div className="flex items-center gap-4"><Link href="/browse"><div className="px-6 py-2 bg-white border border-gray-200 hover:border-gray-400 transition-smooth font-funnel-display text-gray-900">Browse</div></Link><Link href="/upload"><div className="px-6 py-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))]">Upload</div></Link><WalletConnect /></div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-16 pb-20">
        <div className="mb-12"><h1 className="font-funnel-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-2">My Profile</h1><p className="text-lg text-gray-600 font-mono">{address && shortenAddress(address)}</p></div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-6"><Database className="w-10 h-10 text-[hsl(var(--accent))] mb-3" /><p className="text-3xl font-bold text-gray-900">{stats.totalAssets}</p><p className="text-sm text-gray-600">Total Assets</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6"><p className="text-3xl font-bold text-gray-900">{stats.publicAssets}</p><p className="text-sm text-gray-600">Public Assets</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6"><p className="text-3xl font-bold text-gray-900">{stats.privateAssets}</p><p className="text-sm text-gray-600">Private Assets</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6"><p className="text-3xl font-bold text-gray-900">{(stats.totalSize / (1024 * 1024)).toFixed(2)} MB</p><p className="text-sm text-gray-600">Total Storage</p></div>
          </div>
        )}

        {assets.length > 0 ? (
          <div><h2 className="font-funnel-display text-2xl font-bold text-gray-900 mb-6">My Uploads</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{assets.map((asset) => (<AssetCard key={asset.id} asset={asset} />))}</div></div>
        ) : (
          <div className="text-center py-20"><Upload className="w-20 h-20 text-gray-300 mx-auto mb-6" /><h3 className="font-funnel-display text-2xl font-bold text-gray-900 mb-2">No uploads yet</h3><p className="text-gray-600 mb-6">Start sharing your AI assets with the community</p><Link href="/upload"><div className="inline-block px-8 py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))]">Upload Your First Asset</div></Link></div>
        )}
      </main>
      <Footer />
    </div>
  );
}
