import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Wijnen() {
  const [wijnen, setWijnen] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [zoekCriteria, setZoekCriteria] = useState({
    zoekterm: '',
    wijnmaker: '',
    druif: '',
    land: '',
    regio: '',
    vintage: '',
    prijsMin: '',
    prijsMax: '',
    proever: '',
    kwaliteitsniveau: '',
    aroma: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZoekCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Bouw query parameters
    const queryParams = new URLSearchParams();
    Object.entries(zoekCriteria).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    try {
      const response = await fetch(`/api/zoeken?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setWijnen(data.proefnotities);
      } else {
        console.error('Zoekfout:', data.error);
        alert('Er is een fout opgetreden bij het zoeken.');
      }
    } catch (error) {
      console.error('Zoekfout:', error);
      alert('Er is een fout opgetreden bij het zoeken.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Wijnbibliotheek - Fuera Del Camino</title>
        <meta name="description" content="Doorzoek onze database van geproefde wijnen" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wijn-donkergroen mb-6">Wijnbibliotheek</h1>
        <p className="mb-6">Doorzoek onze database van geproefde wijnen op basis van verschillende criteria.</p>

        <div className="card mb-8">
          <h2 className="section-title">Zoeken</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-group">
                <label className="form-label">Zoekterm</label>
                <input
                  type="text"
                  name="zoekterm"
                  value={zoekCriteria.zoekterm}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Zoek in alle velden"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Wijnmaker</label>
                <input
                  type="text"
                  name="wijnmaker"
                  value={zoekCriteria.wijnmaker}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Druif</label>
                <input
                  type="text"
                  name="druif"
                  value={zoekCriteria.druif}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Land</label>
                <input
                  type="text"
                  name="land"
                  value={zoekCriteria.land}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Regio</label>
                <input
                  type="text"
                  name="regio"
                  value={zoekCriteria.regio}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Jaargang</label>
                <input
                  type="number"
                  name="vintage"
                  value={zoekCriteria.vintage}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Minimumprijs (€)</label>
                <input
                  type="number"
                  step="0.01"
                  name="prijsMin"
                  value={zoekCriteria.prijsMin}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Maximumprijs (€)</label>
                <input
                  type="number"
                  step="0.01"
                  name="prijsMax"
                  value={zoekCriteria.prijsMax}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Proever</label>
                <input
                  type="text"
                  name="proever"
                  value={zoekCriteria.proever}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Kwaliteitsniveau</label>
                <select
                  name="kwaliteitsniveau"
                  value={zoekCriteria.kwaliteitsniveau}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Selecteer --</option>
                  <option value="fout">Fout</option>
                  <option value="slecht">Slecht</option>
                  <option value="redelijk">Redelijk</option>
                  <option value="goed">Goed</option>
                  <option value="heel_goed">Heel goed</option>
                  <option value="voortreffelijk">Voortreffelijk</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Aroma</label>
                <input
                  type="text"
                  name="aroma"
                  value={zoekCriteria.aroma}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="bijv. kersen, vanille"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Zoeken...' : 'Zoeken'}
              </button>
            </div>
          </form>
        </div>

        {wijnen.length > 0 ? (
          <div className="card">
            <h2 className="section-title">Zoekresultaten ({wijnen.length})</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wijnen.map((proefnotitie) => (
                <div key={proefnotitie.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-wijn-donkergroen">{proefnotitie.wijn.naam} {proefnotitie.wijn.vintage}</h3>
                  <p className="text-sm text-gray-600 mb-2">Wijnmaker: {proefnotitie.wijn.wijnmaker}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-sm"><span className="font-medium">Druif:</span> {proefnotitie.wijn.druif}</p>
                      <p className="text-sm"><span className="font-medium">Land/regio:</span> {proefnotitie.wijn.land}, {proefnotitie.wijn.regio}</p>
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Prijs:</span> €{proefnotitie.wijn.prijs.toFixed(2)}</p>
                      <p className="text-sm"><span className="font-medium">Alcohol:</span> {proefnotitie.wijn.alcoholpercentage}%</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm"><span className="font-medium">Kwaliteit:</span> {proefnotitie.kwaliteitsniveau.replace('_', ' ')}</p>
                    <p className="text-sm"><span className="font-medium">Drinkbaarheid:</span> {proefnotitie.drinkbaarheid.replace('_', ' ')}</p>
                  </div>
                  
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Geproefd door {proefnotitie.gebruiker.naam} op {new Date(proefnotitie.proefdatum).toLocaleDateString('nl-NL')}</p>
                  </div>
                  
                  <a href={`/proefnotitie/${proefnotitie.id}`} className="text-wijn-blauw hover:underline text-sm mt-2 inline-block">
                    Bekijk volledige proefnotitie
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {isLoading ? (
              <p>Zoeken...</p>
            ) : (
              <p>Gebruik het zoekformulier om wijnen te vinden.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
