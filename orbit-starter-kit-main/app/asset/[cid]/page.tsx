"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import { WalletConnect } from "@/components/walletConnect";
import { useAccount } from "wagmi";
import { getAssetByCid } from "@/lib/storage";
import { AssetMetadata, getAssetTypeLabel, getAssetTypeColor, formatRelativeTime, shortenAddress, getLicenseLabel } from "@/lib/metadata";
import { getGatewayUrl } from "@/lib/lighthouse";
import { Download, Lock, Unlock, Copy, ExternalLink, ArrowLeft } from "lucide-react";

export default function AssetDetail() {
  const params = useParams();
  const cid = params.cid as string;
  const { isConnected, address } = useAccount();
  const [asset, setAsset] = useState<AssetMetadata | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cid) {
      const foundAsset = getAssetByCid(cid);
      setAsset(foundAsset);
    }
  }, [cid]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.open(getGatewayUrl(cid), '_blank');
  };

  if (!asset) {
    return (
      <div className="min-h-screen bg-white-pattern flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-funnel-display text-2xl font-bold text-gray-900 mb-4">Asset not found</h2>
          <Link href="/browse">
            <button className="px-6 py-2 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))]">
              Browse Assets
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = isConnected && address?.toLowerCase() === asset.uploader.toLowerCase();

  return (
    <div className="min-h-screen bg-white-pattern flex flex-col">
      <div className="flex justify-between items-center pt-20 md:pt-32 container mx-auto px-4 md:px-16 mb-12">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
              <span className="text-[hsl(var(--accent))] text-2xl font-bold">☕</span>
            </div>
            <span className="font-funnel-display text-2xl font-bold text-[hsl(var(--primary))]">Baithak</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/browse"><div className="px-6 py-2 bg-white border border-gray-200 hover:border-gray-400 transition-smooth font-funnel-display text-gray-900">Browse</div></Link>
          <WalletConnect />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-16 pb-20">
        <Link href="/browse"><button className="flex items-center gap-2 text-gray-600 hover:text-[hsl(var(--primary))] mb-8 font-semibold"><ArrowLeft className="w-4 h-4" />Back to Browse</button></Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAssetTypeColor(asset.type)}`}>{getAssetTypeLabel(asset.type)}</span>
                {asset.isPrivate ? <Lock className="w-5 h-5 text-gray-400" /> : <Unlock className="w-5 h-5 text-gray-400" />}
              </div>
              <h1 className="font-funnel-display text-4xl font-bold text-[hsl(var(--primary))] mb-4">{asset.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{asset.description}</p>
              {asset.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">{asset.tags.map((tag) => (<span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#{tag}</span>))}</div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="font-funnel-display text-xl font-bold text-gray-900 mb-4">File Information</h2>
              <div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-gray-500">File Name:</span><span className="font-semibold text-gray-900">{asset.fileName}</span></div><div className="flex justify-between"><span className="text-gray-500">Size:</span><span className="font-semibold text-gray-900">{asset.sizeFormatted}</span></div><div className="flex justify-between"><span className="text-gray-500">License:</span><span className="font-semibold text-gray-900">{getLicenseLabel(asset.license)}</span></div><div className="flex justify-between"><span className="text-gray-500">Uploaded:</span><span className="font-semibold text-gray-900">{formatRelativeTime(asset.createdAt)}</span></div></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <button onClick={handleDownload} className="w-full py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] transition-smooth font-funnel-display font-semibold text-[hsl(var(--primary))] rounded-lg flex items-center justify-center gap-2 mb-3"><Download className="w-5 h-5" />Download File</button>
              <a href={getGatewayUrl(cid)} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white border border-gray-200 hover:border-gray-400 transition-smooth font-funnel-display text-gray-900 rounded-lg flex items-center justify-center gap-2"><ExternalLink className="w-5 h-5" />View on IPFS</a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-4">CID</h3>
              <div className="flex items-center gap-2"><code className="flex-1 text-xs font-mono bg-gray-50 p-3 rounded border border-gray-200 break-all">{cid}</code><button onClick={() => handleCopy(cid)} className="p-2 hover:bg-gray-100 rounded transition-smooth">{copied ? <span className="text-green-600 text-xs">✓</span> : <Copy className="w-4 h-4 text-gray-600" />}</button></div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-funnel-display text-lg font-bold text-gray-900 mb-4">Uploader</h3>
              <p className="font-mono text-sm text-gray-600">{shortenAddress(asset.uploader)}</p>
              {isOwner && <p className="text-xs text-[hsl(var(--accent))] mt-2 font-semibold">You own this asset</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
