import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Fuera Del Camino
            </Link>
            <span className="ml-2 text-sm text-wijn-lichtgroen">Bedevaart naar goede wijn</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-wijn-lichtgroen transition-colors">
              Home
            </Link>
            <Link href="/proeven" className="hover:text-wijn-lichtgroen transition-colors">
              Proeven
            </Link>
            <Link href="/wijnen" className="hover:text-wijn-lichtgroen transition-colors">
              Wijnen
            </Link>
            <Link href="/over-ons" className="hover:text-wijn-lichtgroen transition-colors">
              Over Ons
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-wijn-lichtgroen transition-colors">
              Inloggen
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
