// Recovered from app.js:159659-160397.
class Config {
  constructor() {
    this._valueMap = new Map();
    this._callbacksMap = new Map();
    this.setValue("maxTextureSize", 512);
    this.setValue("fontFamily", "Arial");
    this.setValue("fontSize", 16);
    this.setValue("gammaCorrection", 1);
  }
  getValue(t) {
    return this._valueMap.get(t);
  }
  setValue(t, e) {
    if (this._valueMap.get(t) !== e) {
      this._valueMap.set(t, e);
      const i = this._callbacksMap.get(t);
      if (i) for (let s = 0; s < i.length; s++) i[s](t, e);
    }
  }
  addEventListener(t, e) {
    let i = this._callbacksMap.get(t);
    void 0 === i && (i = [], this._callbacksMap.set(t, i));
    i.push(e);
  }
  removeEventListener(t, e) {
    const i = this._callbacksMap.get(t);
    if (i) for (let t = 0; t < i.length; t++) if (i[t] === e) {
      i.splice(t, 1);
      break;
    }
  }
  _valueMap;
  _callbacksMap;
}
export { Config };
