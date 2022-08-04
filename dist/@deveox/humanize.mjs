const tt = {
  Y: { exponent: 24, word: "septillion", name: "yotta" },
  Z: { exponent: 21, word: "sextillion", name: "zetta" },
  E: { exponent: 18, word: "quintillion", name: "exa" },
  P: { exponent: 15, word: "quadrillion", name: "peta" },
  T: { exponent: 12, word: "trillion", name: "tera" },
  G: { exponent: 9, word: "billion", name: "giga" },
  M: { exponent: 6, word: "million", name: "mega" },
  k: { exponent: 3, word: "thousand", name: "kilo" },
  h: { exponent: 2, word: "hundred", name: "hecto" },
  da: { exponent: 1, word: "ten", name: "deco" }
};
function ot(s, D = 1, $ = "symbol", u = tt) {
  let l = nt(s), f = !1;
  return l < 0 && (f = !0, l = l < 0n ? -l : l), f ? "-" + G(l, D, $, u) : G(l, D, $, u);
}
function G(s, D, $, u) {
  if (s >= 1 && s < 10)
    return String(s);
  let l = "";
  u = { ...u };
  for (let f = 0; f < D; f++) {
    for (const p in u) {
      const y = BigInt(10) ** BigInt(u[p].exponent);
      if (s >= y) {
        const k = s % y, h = s / y;
        l += `${et(Number(h), $, p, u)} `, k ? s = k : s = BigInt(0), delete u[p];
        break;
      }
    }
    if (!l)
      break;
  }
  return s && String(s).split("").forEach((f, p) => {
    l += f, (p + 1) % 3 === 0 && (l += " ");
  }), l.trimEnd();
}
function et(s, D, $, u) {
  switch (D) {
    case "word":
      return rt(s, u[$].word);
    case "name":
      return `${s} ${u[$].name}`;
  }
  return `${s} ${$}`;
}
function nt(s) {
  switch (typeof s) {
    case "bigint":
      return s;
    case "number":
      return BigInt(s);
    case "string":
      return BigInt(Number.parseFloat(s));
    default:
      throw new Error("invalid type provided");
  }
}
function rt(s, D) {
  return s === 1 ? `${s} ${D}` : `${s} ${D}s`;
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, K = { exports: {} };
(function(s, D) {
  (function($, u) {
    s.exports = u();
  })(Q, function() {
    var $ = 1e3, u = 6e4, l = 36e5, f = "millisecond", p = "second", y = "minute", k = "hour", h = "day", O = "week", v = "month", B = "quarter", T = "year", _ = "date", Y = "Invalid Date", A = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, z = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, E = function(a, n, t) {
      var r = String(a);
      return !r || r.length >= n ? a : "" + Array(n + 1 - r.length).join(t) + a;
    }, C = { s: E, z: function(a) {
      var n = -a.utcOffset(), t = Math.abs(n), r = Math.floor(t / 60), e = t % 60;
      return (n <= 0 ? "+" : "-") + E(r, 2, "0") + ":" + E(e, 2, "0");
    }, m: function a(n, t) {
      if (n.date() < t.date())
        return -a(t, n);
      var r = 12 * (t.year() - n.year()) + (t.month() - n.month()), e = n.clone().add(r, v), o = t - e < 0, i = n.clone().add(r + (o ? -1 : 1), v);
      return +(-(r + (t - e) / (o ? e - i : i - e)) || 0);
    }, a: function(a) {
      return a < 0 ? Math.ceil(a) || 0 : Math.floor(a);
    }, p: function(a) {
      return { M: v, y: T, w: O, d: h, D: _, h: k, m: y, s: p, ms: f, Q: B }[a] || String(a || "").toLowerCase().replace(/s$/, "");
    }, u: function(a) {
      return a === void 0;
    } }, b = "en", S = {};
    S[b] = z;
    var W = function(a) {
      return a instanceof J;
    }, I = function a(n, t, r) {
      var e;
      if (!n)
        return b;
      if (typeof n == "string") {
        var o = n.toLowerCase();
        S[o] && (e = o), t && (S[o] = t, e = o);
        var i = n.split("-");
        if (!e && i.length > 1)
          return a(i[0]);
      } else {
        var d = n.name;
        S[d] = n, e = d;
      }
      return !r && e && (b = e), e || !r && b;
    }, M = function(a, n) {
      if (W(a))
        return a.clone();
      var t = typeof n == "object" ? n : {};
      return t.date = a, t.args = arguments, new J(t);
    }, c = C;
    c.l = I, c.i = W, c.w = function(a, n) {
      return M(a, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var J = function() {
      function a(t) {
        this.$L = I(t.locale, null, !0), this.parse(t);
      }
      var n = a.prototype;
      return n.parse = function(t) {
        this.$d = function(r) {
          var e = r.date, o = r.utc;
          if (e === null)
            return new Date(NaN);
          if (c.u(e))
            return new Date();
          if (e instanceof Date)
            return new Date(e);
          if (typeof e == "string" && !/Z$/i.test(e)) {
            var i = e.match(A);
            if (i) {
              var d = i[2] - 1 || 0, g = (i[7] || "0").substring(0, 3);
              return o ? new Date(Date.UTC(i[1], d, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, g)) : new Date(i[1], d, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, g);
            }
          }
          return new Date(e);
        }(t), this.$x = t.x || {}, this.init();
      }, n.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, n.$utils = function() {
        return c;
      }, n.isValid = function() {
        return this.$d.toString() !== Y;
      }, n.isSame = function(t, r) {
        var e = M(t);
        return this.startOf(r) <= e && e <= this.endOf(r);
      }, n.isAfter = function(t, r) {
        return M(t) < this.startOf(r);
      }, n.isBefore = function(t, r) {
        return this.endOf(r) < M(t);
      }, n.$g = function(t, r, e) {
        return c.u(t) ? this[r] : this.set(e, t);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(t, r) {
        var e = this, o = !!c.u(r) || r, i = c.p(t), d = function(j, x) {
          var N = c.w(e.$u ? Date.UTC(e.$y, x, j) : new Date(e.$y, x, j), e);
          return o ? N : N.endOf(h);
        }, g = function(j, x) {
          return c.w(e.toDate()[j].apply(e.toDate("s"), (o ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(x)), e);
        }, m = this.$W, w = this.$M, L = this.$D, H = "set" + (this.$u ? "UTC" : "");
        switch (i) {
          case T:
            return o ? d(1, 0) : d(31, 11);
          case v:
            return o ? d(1, w) : d(0, w + 1);
          case O:
            var F = this.$locale().weekStart || 0, Z = (m < F ? m + 7 : m) - F;
            return d(o ? L - Z : L + (6 - Z), w);
          case h:
          case _:
            return g(H + "Hours", 0);
          case k:
            return g(H + "Minutes", 1);
          case y:
            return g(H + "Seconds", 2);
          case p:
            return g(H + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(t) {
        return this.startOf(t, !1);
      }, n.$set = function(t, r) {
        var e, o = c.p(t), i = "set" + (this.$u ? "UTC" : ""), d = (e = {}, e[h] = i + "Date", e[_] = i + "Date", e[v] = i + "Month", e[T] = i + "FullYear", e[k] = i + "Hours", e[y] = i + "Minutes", e[p] = i + "Seconds", e[f] = i + "Milliseconds", e)[o], g = o === h ? this.$D + (r - this.$W) : r;
        if (o === v || o === T) {
          var m = this.clone().set(_, 1);
          m.$d[d](g), m.init(), this.$d = m.set(_, Math.min(this.$D, m.daysInMonth())).$d;
        } else
          d && this.$d[d](g);
        return this.init(), this;
      }, n.set = function(t, r) {
        return this.clone().$set(t, r);
      }, n.get = function(t) {
        return this[c.p(t)]();
      }, n.add = function(t, r) {
        var e, o = this;
        t = Number(t);
        var i = c.p(r), d = function(w) {
          var L = M(o);
          return c.w(L.date(L.date() + Math.round(w * t)), o);
        };
        if (i === v)
          return this.set(v, this.$M + t);
        if (i === T)
          return this.set(T, this.$y + t);
        if (i === h)
          return d(1);
        if (i === O)
          return d(7);
        var g = (e = {}, e[y] = u, e[k] = l, e[p] = $, e)[i] || 1, m = this.$d.getTime() + t * g;
        return c.w(m, this);
      }, n.subtract = function(t, r) {
        return this.add(-1 * t, r);
      }, n.format = function(t) {
        var r = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || Y;
        var o = t || "YYYY-MM-DDTHH:mm:ssZ", i = c.z(this), d = this.$H, g = this.$m, m = this.$M, w = e.weekdays, L = e.months, H = function(x, N, P, q) {
          return x && (x[N] || x(r, o)) || P[N].slice(0, q);
        }, F = function(x) {
          return c.s(d % 12 || 12, x, "0");
        }, Z = e.meridiem || function(x, N, P) {
          var q = x < 12 ? "AM" : "PM";
          return P ? q.toLowerCase() : q;
        }, j = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: m + 1, MM: c.s(m + 1, 2, "0"), MMM: H(e.monthsShort, m, L, 3), MMMM: H(L, m), D: this.$D, DD: c.s(this.$D, 2, "0"), d: String(this.$W), dd: H(e.weekdaysMin, this.$W, w, 2), ddd: H(e.weekdaysShort, this.$W, w, 3), dddd: w[this.$W], H: String(d), HH: c.s(d, 2, "0"), h: F(1), hh: F(2), a: Z(d, g, !0), A: Z(d, g, !1), m: String(g), mm: c.s(g, 2, "0"), s: String(this.$s), ss: c.s(this.$s, 2, "0"), SSS: c.s(this.$ms, 3, "0"), Z: i };
        return o.replace(U, function(x, N) {
          return N || j[x] || i.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(t, r, e) {
        var o, i = c.p(r), d = M(t), g = (d.utcOffset() - this.utcOffset()) * u, m = this - d, w = c.m(this, d);
        return w = (o = {}, o[T] = w / 12, o[v] = w, o[B] = w / 3, o[O] = (m - g) / 6048e5, o[h] = (m - g) / 864e5, o[k] = m / l, o[y] = m / u, o[p] = m / $, o)[i] || m, e ? w : c.a(w);
      }, n.daysInMonth = function() {
        return this.endOf(v).$D;
      }, n.$locale = function() {
        return S[this.$L];
      }, n.locale = function(t, r) {
        if (!t)
          return this.$L;
        var e = this.clone(), o = I(t, r, !0);
        return o && (e.$L = o), e;
      }, n.clone = function() {
        return c.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, a;
    }(), V = J.prototype;
    return M.prototype = V, [["$ms", f], ["$s", p], ["$m", y], ["$H", k], ["$W", h], ["$M", v], ["$y", T], ["$D", _]].forEach(function(a) {
      V[a[1]] = function(n) {
        return this.$g(n, a[0], a[1]);
      };
    }), M.extend = function(a, n) {
      return a.$i || (a(n, J, M), a.$i = !0), M;
    }, M.locale = I, M.isDayjs = W, M.unix = function(a) {
      return M(1e3 * a);
    }, M.en = S[b], M.Ls = S, M.p = {}, M;
  });
})(K);
const R = K.exports;
var X = { exports: {} };
(function(s, D) {
  (function($, u) {
    s.exports = u();
  })(Q, function() {
    return function($, u, l) {
      $ = $ || {};
      var f = u.prototype, p = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function y(h, O, v, B) {
        return f.fromToBase(h, O, v, B);
      }
      l.en.relativeTime = p, f.fromToBase = function(h, O, v, B, T) {
        for (var _, Y, A, U = v.$locale().relativeTime || p, z = $.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], E = z.length, C = 0; C < E; C += 1) {
          var b = z[C];
          b.d && (_ = B ? l(h).diff(v, b.d, !0) : v.diff(h, b.d, !0));
          var S = ($.rounding || Math.round)(Math.abs(_));
          if (A = _ > 0, S <= b.r || !b.r) {
            S <= 1 && C > 0 && (b = z[C - 1]);
            var W = U[b.l];
            T && (S = T("" + S)), Y = typeof W == "string" ? W.replace("%d", S) : W(S, O, b.l, A);
            break;
          }
        }
        if (O)
          return Y;
        var I = A ? U.future : U.past;
        return typeof I == "function" ? I(Y) : I.replace("%s", Y);
      }, f.to = function(h, O) {
        return y(h, O, this, !0);
      }, f.from = function(h, O) {
        return y(h, O, this);
      };
      var k = function(h) {
        return h.$u ? l.utc() : l();
      };
      f.toNow = function(h) {
        return this.to(k(this), h);
      }, f.fromNow = function(h) {
        return this.from(k(this), h);
      };
    };
  });
})(X);
const it = X.exports;
R.extend(it);
function st(s, D = "date-time") {
  if (!s)
    return "never";
  const $ = typeof s == "number" ? new Date(s * 1e3) : new Date(s), u = R($);
  if (u.year() < 1800)
    return "centuries ago";
  let f;
  switch (D) {
    case "period":
      f = u.fromNow();
      break;
    case "date":
      f = u.format("L");
      break;
    case "date-period":
      f = `${u.format("L")} (${u.fromNow()})`;
      break;
    case "time-period":
      f = `${u.format("L HH:mm:ss")} (${u.fromNow()})`;
      break;
    case "day":
      f = u.format("MMM DD");
      break;
    case "min":
      f = u.format("L HH:mm");
      break;
    case "time":
      f = `${u.format("HH:mm:ss")}`;
      break;
    default:
      f = u.format("L HH:mm:ss");
  }
  return f === "Invalid date" ? "--" : f;
}
function at(s = 0, D = "b") {
  const u = ["b", "kb", "mb", "gb", "tb", "ptb"], l = u.indexOf(D), f = u.slice(l);
  let p = f[0];
  for (let y = 0; y < f.length && (p = f[y], s >= 1024); y++)
    s = s / 1024;
  return `${Math.round(s * 100) / 100} ${p.toUpperCase()}`;
}
export {
  st as formatDate,
  ot as formatInt,
  at as formatSize
};
