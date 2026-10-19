// Locale negotiation and display translation must wrap the application graph.
import './i18n/install.js';
// The loading screen must initialize before the application graph.
import './app/PreloadManager.js';
import './styles/extracted/PreloadStyles.js';
import './styles/extracted/VendorStyles.js';
import './app/SolarSystemApp.js';
