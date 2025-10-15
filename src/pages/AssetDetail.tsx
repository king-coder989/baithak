import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  Copy, 
  Database, 
  Brain, 
  FileText, 
  Settings,
  Lock,
  Globe,
  Calendar,
  HardDrive,
  User,
  Shield
} from "lucide-react";
import { toast } from "sonner";

const AssetDetail = () => {
  const { id } = useParams();

  // Mock asset data - in real app, fetch based on id
  const asset = {
    id: "1",
    name: "ImageNet Subset 2024",
    description: "A curated subset of ImageNet with 50,000 images across 100 categories, optimized for training computer vision models. This dataset includes high-quality images with verified labels and balanced class distribution.",
    type: "dataset",
    tags: ["computer-vision", "classification", "imagenet", "deep-learning"],
    fileSize: "2.4 GB",
    uploader: "0x1234...5678",
    uploaderFull: "0x1234567890abcdef1234567890abcdef12345678",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isPrivate: false,
    license: "MIT",
    cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    downloads: 1247,
  };

  const typeConfig = {
    dataset: { icon: Database, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    model: { icon: Brain, color: "bg-purple-500/10 text-purple-600 border-purple-200" },
    prompt: { icon: FileText, color: "bg-green-500/10 text-green-600 border-green-200" },
    config: { icon: Settings, color: "bg-orange-500/10 text-orange-600 border-orange-200" },
  }[asset.type];

  const TypeIcon = typeConfig.icon;

  const handleCopyCID = () => {
    navigator.clipboard.writeText(asset.cid);
    toast.success("CID copied to clipboard");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-muted-foreground">
            <Link to="/browse" className="hover:text-foreground transition-smooth">
              Browse
            </Link>
            {" / "}
            <span className="text-foreground">{asset.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <Badge variant="outline" className={`gap-1 ${typeConfig.color}`}>
                    <TypeIcon className="h-3 w-3" />
                    {asset.type}
                  </Badge>
                  {asset.isPrivate ? (
                    <Badge variant="outline" className="gap-1">
                      <Lock className="h-3 w-3" />
                      Private
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <Globe className="h-3 w-3" />
                      Public
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-4">{asset.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {asset.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <HardDrive className="h-4 w-4" />
                        File Size
                      </div>
                      <p className="font-medium">{asset.fileSize}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Upload Date
                      </div>
                      <p className="font-medium">{asset.uploadDate.toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Uploader
                      </div>
                      <p className="font-mono text-sm">{asset.uploader}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        License
                      </div>
                      <p className="font-medium">{asset.license}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Copy className="h-4 w-4" />
                      IPFS CID
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                        {asset.cid}
                      </code>
                      <Button size="sm" variant="outline" onClick={handleCopyCID}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted p-8 text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Preview not available for this asset type</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button variant="accent" size="lg" className="w-full">
                    <Download className="h-5 w-5" />
                    Download Asset
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Downloads</span>
                    <span className="font-semibold">{asset.downloads.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <span className="font-semibold">2,341</span>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Actions - only shown if user is owner */}
              {false && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Manage Asset</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Access Control
                    </Button>
                    <Button variant="destructive" size="sm" className="w-full">
                      Delete Asset
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssetDetail;
