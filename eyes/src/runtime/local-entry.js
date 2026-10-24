import '../main.js';
import { WMTSManager } from '../engine/managers/WMTSManager.js';
import { WMTSComponent } from '../engine/components/WMTSComponent.js';
import layers from '../engine/core/Unidentified752.js';
import snapshot from '../../snapshots/earth.json';
import { installEarthSnapshot } from './snapshot-policy.js';
installEarthSnapshot({ manager: WMTSManager, component: WMTSComponent, layers }, snapshot);
