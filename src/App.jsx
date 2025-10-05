import { useState, useEffect } from 'react';
import './App.css';

// Base de datos con 4 idiomas
const CATEGORIAS = [
  {
    nombre: { es: 'Animales', en: 'Animals', fr: 'Animaux', de: 'Tiere' },
    items: [
      { palabra: { es: 'Perro', en: 'Dog', fr: 'Chien', de: 'Hund' }, icono: '🐶' },
      { palabra: { es: 'Gato', en: 'Cat', fr: 'Chat', de: 'Katze' }, icono: '🐱' },
      { palabra: { es: 'Vaca', en: 'Cow', fr: 'Vache', de: 'Kuh' }, icono: '🐮' },
      { palabra: { es: 'Cerdo', en: 'Pig', fr: 'Cochon', de: 'Schwein' }, icono: '🐷' },
      { palabra: { es: 'Gallina', en: 'Chicken', fr: 'Poule', de: 'Huhn' }, icono: '🐔' },
      { palabra: { es: 'Pato', en: 'Duck', fr: 'Canard', de: 'Ente' }, icono: '🦆' },
      { palabra: { es: 'Caballo', en: 'Horse', fr: 'Cheval', de: 'Pferd' }, icono: '🐴' },
      { palabra: { es: 'Oveja', en: 'Sheep', fr: 'Mouton', de: 'Schaf' }, icono: '🐑' },
    ]
  },
  {
    nombre: { es: 'Comida', en: 'Food', fr: 'Nourriture', de: 'Essen' },
    items: [
      { palabra: { es: 'Manzana', en: 'Apple', fr: 'Pomme', de: 'Apfel' }, icono: '🍎' },
      { palabra: { es: 'Plátano', en: 'Banana', fr: 'Banane', de: 'Banane' }, icono: '🍌' },
      { palabra: { es: 'Naranja', en: 'Orange', fr: 'Orange', de: 'Orange' }, icono: '🍊' },
      { palabra: { es: 'Uva', en: 'Grape', fr: 'Raisin', de: 'Traube' }, icono: '🍇' },
      { palabra: { es: 'Pan', en: 'Bread', fr: 'Pain', de: 'Brot' }, icono: '🍞' },
      { palabra: { es: 'Leche', en: 'Milk', fr: 'Lait', de: 'Milch' }, icono: '🥛' },
      { palabra: { es: 'Queso', en: 'Cheese', fr: 'Fromage', de: 'Käse' }, icono: '🧀' },
      { palabra: { es: 'Huevo', en: 'Egg', fr: 'Œuf', de: 'Ei' }, icono: '🥚' },
    ]
  },
  {
    nombre: { es: 'Colores', en: 'Colors', fr: 'Couleurs', de: 'Farben' },
    items: [
      { palabra: { es: 'Rojo', en: 'Red', fr: 'Rouge', de: 'Rot' }, icono: '🔴' },
      { palabra: { es: 'Azul', en: 'Blue', fr: 'Bleu', de: 'Blau' }, icono: '🔵' },
      { palabra: { es: 'Verde', en: 'Green', fr: 'Vert', de: 'Grün' }, icono: '🟢' },
      { palabra: { es: 'Amarillo', en: 'Yellow', fr: 'Jaune', de: 'Gelb' }, icono: '🟡' },
      { palabra: { es: 'Rosa', en: 'Pink', fr: 'Rose', de: 'Rosa' }, icono: '💗' },
      { palabra: { es: 'Morado', en: 'Purple', fr: 'Violet', de: 'Lila' }, icono: '🟣' },
    ]
  },
  {
    nombre: { es: 'Ropa', en: 'Clothes', fr: 'Vêtements', de: 'Kleidung' },
    items: [
      { palabra: { es: 'Camisa', en: 'Shirt', fr: 'Chemise', de: 'Hemd' }, icono: '👕' },
      { palabra: { es: 'Pantalón', en: 'Pants', fr: 'Pantalon', de: 'Hose' }, icono: '👖' },
      { palabra: { es: 'Vestido', en: 'Dress', fr: 'Robe', de: 'Kleid' }, icono: '👗' },
      { palabra: { es: 'Zapatos', en: 'Shoes', fr: 'Chaussures', de: 'Schuhe' }, icono: '👟' },
      { palabra: { es: 'Sombrero', en: 'Hat', fr: 'Chapeau', de: 'Hut' }, icono: '🎩' },
      { palabra: { es: 'Bufanda', en: 'Scarf', fr: 'Écharpe', de: 'Schal' }, icono: '🧣' },
    ]
  },
  {
    nombre: { es: 'Juguetes', en: 'Toys', fr: 'Jouets', de: 'Spielzeug' },
    items: [
      { palabra: { es: 'Pelota', en: 'Ball', fr: 'Balle', de: 'Ball' }, icono: '⚽' },
      { palabra: { es: 'Muñeca', en: 'Doll', fr: 'Poupée', de: 'Puppe' }, icono: '👶' },
      { palabra: { es: 'Coche', en: 'Car', fr: 'Voiture', de: 'Auto' }, icono: '🚗' },
      { palabra: { es: 'Bloques', en: 'Blocks', fr: 'Blocs', de: 'Bausteine' }, icono: '🧱' },
      { palabra: { es: 'Tren', en: 'Train', fr: 'Train', de: 'Zug' }, icono: '🚂' },
      { palabra: { es: 'Avión', en: 'Airplane', fr: 'Avion', de: 'Flugzeug' }, icono: '✈️' },
    ]
  },
  {
    nombre: { es: 'Familia', en: 'Family', fr: 'Famille', de: 'Familie' },
    items: [
      { palabra: { es: 'Mamá', en: 'Mom', fr: 'Maman', de: 'Mama' }, icono: '👩' },
      { palabra: { es: 'Papá', en: 'Dad', fr: 'Papa', de: 'Papa' }, icono: '👨' },
      { palabra: { es: 'Hermano', en: 'Brother', fr: 'Frère', de: 'Bruder' }, icono: '👦' },
      { palabra: { es: 'Hermana', en: 'Sister', fr: 'Sœur', de: 'Schwester' }, icono: '👧' },
      { palabra: { es: 'Abuela', en: 'Grandma', fr: 'Grand-mère', de: 'Oma' }, icono: '👵' },
      { palabra: { es: 'Abuelo', en: 'Grandpa', fr: 'Grand-père', de: 'Opa' }, icono: '👴' },
    ]
  }
];

// Función para hablar
function hablar(texto, idioma) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    const langMap = { es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE' };
    utterance.lang = langMap[idioma] || 'es-ES';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
}

// 🔤 División silábica precisa para español
function dividirEnSilabasEspanol(palabra) {
  const palabraOriginal = palabra;
  const palabraLower = palabra.toLowerCase();
  const sinTildes = palabraLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const vocales = 'aeiouáéíóúü';
  const consonantes = 'bcdfghjklmnñpqrstvwxyz';
  
  // Diptongos y triptongos que NO se separan
  const diptongos = ['ai', 'au', 'ei', 'eu', 'oi', 'ou', 'ia', 'ie', 'io', 'iu', 'ua', 'ue', 'ui', 'uo'];
  
  const silabas = [];
  let i = 0;
  
  while (i < sinTildes.length) {
    let silaba = '';
    
    // 1. Recoger consonantes iniciales (incluyendo grupos consonánticos)
    while (i < sinTildes.length && consonantes.includes(sinTildes[i])) {
      silaba += sinTildes[i];
      i++;
    }
    
    // 2. Recoger vocal(es) - núcleo silábico
    if (i < sinTildes.length && vocales.includes(sinTildes[i])) {
      const inicioVocal = i;
      silaba += sinTildes[i];
      i++;
      
      // Verificar si forma diptongo con la siguiente vocal
      if (i < sinTildes.length && vocales.includes(sinTildes[i])) {
        const posibleDiptongo = sinTildes.substring(inicioVocal, i + 1);
        if (diptongos.includes(posibleDiptongo)) {
          silaba += sinTildes[i];
          i++;
        }
      }
    }
    
    // 3. Decidir qué consonantes van con esta sílaba y cuáles con la siguiente
    let consonantesFinales = '';
    let j = i;
    
    while (j < sinTildes.length && consonantes.includes(sinTildes[j])) {
      consonantesFinales += sinTildes[j];
      j++;
    }
    
    if (consonantesFinales.length > 0) {
      // Si hay vocal después, aplicar reglas de división
      if (j < sinTildes.length && vocales.includes(sinTildes[j])) {
        // Grupos inseparables que van con la siguiente sílaba
        const gruposInseparables = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'tl', 'tr', 'ch', 'll', 'rr'];
        
        if (consonantesFinales.length === 1) {
          // Una consonante va con la siguiente sílaba
          // No agregamos nada a la sílaba actual
        } else if (consonantesFinales.length === 2) {
          const grupo = consonantesFinales;
          if (gruposInseparables.includes(grupo)) {
            // El grupo completo va con la siguiente sílaba
          } else {
            // Se divide: primera va con esta sílaba, segunda con la siguiente
            silaba += consonantesFinales[0];
            i++;
          }
        } else if (consonantesFinales.length >= 3) {
          // Para 3+ consonantes, las últimas dos pueden formar grupo inseparable
          const ultimasDos = consonantesFinales.slice(-2);
          if (gruposInseparables.includes(ultimasDos)) {
            // Todas menos las últimas dos van con esta sílaba
            const paraTiSilaba = consonantesFinales.slice(0, -2);
            silaba += paraTiSilaba;
            i += paraTiSilaba.length;
          } else {
            // Todas menos la última van con esta sílaba
            const paraTiSilaba = consonantesFinales.slice(0, -1);
            silaba += paraTiSilaba;
            i += paraTiSilaba.length;
          }
        }
      } else {
        // No hay más vocales, todas las consonantes van con esta sílaba
        silaba += consonantesFinales;
        i += consonantesFinales.length;
      }
    }
    
    if (silaba.length > 0) {
      silabas.push(silaba);
    }
  }
  
  // Reconstruir con las tildes originales
  let silabasConTildes = [];
  let idx = 0;
  for (let silaba of silabas) {
    let silabaConTilde = '';
    for (let k = 0; k < silaba.length; k++) {
      if (idx < palabraOriginal.length) {
        silabaConTilde += palabraOriginal[idx];
        idx++;
      }
    }
    silabasConTildes.push(silabaConTilde);
  }
  
  return silabasConTildes.filter(s => s.length > 0);
}

// Función principal de división
function dividirEnSilabas(palabra, idioma = 'es') {
  if (idioma === 'es') {
    return dividirEnSilabasEspanol(palabra);
  } else {
    const silabas = [];
    let i = 0;
    while (i < palabra.length) {
      let corte = 2;
      if (i + 2 < palabra.length && !'aeiouAEIOU'.includes(palabra[i + 2])) {
        corte = 3;
      }
      silabas.push(palabra.slice(i, i + corte));
      i += corte;
    }
    return silabas;
  }
}

// Guardar progreso
function guardarProgreso(palabra, idioma, esCorrecto) {
  const clave = `${palabra}_${idioma}`;
  const progreso = JSON.parse(localStorage.getItem('progresoHabla') || '{}');
  if (!progreso[clave]) progreso[clave] = { intentos: 0, aciertos: 0 };
  progreso[clave].intentos += 1;
  if (esCorrecto) progreso[clave].aciertos += 1;
  localStorage.setItem('progresoHabla', JSON.stringify(progreso));
}

// Celebración
function celebrar() {
  if (window.confetti) {
    window.confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const playSound = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  playSound();

  const handleClick = () => {
    playSound();
    document.body.removeEventListener('click', handleClick);
  };
  document.body.addEventListener('click', handleClick, { once: true });
}

// Tarjeta de palabra (modo exploración)
function TarjetaPalabra({ item, idioma }) {
  const texto = item.palabra[idioma];
  return (
    <button
      className="tarjeta-palabra"
      onClick={() => hablar(texto, idioma)}
      aria-label={texto}
    >
      <span className="icono">{item.icono}</span>
      <span className="texto">{texto}</span>
    </button>
  );
}

// Modo Juego
function ModoJuego({ idioma, onVolver }) {
  const [objetivo, setObjetivo] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const todas = CATEGORIAS.flatMap(cat => cat.items);
    const itemObjetivo = todas[Math.floor(Math.random() * todas.length)];
    setObjetivo(itemObjetivo);

    const otras = todas.filter(i => i !== itemObjetivo);
    const incorrectas = [];
    while (incorrectas.length < 3 && otras.length > 0) {
      const idx = Math.floor(Math.random() * otras.length);
      incorrectas.push(otras.splice(idx, 1)[0]);
    }
    const mezcladas = [itemObjetivo, ...incorrectas].sort(() => Math.random() - 0.5);
    setOpciones(mezcladas);

    const preguntas = {
      es: `¿Dónde está el/la ${itemObjetivo.palabra[idioma]}?`,
      en: `Where is the ${itemObjetivo.palabra[idioma]}?`,
      fr: `Où est le/la ${itemObjetivo.palabra[idioma]} ?`,
      de: `Wo ist der/die ${itemObjetivo.palabra[idioma]}?`
    };

    const pregunta = preguntas[idioma] || preguntas.es;
    setMensaje(pregunta);
    hablar(pregunta, idioma);
  }, [idioma]);

  const verificarRespuesta = (esCorrecto) => {
    guardarProgreso(objetivo.palabra[idioma], idioma, esCorrecto);
    if (esCorrecto) {
      celebrar();
      const mensajes = {
        es: '¡Muy bien! 🎉',
        en: 'Great job! 🎉',
        fr: 'Très bien ! 🎉',
        de: 'Sehr gut! 🎉'
      };
      setMensaje(mensajes[idioma] || mensajes.es);
      setTimeout(() => window.location.reload(), 2500);
    } else {
      const mensajes = {
        es: '¡No! Ese no es. ¡Intenta otra vez!',
        en: 'No! That’s not it. Try again!',
        fr: 'Non ! Ce n’est pas ça. Réessaie !',
        de: 'Nein! Das ist es nicht. Versuch es nochmal!'
      };
      const msg = mensajes[idioma] || mensajes.es;
      setMensaje(msg);
      hablar(msg, idioma);
    }
  };

  return (
    <div className="modo-juego">
      <button className="btn-volver" onClick={onVolver}>← Volver</button>
      <h2>{mensaje}</h2>
      <div className="contenedor-opciones-juego">
        {opciones.map((item, i) => (
          <button
            key={i}
            className="opcion-juego solo-icono"
            onClick={() => verificarRespuesta(item === objetivo)}
            aria-label={item.palabra[idioma]}
          >
            <span className="icono">{item.icono}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Modo Lectura
function ModoLectura({ idioma, onVolver }) {
  const todasPalabras = CATEGORIAS.flatMap(cat => cat.items);

  const leerPorSilabas = (palabra) => {
    const silabas = dividirEnSilabas(palabra, idioma);
    const langMap = { es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE' };
    const lang = langMap[idioma] || 'es-ES';

    speechSynthesis.cancel();

    // Función para mejorar la pronunciación de sílabas individuales
    const mejorarPronunciacion = (silaba) => {
      if (idioma !== 'es') return silaba;
      
      const sil = silaba.toLowerCase();
      
      // Mapeo fonético especial para sílabas muy problemáticas
      const mejorasEspeciales = {
        // "C" suena mejor como "K" en el motor TTS
        'ca': 'ka',
        'co': 'ko',
        'cu': 'ku',
        // "G" fuerte
        'ga': 'gaa',
        'go': 'goo',
        'gu': 'guu',
        // "B"
        'ba': 'bah',
        'be': 'beh',
        'bi': 'bih',
        'bo': 'boh',
        'bu': 'buh',
        // Otras consonantes con vocales dobles
        'da': 'da',
        'de': 'de',
        'di': 'di',
        'do': 'do',
        'du': 'du',
        'fa': 'fa',
        'fe': 'fe',
        'fi': 'fi',
        'fo': 'fo',
        'fu': 'fu',
        'ja': 'ja',
        'je': 'je',
        'ji': 'ji',
        'jo': 'jo',
        'ju': 'ju',
        'la': 'la',
        'le': 'le',
        'li': 'li',
        'lo': 'lo',
        'lu': 'lu',
        'ma': 'ma',
        'me': 'me',
        'mi': 'mi',
        'mo': 'mo',
        'mu': 'mu',
        'na': 'na',
        'ne': 'ne',
        'ni': 'ni',
        'no': 'no',
        'nu': 'nu',
        'pa': 'pa',
        'pe': 'pe',
        'pi': 'pi',
        'po': 'po',
        'pu': 'pu',
        'ra': 'ra',
        're': 're',
        'ri': 'ri',
        'ro': 'ro',
        'ru': 'ru',
        'sa': 'sa',
        'se': 'se',
        'si': 'si',
        'so': 'so',
        'su': 'su',
        'ta': 'ta',
        'te': 'te',
        'ti': 'ti',
        'to': 'too',
        'tu': 'tu',
        'va': 'va',
        've': 've',
        'vi': 'vi',
        'vo': 'vo',
        'vu': 'vu',
        'za': 'za',
        'ze': 'ze',
        'zi': 'zi',
        'zo': 'zo',
        'zu': 'zu'
      };
      
      // Buscar si la sílaba tiene una mejora fonética especial
      if (mejorasEspeciales[sil]) {
        return mejorasEspeciales[sil];
      }
      
      // Para sílabas más largas, también intentar alargar la vocal final
      if (sil.length === 2 && 'aeiouáéíóú'.includes(sil[1])) {
        return sil[0] + sil[1] + sil[1]; // duplicar vocal
      }
      
      return silaba;
    };

    let delay = 0;
    silabas.forEach((silaba, i) => {
      setTimeout(() => {
        const textoMejorado = mejorarPronunciacion(silaba);
        const utterance = new SpeechSynthesisUtterance(textoMejorado);
        utterance.lang = lang;
        utterance.rate = 0.65;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        speechSynthesis.speak(utterance);
      }, delay);
      delay += 900;
    });
  };

  return (
    <div className="modo-lectura">
      <button className="btn-volver" onClick={onVolver}>← Volver</button>
      <h2>📖 Modo Lectura</h2>
      <p>Toca una palabra para escucharla por sílabas</p>
      
      <div className="contenedor-palabras-lectura">
        {todasPalabras.map((item, i) => {
          const texto = item.palabra[idioma];
          const silabas = dividirEnSilabas(texto, idioma).join(' - ');
          return (
            <button
              key={i}
              className="tarjeta-lectura"
              onClick={() => leerPorSilabas(texto)}
              aria-label={`Palabra: ${texto}`}
            >
              <span className="icono-lectura">{item.icono}</span>
              <div className="silabas">{silabas}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// App principal
function App() {
  const [idioma, setIdioma] = useState('es');
  const [modoJuego, setModoJuego] = useState(false);
  const [modoLectura, setModoLectura] = useState(false);

  useEffect(() => {
    if (!window.confetti) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  if (modoJuego) {
    return <ModoJuego idioma={idioma} onVolver={() => setModoJuego(false)} />;
  }

  if (modoLectura) {
    return <ModoLectura idioma={idioma} onVolver={() => setModoLectura(false)} />;
  }

  return (
    <div className="app">
      <header>
        <h1>¡Hablemos juntos! / Let's Talk! / Parlons ! / Lass uns sprechen!</h1>
        <div className="controles">
          {['es', 'en', 'fr', 'de'].map((lang) => (
            <button
              key={lang}
              className={`btn-idioma ${idioma === lang ? 'activo' : ''}`}
              onClick={() => setIdioma(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <button className="btn-juego" onClick={() => setModoJuego(true)}>
            🎮 Modo Juego
          </button>
          <button className="btn-lectura" onClick={() => setModoLectura(true)}>
            📖 Modo Lectura
          </button>
        </div>
      </header>

      <main className="contenedor-principal">
        {CATEGORIAS.map((cat, i) => (
          <div className="categoria" key={i}>
            <h2 className="titulo-categoria">{cat.nombre[idioma]}</h2>
            <div className="contenedor-palabras">
              {cat.items.map((item, j) => (
                <TarjetaPalabra key={j} item={item} idioma={idioma} />
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer>
        <p>✨ Para niños que están aprendiendo a hablar y a leer</p>
        <p>✅ Progreso guardado automáticamente</p>
      </footer>
    </div>
  );
}

export default App;