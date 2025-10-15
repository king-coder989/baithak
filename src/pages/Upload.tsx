import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, File, X, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Upload = () => {
  const [assetType, setAssetType] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file || !assetType) {
      toast.error("Please select a file and asset type");
      return;
    }

    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
      toast.success("Asset uploaded successfully!", {
        description: "Your asset is now available on IPFS via Filecoin.",
      });
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Upload AI Asset</h1>
            <p className="text-lg text-muted-foreground">
              Store your datasets, models, prompts, and configs on Filecoin.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload File</CardTitle>
                  <CardDescription>
                    Drag and drop your file or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:border-accent transition-smooth cursor-pointer"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    {file ? (
                      <div className="flex items-center justify-center gap-4">
                        <File className="h-8 w-8 text-accent" />
                        <div className="text-left">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">Drop your file here</p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse
                          </p>
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
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Asset Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Details</CardTitle>
                  <CardDescription>
                    Provide information about your asset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Asset Type */}
                  <div className="space-y-2">
                    <Label htmlFor="asset-type">Asset Type *</Label>
                    <Select value={assetType} onValueChange={setAssetType}>
                      <SelectTrigger id="asset-type">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dataset">Dataset</SelectItem>
                        <SelectItem value="model">Model</SelectItem>
                        <SelectItem value="prompt">Prompt</SelectItem>
                        <SelectItem value="config">Config</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="e.g., ImageNet Subset 2024" required />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your asset..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-foreground"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* License */}
                  <div className="space-y-2">
                    <Label htmlFor="license">License</Label>
                    <Select defaultValue="mit">
                      <SelectTrigger id="license">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mit">MIT</SelectItem>
                        <SelectItem value="apache">Apache 2.0</SelectItem>
                        <SelectItem value="gpl">GPL-3.0</SelectItem>
                        <SelectItem value="cc-by">CC BY 4.0</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can access your asset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="private">Private Asset</Label>
                      <p className="text-sm text-muted-foreground">
                        Only you and specified addresses can access
                      </p>
                    </div>
                    <Switch
                      id="private"
                      checked={isPrivate}
                      onCheckedChange={setIsPrivate}
                    />
                  </div>

                  {isPrivate && (
                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="access-control">Access Control Addresses</Label>
                      <Textarea
                        id="access-control"
                        placeholder="0x1234...&#10;0x5678..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter wallet addresses (one per line) that can access this private asset
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="h-5 w-5" />
                      Upload to Filecoin
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
