"use client";
import Link from "next/link";
import { AssetMetadata, getAssetTypeLabel, getAssetTypeColor, formatRelativeTime, shortenAddress } from "@/lib/metadata";
import { getGatewayUrl } from "@/lib/lighthouse";
import { Lock, Unlock } from "lucide-react";

interface AssetCardProps {
  asset: AssetMetadata;
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link href={`/asset/${asset.cid}`}>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAssetTypeColor(asset.type)}`}>
            {getAssetTypeLabel(asset.type)}
          </span>
          {asset.isPrivate ? (
            <Lock className="w-4 h-4 text-gray-400" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Content */}
        <h3 className="font-funnel-display text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {asset.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {asset.description}
        </p>

        {/* Tags */}
        {asset.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {asset.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                #{tag}
              </span>
            ))}
            {asset.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{asset.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
          <span className="font-mono">{shortenAddress(asset.uploader)}</span>
          <div className="flex items-center gap-3">
            <span>{asset.sizeFormatted}</span>
            <span>{formatRelativeTime(asset.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
