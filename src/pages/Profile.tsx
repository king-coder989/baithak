import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AssetCard } from "@/components/AssetCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, HardDrive, Upload, Calendar } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("uploads");

  // Mock user data
  const userData = {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    ensName: null, // Could be "creator.eth"
    joinDate: new Date("2024-01-15"),
    totalUploads: 12,
    storageUsed: "8.4 GB",
    totalDownloads: 3421,
  };

  // Mock assets
  const userAssets = [
    {
      id: "1",
      name: "ImageNet Subset 2024",
      description: "A curated subset of ImageNet with 50,000 images across 100 categories, optimized for training.",
      type: "dataset" as const,
      tags: ["computer-vision", "classification", "imagenet"],
      fileSize: "2.4 GB",
      uploader: userData.address.slice(0, 6) + "..." + userData.address.slice(-4),
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isPrivate: false,
    },
    {
      id: "2",
      name: "GPT-2 Fine-tuned on Code",
      description: "GPT-2 model fine-tuned on Python and JavaScript codebases for code completion tasks.",
      type: "model" as const,
      tags: ["nlp", "code-generation", "transformers"],
      fileSize: "548 MB",
      uploader: userData.address.slice(0, 6) + "..." + userData.address.slice(-4),
      uploadDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPrivate: false,
    },
    {
      id: "3",
      name: "Medical Diagnosis Dataset",
      description: "Anonymized medical imaging dataset with 10,000 X-ray images and diagnosis labels.",
      type: "dataset" as const,
      tags: ["medical", "healthcare", "x-ray"],
      fileSize: "5.2 GB",
      uploader: userData.address.slice(0, 6) + "..." + userData.address.slice(-4),
      uploadDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
      isPrivate: true,
    },
  ];

  const privateAssets = userAssets.filter(asset => asset.isPrivate);
  const publicAssets = userAssets.filter(asset => !asset.isPrivate);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const daysSinceJoin = Math.floor(
    (new Date().getTime() - userData.joinDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary shadow-elevated">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {userData.ensName || formatAddress(userData.address)}
                </h1>
                <p className="text-muted-foreground font-mono text-sm mb-4">
                  {userData.address}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.totalUploads}</p>
                    <p className="text-sm text-muted-foreground">Total Uploads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.storageUsed}</p>
                    <p className="text-sm text-muted-foreground">Storage Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{daysSinceJoin}d</p>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-glow/10 text-accent">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.totalDownloads.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assets Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="uploads">All Uploads</TabsTrigger>
              <TabsTrigger value="private">Private Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="uploads" className="space-y-6">
              {publicAssets.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {publicAssets.length} public asset{publicAssets.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicAssets.map((asset) => (
                      <AssetCard key={asset.id} {...asset} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No uploads yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start sharing your AI assets with the community
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="private" className="space-y-6">
              {privateAssets.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {privateAssets.length} private asset{privateAssets.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {privateAssets.map((asset) => (
                      <AssetCard key={asset.id} {...asset} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No private assets</h3>
                  <p className="text-muted-foreground">
                    Private assets are only visible to you and authorized addresses
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
