# IL PIRATA - Sito Web Ristorante

Sito web per ristorante a tema marinaro e piratesco.

## 🚀 Deployment su GitHub Pages

### Prerequisiti
- Account GitHub
- Repository GitHub: `Trattoriailpirata`

### Istruzioni per il Deploy

1. **Crea un nuovo repository su GitHub**
   - Vai su GitHub e crea un nuovo repository
   - Nome consigliato: `pirata` (o qualsiasi altro nome)
   - Non inizializzare con README, .gitignore o licenza

2. **Carica i file nel repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - IL PIRATA website"
   git branch -M main
   git remote add origin https://github.com/martasant/Trattoriailpirata.git
   git push -u origin main
   ```

3. **Attiva GitHub Pages**
   - Vai su Settings del repository
   - Scorri fino a "Pages"
   - In "Source" seleziona "Deploy from a branch"
   - Scegli branch: `main` e folder: `/ (root)`
   - Clicca "Save"

4. **Verifica gli URL**
   - Gli URL sono già configurati per `martasant.github.io/Trattoriailpirata`
   - Se il tuo username GitHub è diverso da "martasant", devi sostituire `martasant` con il tuo username in:
     - Tutti i file HTML (canonical, og:url, twitter:url)
     - `sitemap.xml`
     - `robots.txt`

5. **Il sito sarà disponibile su:**
   - `https://martasant.github.io/Trattoriailpirata/`
   - Se il tuo username GitHub è diverso, sostituisci "martasant" con il tuo username

## 📁 Struttura File

```
/
├── index.html          # Shell desktop (iframe wrapper)
├── home.html           # Homepage principale
├── style.css           # CSS globale
├── service-worker.js   # Service Worker per PWA
├── manifest.json       # Manifest PWA
├── sitemap.xml         # Sitemap per SEO
├── robots.txt          # Robots.txt per SEO
├── piratadef.png       # Logo principale
├── bg1.png, bg2.png, bg3.png, bg4.png  # Immagini sfondo
├── food.html           # Menu del Mare
├── cocktails.html      # Cocktail
├── winebeer.html       # Vini & Birre
├── allergeni.html      # Allergeni
├── social.html         # Social
├── contatti.html       # Raggiungerci
├── policy.html         # Policy
└── autore.html         # Autore
```

## ⚙️ Configurazione

### Service Worker
Il service worker è configurato per funzionare su GitHub Pages. I percorsi sono assoluti (`/file.html`) e funzioneranno correttamente.

### PWA
Il sito è una Progressive Web App installabile. Il manifest.json è già configurato.

### SEO
- Sitemap.xml configurata
- Robots.txt configurato
- Meta tag completi in tutte le pagine

## 🔧 Note Importanti

1. **Case Sensitivity**: GitHub Pages è case-sensitive (Linux-based). Assicurati che i nomi dei file corrispondano esattamente ai riferimenti nel codice.

2. **HTTPS**: GitHub Pages fornisce automaticamente HTTPS, necessario per il Service Worker.

3. **Aggiornamenti**: Dopo ogni push, GitHub Pages impiega alcuni minuti per aggiornare il sito.

4. **Cache**: Se le modifiche non appaiono, incrementa la versione del cache nel service-worker.js (es. `pirata-v1` → `pirata-v2`).

## 📝 Personalizzazione

Prima del deploy, ricorda di aggiornare:
- Indirizzo e coordinate nella pagina `contatti.html`
- Numero di telefono in `contatti.html`
- URL nei meta tag se il repository ha un nome diverso da "pirata"

## 🎨 Caratteristiche

- ✅ Design responsive (mobile-first)
- ✅ PWA installabile
- ✅ Service Worker per funzionamento offline
- ✅ Slideshow automatico immagini di sfondo
- ✅ SEO ottimizzato
- ✅ Tema piratesco/marinaro

