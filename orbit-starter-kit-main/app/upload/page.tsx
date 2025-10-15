"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { WalletConnect } from "@/components/walletConnect";
import { useAccount } from "wagmi";
import { uploadFile } from "@/lib/lighthouse";
import { createAssetMetadata, AssetType, License } from "@/lib/metadata";
import { saveAsset } from "@/lib/storage";
import { Upload as UploadIcon, File, X, CheckCircle, Loader2 } from "lucide-react";

export default function Upload() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [assetType, setAssetType] = useState<AssetType | "">("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [license, setLicense] = useState<License>("mit");
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessList, setAccessList] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      setError("Please connect your wallet");
      return;
    }

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!assetType) {
      setError("Please select an asset type");
      return;
    }

    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
      if (!apiKey) {
        throw new Error("Lighthouse API key not configured");
      }

      // Create FileList from single file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const fileList = dataTransfer.files;

      // Progress callback
      const progressCallback = (progressData: any) => {
        const pct = Math.round((progressData.uploaded / progressData.total) * 100);
        setUploadProgress(Math.min(pct, 99));
      };

      // Upload to Lighthouse
      const result = await uploadFile(fileList, apiKey, progressCallback);
      setUploadProgress(100);

      // Parse access list
      const accessAddresses = accessList
        .split('\n')
        .map(addr => addr.trim())
        .filter(addr => addr.length > 0);

      // Create metadata
      const metadata = createAssetMetadata(
        name,
        description,
        assetType as AssetType,
        tags,
        license,
        address,
        result.Hash,
        parseInt(result.Size),
        file.name,
        isPrivate,
        isPrivate ? accessAddresses : undefined
      );

      // Save to local storage
      saveAsset(metadata);

      // Success - redirect to asset page
      setTimeout(() => {
        router.push(`/asset/${result.Hash}`);
      }, 1000);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      setUploadProgress(0);
    }
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
          <Link href="/browse" className="hidden md:block">
            <div className="px-6 py-2 bg-white border border-gray-200 hover:border-gray-400 transition-smooth font-funnel-display text-gray-900">
              Browse
            </div>
          </Link>
          <WalletConnect />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-16 pb-20">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-funnel-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-4">
            Upload AI Asset
          </h1>
          <p className="text-lg text-gray-600">
            Store your datasets, models, prompts, and configs on Filecoin
          </p>
        </div>

        {!isConnected ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-funnel-display text-2xl font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 mb-6">
              You need to connect your wallet to upload assets
            </p>
            <WalletConnect />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* File Upload */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
              <h2 className="font-funnel-display text-xl font-bold text-gray-900 mb-4">
                Upload File
              </h2>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[hsl(var(--accent))] transition-smooth cursor-pointer"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                {file ? (
                  <div className="flex items-center justify-center gap-4">
                    <File className="h-10 w-10 text-[hsl(var(--accent))]" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-smooth"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="h-16 w-16 mx-auto text-gray-400" />
                    <div>
                      <p className="text-xl font-semibold text-gray-900">Drop your file here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload Progress */}
              {uploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {uploadProgress < 100 ? 'Uploading...' : 'Finalizing...'}
                    </span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[hsl(var(--accent))] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Asset Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
              <h2 className="font-funnel-display text-xl font-bold text-gray-900 mb-6">
                Asset Details
              </h2>

              <div className="space-y-6">
                {/* Asset Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Asset Type *
                  </label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as AssetType)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="dataset">Dataset</option>
                    <option value="model">Model</option>
                    <option value="prompt">Prompt</option>
                    <option value="config">Config</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., ImageNet Subset 2024"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                    maxLength={100}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your asset..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent resize-none"
                    maxLength={1000}
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-smooth font-semibold rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--primary))] rounded-full text-sm font-semibold flex items-center gap-2"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* License */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    License
                  </label>
                  <select
                    value={license}
                    onChange={(e) => setLicense(e.target.value as License)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
                  >
                    <option value="mit">MIT</option>
                    <option value="apache">Apache 2.0</option>
                    <option value="gpl">GPL-3.0</option>
                    <option value="cc-by">CC BY 4.0</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
              <h2 className="font-funnel-display text-xl font-bold text-gray-900 mb-6">
                Privacy Settings
              </h2>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold text-gray-900">Private Asset</p>
                  <p className="text-sm text-gray-500">
                    Only you and specified addresses can access
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPrivate ? 'bg-[hsl(var(--accent))]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPrivate ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {isPrivate && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Access Control Addresses
                  </label>
                  <textarea
                    value={accessList}
                    onChange={(e) => setAccessList(e.target.value)}
                    placeholder="0x1234...&#10;0x5678..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter wallet addresses (one per line) that can access this private asset
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading || !file || !assetType || !name || !description}
                className={`flex-1 py-4 rounded-lg font-funnel-display font-semibold text-lg flex items-center justify-center gap-2 transition-smooth ${
                  uploading || !file || !assetType || !name || !description
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-glow))] text-[hsl(var(--primary))]'
                }`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {uploadProgress < 100 ? 'Uploading...' : 'Finalizing...'}
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-5 w-5" />
                    Upload to Filecoin
                  </>
                )}
              </button>
              <Link href="/browse">
                <button
                  type="button"
                  className="px-8 py-4 bg-white border border-gray-200 hover:border-gray-400 transition-smooth rounded-lg font-funnel-display font-semibold text-gray-900"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
