/** @eyes-analysis
 * 文件职责：将滑片添加、插入、移除接口绑定到轮播实例
 * 依据：// Recovered from vendors.js:1707795-1708113.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1707795-1708113.
import * as Unidentified482 from "./Unidentified482.js";
import * as Unidentified483 from "./Unidentified483.js";
import * as Unidentified484 from "./Unidentified484.js";
import * as Unidentified485 from "./Unidentified485.js";
import * as Unidentified486 from "./Unidentified486.js";
function c({
  swiper: swiper
}) {
  Object.assign(swiper, {
    appendSlide: Unidentified482.default.bind(swiper),
    prependSlide: Unidentified483.default.bind(swiper),
    addSlide: Unidentified484.default.bind(swiper),
    removeSlide: Unidentified485.default.bind(swiper),
    removeAllSlides: Unidentified486.default.bind(swiper)
  });
}
export { c as default };
