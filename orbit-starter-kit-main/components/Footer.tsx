import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              Built with ❤️ and ☕ by{" "}
              <span className="text-[hsl(var(--primary))] font-semibold">Baithak Team</span>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[hsl(var(--primary))] transition-smooth text-sm font-semibold"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[hsl(var(--primary))] transition-smooth text-sm font-semibold"
            >
              Docs
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[hsl(var(--primary))] transition-smooth"
            >
              <Image
                src="/assets/logos/x.png"
                width={20}
                height={20}
                alt="X"
                className="opacity-60 hover:opacity-100 transition-smooth"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
