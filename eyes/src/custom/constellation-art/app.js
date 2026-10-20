import { SolarSystemApp } from '../../app/SolarSystemApp.js';
import { ConstellationArtComponent } from './component.js';
import { translateText } from '../../i18n/core.js';

class ConstellationArtApp extends SolarSystemApp {
  async setUpComponents() {
    await super.setUpComponents();
    const component = this.scene.getEntity('sun').addComponent(ConstellationArtComponent, 'western_constellation_art');
    component.setForceLoaded(true);
    const lists = this.getComponent('layerPanel').element.querySelectorAll('ul.layers');
    const list = lists[1] || lists[0];
    if (!list) return;
    const item = document.createElement('li');
    item.className = 'layer-panel-layer item constellation-art-control';
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'western-constellation-art';
    const text = document.createElement('span');
    text.textContent = translateText('Western constellation art');
    label.append(input, text);
    const status = document.createElement('span');
    status.className = 'constellation-art-status';
    status.setAttribute('role', 'status');
    component.onStatus = state => {
      status.textContent = state === 'loading' ? translateText('Loading') : state === 'error' ? translateText('Artwork unavailable; toggle to retry') : '';
    };
    input.addEventListener('change', () => component.setArtworkVisible(input.checked));
    item.append(label, status);
    list.append(item);
  }
}

ConstellationArtApp.setAppClass();
