import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AssetCard, AssetType } from "@/components/AssetCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockAssets = [
  {
    id: "1",
    name: "ImageNet Subset 2024",
    description: "A curated subset of ImageNet with 50,000 images across 100 categories, optimized for training.",
    type: "dataset" as AssetType,
    tags: ["computer-vision", "classification", "imagenet"],
    fileSize: "2.4 GB",
    uploader: "0x1234...5678",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isPrivate: false,
  },
  {
    id: "2",
    name: "GPT-2 Fine-tuned on Code",
    description: "GPT-2 model fine-tuned on Python and JavaScript codebases for code completion tasks.",
    type: "model" as AssetType,
    tags: ["nlp", "code-generation", "transformers"],
    fileSize: "548 MB",
    uploader: "0xabcd...ef90",
    uploadDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isPrivate: false,
  },
  {
    id: "3",
    name: "Creative Writing Prompts",
    description: "Collection of 500+ prompts for creative writing, story generation, and narrative tasks.",
    type: "prompt" as AssetType,
    tags: ["writing", "creative", "generation"],
    fileSize: "124 KB",
    uploader: "0x9876...5432",
    uploadDate: new Date(Date.now() - 30 * 60 * 1000),
    isPrivate: true,
  },
  {
    id: "4",
    name: "BERT Training Config",
    description: "Optimized configuration for training BERT models on consumer GPUs with gradient checkpointing.",
    type: "config" as AssetType,
    tags: ["bert", "training", "optimization"],
    fileSize: "8 KB",
    uploader: "0x5555...9999",
    uploadDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isPrivate: false,
  },
  {
    id: "5",
    name: "Medical Diagnosis Dataset",
    description: "Anonymized medical imaging dataset with 10,000 X-ray images and diagnosis labels.",
    type: "dataset" as AssetType,
    tags: ["medical", "healthcare", "x-ray"],
    fileSize: "5.2 GB",
    uploader: "0x7777...8888",
    uploadDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    isPrivate: true,
  },
  {
    id: "6",
    name: "Stable Diffusion LoRA",
    description: "LoRA weights for Stable Diffusion trained on anime art style with 10k images.",
    type: "model" as AssetType,
    tags: ["stable-diffusion", "lora", "anime"],
    fileSize: "156 MB",
    uploader: "0x2222...4444",
    uploadDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isPrivate: false,
  },
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "all" || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "recent") {
      return b.uploadDate.getTime() - a.uploadDate.getTime();
    }
    return 0;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Browse AI Assets</h1>
            <p className="text-lg text-muted-foreground">
              Discover datasets, models, prompts, and configs shared by the community.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow-soft">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dataset">Dataset</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="prompt">Prompt</SelectItem>
                <SelectItem value="config">Config</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="size">File Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{sortedAssets.length}</span> assets
            </p>
            <div className="flex gap-2">
              {selectedType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedType}
                  <button onClick={() => setSelectedType("all")} className="ml-1 hover:text-foreground">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>

          {/* Assets Grid */}
          {sortedAssets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAssets.map((asset) => (
                <AssetCard key={asset.id} {...asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No assets found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
