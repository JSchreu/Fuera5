import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AromaSelector from '../components/AromaSelector';

export default function ProefFormulier() {
  const [formData, setFormData] = useState({
    // Algemene informatie
    naamProever: '',
    medeproevers: '',
    proefdatum: '',
    naamWijn: '',
    naamWijnmaker: '',
    druif: '',
    vintage: '',
    prijs: '',
    alcoholpercentage: '',
    land: '',
    regio: '',
    
    // Uiterlijk
    uiterlijkHelderheid: '',
    uiterlijkIntensiteit: '',
    uiterlijkKleur: '',
    uiterlijkAndereKenmerken: '',
    
    // Geur
    geurConditie: '',
    geurIntensiteit: '',
    geurOntwikkeling: '',
    geurAroma: [],
    
    // Smaak
    smaakZoetheid: '',
    smaakZuurgehalte: '',
    smaakTaninegehalte: '',
    smaakAlcoholgehalte: '',
    smaakBody: '',
    smaakMousse: '',
    smaakIntensiteit: '',
    smaakAroma: [],
    smaakAfdronk: '',
    
    // Conclusie
    kwaliteitsniveau: '',
    drinkbaarheid: '',
    aantekeningen: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAromaChange = (type, aromas) => {
    setFormData(prev => ({ ...prev, [type]: aromas }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hier komt later de API call om het formulier op te slaan
    console.log('Form submitted:', formData);
    alert('Proefnotitie opgeslagen!');
  };

  return (
    <div>
      <Head>
        <title>Wijn Proeven - Fuera Del Camino</title>
        <meta name="description" content="Wijnproefformulier volgens WSET-methode" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wijn-donkergroen mb-6">Wijnproefformulier</h1>
        <p className="mb-6">Vul dit formulier in om een nieuwe wijn te proeven volgens de WSET-methode.</p>

        <form onSubmit={handleSubmit} className="mb-12">
          {/* Algemene informatie */}
          <div className="card mb-8">
            <h2 className="section-title">Algemene Informatie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Naam Proever</label>
                <input
                  type="text"
                  name="naamProever"
                  value={formData.naamProever}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Medeproevers</label>
                <input
                  type="text"
                  name="medeproevers"
                  value={formData.medeproevers}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Proefdatum</label>
                <input
                  type="date"
                  name="proefdatum"
                  value={formData.proefdatum}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Naam Wijn</label>
                <input
                  type="text"
                  name="naamWijn"
                  value={formData.naamWijn}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Wijnmaker</label>
                <input
                  type="text"
                  name="naamWijnmaker"
                  value={formData.naamWijnmaker}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Druif</label>
                <input
                  type="text"
                  name="druif"
                  value={formData.druif}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Jaargang</label>
                <input
                  type="number"
                  name="vintage"
                  value={formData.vintage}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Prijs (€)</label>
                <input
                  type="number"
                  step="0.01"
                  name="prijs"
                  value={formData.prijs}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Alcoholpercentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="alcoholpercentage"
                  value={formData.alcoholpercentage}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Land</label>
                <input
                  type="text"
                  name="land"
                  value={formData.land}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Regio</label>
                <input
                  type="text"
                  name="regio"
                  value={formData.regio}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Uiterlijk */}
          <div className="card mb-8">
            <h2 className="section-title">UITERLIJK</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Helderheid</label>
                <select
                  name="uiterlijkHelderheid"
                  value={formData.uiterlijkHelderheid}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="helder">Helder</option>
                  <option value="troebel">Troebel</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Intensiteit</label>
                <select
                  name="uiterlijkIntensiteit"
                  value={formData.uiterlijkIntensiteit}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="licht">Licht</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="diep">Diep</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Kleur</label>
                <select
                  name="uiterlijkKleur"
                  value={formData.uiterlijkKleur}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <optgroup label="Wit">
                    <option value="wit_groengeel">Groengeel</option>
                    <option value="wit_citroengeel">Citroengeel</option>
                    <option value="wit_goudgeel">Goudgeel</option>
                    <option value="wit_ambergeel">Ambergeel</option>
                    <option value="wit_bruin">Bruin</option>
                  </optgroup>
                  <optgroup label="Rosé">
                    <option value="rose_roze">Roze</option>
                    <option value="rose_zalmroze">Zalmroze</option>
                    <option value="rose_oranje">Oranje</option>
                  </optgroup>
                  <optgroup label="Rood">
                    <option value="rood_paars">Paars</option>
                    <option value="rood_robijnrood">Robijnrood</option>
                    <option value="rood_granatrood">Granatrood</option>
                    <option value="rood_bruinrood">Bruinrood</option>
                    <option value="rood_bruin">Bruin</option>
                  </optgroup>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Andere kenmerken</label>
                <input
                  type="text"
                  name="uiterlijkAndereKenmerken"
                  value={formData.uiterlijkAndereKenmerken}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="bijv. tranen, belletjes, tinteling, mousse"
                />
              </div>
            </div>
          </div>
          
          {/* Geur */}
          <div className="card mb-8">
            <h2 className="section-title">GEUR</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Conditie</label>
                <select
                  name="geurConditie"
                  value={formData.geurConditie}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="zuiver">Zuiver</option>
                  <option value="onzuiver">Onzuiver (fout in de wijn?)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Intensiteit</label>
                <select
                  name="geurIntensiteit"
                  value={formData.geurIntensiteit}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="licht">Licht</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="sterk">Sterk</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Ontwikkeling</label>
                <select
                  name="geurOntwikkeling"
                  value={formData.geurOntwikkeling}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="jong">Jong</option>
                  <option value="in_ontwikkeling">In ontwikkeling</option>
                  <option value="volledig_ontwikkeld">Volledig ontwikkeld</option>
                  <option value="vermoeid">Vermoeid/over hoogtepunt</option>
                </select>
              </div>
            </div>
            
            <AromaSelector 
              label="Aromakenmerken" 
              type="geurAroma"
              onChange={(aromas) => handleAromaChange('geurAroma', aromas)} 
            />
          </div>
          
          {/* Smaak */}
          <div className="card mb-8">
            <h2 className="section-title">SMAAK</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Zoetheid</label>
                <select
                  name="smaakZoetheid"
                  value={formData.smaakZoetheid}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="droog">Droog</option>
                  <option value="iets_zoet">Iets zoet</option>
                  <option value="halfdroog">Halfdroog</option>
                  <option value="halfzoet">Halfzoet</option>
                  <option value="zoet">Zoet</option>
                  <option value="volzoet">Volzoet</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Zuurgehalte</label>
                <select
                  name="smaakZuurgehalte"
                  value={formData.smaakZuurgehalte}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="laag">Laag</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="hoog">Hoog</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Taninegehalte (voor rode wijn)</label>
                <select
                  name="smaakTaninegehalte"
                  value={formData.smaakTaninegehalte}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Selecteer --</option>
                  <option value="laag">Laag</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="hoog">Hoog</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Alcoholgehalte</label>
                <select
                  name="smaakAlcoholgehalte"
                  value={formData.smaakAlcoholgehalte}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="laag">Laag</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="hoog">Hoog</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Body/mondgevoel</label>
                <select
                  name="smaakBody"
                  value={formData.smaakBody}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="licht">Licht</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="vol">Vol</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Mousse (voor mousserende wijn)</label>
                <select
                  name="smaakMousse"
                  value={formData.smaakMousse}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Selecteer --</option>
                  <option value="verfijnd">Verfijnd</option>
                  <option value="romig">Romig</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Smaakintensiteit</label>
                <select
                  name="smaakIntensiteit"
                  value={formData.smaakIntensiteit}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="licht">Licht</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="sterk">Sterk</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Afdronk</label>
                <select
                  name="smaakAfdronk"
                  value={formData.smaakAfdronk}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="kort">Kort</option>
                  <option value="gemiddeld-">Gemiddeld(-)</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="gemiddeld+">Gemiddeld(+)</option>
                  <option value="lang">Lang</option>
                </select>
              </div>
            </div>
            
            <AromaSelector 
              label="Smaakkenmerken" 
              type="smaakAroma"
              onChange={(aromas) => handleAromaChange('smaakAroma', aromas)} 
            />
          </div>
          
          {/* Conclusies */}
          <div className="card mb-8">
            <h2 className="section-title">CONCLUSIES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Kwaliteitsniveau</label>
                <select
                  name="kwaliteitsniveau"
                  value={formData.kwaliteitsniveau}
                  onChange={handleChange}
                  className="form-select"
                  required
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
                <label className="form-label">Drinkbaarheid</label>
                <select
                  name="drinkbaarheid"
                  value={formData.drinkbaarheid}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Selecteer --</option>
                  <option value="te_jong">Te jong</option>
                  <option value="kan_nog_rijpen">Op dronk, maar kan nog rijpen</option>
                  <option value="nu_drinken">Nu drinken: geschikt om te rijpen</option>
                  <option value="verder_rijpen">Nu drinken: of om verder te rijpen</option>
                  <option value="te_oud">Te oud</option>
                </select>
              </div>
            </div>
            
            <div className="form-group mt-4">
              <label className="form-label">Aantekeningen</label>
              <textarea
                name="aantekeningen"
                value={formData.aantekeningen}
                onChange={handleChange}
                className="form-input h-32"
                placeholder="Voeg hier je persoonlijke aantekeningen toe..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button type="button" className="btn-secondary mr-4">Annuleren</button>
            <button type="submit" className="btn-primary">Proefnotitie Opslaan</button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
