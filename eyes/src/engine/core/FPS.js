// 帧率使用固定长度循环采样数组，返回样本数除以累计秒数；未填满数组及更改样本数后的原初始化行为保持不变。
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
    let totalSeconds = 0;
    for (let sampleIndex = 0; sampleIndex < this._samples.length; sampleIndex++) totalSeconds += this._samples[sampleIndex];
    return this._samples.length / totalSeconds;
  }
  update(deltaSeconds) {
    this._samples[this._index] = deltaSeconds;
    this._index = (this._index + 1) % this._samples.length;
  }
  _numberOfSamples = 100;
  _samples = new Array(this._numberOfSamples);
  _index = 0;
}
export { FPS };
