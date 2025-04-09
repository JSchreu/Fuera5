import { useState } from 'react';

const AromaSelector = ({ selectedAromas, setSelectedAromas, type }) => {
  const [customAroma, setCustomAroma] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  // Uitgebreide lijst met aroma's per categorie
  const aromaCategories = {
    primair: [
      'Appel', 'Peer', 'Citroen', 'Limoen', 'Grapefruit', 'Sinaasappel',
      'Perzik', 'Abrikoos', 'Ananas', 'Mango', 'Lychee', 'Passievrucht',
      'Aardbei', 'Framboos', 'Kers', 'Pruim', 'Braam', 'Bosbes',
      'Zwarte bessen', 'Rode bessen', 'Granaatappel', 'Vijg', 'Rozijn'
    ],
    secundair: [
      'Boter', 'Room', 'Gist', 'Brood', 'Biscuit', 'Toast',
      'Noot', 'Amandel', 'Hazelnoot', 'Kokos', 'Vanille', 'Karamel',
      'Honing', 'Chocolade', 'Koffie', 'Kaneel', 'Kruidnagel', 'Nootmuskaat',
      'Peper', 'Gember', 'Anijs', 'Venkel', 'Dille'
    ],
    tertiair: [
      'Leer', 'Tabak', 'Ceder', 'Rook', 'Truffel', 'Paddenstoel',
      'Natte bladeren', 'Bosgrond', 'Hout', 'Potloodslijpsel', 'Petroleum',
      'Honing', 'Gedroogd fruit', 'Noten', 'Koffie', 'Chocolade'
    ]
  };

  // Functie om een aroma te selecteren uit het dropdown menu
  const handleSelectAroma = (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      setShowCustomInput(true);
      return;
    }
    
    if (value && value !== 'placeholder' && !selectedAromas.includes(value)) {
      setSelectedAromas([...selectedAromas, value]);
      // Reset de dropdown naar de placeholder optie
      e.target.value = 'placeholder';
    }
  };

  // Functie om een eigen aroma toe te voegen
  const handleAddCustomAroma = () => {
    if (customAroma && !selectedAromas.includes(customAroma)) {
      setSelectedAromas([...selectedAromas, customAroma]);
      setCustomAroma('');
      setShowCustomInput(false);
    }
  };

  // Functie om een aroma te verwijderen
  const handleRemoveAroma = (aroma) => {
    setSelectedAromas(selectedAromas.filter(a => a !== aroma));
  };

  // Functie om Enter toets te verwerken bij custom aroma input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomAroma();
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label">{type === 'geur' ? 'Aroma\'s (geur)' : 'Aroma\'s (smaak)'}</label>
      
      <div className="mb-2">
        <select 
          className="form-select" 
          onChange={handleSelectAroma}
          defaultValue="placeholder"
        >
          <option value="placeholder">Selecteer aroma...</option>
          <optgroup label="Primaire aroma's">
            {aromaCategories.primair.map(aroma => (
              <option key={`${type}-primair-${aroma}`} value={aroma}>{aroma}</option>
            ))}
          </optgroup>
          <optgroup label="Secundaire aroma's">
            {aromaCategories.secundair.map(aroma => (
              <option key={`${type}-secundair-${aroma}`} value={aroma}>{aroma}</option>
            ))}
          </optgroup>
          <optgroup label="Tertiaire aroma's">
            {aromaCategories.tertiair.map(aroma => (
              <option key={`${type}-tertiair-${aroma}`} value={aroma}>{aroma}</option>
            ))}
          </optgroup>
          <option value="custom">Anders, namelijk...</option>
        </select>
      </div>
      
      {showCustomInput && (
        <div className="flex mb-2">
          <input
            type="text"
            className="form-input mr-2"
            value={customAroma}
            onChange={(e) => setCustomAroma(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Voer eigen aroma in"
          />
          <button 
            type="button" 
            className="btn-primary"
            onClick={handleAddCustomAroma}
          >
            Toevoegen
          </button>
        </div>
      )}
      
      {selectedAromas.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Geselecteerde aroma's:</p>
          <div className="flex flex-wrap gap-2">
            {selectedAromas.map(aroma => (
              <div key={`${type}-${aroma}`} className="bg-wijn-lichtgroen px-2 py-1 rounded flex items-center">
                <span>{aroma}</span>
                <button 
                  type="button"
                  className="ml-2 text-wijn-rood"
                  onClick={() => handleRemoveAroma(aroma)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AromaSelector;
