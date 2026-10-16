/** @eyes-analysis
 * 文件职责：启动入口：先加载 preload，再初始化应用依赖图
 * 依据：imports: ./app/PreloadManager.js, ./styles/extracted/PreloadStyles.js, ./styles/extracted/VendorStyles.js, ./app/SolarSystemApp.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// The loading screen must initialize before the application graph.
import './app/PreloadManager.js';
import './styles/extracted/PreloadStyles.js';
import './styles/extracted/VendorStyles.js';
import './app/SolarSystemApp.js';
