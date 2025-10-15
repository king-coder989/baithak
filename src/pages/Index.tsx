import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Coffee, Upload, Grid3x3, Shield, HardDrive, Globe, Zap } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: HardDrive,
      title: "Decentralized Storage",
      description: "Your AI assets stored permanently on Filecoin via Lighthouse, ensuring availability and ownership.",
    },
    {
      icon: Shield,
      title: "Encryption & Access Control",
      description: "Private assets with wallet-based encryption. Grant access to specific addresses as needed.",
    },
    {
      icon: Globe,
      title: "Permanent IPFS Storage",
      description: "Content-addressed storage with cryptographic verification. Your data, immutable and accessible forever.",
    },
    {
      icon: Zap,
      title: "Web3 Native Auth",
      description: "No emails, no passwords. Just connect your wallet and start building with the AI community.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-subtle">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxQzFDM0MiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0aDFsLTEgMXptLTEgMmgxbC0xIDF6bS0yIDJoMWwtMSAxem0tMiAyaDFsLTEgMXptLTIgMmgxbC0xIDF6bS0yIDJoMWwtMSAxem0tMiAyaDFsLTEgMXptLTIgMmgxbC0xIDF6bS0yIDJoMWwtMSAxem0tMiAyaDFsLTEgMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-elevated">
                  <Coffee className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                AI ki <span className="text-accent">Baithak</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                where models meet chai
              </p>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                A decentralized space for AI creators powered by Filecoin & Lighthouse. 
                Store, share, and collaborate on datasets, models, prompts, and configs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/browse">
                    <Grid3x3 className="h-5 w-5" />
                    Browse Assets
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/upload">
                    <Upload className="h-5 w-5" />
                    Upload Asset
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Built for the AI Community
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to store, share, and collaborate on AI assets in a decentralized way.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card 
                      key={index} 
                      className="group hover-lift shadow-soft hover:shadow-medium animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                            <Icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Join the Baithak?
              </h2>
              <p className="text-lg opacity-90">
                Connect your wallet and start sharing your AI creations with the community today.
              </p>
              <Button variant="accent" size="lg">
                Connect Wallet
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
