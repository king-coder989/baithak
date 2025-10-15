import { Coffee, Github, Twitter, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand and Tagline */}
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-accent" />
            <p className="text-sm text-muted-foreground">
              Built with <span className="text-destructive">❤️</span> and <span className="text-accent">☕</span> by the Baithak team
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://docs.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <BookOpen className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2025 Baithak. A decentralized space for AI creators.</p>
        </div>
      </div>
    </footer>
  );
};
