export default function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Fuera Del Camino</h3>
            <p className="text-sm text-wijn-lichtgroen">Bedevaart naar goede wijn</p>
          </div>
          
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Wijnclub Fuera Del Camino. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
