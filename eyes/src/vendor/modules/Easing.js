/** @eyes-analysis
 * 文件职责：Tween 插值动画工具 18.6.4：Easing 缓动族、Tween 状态、Group 更新、Interpolation 路径插值和递增 Sequence；并非仅缓动函数
 * 依据：// Recovered from vendors.js:1044152-1054814.；exports: Easing, Group, Interpolation, Sequence, Tween, VERSION, add, getAll, nextId, now, remove, removeAll, update, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1044152-1054814.
let defaultExport;
var r,
  Easing = {
    Linear: {
      None: function (e) {
        return e;
      }
    },
    Quadratic: {
      In: function (e) {
        return e * e;
      },
      Out: function (e) {
        return e * (2 - e);
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
      }
    },
    Cubic: {
      In: function (e) {
        return e * e * e;
      },
      Out: function (e) {
        return --e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
      }
    },
    Quartic: {
      In: function (e) {
        return e * e * e * e;
      },
      Out: function (e) {
        return 1 - --e * e * e * e;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
      }
    },
    Quintic: {
      In: function (e) {
        return e * e * e * e * e;
      },
      Out: function (e) {
        return --e * e * e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
      }
    },
    Sinusoidal: {
      In: function (e) {
        return 1 - Math.cos(e * Math.PI / 2);
      },
      Out: function (e) {
        return Math.sin(e * Math.PI / 2);
      },
      InOut: function (e) {
        return .5 * (1 - Math.cos(Math.PI * e));
      }
    },
    Exponential: {
      In: function (e) {
        return 0 === e ? 0 : Math.pow(1024, e - 1);
      },
      Out: function (e) {
        return 1 === e ? 1 : 1 - Math.pow(2, -10 * e);
      },
      InOut: function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (2 - Math.pow(2, -10 * (e - 1)));
      }
    },
    Circular: {
      In: function (e) {
        return 1 - Math.sqrt(1 - e * e);
      },
      Out: function (e) {
        return Math.sqrt(1 - --e * e);
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
    },
    Elastic: {
      In: function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : -Math.pow(2, 10 * (e - 1)) * Math.sin(5 * (e - 1.1) * Math.PI);
      },
      Out: function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : Math.pow(2, -10 * e) * Math.sin(5 * (e - .1) * Math.PI) + 1;
      },
      InOut: function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? -.5 * Math.pow(2, 10 * (e - 1)) * Math.sin(5 * (e - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (e - 1)) * Math.sin(5 * (e - 1.1) * Math.PI) + 1;
      }
    },
    Back: {
      In: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t);
      },
      Out: function (e) {
        var t = 1.70158;
        return --e * e * ((t + 1) * e + t) + 1;
      },
      InOut: function (e) {
        var t = 2.5949095;
        return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
      }
    },
    Bounce: {
      In: function (e) {
        return 1 - Easing.Bounce.Out(1 - e);
      },
      Out: function (e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
      },
      InOut: function (e) {
        return e < .5 ? .5 * Easing.Bounce.In(2 * e) : .5 * Easing.Bounce.Out(2 * e - 1) + .5;
      }
    }
  },
  now = "undefined" == typeof self && "undefined" != typeof process && process.hrtime ? function () {
    var e = process.hrtime();
    return 1e3 * e[0] + e[1] / 1e6;
  } : "undefined" != typeof self && void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now.bind(self.performance) : void 0 !== Date.now ? Date.now : function () {
    return new Date().getTime();
  },
  Group = function () {
    function e() {
      this._tweens = {}, this._tweensAddedDuringUpdate = {};
    }
    return e.prototype.getAll = function () {
      var e = this;
      return Object.keys(this._tweens).map(function (t) {
        return e._tweens[t];
      });
    }, e.prototype.removeAll = function () {
      this._tweens = {};
    }, e.prototype.add = function (e) {
      this._tweens[e.getId()] = e, this._tweensAddedDuringUpdate[e.getId()] = e;
    }, e.prototype.remove = function (e) {
      delete this._tweens[e.getId()], delete this._tweensAddedDuringUpdate[e.getId()];
    }, e.prototype.update = function (e, t) {
      void 0 === e && (e = now()), void 0 === t && (t = !1);
      var n = Object.keys(this._tweens);
      if (0 === n.length) return !1;
      for (; n.length > 0;) {
        this._tweensAddedDuringUpdate = {};
        for (var r = 0; r < n.length; r++) {
          var i = this._tweens[n[r]],
            s = !t;
          i && !1 === i.update(e, s) && !t && delete this._tweens[n[r]];
        }
        n = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }, e;
  }(),
  Interpolation = {
    Linear: function (e, t) {
      var n = e.length - 1,
        r = n * t,
        i = Math.floor(r),
        a = Interpolation.Utils.Linear;
      return t < 0 ? a(e[0], e[1], r) : t > 1 ? a(e[n], e[n - 1], n - r) : a(e[i], e[i + 1 > n ? n : i + 1], r - i);
    },
    Bezier: function (e, t) {
      for (var n = 0, r = e.length - 1, i = Math.pow, a = Interpolation.Utils.Bernstein, s = 0; s <= r; s++) n += i(1 - t, r - s) * i(t, s) * e[s] * a(r, s);
      return n;
    },
    CatmullRom: function (e, t) {
      var n = e.length - 1,
        r = n * t,
        i = Math.floor(r),
        a = Interpolation.Utils.CatmullRom;
      return e[0] === e[n] ? (t < 0 && (i = Math.floor(r = n * (1 + t))), a(e[(i - 1 + n) % n], e[i], e[(i + 1) % n], e[(i + 2) % n], r - i)) : t < 0 ? e[0] - (a(e[0], e[0], e[1], e[1], -r) - e[0]) : t > 1 ? e[n] - (a(e[n], e[n], e[n - 1], e[n - 1], r - n) - e[n]) : a(e[i ? i - 1 : 0], e[i], e[n < i + 1 ? n : i + 1], e[n < i + 2 ? n : i + 2], r - i);
    },
    Utils: {
      Linear: function (e, t, n) {
        return (t - e) * n + e;
      },
      Bernstein: function (e, t) {
        var n = Interpolation.Utils.Factorial;
        return n(e) / n(t) / n(e - t);
      },
      Factorial: (r = [1], function (e) {
        var t = 1;
        if (r[e]) return r[e];
        for (var n = e; n > 1; n--) t *= n;
        return r[e] = t, t;
      }),
      CatmullRom: function (e, t, n, r, i) {
        var a = .5 * (n - e),
          s = .5 * (r - t),
          o = i * i;
        return (2 * t - 2 * n + a + s) * (i * o) + (-3 * t + 3 * n - 2 * a - s) * o + a * i + t;
      }
    }
  },
  Sequence = function () {
    function e() {}
    return e.nextId = function () {
      return e._nextId++;
    }, e._nextId = 0, e;
  }(),
  l = new Group(),
  Tween = function () {
    function e(object, group) {
      void 0 === group && (group = l), this._object = object, this._group = group, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = Easing.Linear.None, this._interpolationFunction = Interpolation.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._id = Sequence.nextId(), this._isChainStopped = !1, this._goToEnd = !1;
    }
    return e.prototype.getId = function () {
      return this._id;
    }, e.prototype.isPlaying = function () {
      return this._isPlaying;
    }, e.prototype.isPaused = function () {
      return this._isPaused;
    }, e.prototype.to = function (e, duration) {
      return this._valuesEnd = Object.create(e), void 0 !== duration && (this._duration = duration), this;
    }, e.prototype.duration = function (duration) {
      return this._duration = duration, this;
    }, e.prototype.start = function (e) {
      if (this._isPlaying) return this;
      if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) for (var t in this._reversed = !1, this._valuesStartRepeat) this._swapEndStartRepeatValues(t), this._valuesStart[t] = this._valuesStartRepeat[t];
      return this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = void 0 !== e ? "string" == typeof e ? now() + parseFloat(e) : e : now(), this._startTime += this._delayTime, this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat), this;
    }, e.prototype._setupProperties = function (e, t, n, r) {
      for (var i in n) {
        var a = e[i],
          s = Array.isArray(a),
          o = s ? "array" : typeof a,
          c = !s && Array.isArray(n[i]);
        if ("undefined" !== o && "function" !== o) {
          if (c) {
            var l = n[i];
            if (0 === l.length) continue;
            l = l.map(this._handleRelativeValue.bind(this, a)), n[i] = [a].concat(l);
          }
          if ("object" !== o && !s || !a || c) void 0 === t[i] && (t[i] = a), s || (t[i] *= 1), r[i] = c ? n[i].slice().reverse() : t[i] || 0;else {
            for (var u in t[i] = s ? [] : {}, a) t[i][u] = a[u];
            r[i] = s ? [] : {}, this._setupProperties(a, t[i], n[i], r[i]);
          }
        }
      }
    }, e.prototype.stop = function () {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, e.prototype.end = function () {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, e.prototype.pause = function (pauseStart) {
      return void 0 === pauseStart && (pauseStart = now()), this._isPaused || !this._isPlaying || (this._isPaused = !0, this._pauseStart = pauseStart, this._group && this._group.remove(this)), this;
    }, e.prototype.resume = function (e) {
      return void 0 === e && (e = now()), this._isPaused && this._isPlaying ? (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this) : this;
    }, e.prototype.stopChainedTweens = function () {
      for (var e = 0, t = this._chainedTweens.length; e < t; e++) this._chainedTweens[e].stop();
      return this;
    }, e.prototype.group = function (group) {
      return this._group = group, this;
    }, e.prototype.delay = function (delayTime) {
      return this._delayTime = delayTime, this;
    }, e.prototype.repeat = function (e) {
      return this._initialRepeat = e, this._repeat = e, this;
    }, e.prototype.repeatDelay = function (repeatDelayTime) {
      return this._repeatDelayTime = repeatDelayTime, this;
    }, e.prototype.yoyo = function (yoyo) {
      return this._yoyo = yoyo, this;
    }, e.prototype.easing = function (easingFunction) {
      return this._easingFunction = easingFunction, this;
    }, e.prototype.interpolation = function (interpolationFunction) {
      return this._interpolationFunction = interpolationFunction, this;
    }, e.prototype.chain = function () {
      for (var chainedTweens = [], t = 0; t < arguments.length; t++) chainedTweens[t] = arguments[t];
      return this._chainedTweens = chainedTweens, this;
    }, e.prototype.onStart = function (onStartCallback) {
      return this._onStartCallback = onStartCallback, this;
    }, e.prototype.onUpdate = function (onUpdateCallback) {
      return this._onUpdateCallback = onUpdateCallback, this;
    }, e.prototype.onRepeat = function (onRepeatCallback) {
      return this._onRepeatCallback = onRepeatCallback, this;
    }, e.prototype.onComplete = function (onCompleteCallback) {
      return this._onCompleteCallback = onCompleteCallback, this;
    }, e.prototype.onStop = function (onStopCallback) {
      return this._onStopCallback = onStopCallback, this;
    }, e.prototype.update = function (e, t) {
      if (void 0 === e && (e = now()), void 0 === t && (t = !0), this._isPaused) return !0;
      var n,
        r,
        i = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (e > i) return !1;
        t && this.start(e);
      }
      if (this._goToEnd = !1, e < this._startTime) return !0;
      !1 === this._onStartCallbackFired && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), r = (e - this._startTime) / this._duration, r = 0 === this._duration || r > 1 ? 1 : r;
      var s = this._easingFunction(r);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, s), this._onUpdateCallback && this._onUpdateCallback(this._object, r), 1 === r) {
        if (this._repeat > 0) {
          for (n in isFinite(this._repeat) && this._repeat--, this._valuesStartRepeat) this._yoyo || "string" != typeof this._valuesEnd[n] || (this._valuesStartRepeat[n] = this._valuesStartRepeat[n] + parseFloat(this._valuesEnd[n])), this._yoyo && this._swapEndStartRepeatValues(n), this._valuesStart[n] = this._valuesStartRepeat[n];
          return this._yoyo && (this._reversed = !this._reversed), void 0 !== this._repeatDelayTime ? this._startTime = e + this._repeatDelayTime : this._startTime = e + this._delayTime, this._onRepeatCallback && this._onRepeatCallback(this._object), !0;
        }
        this._onCompleteCallback && this._onCompleteCallback(this._object);
        for (var o = 0, c = this._chainedTweens.length; o < c; o++) this._chainedTweens[o].start(this._startTime + this._duration);
        return this._isPlaying = !1, !1;
      }
      return !0;
    }, e.prototype._updateProperties = function (e, t, n, r) {
      for (var i in n) if (void 0 !== t[i]) {
        var a = t[i] || 0,
          s = n[i],
          o = Array.isArray(e[i]),
          c = Array.isArray(s);
        !o && c ? e[i] = this._interpolationFunction(s, r) : "object" == typeof s && s ? this._updateProperties(e[i], a, s, r) : "number" == typeof (s = this._handleRelativeValue(a, s)) && (e[i] = a + (s - a) * r);
      }
    }, e.prototype._handleRelativeValue = function (e, t) {
      return "string" != typeof t ? t : "+" === t.charAt(0) || "-" === t.charAt(0) ? e + parseFloat(t) : parseFloat(t);
    }, e.prototype._swapEndStartRepeatValues = function (e) {
      var t = this._valuesStartRepeat[e],
        n = this._valuesEnd[e];
      this._valuesStartRepeat[e] = "string" == typeof n ? this._valuesStartRepeat[e] + parseFloat(n) : this._valuesEnd[e], this._valuesEnd[e] = t;
    }, e;
  }(),
  VERSION = "18.6.4",
  nextId = Sequence.nextId,
  p = l,
  getAll = p.getAll.bind(p),
  removeAll = p.removeAll.bind(p),
  add = p.add.bind(p),
  remove = p.remove.bind(p),
  update = p.update.bind(p),
  g = {
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    now: now,
    Sequence: Sequence,
    nextId: nextId,
    Tween: Tween,
    VERSION: VERSION,
    getAll: getAll,
    removeAll: removeAll,
    add: add,
    remove: remove,
    update: update
  };
defaultExport = g;
export { Easing };
export { Group };
export { Interpolation };
export { Sequence };
export { Tween };
export { VERSION };
export { add };
export { getAll };
export { nextId };
export { now };
export { remove };
export { removeAll };
export { update };
export { defaultExport as default };
