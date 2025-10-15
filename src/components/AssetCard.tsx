import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Brain, FileText, Settings, Lock, Globe, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export type AssetType = "dataset" | "model" | "prompt" | "config";

interface AssetCardProps {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  tags: string[];
  fileSize: string;
  uploader: string;
  uploadDate: Date;
  isPrivate: boolean;
  className?: string;
}

const assetTypeConfig = {
  dataset: { icon: Database, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  model: { icon: Brain, color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  prompt: { icon: FileText, color: "bg-green-500/10 text-green-600 border-green-200" },
  config: { icon: Settings, color: "bg-orange-500/10 text-orange-600 border-orange-200" },
};

export const AssetCard = ({
  id,
  name,
  description,
  type,
  tags,
  fileSize,
  uploader,
  uploadDate,
  isPrivate,
  className,
}: AssetCardProps) => {
  const TypeIcon = assetTypeConfig[type].icon;
  const typeColor = assetTypeConfig[type].color;
  
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-smooth hover:shadow-medium hover:-translate-y-1 cursor-pointer",
      className
    )}>
      <Link to={`/asset/${id}`}>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline" className={cn("gap-1", typeColor)}>
              <TypeIcon className="h-3 w-3" />
              {type}
            </Badge>
            {isPrivate ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <CardTitle className="line-clamp-1 text-lg group-hover:text-accent transition-smooth">
            {name}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-[2.5rem]">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-4">
            <span className="font-medium">{fileSize}</span>
            <span>{timeAgo(uploadDate)}</span>
          </div>
          <span className="truncate max-w-[120px]" title={uploader}>
            {uploader}
          </span>
        </CardFooter>
      </Link>

      {/* Hover Actions */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/95 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-smooth">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link to={`/asset/${id}`}>
              <Eye className="h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button size="sm" variant="accent" className="flex-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
};
