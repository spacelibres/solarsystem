import SolarViewer from '../components/SolarViewer';
import SpacelibreLogo from '../components/SpacelibreLogo';
import { VERSION } from '../lib/version';
import './home.css';

export default function HomePage() {
  return (
    <main className="sl-home">
      <header className="sl-header">
        <SpacelibreLogo variant="horizontal" height={26} />
        <nav className="sl-header__meta" aria-label="Data credit">
          <span className="sl-header__tag">solar system</span>
        </nav>
      </header>

      <section className="sl-stage" aria-label="Solar system explorer">
        <SolarViewer />
        <div className="sl-stage__caption">
          <h1 className="sl-stage__title">The Solar System</h1>
          <p className="sl-stage__subtitle">
            Heliocentric orbits from NASA Eyes dynamo ephemerides · spacelibre visual standard
          </p>
        </div>
      </section>

      <footer className="sl-footer">
        <p className="sl-footer__credit">
          Ephemeris data and planetary imagery courtesy of NASA. Data credit: NASA/JPL.
          This project is not affiliated with or endorsed by NASA.
        </p>
        <span className="sl-footer__version">v{VERSION}</span>
      </footer>
    </main>
  );
}
