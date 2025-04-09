import { useState } from 'react';

export default function AromaSelector({ label, type, onChange }) {
  const [selectedAromas, setSelectedAromas] = useState([]);
  const [customAroma, setCustomAroma] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const aromaCategories = {
    primair: {
      fruit: [
        'Citroen', 'Limoen', 'Grapefruit', 'Sinaasappel', 'Mandarijn',
        'Groene appel', 'Rijpe appel', 'Peer', 'Kweepeer',
        'Perzik', 'Abrikoos', 'Nectarine', 'Pruim',
        'Banaan', 'Lychee', 'Mango', 'Meloen', 'Passievrucht', 'Ananas',
        'Aardbei', 'Framboos', 'Rode bes', 'Cranberry', 'Kersen',
        'Bramen', 'Bosbessen', 'Zwarte bessen', 'Zwarte kersen'
      ],
      bloemen: [
        'Acacia', 'Vlierbloesem', 'Rozen', 'Geranium', 'Lavendel', 'Viooltjes'
      ],
      kruiden: [
        'Witte peper', 'Zwarte peper', 'Kaneel', 'Gember', 'Nootmuskaat', 
        'Kruidnagel', 'Venkel', 'Anijs'
      ],
      plantaardig: [
        'Gras', 'Groene paprika', 'Asperge', 'Artisjok', 'Eucalyptus', 
        'Munt', 'Tomatenblad'
      ],
      mineraal: [
        'Vuursteen', 'Krijt', 'Leisteen', 'Natte stenen', 'Zout'
      ]
    },
    secundair: {
      gist: [
        'Brood', 'Biscuit', 'Brioche', 'Gistdeeg'
      ],
      melkzuur: [
        'Boter', 'Room', 'Yoghurt', 'Kaas'
      ],
      eik: [
        'Vanille', 'Kokos', 'Ceder', 'Gerookt', 'Geroosterd', 
        'Koffie', 'Chocolade', 'Karamel', 'Amandel', 'Hazelnoot'
      ]
    },
    tertiair: {
      oxidatief: [
        'Amandel', 'Walnoot', 'Gedroogd fruit', 'Karamel', 'Koffie', 
        'Chocolade', 'Leer'
      ],
      biologisch: [
        'Paddenstoel', 'Truffel', 'Bosgrond', 'Natte bladeren', 'Wild', 'Stal'
      ],
      reductief: [
        'Petroleum', 'Rubber', 'Rook', 'Teer', 'Tabak'
      ]
    }
  };

  const handleAromaSelect = (e) => {
    const value = e.target.value;
    
    if (value === 'anders') {
      setShowCustomInput(true);
      return;
    }
    
    if (value && !selectedAromas.includes(value)) {
      const newSelectedAromas = [...selectedAromas, value];
      setSelectedAromas(newSelectedAromas);
      onChange(newSelectedAromas);
    }
  };

  const handleCustomAromaAdd = () => {
    if (customAroma && !selectedAromas.includes(customAroma)) {
      const newSelectedAromas = [...selectedAromas, customAroma];
      setSelectedAromas(newSelectedAromas);
      onChange(newSelectedAromas);
      setCustomAroma('');
      setShowCustomInput(false);
    }
  };

  const handleRemoveAroma = (aroma) => {
    const newSelectedAromas = selectedAromas.filter(a => a !== aroma);
    setSelectedAromas(newSelectedAromas);
    onChange(newSelectedAromas);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      
      <div className="mb-2">
        <select 
          className="form-select" 
          onChange={handleAromaSelect}
          value=""
        >
          <option value="">-- Selecteer aroma --</option>
          <optgroup label="Primaire Aroma's">
            <optgroup label="Fruit">
              {aromaCategories.primair.fruit.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Bloemen">
              {aromaCategories.primair.bloemen.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Kruiden/Specerijen">
              {aromaCategories.primair.kruiden.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Plantaardig">
              {aromaCategories.primair.plantaardig.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Mineraal">
              {aromaCategories.primair.mineraal.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
          </optgroup>
          
          <optgroup label="Secundaire Aroma's">
            <optgroup label="Gist">
              {aromaCategories.secundair.gist.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Melkzuur">
              {aromaCategories.secundair.melkzuur.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Eik">
              {aromaCategories.secundair.eik.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
          </optgroup>
          
          <optgroup label="Tertiaire Aroma's">
            <optgroup label="Oxidatief">
              {aromaCategories.tertiair.oxidatief.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Biologisch">
              {aromaCategories.tertiair.biologisch.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
            <optgroup label="Reductief">
              {aromaCategories.tertiair.reductief.map(aroma => (
                <option key={aroma} value={aroma}>{aroma}</option>
              ))}
            </optgroup>
          </optgroup>
          
          <option value="anders">Anders, namelijk...</option>
        </select>
      </div>
      
      {showCustomInput && (
        <div className="flex mb-2">
          <input
            type="text"
            className="form-input flex-grow"
            value={customAroma}
            onChange={(e) => setCustomAroma(e.target.value)}
            placeholder="Voer een eigen aroma in"
          />
          <button 
            type="button" 
            className="ml-2 bg-wijn-blauw text-white px-3 py-2 rounded"
            onClick={handleCustomAromaAdd}
          >
            Toevoegen
          </button>
        </div>
      )}
      
      {selectedAromas.length > 0 && (
        <div className="mt-2">
          <p className="text-sm mb-1">Geselecteerde aroma's:</p>
          <div className="flex flex-wrap gap-2">
            {selectedAromas.map(aroma => (
              <div key={aroma} className="bg-wijn-lichtgroen px-3 py-1 rounded-full flex items-center">
                <span className="text-sm">{aroma}</span>
                <button 
                  type="button"
                  className="ml-2 text-wijn-donkergroen hover:text-wijn-rood"
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
}
