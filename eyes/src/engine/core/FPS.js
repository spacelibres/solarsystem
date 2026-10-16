// Recovered from app.js:31225-31717.
class FPS {
  getNumberOfSamples() {
    return this._numberOfSamples;
  }
  setNumberOfSamples(numberOfSamples) {
    this._numberOfSamples = numberOfSamples;
    this._samples = new Array(this._numberOfSamples);
  }
  getFPS() {
    let t = 0;
    for (let e = 0; e < this._samples.length; e++) t += this._samples[e];
    return this._samples.length / t;
  }
  update(t) {
    this._samples[this._index] = t;
    this._index = (this._index + 1) % this._samples.length;
  }
  _numberOfSamples = 100;
  _samples = new Array(this._numberOfSamples);
  _index = 0;
}
export { FPS };
