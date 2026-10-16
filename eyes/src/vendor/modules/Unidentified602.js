// Recovered from vendors.js:1743552-1745943.
let defaultExport;
defaultExport = function (e) {
  return new l(e).output();
};
var state = 1,
  i = /\s/,
  a = /[A-Za-z]/,
  s = /[A-Za-z84_]/,
  o = /[,\]]/,
  c = /[\d\.E\-\+]/;
function l(e) {
  if ("string" != typeof e) throw new Error("not a string");
  this.text = e.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = state;
}
l.prototype.readCharicter = function () {
  var e = this.text[this.place++];
  if (4 !== this.state) for (; i.test(e);) {
    if (this.place >= this.text.length) return;
    e = this.text[this.place++];
  }
  switch (this.state) {
    case state:
      return this.neutral(e);
    case 2:
      return this.keyword(e);
    case 4:
      return this.quoted(e);
    case 5:
      return this.afterquote(e);
    case 3:
      return this.number(e);
    case -1:
      return;
  }
}, l.prototype.afterquote = function (e) {
  if ('"' === e) return this.word += '"', void (this.state = 4);
  if (o.test(e)) return this.word = this.word.trim(), void this.afterItem(e);
  throw new Error("havn't handled \"" + e + '" in afterquote yet, index ' + this.place);
}, l.prototype.afterItem = function (e) {
  return "," === e ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void (this.state = state)) : "]" === e ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = state, this.currentObject = this.stack.pop(), void (this.currentObject || (this.state = -1))) : void 0;
}, l.prototype.number = function (word) {
  if (!c.test(word)) {
    if (o.test(word)) return this.word = parseFloat(this.word), void this.afterItem(word);
    throw new Error("havn't handled \"" + word + '" in number yet, index ' + this.place);
  }
  this.word += word;
}, l.prototype.quoted = function (word) {
  '"' !== word ? this.word += word : this.state = 5;
}, l.prototype.keyword = function (word) {
  if (s.test(word)) this.word += word;else {
    if ("[" === word) {
      var t = [];
      return t.push(this.word), this.level++, null === this.root ? this.root = t : this.currentObject.push(t), this.stack.push(this.currentObject), this.currentObject = t, void (this.state = state);
    }
    if (!o.test(word)) throw new Error("havn't handled \"" + word + '" in keyword yet, index ' + this.place);
    this.afterItem(word);
  }
}, l.prototype.neutral = function (word) {
  if (a.test(word)) return this.word = word, void (this.state = 2);
  if ('"' === word) return this.word = "", void (this.state = 4);
  if (c.test(word)) return this.word = word, void (this.state = 3);
  if (!o.test(word)) throw new Error("havn't handled \"" + word + '" in neutral yet, index ' + this.place);
  this.afterItem(word);
}, l.prototype.output = function () {
  for (; this.place < this.text.length;) this.readCharicter();
  if (-1 === this.state) return this.root;
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
export { defaultExport as default };
