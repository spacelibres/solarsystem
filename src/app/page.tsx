import SolarViewer from '../components/SolarViewer';
import SpacelibreLogo from '../components/SpacelibreLogo';
import { VERSION } from '../lib/version';
import './home.css';

export default function HomePage() {
  return (
    <main className="sl-home">
      <header className="sl-header">
        <div className="sl-header__left">
          <SpacelibreLogo variant="horizontal" height={24} />
          <h1 className="sl-header__title">Solar System</h1>
        </div>
        <span className="sl-header__tag">local ephemeris</span>
      </header>

      <section className="sl-stage" aria-label="Solar system explorer">
        <SolarViewer />
        <div className="sl-stage__caption">
          <p className="sl-stage__title">The Solar System</p>
          <p className="sl-stage__subtitle">
            NASA Eyes dynamo ephemerides, served locally · spacelibre visual standard
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
