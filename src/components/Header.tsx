import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Upload, User, Grid3x3 } from "lucide-react";

export const Header = () => {
  // Simulated wallet connection state - will be replaced with actual Web3 integration
  const isConnected = false;
  const walletAddress = "0x1234...5678";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-soft">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Coffee className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none">Baithak</span>
            <span className="text-xs text-muted-foreground">AI ki Baithak</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            <Grid3x3 className="h-4 w-4" />
            Browse
          </Link>
          <Link to="/upload" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            <Upload className="h-4 w-4" />
            Upload
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </nav>

        {/* Wallet Connect Button */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              {walletAddress}
            </Button>
          ) : (
            <Button variant="accent" size="sm">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
