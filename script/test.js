! function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
        var b = "length" in a && a.length,
            c = _.type(a);
        return "function" !== c && !_.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
    }

    function d(a, b, c) {
        if (_.isFunction(b)) return _.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return _.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (ha.test(b)) return _.filter(b, a, c);
            b = _.filter(b, a)
        }
        return _.grep(a, function (a) {
            return U.call(b, a) >= 0 !== c
        })
    }

    function e(a, b) {
        for (;
            (a = a[b]) && 1 !== a.nodeType;);
        return a
    }

    function f(a) {
        var b = na[a] = {};
        return _.each(a.match(ma) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
    }

    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = _.expando + h.uid++
    }

    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(ta, "-$1").toLowerCase(), "string" == typeof (c = a.getAttribute(d))) {
                try {
                    c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : sa.test(c) ? _.parseJSON(c) : c)
                } catch (S) {}
                ra.set(a, b, c)
            } else c = void 0;
        return c
    }

    function j() {
        return !0
    }

    function k() {
        return !1
    }

    function l() {
        try {
            return Z.activeElement
        } catch (a) {}
    }

    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function o(a) {
        var b = Ja.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function p(a, b) {
        for (var c = 0, d = a.length; d > c; c++) qa.set(a[c], "globalEval", !b || qa.get(b[c], "globalEval"))
    }

    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (qa.hasData(a) && (f = qa.access(a), g = qa.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c])
            }
            ra.hasData(a) && (h = ra.access(a), i = _.extend({}, h), ra.set(b, i))
        }
    }

    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }

    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && xa.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }

    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
        return e.detach(), f
    }

    function u(a) {
        var b = Z,
            c = Na[a];
        return c || (c = t(a, b), "none" !== c && c || (Ma = (Ma || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Ma[0].contentDocument, b.write(), b.close(), c = t(a, b), Ma.detach()), Na[a] = c), c
    }

    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Qa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Pa.test(g) && Oa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function w(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Wa.length; e--;)
            if ((b = Wa[e] + c) in a) return b;
        return d
    }

    function y(a, b, c) {
        var d = Sa.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += _.css(a, c + va[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + va[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + va[f] + "Width", !0, e))) : (g += _.css(a, "padding" + va[f], !0, e), "padding" !== c && (g += _.css(a, "border" + va[f] + "Width", !0, e)));
        return g
    }

    function A(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Qa(a),
            g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Pa.test(e)) return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = qa.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && wa(d) && (f[g] = qa.access(d, "olddisplay", u(d.nodeName)))) : (e = wa(d), "none" === c && e || qa.set(d, "olddisplay", e ? c : _.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e)
    }

    function D() {
        return setTimeout(function () {
            Xa = void 0
        }), Xa = _.now()
    }

    function E(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = va[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function F(a, b, c) {
        for (var d, e = (bb[b] || []).concat(bb["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function G(a, b, c) {
        var d, e, f, g, h, i, j, k = this,
            l = {},
            m = a.style,
            n = a.nodeType && wa(a),
            o = qa.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, k.always(function () {
            k.always(function () {
                h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], j = _.css(a, "display"), "inline" === ("none" === j ? qa.get(a, "olddisplay") || u(a.nodeName) : j) && "none" === _.css(a, "float") && (m.display = "inline-block")), c.overflow && (m.overflow = "hidden", k.always(function () {
            m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], Za.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (n ? "hide" : "show")) {
                    if ("show" !== e || !o || void 0 === o[d]) continue;
                    n = !0
                }
                l[d] = o && o[d] || _.style(a, d)
            } else j = void 0;
        if (_.isEmptyObject(l)) "inline" === ("none" === j ? u(a.nodeName) : j) && (m.display = j);
        else {
            o ? "hidden" in o && (n = o.hidden) : o = qa.access(a, "fxshow", {}), f && (o.hidden = !n), n ? _(a).show() : k.done(function () {
                _(a).hide()
            }), k.done(function () {
                var b;
                qa.remove(a, "fxshow");
                for (b in l) _.style(a, b, l[b])
            });
            for (d in l) g = F(n ? o[d] : 0, d, k), d in o || (o[d] = g.start, n && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function H(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = _.cssHooks[d]) && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function I(a, b, c) {
        var d, e, f = 0,
            g = ab.length,
            h = _.Deferred().always(function () {
                delete i.elem
            }),
            i = function () {
                if (e) return !1;
                for (var b = Xa || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: _.extend({}, b),
                opts: _.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: Xa || D(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++)
            if (d = ab[f].call(j, a, k, j.opts)) return d;
        return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function J(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(ma) || [];
            if (_.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, _.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === sb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d), a
    }

    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
            "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                } if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function N(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (!(g = j[i + " " + f] || j["* " + f]))
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0], k.unshift(h[1]));
                        break
                    } if (!0 !== g)
                if (g && a.throws) b = g(b);
                else try {
                    b = g(b)
                } catch (Z) {
                    return {
                        state: "parsererror",
                        error: g ? Z : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function O(a, b, c, d) {
        var e;
        if (_.isArray(b)) _.each(b, function (b, e) {
            c || xb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== _.type(b)) d(a, b);
        else
            for (e in b) O(a + "[" + e + "]", b[e], c, d)
    }

    function P(a) {
        return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var Q = [],
        R = Q.slice,
        S = Q.concat,
        T = Q.push,
        U = Q.indexOf,
        V = {},
        W = V.toString,
        X = V.hasOwnProperty,
        Y = {},
        Z = a.document,
        $ = "2.1.4",
        _ = function (a, b) {
            return new _.fn.init(a, b)
        },
        aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ba = /^-ms-/,
        ca = /-([\da-z])/gi,
        da = function (a, b) {
            return b.toUpperCase()
        };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function () {
            return R.call(this)
        },
        get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
        },
        pushStack: function (a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function (a, b) {
            return _.each(this, a, b)
        },
        map: function (a) {
            return this.pushStack(_.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function () {
            return this.pushStack(R.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    }, _.extend = _.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (a) {
            throw new Error(a)
        },
        noop: function () {},
        isFunction: function (a) {
            return "function" === _.type(a)
        },
        isArray: Array.isArray,
        isWindow: function (a) {
            return null != a && a === a.window
        },
        isNumeric: function (a) {
            return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function (a) {
            return "object" === _.type(a) && !a.nodeType && !_.isWindow(a) && !(a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf"))
        },
        isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
        },
        globalEval: function (a) {
            var b, c = eval;
            (a = _.trim(a)) && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function (a) {
            return a.replace(ba, "ms-").replace(ca, da)
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function (a, b, d) {
            var e = 0,
                f = a.length,
                g = c(a);
            if (d) {
                if (g)
                    for (; f > e && !1 !== b.apply(a[e], d); e++);
                else
                    for (e in a)
                        if (!1 === b.apply(a[e], d)) break
            } else if (g)
                for (; f > e && !1 !== b.call(a[e], e, a[e]); e++);
            else
                for (e in a)
                    if (!1 === b.call(a[e], e, a[e])) break;
            return a
        },
        trim: function (a) {
            return null == a ? "" : (a + "").replace(aa, "")
        },
        makeArray: function (a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
        },
        inArray: function (a, b, c) {
            return null == b ? -1 : U.call(b, a, c)
        },
        merge: function (a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function (a, b, c) {
            for (var d = [], e = 0, f = a.length, g = !c; f > e; e++) !b(a[e], e) !== g && d.push(a[e]);
            return d
        },
        map: function (a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a),
                i = [];
            if (h)
                for (; g > f; f++) null != (e = b(a[f], f, d)) && i.push(e);
            else
                for (f in a) null != (e = b(a[f], f, d)) && i.push(e);
            return S.apply([], i)
        },
        guid: 1,
        proxy: function (a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a) ? (d = R.call(arguments, 2), e = function () {
                return a.apply(b || this, d.concat(R.call(arguments)))
            }, e.guid = a.guid = a.guid || _.guid++, e) : void 0
        },
        now: Date.now,
        support: Y
    }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        V["[object " + b + "]"] = b.toLowerCase()
    });
    var ea = function (a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a)))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (!(f = b.getElementById(g)) || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
                    } if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c
                    } catch (R) {} finally {
                        l || b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[N] = !0, a
        }

        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (v) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function (b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function i(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return d(function (b) {
                return b = +b, d(function (c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function k(a) {
            return a && void 0 !== a.getElementsByTagName && a
        }

        function l() {}

        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function n(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first ? function (b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function (b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function o(a) {
            return a.length > 1 ? function (b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d
        }

        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    r = d || p(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? r : q(r, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                    return a === b
                }, g, !0), j = n(function (a) {
                    return aa(b, a) > -1
                }, g, !0), k = [function (a, c, d) {
                    var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; e > h; h++)
                if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                } return o(k)
        }

        function t(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function (d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        r = [],
                        s = C,
                        t = d || f && w.find.TAG("*", j),
                        u = P += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = a[l++];)
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break
                                } j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, r, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                            r = q(r)
                        }
                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function (a, b) {
                return a === b && (E = !0), 0
            },
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            aa = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ca = "[\\x20\\t\\r\\n\\f]",
            da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ea = da.replace("w", "w#"),
            fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
            ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
            ha = new RegExp(ca + "+", "g"),
            ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
            ja = new RegExp("^" + ca + "*," + ca + "*"),
            ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
            la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
            ma = new RegExp(ga),
            na = new RegExp("^" + ea + "$"),
            oa = {
                ID: new RegExp("^#(" + da + ")"),
                CLASS: new RegExp("^\\.(" + da + ")"),
                TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + fa),
                PSEUDO: new RegExp("^" + ga),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ba + ")$", "i"),
                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
            },
            pa = /^(?:input|select|textarea|button)$/i,
            qa = /^h\d$/i,
            ra = /^[^{]+\{\s*\[native \w/,
            sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ta = /[+~]/,
            ua = /'|\\/g,
            va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
            wa = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            xa = function () {
                F()
            };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
        } catch (Ia) {
            $ = {
                apply: X.length ? function (a, b) {
                    Z.apply(a, _.call(b))
                } : function (a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        v = b.support = {}, y = b.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, F = b.setDocument = function (a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), v.getElementsByTagName = e(function (a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
            }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function (a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
            }), v.getById ? (w.find.ID = function (a, b) {
                if (void 0 !== b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, w.filter.ID = function (a) {
                var b = a.replace(va, wa);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function (a) {
                var b = a.replace(va, wa);
                return function (a) {
                    var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
                return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            } : function (a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
                return I ? b.getElementsByClassName(a) : void 0
            }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function (a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }), e(function (a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
            })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, U = b ? function (a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c || (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
            } : function (a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0,
                    f = a.parentNode,
                    h = b.parentNode,
                    i = [a],
                    j = [b];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode;) i.unshift(c);
                for (c = b; c = c.parentNode;) j.unshift(c);
                for (; i[e] === j[e];) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }, d) : G
        }, b.matches = function (a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function (a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (x) {}
            return b(c, G, null, [a]).length > 0
        }, b.contains = function (a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b)
        }, b.attr = function (a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()],
                d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function (a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null, a
        }, x = b.getText = function (a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += x(b);
            return c
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function (a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function (a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function (a, c, d) {
                    return function (e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                            return (m -= e) === d || m % d == 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function (a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function (a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function (a) {
                    var b = [],
                        c = [],
                        e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function (a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: d(function (a) {
                    return function (c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function (a) {
                    return a = a.replace(va, wa),
                        function (b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                }),
                lang: d(function (a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                        function (b) {
                            var c;
                            do {
                                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                            } while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function (a) {
                    return a === H
                },
                focus: function (a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function (a) {
                    return !1 === a.disabled
                },
                disabled: function (a) {
                    return !0 === a.disabled
                },
                checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                },
                empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function (a) {
                    return !w.pseudos.empty(a)
                },
                header: function (a) {
                    return qa.test(a.nodeName)
                },
                input: function (a) {
                    return pa.test(a.nodeName)
                },
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function () {
                    return [0]
                }),
                last: j(function (a, b) {
                    return [b - 1]
                }),
                eq: j(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: j(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: j(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: j(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[u] = h(u);
        for (u in {
                submit: !0,
                reset: !0
            }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h;) {
                (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }, A = b.compile = function (a, b) {
            var c, d = [],
                e = [],
                f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a
            }
            return f
        }, B = b.select = function (a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (!(b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0])) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), !(a = d.length && m(f))) return $.apply(c, d), c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }), e(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), v.attributes && e(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), e(function (a) {
            return null == a.getAttribute("disabled")
        }) || f(ba, function (a, b, c) {
            var d;
            return c ? void 0 : !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), b
    }(a);
    _.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
    var fa = _.expr.match.needsContext,
        ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ha = /^.[^:#\[\.,]*$/;
    _.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, _.fn.extend({
        find: function (a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(_(a).filter(function () {
                for (b = 0; c > b; b++)
                    if (_.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function (a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function (a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function (a) {
            return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
        }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (_.fn.init = function (a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (!(c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a)) || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), ga.test(c[1]) && _.isPlainObject(b))
                    for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? void 0 !== ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
    }).prototype = _.fn, ia = _(Z);
    var ka = /^(?:parents|prev(?:Until|All))/,
        la = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    _.extend({
        dir: function (a, b, c) {
            for (var d = [], e = void 0 !== c;
                (a = a[b]) && 9 !== a.nodeType;)
                if (1 === a.nodeType) {
                    if (e && _(a).is(c)) break;
                    d.push(a)
                } return d
        },
        sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), _.fn.extend({
        has: function (a) {
            var b = _(a, this),
                c = b.length;
            return this.filter(function () {
                for (var a = 0; c > a; a++)
                    if (_.contains(this, b[a])) return !0
            })
        },
        closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    } return this.pushStack(f.length > 1 ? _.unique(f) : f)
        },
        index: function (a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
        },
        addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), _.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function (a) {
            return _.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return _.dir(a, "parentNode", c)
        },
        next: function (a) {
            return e(a, "nextSibling")
        },
        prev: function (a) {
            return e(a, "previousSibling")
        },
        nextAll: function (a) {
            return _.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return _.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return _.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return _.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return _.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function (a) {
            return _.sibling(a.firstChild)
        },
        contents: function (a) {
            return a.contentDocument || _.merge([], a.childNodes)
        }
    }, function (a, b) {
        _.fn[a] = function (c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (la[a] || _.unique(e), ka.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var ma = /\S+/g,
        na = {};
    _.Callbacks = function (a) {
        a = "string" == typeof a ? na[a] || f(a) : _.extend({}, a);
        var b, c, d, e, g, h, i = [],
            j = !a.once && [],
            k = function (f) {
                for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++)
                    if (!1 === i[h].apply(f[0], f[1]) && a.stopOnFalse) {
                        b = !1;
                        break
                    } d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
            },
            l = {
                add: function () {
                    if (i) {
                        var c = i.length;
                        ! function b(c) {
                            _.each(c, function (c, d) {
                                var e = _.type(d);
                                "function" === e ? a.unique && l.has(d) || i.push(d) : d && d.length && "string" !== e && b(d)
                            })
                        }(arguments), d ? g = i.length : b && (e = c, k(b))
                    }
                    return this
                },
                remove: function () {
                    return i && _.each(arguments, function (a, b) {
                        for (var c;
                            (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (g >= c && g--, h >= c && h--)
                    }), this
                },
                has: function (a) {
                    return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
                },
                empty: function () {
                    return i = [], g = 0, this
                },
                disable: function () {
                    return i = j = b = void 0, this
                },
                disabled: function () {
                    return !i
                },
                lock: function () {
                    return j = void 0, b || l.disable(), this
                },
                locked: function () {
                    return !j
                },
                fireWith: function (a, b) {
                    return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
                },
                fire: function () {
                    return l.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!c
                }
            };
        return l
    }, _.extend({
        Deferred: function (a) {
            var b = [
                    ["resolve", "done", _.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", _.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", _.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function () {
                        return c
                    },
                    always: function () {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var a = arguments;
                        return _.Deferred(function (c) {
                            _.each(b, function (b, f) {
                                var g = _.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = g && g.apply(this, arguments);
                                    a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function (a) {
                        return null != a ? _.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, _.each(b, function (a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function (a) {
            var b, c, d, e = 0,
                f = R.call(arguments),
                g = f.length,
                h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : _.Deferred(),
                j = function (a, c, d) {
                    return function (e) {
                        c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    });
    var oa;
    _.fn.ready = function (a) {
        return _.ready.promise().done(a), this
    }, _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
            a ? _.readyWait++ : _.ready(!0)
        },
        ready: function (a) {
            (!0 === a ? --_.readyWait : _.isReady) || (_.isReady = !0, !0 !== a && --_.readyWait > 0 || (oa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
        }
    }), _.ready.promise = function (b) {
        return oa || (oa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), oa.promise(b)
    }, _.ready.promise();
    var pa = _.access = function (a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c) _.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                return j.call(_(a), c)
            })), b))
            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    _.acceptData = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
        key: function (a) {
            if (!h.accepts(a)) return 0;
            var b = {},
                c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (R) {
                    b[this.expando] = c, _.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function (a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function (a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function (a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function (a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(ma) || [])), c = d.length;
                for (; c--;) delete g[d[c]]
            }
        },
        hasData: function (a) {
            return !_.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function (a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var qa = new h,
        ra = new h,
        sa = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ta = /([A-Z])/g;
    _.extend({
        hasData: function (a) {
            return ra.hasData(a) || qa.hasData(a)
        },
        data: function (a, b, c) {
            return ra.access(a, b, c)
        },
        removeData: function (a, b) {
            ra.remove(a, b)
        },
        _data: function (a, b, c) {
            return qa.access(a, b, c)
        },
        _removeData: function (a, b) {
            qa.remove(a, b)
        }
    }), _.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = ra.get(f), 1 === f.nodeType && !qa.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
                    qa.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                ra.set(this, a)
            }) : pa(this, function (b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (void 0 !== (c = ra.get(f, a))) return c;
                    if (void 0 !== (c = ra.get(f, d))) return c;
                    if (void 0 !== (c = i(f, d, void 0))) return c
                } else this.each(function () {
                    var c = ra.get(this, d);
                    ra.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && ra.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function (a) {
            return this.each(function () {
                ra.remove(this, a)
            })
        }
    }), _.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = qa.get(a, b), c && (!d || _.isArray(c) ? d = qa.access(a, b, _.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = _.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = _._queueHooks(a, b),
                g = function () {
                    _.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return qa.get(a, c) || qa.access(a, c, {
                empty: _.Callbacks("once memory").add(function () {
                    qa.remove(a, [b + "queue", c])
                })
            })
        }
    }), _.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                _.dequeue(this, a)
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, b) {
            var c, d = 1,
                e = _.Deferred(),
                f = this,
                g = this.length,
                h = function () {
                    --d || e.resolveWith(f, [f])
                };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)(c = qa.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var ua = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        va = ["Top", "Right", "Bottom", "Left"],
        wa = function (a, b) {
            return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
        },
        xa = /^(?:checkbox|radio)$/i;
    ! function () {
        var a = Z.createDocumentFragment(),
            b = a.appendChild(Z.createElement("div")),
            c = Z.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var ya = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var za = /^key/,
        Aa = /^(?:mouse|pointer|contextmenu)|click/,
        Ba = /^(?:focusinfocus|focusoutblur)$/,
        Ca = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = qa.get(a);
            if (q)
                for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
                        return typeof _ !== ya && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
                    }), b = (b || "").match(ma) || [""], j = b.length; j--;) h = Ca.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && _.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && !1 !== l.setup.call(a, d, o, g) || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = qa.hasData(a) && qa.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(ma) || [""], j = b.length; j--;)
                    if (h = Ca.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || _.removeEvent(a, n, q.handle), delete i[n])
                    } else
                        for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle, qa.remove(a, "events"))
            }
        },
        trigger: function (b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || Z],
                n = X.call(b, "type") ? b.type : b,
                o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ba.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || !1 !== l.trigger.apply(d, c))) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n, Ba.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0;
                    (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (qa.get(g, "events") || {})[b.type] && qa.get(g, "handle"), k && k.apply(g, c), (k = j && g[j]) && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), !1 === b.result && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && !1 !== l._default.apply(m.pop(), c) || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
            }
        },
        dispatch: function (a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [],
                h = R.call(arguments),
                i = (qa.get(this, "events") || {})[a.type] || [],
                j = _.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || !1 !== j.preDispatch.call(this, a)) {
                for (g = _.event.handlers.call(this, a, i), b = 0;
                    (e = g[b++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, void 0 !== (d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h)) && !1 === (a.result = d) && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (!0 !== i.disabled || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    } return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[_.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Aa.test(e) ? this.mouseHooks : za.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    return this !== l() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === l() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function (a) {
                    return _.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = _.extend(new _.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, _.removeEvent = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, _.Event = function (a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
    }, _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var c = function (a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0)
        };
        _.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this,
                    e = qa.access(d, b);
                e || d.addEventListener(a, c, !0), qa.access(d, b, (e || 0) + 1)
            },
            teardown: function () {
                var d = this.ownerDocument || this,
                    e = qa.access(d, b) - 1;
                e ? qa.access(d, b, e) : (d.removeEventListener(a, c, !0), qa.remove(d, b))
            }
        }
    }), _.fn.extend({
        on: function (a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), !1 === d) d = k;
            else if (!d) return this;
            return 1 === e && (f = d, d = function (a) {
                return _().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function () {
                _.event.add(this, a, d, c, b)
            })
        },
        one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (!1 === b || "function" == typeof b) && (c = b, b = void 0), !1 === c && (c = k), this.each(function () {
                _.event.remove(this, a, c, b)
            })
        },
        trigger: function (a, b) {
            return this.each(function () {
                _.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            var c = this[0];
            return c ? _.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Da = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ea = /<([\w:]+)/,
        Fa = /<|&#?\w+;/,
        Ga = /<(?:script|style|link)/i,
        Ha = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ia = /^$|\/(?:java|ecma)script/i,
        Ja = /^true\/(.*)/,
        Ka = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        La = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    La.optgroup = La.option, La.tbody = La.tfoot = La.colgroup = La.caption = La.thead, La.th = La.td, _.extend({
        clone: function (a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = _.contains(a.ownerDocument, a);
            if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
                for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
                else q(a, h);
            return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
        },
        buildFragment: function (a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
                if ((e = a[m]) || 0 === e)
                    if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
                    else if (Fa.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Ea.exec(e) || ["", ""])[1].toLowerCase(), h = La[g] || La._default, f.innerHTML = h[1] + e.replace(Da, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                _.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++];)
                if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
                    for (j = 0; e = f[j++];) Ia.test(e.type || "") && c.push(e);
            return k
        },
        cleanData: function (a) {
            for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[qa.expando]) && (b = qa.cache[e])) {
                    if (b.events)
                        for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    qa.cache[e] && delete qa.cache[e]
                }
                delete ra.cache[c[ra.expando]]
            }
        }
    }), _.fn.extend({
        text: function (a) {
            return pa(this, function (a) {
                return void 0 === a ? _.text(this) : this.empty().each(function () {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    m(this, a).appendChild(a)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function (a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
            return this
        },
        clone: function (a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function () {
                return _.clone(this, a, b)
            })
        },
        html: function (a) {
            return pa(this, function (a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Ga.test(a) && !La[(Ea.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Da, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (S) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function () {
            var a = arguments[0];
            return this.domManip(arguments, function (b) {
                a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0,
                j = this.length,
                k = this,
                l = j - 1,
                m = a[0],
                p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ha.test(m)) return this.each(function (c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
            });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
                if (f)
                    for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i], Ia.test(g.type || "") && !qa.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(Ka, "")))
            }
            return this
        }
    }), _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        _.fn[a] = function (a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var Ma, Na = {},
        Oa = /^margin/,
        Pa = new RegExp("^(" + ua + ")(?!px)[a-z%]+$", "i"),
        Qa = function (b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };
    ! function () {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", g.innerHTML = "", e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
        }
        var c, d, e = Z.documentElement,
            f = Z.createElement("div"),
            g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
            pixelPosition: function () {
                return b(), c
            },
            boxSizingReliable: function () {
                return null == d && b(), d
            },
            reliableMarginRight: function () {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), b
            }
        }))
    }(), _.swap = function (a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Ra = /^(none|table(?!-c[ea]).+)/,
        Sa = new RegExp("^(" + ua + ")(.*)$", "i"),
        Ta = new RegExp("^([+-])=(" + ua + ")", "i"),
        Ua = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Va = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Wa = ["Webkit", "O", "Moz", "ms"];
    _.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b),
                    i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ta.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), void(null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))))
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Va && (e = Va[b]), "" === c || c ? (f = parseFloat(e), !0 === c || _.isNumeric(f) ? f || 0 : e) : e
        }
    }), _.each(["height", "width"], function (a, b) {
        _.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? Ra.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Ua, function () {
                    return A(a, b, d)
                }) : A(a, b, d) : void 0
            },
            set: function (a, c, d) {
                var e = d && Qa(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function (a, b) {
        return b ? _.swap(a, {
            display: "inline-block"
        }, v, [a, "marginRight"]) : void 0
    }), _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (a, b) {
        _.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + va[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Oa.test(a) || (_.cssHooks[a + b].set = y)
    }), _.fn.extend({
        css: function (a, b) {
            return pa(this, function (a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (_.isArray(b)) {
                    for (d = Qa(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function () {
            return B(this, !0)
        },
        hide: function () {
            return B(this)
        },
        toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                wa(this) ? _(this).show() : _(this).hide()
            })
        }
    }), _.Tween = C, C.prototype = {
        constructor: C,
        init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
        },
        cur: function () {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this)
        },
        run: function (a) {
            var b, c = C.propHooks[this.prop];
            return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
        }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function (a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, _.easing = {
        linear: function (a) {
            return a
        },
        swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, _.fx = C.prototype.init, _.fx.step = {};
    var Xa, Ya, Za = /^(?:toggle|show|hide)$/,
        $a = new RegExp("^(?:([+-])=|)(" + ua + ")([a-z%]*)$", "i"),
        _a = /queueHooks$/,
        ab = [G],
        bb = {
            "*": [function (a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = $a.exec(b),
                    f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
                    g = (_.cssNumber[a] || "px" !== f && +d) && $a.exec(_.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do {
                        h = h || ".5", g /= h, _.style(c.elem, a, g + f)
                    } while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };
    _.Animation = _.extend(I, {
            tweener: function (a, b) {
                _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], bb[c] = bb[c] || [], bb[c].unshift(b)
            },
            prefilter: function (a, b) {
                b ? ab.unshift(a) : ab.push(a)
            }
        }), _.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? _.extend({}, a) : {
                complete: c || !c && b || _.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !_.isFunction(b) && b
            };
            return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, (null == d.queue || !0 === d.queue) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
            }, d
        }, _.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(wa).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function (a, b, c, d) {
                var e = _.isEmptyObject(a),
                    f = _.speed(b, c, d),
                    g = function () {
                        var b = I(this, _.extend({}, a), f);
                        (e || qa.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), this.each(function () {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = _.timers,
                        g = qa.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && _a.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && _.dequeue(this, a)
                })
            },
            finish: function (a) {
                return !1 !== a && (a = a || "fx"), this.each(function () {
                    var b, c = qa.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = _.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0),
                        b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), _.each(["toggle", "show", "hide"], function (a, b) {
            var c = _.fn[b];
            _.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
            }
        }), _.each({
            slideDown: E("show"),
            slideUp: E("hide"),
            slideToggle: E("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (a, b) {
            _.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), _.timers = [], _.fx.tick = function () {
            var a, b = 0,
                c = _.timers;
            for (Xa = _.now(); b < c.length; b++)(a = c[b])() || c[b] !== a || c.splice(b--, 1);
            c.length || _.fx.stop(), Xa = void 0
        }, _.fx.timer = function (a) {
            _.timers.push(a), a() ? _.fx.start() : _.timers.pop()
        }, _.fx.interval = 13, _.fx.start = function () {
            Ya || (Ya = setInterval(_.fx.tick, _.fx.interval))
        }, _.fx.stop = function () {
            clearInterval(Ya), Ya = null
        }, _.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, _.fn.delay = function (a, b) {
            return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        function () {
            var a = Z.createElement("input"),
                b = Z.createElement("select"),
                c = b.appendChild(Z.createElement("option"));
            a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
        }();
    var cb, db, eb = _.expr.attrHandle;
    _.fn.extend({
        attr: function (a, b) {
            return pa(this, _.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                _.removeAttr(this, a)
            })
        }
    }), _.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === ya ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? db : cb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
        },
        removeAttr: function (a, b) {
            var c, d, e = 0,
                f = b && b.match(ma);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), db = {
        set: function (a, b, c) {
            return !1 === b ? _.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = eb[b] || _.find.attr;
        eb[b] = function (a, b, d) {
            var e, f;
            return d || (f = eb[b], eb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, eb[b] = f), e
        }
    });
    var fb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function (a, b) {
            return pa(this, _.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            return this.each(function () {
                delete this[_.propFix[a] || a]
            })
        }
    }), _.extend({
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function (a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    return a.hasAttribute("tabindex") || fb.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), Y.optSelected || (_.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        _.propFix[this.toLowerCase()] = this
    });
    var gb = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function (b) {
                _(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(ma) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gb, " ") : " ")) {
                        for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = _.trim(d), c.className !== g && (c.className = g)
                    } return this
        },
        removeClass: function (a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function (b) {
                _(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(ma) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gb, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
                    } return this
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ? function (c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function () {
                if ("string" === c)
                    for (var b, d = 0, e = _(this), f = a.match(ma) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else(c === ya || "boolean" === c) && (this.className && qa.set(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : qa.get(this, "__className__") || "")
            })
        },
        hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(gb, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var hb = /\r/g;
    _.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = _.isFunction(a), this.each(function (c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function (a) {
                    return null == a ? "" : a + ""
                })), (b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            })) : e ? (b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(hb, "") : null == c ? "" : c)) : void 0
        }
    }), _.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b : _.trim(_.text(a))
                }
            },
            select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                            if (b = _(c).val(), f) return b;
                            g.push(b)
                        } return g
                },
                set: function (a, b) {
                    for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), _.each(["radio", "checkbox"], function () {
        _.valHooks[this] = {
            set: function (a, b) {
                return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
            }
        }, Y.checkOn || (_.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        _.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), _.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var ib = _.now(),
        jb = /\?/;
    _.parseJSON = function (a) {
        return JSON.parse(a + "")
    }, _.parseXML = function (a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (R) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a), b
    };
    var kb = /#.*$/,
        lb = /([?&])_=[^&]*/,
        mb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        nb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        ob = /^(?:GET|HEAD)$/,
        pb = /^\/\//,
        qb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        rb = {},
        sb = {},
        tb = "*/".concat("*"),
        ub = a.location.href,
        vb = qb.exec(ub.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ub,
            type: "GET",
            isLocal: nb.test(vb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": tb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
        },
        ajaxPrefilter: J(rb),
        ajaxTransport: J(sb),
        ajax: function (a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), (u = v.getResponseHeader("etag")) && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
                m = l.context || l,
                n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                o = _.Deferred(),
                p = _.Callbacks("once memory"),
                q = l.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === t) {
                            if (!g)
                                for (g = {}; b = mb.exec(f);) g[b[1].toLowerCase()] = b[2];
                            b = g[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function () {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function (a) {
                        return t || (l.mimeType = a), this
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function (a) {
                        var b = a || u;
                        return d && d.abort(b), c(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || ub) + "").replace(kb, "").replace(pb, vb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(ma) || [""], null == l.crossDomain && (i = qb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === vb[1] && i[2] === vb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (vb[3] || ("http:" === vb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(rb, l, b, v), 2 === t) return v;
            j = _.event && l.global, j && 0 == _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !ob.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (jb.test(e) ? "&" : "?") + l.data, delete l.data), !1 === l.cache && (l.url = lb.test(e) ? e.replace(lb, "$1_=" + ib++) : e + (jb.test(e) ? "&" : "?") + "_=" + ib++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && !1 !== l.contentType || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + tb + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (!1 === l.beforeSend.call(m, v, l) || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[k](l[k]);
            if (d = K(sb, l, b, v)) {
                v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
                    v.abort("timeout")
                }, l.timeout));
                try {
                    t = 1, d.send(r, c)
                } catch (ha) {
                    if (!(2 > t)) throw ha;
                    c(-1, ha)
                }
            } else c(-1, "No Transport");
            return v
        },
        getJSON: function (a, b, c) {
            return _.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return _.get(a, void 0, b, "script")
        }
    }), _.each(["get", "post"], function (a, b) {
        _[b] = function (a, c, d, e) {
            return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), _._evalUrl = function (a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    }, _.fn.extend({
        wrapAll: function (a) {
            var b;
            return _.isFunction(a) ? this.each(function (b) {
                _(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function (a) {
            return this.each(_.isFunction(a) ? function (b) {
                _(this).wrapInner(a.call(this, b))
            } : function () {
                var b = _(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = _.isFunction(a);
            return this.each(function (c) {
                _(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
            }).end()
        }
    }), _.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, _.expr.filters.visible = function (a) {
        return !_.expr.filters.hidden(a)
    };
    var wb = /%20/g,
        xb = /\[\]$/,
        yb = /\r?\n/g,
        zb = /^(?:submit|button|image|reset|file)$/i,
        Ab = /^(?:input|select|textarea|keygen)/i;
    _.param = function (a, b) {
        var c, d = [],
            e = function (a, b) {
                b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function () {
            e(this.name, this.value)
        });
        else
            for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(wb, "+")
    }, _.fn.extend({
        serialize: function () {
            return _.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Ab.test(this.nodeName) && !zb.test(a) && (this.checked || !xa.test(a))
            }).map(function (a, b) {
                var c = _(this).val();
                return null == c ? null : _.isArray(c) ? _.map(c, function (a) {
                    return {
                        name: b.name,
                        value: a.replace(yb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(yb, "\r\n")
                }
            }).get()
        }
    }), _.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Bb = 0,
        Cb = {},
        Db = {
            0: 200,
            1223: 204
        },
        Eb = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function () {
        for (var a in Cb) Cb[a]()
    }), Y.cors = !!Eb && "withCredentials" in Eb, Y.ajax = Eb = !!Eb, _.ajaxTransport(function (a) {
        var b;
        return Y.cors || Eb && !a.crossDomain ? {
            send: function (c, d) {
                var e, f = a.xhr(),
                    g = ++Bb;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function (a) {
                    return function () {
                        b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (V) {
                    if (b) throw V
                }
            },
            abort: function () {
                b && b()
            }
        } : void 0
    }), _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (a) {
                return _.globalEval(a), a
            }
        }
    }), _.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), _.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function (d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function (a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), Z.head.appendChild(b[0])
                },
                abort: function () {
                    c && c()
                }
            }
        }
    });
    var Fb = [],
        Gb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = Fb.pop() || _.expando + "_" + ib++;
            return this[a] = !0, a
        }
    }), _.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g, h = !1 !== b.jsonp && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : !1 !== b.jsonp && (b.url += (jb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || _.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), _.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || Z;
        var d = ga.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
    };
    var Hb = _.fn.load;
    _.fn.load = function (a, b, c) {
        if ("string" != typeof a && Hb) return Hb.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function (a) {
            f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
        }).complete(c && function (a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        _.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), _.expr.filters.animated = function (a) {
        return _.grep(_.timers, function (b) {
            return a === b.elem
        }).length
    };
    var Ib = a.document.documentElement;
    _.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"),
                l = _(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, _.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                _.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                },
                f = d && d.ownerDocument;
            return f ? (b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== ya && (e = d.getBoundingClientRect()), c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e) : void 0
        },
        position: function () {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || Ib; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
                return a || Ib
            })
        }
    }), _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function (e) {
            return pa(this, function (b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), _.each(["top", "left"], function (a, b) {
        _.cssHooks[b] = w(Y.pixelPosition, function (a, c) {
            return c ? (c = v(a, b), Pa.test(c) ? _(a).position()[b] + "px" : c) : void 0
        })
    }), _.each({
        Height: "height",
        Width: "width"
    }, function (a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function (c, d) {
            _.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (!0 === d || !0 === e ? "margin" : "border");
                return pa(this, function (b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), _.fn.size = function () {
        return this.length
    }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return _
    });
    var Jb = a.jQuery,
        Kb = a.$;
    return _.noConflict = function (b) {
        return a.$ === _ && (a.$ = Kb), b && a.jQuery === _ && (a.jQuery = Jb), _
    }, typeof b === ya && (a.jQuery = a.$ = _), _
});
var Mark = {
    includes: {},
    globals: {},
    delimiter: ">",
    compact: !1,
    _copy: function (a, b) {
        b = b || [];
        for (var c in a) b[c] = a[c];
        return b
    },
    _size: function (a) {
        return a instanceof Array ? a.length : a || 0
    },
    _iter: function (a, b) {
        this.idx = a, this.size = b, this.length = b, this.sign = "#", this.toString = function () {
            return this.idx + this.sign.length - 1
        }
    },
    _pipe: function (a, b) {
        var c, d, e, f;
        if (c = b.shift()) {
            d = c.split(this.delimiter), e = d.shift().trim();
            try {
                f = Mark.pipes[e].apply(null, [a].concat(d)), a = this._pipe(f, b)
            } catch (g) {}
        }
        return a
    },
    _eval: function (a, b, c) {
        var d, e, f = this._pipe(a, b),
            g = f,
            h = -1;
        if (f instanceof Array)
            for (f = "", d = g.length; ++h < d;) e = {
                iter: new this._iter(h, d)
            }, f += c ? Mark.up(c, g[h], e) : g[h];
        else f instanceof Object && (f = Mark.up(c, g));
        return f
    },
    _test: function (a, b, c, d) {
        var e = Mark.up(b, c, d).split(/\{\{\s*else\s*\}\}/);
        return (!1 === a ? e[1] : e[0]) || ""
    },
    _bridge: function (a, b) {
        b = "." == b ? "\\." : b.replace(/\$/g, "\\$");
        var c, d, e = "{{\\s*" + b + "([^/}]+\\w*)?}}|{{/" + b + "\\s*}}",
            f = new RegExp(e, "g"),
            g = a.match(f) || [],
            h = 0,
            i = 0,
            j = -1,
            k = 0;
        for (d = 0; d < g.length && (c = d, j = a.indexOf(g[c], j + 1), g[c].indexOf("{{/") > -1 ? i++ : h++, h !== i); d++);
        return h = a.indexOf(g[0]), i = h + g[0].length, k = j + g[c].length, [a.substring(h, k), a.substring(i, j)]
    }
};
Mark.up = function (a, b, c) {
        b = b || {}, c = c || {};
        var d, e, f, g, h, i, j, k, l, m, n = /\{\{(.+?)\}\}/g,
            o = a.match(n) || [],
            p = [],
            q = 0,
            r = 0;
        for (c.pipes && this._copy(c.pipes, this.pipes), c.includes && this._copy(c.includes, this.includes), c.globals && this._copy(c.globals, this.globals), c.delimiter && (this.delimiter = c.delimiter), void 0 !== c.compact && (this.compact = c.compact); d = o[q++];)
            if (j = void 0, i = "", g = d.indexOf("/}}") > -1, e = d.substr(2, d.length - (g ? 5 : 4)), e = e.replace(/`(.+?)`/g, function (a, c) {
                    return Mark.up("{{" + c + "}}", b)
                }), h = 0 === e.trim().indexOf("if "), p = e.split("|"), p.shift(), e = e.replace(/^\s*if/, "").split("|").shift().trim(), f = h ? "if" : e.split("|")[0], m = b[e], h && !p.length && (p = ["notempty"]), !g && a.indexOf("{{/" + f) > -1 && (j = this._bridge(a, f), d = j[0], i = j[1], q += d.match(n).length - 1), !/^\{\{\s*else\s*\}\}$/.test(d)) {
                if (void 0 !== (k = this.globals[e])) j = this._eval(k, p, i);
                else if (l = this.includes[e]) l instanceof Function && (l = l()), j = this._pipe(Mark.up(l, b, c), p);
                else if (e.indexOf("#") > -1) c.iter.sign = e, j = this._pipe(c.iter, p);
                else if ("." === e) j = this._pipe(b, p);
                else if (e.indexOf(".") > -1) {
                    for (e = e.split("."), m = Mark.globals[e[0]], m ? r = 1 : (r = 0, m = b); m && r < e.length;) m = m[e[r++]];
                    j = this._eval(m, p, i)
                } else h ? j = this._pipe(m, p) : m instanceof Array ? j = this._eval(m, p, i) : i ? j = m ? Mark.up(i, m) : void 0 : b.hasOwnProperty(e) && (j = this._pipe(m, p));
                j instanceof Array && (j = this._eval(j, p, i)), h && (j = this._test(j, i, b, c)), a = a.replace(d, void 0 === j ? "???" : j)
            } return this.compact ? a.replace(/>\s+</g, "><") : a
    }, Mark.pipes = {
        empty: function (a) {
            return (!a || 0 === (a + "").trim().length) && a
        },
        notempty: function (a) {
            return !(!a || !(a + "").trim().length) && a
        },
        blank: function (a, b) {
            return a || 0 === a ? a : b
        },
        more: function (a, b) {
            return Mark._size(a) > b && a
        },
        less: function (a, b) {
            return Mark._size(a) < b && a
        },
        ormore: function (a, b) {
            return Mark._size(a) >= b && a
        },
        orless: function (a, b) {
            return Mark._size(a) <= b && a
        },
        between: function (a, b, c) {
            return (a = Mark._size(a)) >= b && a <= c && a
        },
        equals: function (a, b) {
            return a == b && a
        },
        notequals: function (a, b) {
            return a != b && a
        },
        like: function (a, b) {
            return !!new RegExp(b, "i").test(a) && a
        },
        notlike: function (a, b) {
            return !Mark.pipes.like(a, b) && a
        },
        upcase: function (a) {
            return String(a).toUpperCase()
        },
        downcase: function (a) {
            return String(a).toLowerCase()
        },
        capcase: function (a) {
            return a.replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase()
            })
        },
        chop: function (a, b) {
            return a.length > b ? a.substr(0, b) + "..." : a
        },
        tease: function (a, b) {
            var c = a.split(/\s+/);
            return c.slice(0, b).join(" ") + (c.length > b ? "..." : "")
        },
        trim: function (a) {
            return a.trim()
        },
        pack: function (a) {
            return a.trim().replace(/\s{2,}/g, " ")
        },
        round: function (a) {
            return Math.round(+a)
        },
        clean: function (a) {
            return String(a).replace(/<\/?[^>]+>/gi, "")
        },
        size: function (a) {
            return a.length
        },
        length: function (a) {
            return a.length
        },
        reverse: function (a) {
            return [].concat(a).reverse()
        },
        join: function (a, b) {
            return a.join(b)
        },
        limit: function (a, b, c) {
            return a.slice(+c || 0, +b + (+c || 0))
        },
        split: function (a, b) {
            return a.split(b || ",")
        },
        choose: function (a, b, c) {
            return a ? b : c || ""
        },
        toggle: function (a, b, c, d) {
            return c.split(",")[b.match(/\w+/g).indexOf(a + "")] || d
        },
        sort: function (a, b) {
            var c = function (a, c) {
                return a[b] > c[b] ? 1 : -1
            };
            return [].concat(a).sort(b ? c : void 0)
        },
        fix: function (a, b) {
            return (+a).toFixed(b)
        },
        mod: function (a, b) {
            return +a % +b
        },
        divisible: function (a, b) {
            return !(!a || +a % b != 0) && a
        },
        even: function (a) {
            return !(!a || 0 != (1 & +a)) && a
        },
        odd: function (a) {
            return !(!a || 1 != (1 & +a)) && a
        },
        number: function (a) {
            return parseFloat(a.replace(/[^\-\d\.]/g, ""))
        },
        url: function (a) {
            return encodeURI(a)
        },
        bool: function (a) {
            return !!a
        },
        falsy: function (a) {
            return !a
        },
        first: function (a) {
            return 0 === a.idx
        },
        last: function (a) {
            return a.idx === a.size - 1
        },
        call: function (a, b) {
            return a[b].apply(a, [].slice.call(arguments, 2))
        },
        set: function (a, b) {
            return Mark.globals[b] = a, ""
        },
        log: function (a) {
            return console.log(a), a
        }
    }, "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), "undefined" != typeof module && module.exports ? module.exports = Mark : "function" == typeof define && define.amd && define(function () {
        return Mark
    }),
    function () {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B = [].slice;
        A = {
                zh: {
                    AUTO_RETURN_HOME: "<label id='countdown'>{{countdown}}</label> 秒后发现新应用",
                    LOADING: "加载中...",
                    DOWNLOAD_INSTALL: "下载安装",
                    DOWNLOAD_LOADING: "下载中",
                    TRUST_IMMEDIATELY: "立即信任",
                    DATA_ERROR: "数据错误",
                    DATA_INCOMPLETE: "请联系应用开发者, <a href='/apps/new'>去新版重新上传</a>",
                    DATA_INCOMPLETE_IN_MOBILE: "请联系应用开发者重新上传",
                    DOWNLOAD_FAILED: "刷新并重试",
                    VIEW_IN_DESKTOP: "正在安装，请按 Home 键在桌面查看",
                    VIEW_IN_BROWSER: "请在浏览器中查看下载进度",
                    PLATFORM_NOT_MATCHING: "只支持 {{app|app_type}} 设备",
                    CHANGELOG_PLACEHOLDER: "没有更新日志",
                    FAILED_LOAD_APP: "加载失败",
                    NOT_FOUND_TITLE: "404 - Not Found",
                    NOT_FOUND_APP_TITLE: "404 - 应用不存在",
                    NOT_FOUND_LOG: "您访问的 应用/页面 不存在",
                    NOT_SUPPORT_TITLE: "暂时不为此类应用提供下载服务",
                    NOT_SUPPORT_LOG: "betaqr.com 平台暂时不支持此类应用内测分发",
                    FORBIDDEN_TITLE: "403 - Forbidden",
                    FORBIDDEN_TITLE_LOG: "您没有权限访问这个应用",
                    REQUIRE_PWD: "请输入密码",
                    PASSWORD_WRONG: "密码错误",
                    SCAN_TIPS: "扫描二维码下载<br/>或用手机浏览器输入这个网址:&nbsp;&nbsp;<span class='text-black'>{{full_short}}</span>",
                    DESC: "应用描述",
                    CURRENT_VERSION: "当前版本",
                    FILE_SIZE: "文件大小",
                    UPDATED_AT: "更新于",
                    RELEASES: "历史版本",
                    CHANGELOG: "更新日志",
                    VIEW_ALL_APP_RELEASES: "查看全部 {{app.histories|length}} 个历史版本",
                    VIEW_ALL_APP_RELEASES_IOS: "查看全部 {{ios.histories|length}} 个历史版本",
                    VIEW_ALL_APP_RELEASES_ANDROID: "查看全部 {{android.histories|length}} 个历史版本",
                    FOLDING: "隐藏",
                    VIEW_ALL_COMBOAPP_RELEASES: "查看全部 {{combo_app.releases|length}} 个历史版本",
                    SCREENSHOTS: "应用截图",
                    INHOUSE: "123",
                    ADHOC: "内测版",
                    CONFIRM: "确认",
                    UNABLE_INSTALL: "微信/QQ 内无法下载应用",
                    GO_OUT_WECHAT_TIP: "请点击右上角<br/>选择“浏览器中打开”",
                    GO_OUT_WECHAT_IOS_TIP: "点击右上角菜单在<br/>Safari 中打开并安装",
                    FOOTER_SLOGAN: '<wbr />如应用存在问题，<wbr />可点击“举报”按钮 <a class="one-key-report" href="javascript:;">举报!</a>',
                    SAFE: "安全",
                    SAFE_TEXT: "此应用已通过以下安全检测，可放心下载",
                    VIRUS_PASS: "扫描通过",
                    LOW_RISK: "低风险",
                    HIGH_RISK: "高风险",
                    VIRUS: "病毒",
                    RISK: "有风险",
                    RISK_TEXT: "此应用下载有风险，请谨慎下载",
                    KING_SOFT: "猎豹安全大师",
                    BAIDU: "百度手机卫士",
                    POPULARIZE: "推荐应用",
                    DOWNLOAD: "下载",
                    REPORT_RETUEN: "返回下载页",
                    REPORT_SENDING: "正在发送，请稍后...",
                    REPORT_EMAIL: "你的邮箱",
                    REPORT_EMAIL_PLACEHOLDER: "Email",
                    REPORT_EMAIL_ERROR: "请填写有效的邮箱，可及时了解举报结果",
                    REPORT_REASON: "举报原因",
                    REPORT_DB: "盗版",
                    REPORT_HS: "黄色",
                    REPORT_QZ: "欺诈",
                    REPORT_DUBO: "赌博",
                    REPORT_OTHER: "其它",
                    REPORT_REASON_ERROR: "请选择举报类型",
                    REPORT_CONTENT_PLACEHOLDER: "请详细说明举报原因，10字以上",
                    REPORT_CONTENT_ERROR: "请填写举报原因",
                    REPORT_BUTTON: "立即举报",
                    REPORT_THANKS: "感谢你的举报",
                    REPORT_MESSAGE: "我们会尽快核实您的举报内容",
                    LEGAL_FORBIDDEN: "因法律的要求<wbr />而被拒绝",
                    LEGAL_FORBIDDEN_LOG: "该 APP 涉及盗版、欺诈、色情或其他不良信息",
                    RISK_WARNING: "您即将访问的应用为用户自行上传，",
                    RISK_WARNING_DEC: "请甄别应用风险后进行下载！",
                    RISK_BUTTON: "继续访问"
                },
                en: {
                    AUTO_RETURN_HOME: "Found new apps in <label id='countdown'>{{countdown}}</label> secs",
                    LOADING: "Loading...",
                    DOWNLOAD_INSTALL: "Download",
                    DOWNLOAD_LOADING: "Loading",
                    TRUST_IMMEDIATELY: "Trust immediately",
                    DATA_ERROR: "Data Error",
                    DATA_INCOMPLETE: "Please contact the app's owner, <a href='/apps/new'>upload again in Rio version</p>",
                    DATA_INCOMPLETE_IN_MOBILE: "Please contact the app's owner upload again",
                    DOWNLOAD_FAILED: "Refresh",
                    VIEW_IN_DESKTOP: "Installing, please check on your home screen",
                    VIEW_IN_BROWSER: "请在浏览器中查看下载进度",
                    PLATFORM_NOT_MATCHING: "Only support {{app|app_type}} device",
                    CHANGELOG_PLACEHOLDER: "There is no update log",
                    FAILED_LOAD_APP: "Load failed",
                    NOT_FOUND_TITLE: "404 - Not Found",
                    NOT_FOUND_APP_TITLE: "404 - 应用不存在",
                    NOT_FOUND_LOG: "Page does not exist",
                    NOT_SUPPORT_TITLE: "There is no download service for such applications",
                    NOT_SUPPORT_LOG: "betaqr.com The platform does not support this kind of application",
                    FORBIDDEN_TITLE: "403 - Forbidden",
                    FORBIDDEN_TITLE_LOG: "You don't have permission to view this page",
                    REQUIRE_PWD: "Please enter the password",
                    PASSWORD_WRONG: "Password is not correct",
                    SCAN_TIPS: "Scan the qrcode to download<br/>Open the url on your phone:&nbsp;&nbsp;<span class='text-black'>{{full_short}}</span>",
                    DESC: "Description",
                    CURRENT_VERSION: "Current version",
                    FILE_SIZE: "File size",
                    UPDATED_AT: "Updated at",
                    RELEASES: "Releases",
                    CHANGELOG: "Changelog",
                    VIEW_ALL_APP_RELEASES: "View all {{app.histories|length}} releases",
                    VIEW_ALL_APP_RELEASES_IOS: "View all {{ios.histories|length}} releases",
                    VIEW_ALL_APP_RELEASES_ANDROID: "View all {{android.histories|length}} releases",
                    FOLDING: "Folding",
                    SCREENSHOTS: "Screenshots",
                    INHOUSE: "",
                    ADHOC: "Adhoc",
                    CONFIRM: "Confirm",
                    UNABLE_INSTALL: "Can't downloads apps in WeChat/QQ",
                    GO_OUT_WECHAT_IOS_TIP: "Open in Safari and install this app",
                    GO_OUT_WECHAT_TIP: "Open in browser and install this app",
                    FOOTER_SLOGAN: '<wbr /> is suspicious, click the "report" button please.<a class="one-key-report" href="javascript:;">Report!</a>',
                    SAFE: "Safe",
                    SAFE_TEXT: "This application is already passing the security testing, you can start to download it.",
                    VIRUS_PASS: "PASS",
                    LOW_RISK: "Low Risk",
                    HIGH_RISK: "High Risk",
                    VIRUS: "Virus",
                    RISK: "WARNING",
                    RISK_TEXT: "We find out some unknown viruses in this app, please make sure this application is from someone you trust.",
                    KING_SOFT: "CM Security",
                    BAIDU: "Baidu Mobile Security",
                    POPULARIZE: "Hot apps",
                    DOWNLOAD: "Download",
                    REPORT_RETUEN: "Back",
                    REPORT_SENDING: "Sending...",
                    REPORT_EMAIL: "Email",
                    REPORT_EMAIL_PLACEHOLDER: "Your Email",
                    REPORT_EMAIL_ERROR: "Please enter your email address. Once we have reviewed your report, we will notify you by email.",
                    REPORT_REASON: "Reason for report",
                    REPORT_DB: "Pirate",
                    REPORT_DUBO: "Gamble",
                    REPORT_HS: "Porn",
                    REPORT_QZ: "Scam",
                    REPORT_OTHER: "Other",
                    REPORT_REASON_ERROR: "Please choose a topic you want to report.",
                    REPORT_CONTENT_PLACEHOLDER: "Please believe that the reasons for the report, 10 words or more.",
                    REPORT_CONTENT_ERROR: "Please tell us why you want to report this app.",
                    REPORT_BUTTON: "Report！",
                    REPORT_THANKS: "Thank you for helping to make betaqr.com better!",
                    REPORT_MESSAGE: "We will review your report soon",
                    LEGAL_FORBIDDEN: "Unavailable For Legal Reasons",
                    LEGAL_FORBIDDEN_LOG: "Unavailable For Legal Reasons",
                    RISK_WARNING: "This risk reminder aims to tell you the app is uploaded by the third-party developer，",
                    RISK_WARNING_DEC: "You should find out if it’s safety by yourself.",
                    RISK_BUTTON: "Continue"
                }
            },
            a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADLklEQVQ4T62Ua0hTYRjH/2dnO9uO23SnLbNyU8uk0oxISroQRiFdIelCEX2xMgKLEqIrFlJfWtCHykzo6ofKCm3dZFRmZSXdt5bWbJY6y3mbO2db286JQUEXO5PofXk/Pf//j//zwvMQiHL23+6b0mK3Jh7fOK0ymjZSJ34XvRMEzYXHULKu3gRSLpvg6BEKHlpuGFLigqXpSZp6ijY0G0bQXd1PKrzFxcX87/5fgNuqOk0N7apCmoLUF5IgQFAI+Hk0XDkBuFsBnQ7K2DgIhCw0erjaZj2yaKIoMO/w2wqbkLYSX/0gCYBRSRGvCuPp3Wp8cHYDwRggRAK8HAljFb2uk/O1osCcPXVHs2Zkb5g+QoBBS2AIDehoAZH7pY9AWw+H9+0e1Dz/gqdvHE572bJkUeCcffXHUjMnFcxKDGJqkhSJWhKA5PsDOJaF5UU7rj7+iDq7+1Nj+QqDKHCR6VWZU5ax1tnmhooikczwqMzXYpgqiIyN1bA+cwEsB8hjYZxoaGspXzBSFJh/qvNYU5gp4L0s/EEer1xhPChikKp0I272OUBPg1ZKwREMjDrl+5ay3FRR4D5LeMuNtyGTShpCjzcAZw9wcZ0WjN+JzDXVkOsVkCjU8PloZI7RPHp5KCdbFHjQ0jWuuinGplZI0Of1we4KoXQ1A7LTiiWbbkKZxICM0cPbFkD+kpGm8sLsIlFgpLiqwudwdJMpsfIwrK0ctuYyYJvrsdtUBzrViAChQbifg3lv1qgFWcbmqMCz1kDeAXOo0qin8KnLh9lpNDpsFpw3N4IeNRpccz/m5g431+yeuXCgUfxj9CKi7WZfaZVdsp5RkdBRHJqeXMWbVgAeCgnJso7204sTCYIIDRoYEe64zpbUOqmdHo8fr29dBrxBTJ6WXHuyMH15Rkr8578tigET/hCfsQlTahqFImfDvfh5k/QVO5aOPx5t44gCo5kH1bJwv0r97vydPKlWI6NZj8DKFXzV5DVhL6UhNTxHdLASYVh6/LXNGaoB2/4joaOkZLpv1666SEENoBdAzsr7cA9NA9gugJcgL6V79aWdU88NKuG/tPmz57//4TfNDDgk+K71PQAAAABJRU5ErkJggg==", d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEcElEQVQ4T4WUW6gVVRjHf9+a294ze/beZ2+Pl2Nq5vGYJlYKpWAqRdRLD0Y9dAGfEnoIkooKCxG1HiqiLOghRCESEioxwUCQvJUgRBqdjLzk9Zx9Lp4zs28ze+9ZMfsIvSgthnlYrO+3/jPf9//L4OBgedPh8skLN42BgpOE3GZpBJh6325VY/FL2WRs+7raannmixtHj1+2H7m7J6GTgNaQVqbFSglRG4YmOiiB3rxBxoIkSQ/9twyBK5MGS6fHv0n/1rGgnE38JIH0XEdD3IFqUzNW7ZC1EjY95lJyFTuPNLg+CXlXyGUUjiEo0YiAoWCiKaEsf28kMAS/nWiGJjvYpqY3ZzAjLyyaYfDsCo+V8wyO/NngwjicG27xz7hmOEgYrWkmGlD2hIwpqZhQlm+vBFEb3zRg4+oMi2cqco5BX9Ggr8dEECpBzAeHAgpelgfnKrROCKOEZpxQjWDv6RY36xrX6gJHgjDSvmsl7NtYpK9gcyPQRO2k+x8LroFBi13HqlTqFp6tu2rynkEhq1nWJ2z+vs7vQx2m54xQHtg2ElRj/JzZ5vPne7AsgyjW2JbGMRWFrMKUiF1H64w2bMo5jW0IpqHoAAO9is9+DDg3oZmZN1NgZUqhJOx8oYhlGzSitIiukoJnYEmT3cfqjDQcyl56EYikDREWTIOPD4ZcaUg6BaHct3U4iNvit+pRF1gqZhivdsiYU8Cia5IxI/Ycr1KpOZRSoCXdkXIsxSw34aMDk0yITT5HKEu2VAIN/tXhiB3r86xclOXSaJuMLWQtRTFj4Nkxe46FVOqpQukqVApKviJLwvvfBZgFm4xDKPe+OxyIEv+vKxGvrM3w3Jo8g9fbeI6QsRUl18CzIr46WesqLHtgGdKd2YHZFhcvhXxyqMac+TlEdCgD70wBrw7HPLFQ8epTJc5e61DICo4NJc/Es2L2nqjdagrYpqIaJTzU73Dwp5vsPxPT3++m5gxlUQoU/GYzoR1GfLihRGJZBGEbL6Mo5UxyVot9P4eMNhxKOcE2BdNWzC/Cp/vGmFAmPdOsW8C3bwQIfurVwQtNNjzs8PL6Mkf+iCm7Qq9vkrXafHsqZDKyKXqKWpzw6P0uJ3+Z4MvDVRYuyaFSQ+v0k98aCgA/neIoTrh2ocaOFwusW9XDqXMt8hb0eB32n65RCRS+Z7J2WZbJoRrbdo/iznAplk1EUgcRysI3p4CpwZXSjIy0iMYiXnrS5fFVBUo9Ga6PxnxzImRG2WHhdOHSxTq7DkzSdBzumufQjSJkCtj32khQsNt+OwFRgiJhbLTNyPk6SxeYPL0mx4ol2W7nz19ucWawxqmzTfxZWWbOmYKlQ26IptayQln8xsVKJS729mYadPRUkKZPp625drnZVTtwj0XOUfz6d4zYBrPnZrCzBmKm0ZE6JmGi5eIS3JSvfzi+4fWDvbuVXWw6ZquV3pYSu/msIWkljI+30Qn0FBSGYyBpA26FsNaaljaNWrXubll7ffOdUv0OYf//2/8CnLPg53p/3ssAAAAASUVORK5CYII=", l = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABNVBMVEXzpkDzpkHzp0Lzp0PzqETzqUjzqkjzqknzrE7zrU/0rVD0r1P0r1T0sFX0sFb0sFf0sVf0sVj0sVn0slr1tWD1tWH1tmL1tmP1t2T1umz1u231u2/2vG/2vHD2vXH2wHj2wXr2wXv2wnz2wn32wn72w373xYL3xYT3xoT3xoX3x4f3x4j3yIn3yIr3yYv3yYz3yo34zJL4zJP4zZT4zpb4z5n50p/506H506L51KL51KP516v52Kz52a762q/62rD62rH63rn63rr637v637z64L375Mb75cj75cn75sn75sr86tP869T869X87Nb87Nf879798N/98OD98eH98eL98uP98uT98+X98+b99On99er99ev99uz++PH++fL++fP++/f++/j+/Pn+/fz+/v3+/v7///+pZW9PAAAC/0lEQVR4AezBgQAAAACAoP2pF6kCAAAAAAAAAAAAAABm376aWjmiIAD3XnEvWQQTMGACyIGAAzkHkMDkIDAGJCGxov//T3ChObWlAVRlrVQ1e8r+3qb0dB521bPT85/R/tPcd4B+S0WyuAT1fmPJr1DOu2PJnQfdEhQJ6HZJcQnVRhgYgWYnDJxAsQGWGYBeKZZJQa1un2X8bmi1S8sulGp5oeWlBTqt8511qNT4TOPqisZzIzRapJiaoliEQg1PNB5isQcaTw3QZ45iHpinmIM6XppG9ivwNUsj7UGbSYrlt9UyxSS0uaCRb3pbNeVpXECZYYpNs96kGIYuxzT8DrPu8GkcQ5V+in2IfYp+aJKk6IXopUhCkS6fxiEChzT8LuixTTGIwCDFtqL8XqBxhjJnNAp60vwaxRjKjFGsQYlvORo3sNzQyH3Tlt+nYZlWluYbHmk8xmCJBT/oSPMzFAt4Z4FiBhqkKz4KwcOThgLjFCv4YIViHNF3TqPQjA+aCzTOEXlDFFv4xBbFEKLuiIbfiU90+jSOEHF9FAf41AFFH6KjLZlhHWVS7Y7myLLOcm4mSbLuUnAhw7rL/D9ILVKsuyRcaM+xzrJtcDNJqr6v36TM4dxsxfxeIc3PIpqsrWyIrbCG/F45zSvL75XTvLb8rijNH1XxSbQrSPPq8ruCNC8Oqjo26LfHdi/01u9PeyMZHfbjG/7V4FpTvtoX6rl1WBoZKxQT+Jcm7L/PiAhRCLAKBZFhx8DwEdO1EKUZq3QD98IffFjHKFFxHRTLQhXTrhERYyGrfuv2UaN7p0H5MmR58xSRMEixgyrtUHyPKDgMXVDutgoSrvW80kiF/zT22gP39moo8Q9Q7MG5uE/jpJZrGX4crm1Q/FDTRZkNuHZP47K2q0t/w7EvRRqJ2i6TFb/Asb9YcushFO+WJfdRuTA5ipBGWfI7XPNWi2RhHqH9kSeLqx7ci//yYytq0Jr4OY5/2oMDGQAAAIBB/tb3+KoLAAAAAAAAAAAAAAAg6P6/9f2bMMkAAAAASUVORK5CYII=", q = function () {
                var a, b, c, d;
                for (d = location.search, b = {}, c = /([\w\d]+)=([^&]*)/g, a = 10; c.test(d) && a > 0;) b[RegExp.$1] = decodeURIComponent(RegExp.$2), a--;
                return b
            }, u = {
                init: function (a) {
                    var b, c;
                    return c = this, b = {
                        anim: !0,
                        extend_height: 0,
                        selectorName: "img",
                        realSrcAtr: "data-img"
                    }, $.extend(b, a), c.img.init(b)
                },
                img: {
                    init: function (a) {
                        var b, c, d, e;
                        return this, e = a.selectorName, d = a.realSrcAtr, a.anim, c = function (b) {
                            var c, d, e;
                            return e = window.pageYOffset, c = window.pageYOffset + window.innerHeight, (d = $(b).offset().top) >= e && d - a.extend_height <= c
                        }, b = function (a) {
                            var b, c;
                            if (!a.attr("lazyImgLoaded")) return b = new Image, c = a.attr("data-img"), b.onload = function () {
                                return a.attr("src", c)
                            }, c && (b.src = c), a.attr("lazyImgLoaded", !0)
                        }, $(".after-install-zhibo-fixed").on("scroll", function () {
                            return $(e).each(function (a, e) {
                                var f;
                                if (f = $(this), f.attr(d) && c(this)) return b(f)
                            })
                        }).trigger("scroll")
                    }
                }
            }, v = function (a) {
                var b, c;
                return c = new RegExp("s*" + a + "=([^;]*)"), b = document.cookie.match(c), b ? b[1] : ""
            }, k = function (a) {
                return a.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/")
            }, z = function (a, b, c) {
                var d, e, f, g;
                c = c || {}, c["max-age"] && (g = c["max-age"], e = new Date, e.setTime(e.getTime() + g), c.expires = e.toUTCString(), delete c["max-age"]), d = a + "=" + b + ";";
                for (f in c) d += f + "=" + c[f] + ";";
                return document.cookie = d
            }, i = function (a, b) {
                return b = b || {}, b["max-age"] = 0, z(a, "", b)
            }, f = window.location.pathname, f = f.substring(1), e = f, c = location.href.split("?")[0], b = location.host, g = function () {
                var a;
                try {
                    a = v("currentUser"), a && (a = JSON.parse(decodeURIComponent(a)))
                } catch (b) {
                    b
                }
                return _hmt.push(["_setCustomVar", 1, "short", e])
            }, g(), n = function (a, b, c) {
                var d;
                return d = a[b], a[b] = a[c], a[c] = d, a
            }, x = function (a) {
                var b;
                return b = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                }, String(a).replace(/[&<>"'`=\/]/g, function (a) {
                    return b[a]
                })
            }, t = function (a) {
                return "string" == typeof a
            }, h = function (a) {
                var b;
                return a && (a.icon_url || (a.icon_url = l), a.is_ios = "ios" === a.type, a.is_android = "android" === a.type, a.market_app_info || (a.market_app_info = {}), a.store_link_visible || (a.market_app_info.url = null), a.icon_url = a.icon_url || a.market_app_info.icon_url, a.releases || (a.releases = {}), (null != (b = a.releases.history) ? b.length : void 0) && a.releases.history.sort(function (a, b) {
                    return b.created_at - a.created_at
                }), a.master = a.releases.master, a.histories = a.releases.history), a
            }, y = function (a) {
                var b, c, d;
                if (a) {
                    c = {};
                    for (b in a) d = a[b], t(d) ? c[b] = x(d) : c[b] = d;
                    return c
                }
            }, o = function (a) {
                return null == a && (a = ""), a.substr(a.lastIndexOf("/") + 1, a.length)
            }, s = function () {
                var a, b, c, d;
                for (d = ["oppo", "JLS36C", "KTU84P", "vivo"], b = 0, c = d.length; b < c; b++)
                    if (a = d[b], navigator.userAgent.toLowerCase().indexOf(a) > -1) return !0
            }, r = function () {
                return !!s() && navigator.userAgent.toLowerCase().indexOf("android 4") > -1
            }, p = function () {
                var a, b, c, d, f;
                for (c = {
                        download_token: v("download_token_" + e)
                    }, a = 20, f = location.search, d = /([\w\d]+)=([^&]*)/g, b = a; d.test(f) && b > 0;) c[RegExp.$1] = decodeURIComponent(RegExp.$2), b--;
                return c.access_token = v("access_token"), c.download_passwd = v("download_passwd_" + e), c
            }, m = function () {
                var a, b;
                return b = navigator.userAgent, a = {
                    isWechat: /micromessenger/i.test(b),
                    isQQ: /\s+QQ/.test(b),
                    isQQBrowserLite: /\s+QQBrowser/.test(b)
                }, a.is_mobile = !1, /(android|BB10|linux|NokiaN9)/gi.test(b) ? (a.value = "android", a.is_mobile = !0, a.is_ios = !1, a.is_android = !0, a.is_phone = !0) : /iP(hone|od|ad)/g.test(b) && (a.value = "ios", a.is_mobile = !0, a.is_ios = !0, a.is_ipad = /iPad/g.test(b), a.ios_6_x = /OS 6_(\d(_\d)*)/g.test(b), a.is_android = !1, /iP(hone|od)/g.test(b) && (a.is_phone = !0)), a.isUnabledInstall = a.isWechat || a.isQQ, a.isQQBrowserLite && (a.isUnabledInstall = !1), /Safari/.test(b) && /10_15/.test(b) && (a.value = "ios", a.is_mobile = !0, a.is_android = !1, a.is_ios = !0, a.is_ipad = !0, a.isIPadOS = !0, /iP(hone|od)/g.test(b) && (a.is_phone = !0)), a
            }, w = function (a, b, c, d) {
                return null == d && (d = !1), d && window.history && window.history.replaceState ? window.history.replaceState(a, b, c) : window.location.href = c
            }, j = function () {
                var a, b;
                return b = (new Date).getTime(), a = ~~(1e7 * Math.random()), b + "_" + a
            }, $(function () {
                var f, g, s, t, x, C, D, E, F, G, H, I;
                f = $("body"), g = $(".main"), t = window.innerHeight, C = 1, I = function (a) {
                    return void 0 === Mark && window._hmt.push(["_trackEvent", "MarkUp", "error"]), Mark.globals.full_short = a.full_short, Mark.globals.domain = a.domain, Mark.globals.defaultIcon = l, Mark.globals.release_id = a.release_id, Mark.includes.header = $("#header").html(), Mark.includes.footer = $("#footer").html(), Mark.includes.desc = $("#desc").html(), Mark.includes.release = $("#release").html(), Mark.pipes.bytes = function (a) {
                        var b, c, d;
                        return isNaN(parseFloat(a)) || !isFinite(a) ? "-" : (void 0 === c && (c = 2), d = ["byte", "KB", "MB", "GB", "TB", "PB"], b = Math.floor(Math.log(a) / Math.log(1024)), (a / Math.pow(1024, Math.floor(b))).toFixed(c) + " " + d[b])
                    }, Mark.pipes.formatDate = function (a) {
                        var b, c, d, e;
                        return a *= 1e3, a = new Date(a), e = a.getMonth() + 1 + "", 1 === e.length && (e = "0" + e), b = a.getDate() + "", 1 === b.length && (b = "0" + b), c = a.getHours() + "", 1 === c.length && (c = "0" + c), d = a.getMinutes() + "", 1 === d.length && (d = "0" + d), a.getFullYear() + "-" + e + "-" + b + " " + c + ":" + d
                    }, Mark.pipes.release_type = function (b) {
                        return b.release_type ? "zh" === a.locale ? "inhouse" === b.release_type ? "" : "内测版" : "inhouse" === b.release_type ? "inhouse" : "Adhoc" : ""
                    }, Mark.pipes.app_type = function (a) {
                        return "ios" === a.type ? "iOS" : "Android"
                    }, $.extend(Mark.includes, A[a.locale])
                }, E = function (a, b) {
                    var c;
                    return c = {
                        text: b.text,
                        width: b.width || 100,
                        height: b.height || 100,
                        colorDark: "#404242",
                        colorLight: b.bg || "#EFF2F2",
                        correctLevel: QRCode.CorrectLevel.L
                    }, $(a).html(""), new QRCode(a, c), setTimeout(function () {
                        return $(a).attr("title", "")
                    }, 500)
                }, s = ["alidayu", "send_cloud"], x = 0, window.FIR = {
                    brand: "fir.im 3.1 - Rio",
                    appId: "wx98dbd6cc53bd9cf2",
                    locale: v("locale") || (/^zh/.test(navigator.language) ? "zh" : "en"),
                    params: p(),
                    platform: m(),
                    config: {
                        server: "//fir-download.fircli.cn",
                        sameServer: "//fir-download.fircli.cn",
                        api: "//fir-api.fircli.cn",
                        screenshotPrefix: /\/\/firimg\.fir\.im/,
                        downloadTokenExpireTime: 3e5
                    },
                    data: {},
                    intervalNumber: 60,
                    elems: {},
                    virus_data: {},
                    AD: {},
                    report_files: [],
                    rucaptcha_id: "",
                    no_custom_download_domain_warn: "",
                    collectStore: function (a) {
                        return a || (a = window.short), !!a && (window.ga("send", "event", a, "click", "store"), !0)
                    },
                    ga: function () {
                        var a;
                        if (a = 1 <= arguments.length ? B.call(arguments, 0) : [], this.AD.is_use_ga) return window.ga.apply(window, a)
                    },
                    init: function () {
                        var a, d;
                        return navigator.userAgent.indexOf("UCBrowser") > -1 ? this.config.server = "//fir-download.fircli.cn" : /pro\.fir\.im/.test(location.href) && (this.config.server = "//download-pro.bq04.com", this.config.api = "//api-pro.bq04.com"), I({
                            locale: this.locale,
                            full_short: c,
                            release_id: this.params.release_id,
                            domain: b
                        }), a = this.platform.is_android ? "android" : this.platform.is_ipad ? "ipad" : "ios", d = this.platform.isWechat ? "-wechat" : "", a += d, this.AD = {
                            label: a
                        }, ga("set", "dimension3", a), this.renderLoading()
                    },
                    renderLoading: function () {
                        var a, b;
                        return b = $("#loading").html(), a = Mark.up(b), g.html(a)
                    },
                    setDownloadToken: function (a) {
                        var b;
                        return this.params.download_token = a, b = new Date(Date.now() + 864e5), document.cookie = "download_token_" + e + "=" + a + "; expires=" + b + "; path=/"
                    },
                    setDownloadPasswd: function (a) {
                        var b;
                        return this.params.download_passwd = a, b = new Date(Date.now() + 36e5), document.cookie = "download_passwd_" + e + "=" + a + "; expires=" + b + "; path=/"
                    },
                    mayBeRedirectToOnline: function (a) {
                        var b, c, d;
                        return (a.releases.is_onlined || (null != (b = a.releases.master) ? b.is_onlined : void 0)) && (null != (c = a.market_app_info) ? c.url : void 0) && (d = a.market_app_info.url, a.in_short_list ? a.wait_time > -1 && (window.ga("send", "event", "redirectToAppStore", "redirect", e), window._hmt.push(["_trackPageview", "/redirectToAppstore"]), setTimeout(function () {
                            return window.location.href = d
                        }, 300)) : (window.ga("send", "event", "redirectToAppStore", "redirect", e), window._hmt.push(["_trackPageview", "/redirectToAppstore"]), setTimeout(function () {
                            return window.location.href = d
                        }, 300))), !1
                    },
                    getQuerySetting: function () {
                        var a;
                        return a = {
                            url: this.config.server + "/" + e + "?referer=" + b,
                            headers: {
                                "Access-Token": this.params.access_token,
                                "Download-Token": this.params.download_token,
                                Passwd: this.params.download_passwd
                            }
                        }, this.params.release_id && (a.url += "&release_id=" + this.params.release_id), a
                    },
                    query: function () {
                        var a, b;
                        return b = $.extend({}, this.getQuerySetting(), {
                            type: "GET",
                            dataType: "json",
                            timeout: 1e4
                        }), a = $.extend({}, b, {
                            success: this.onSuccess.bind(this),
                            error: function (a) {
                                return function (b, c, d) {
                                    var e;
                                    return e = b.status, window._hmt.push(["_trackEvent", "download", "query", e]), a.onError(b, c, d)
                                }
                            }(this)
                        }), $.ajax(a).always(function (a) {
                            return function (c, d) {
                                return 0 === c.status ? (console.log("xhr.status:", c.status), a.requery(b)) : a.render()
                            }
                        }(this))
                    },
                    requery: function (a) {
                        var b;
                        return a.url = a.url.replace(this.config.server, this.config.sameServer), b = $.extend({}, a, {
                            success: function (a) {
                                return function (b, c, d) {
                                    return window._hmt.push(["_trackEvent", "download", "requery", d.status]), a.onSuccess(b, c, d)
                                }
                            }(this),
                            error: function (a) {
                                return function (b, c, d) {
                                    return window._hmt.push(["_trackEvent", "download", "requeryError", b.status]), a.onError(b, c, d)
                                }
                            }(this),
                            complete: function (a) {
                                return function () {
                                    return a.render()
                                }
                            }(this)
                        }), $.ajax(b)
                    },
                    getDownloadToken: function (a) {
                        var b, c;
                        return c = $.extend({}, this.getQuerySetting(), {
                            type: "GET",
                            dataType: "json",
                            timeout: 1e4
                        }), c.url = this.config.server + "/apps/" + this.data.app.id + "/download_token", b = $.extend({}, c, {
                            success: function (b) {
                                return function (b) {
                                    return a(b.download_token)
                                }
                            }(),
                            error: function (a) {
                                return function () {
                                    return window._hmt.push(["_trackEvent", "download", "getDonwloadTokenError", status])
                                }
                            }()
                        }), $.ajax(b)
                    },
                    onSuccess: function (a, c, d) {
                        var f, h, i, j, k, l, m, o;
                        this.ga("set", "dimension2", 200);
                        try {
                            h = a.app.download_domain, this.no_custom_download_domain_warn = a.no_custom_download_domain_warn, (null != (j = b.indexOf("app.agora.io") > -1) ? j : console.log(".io")) || (b.indexOf("jappstore.com") > -1 ? "fir.im" !== h && (window.location.href = "http://" + h + "/" + e + location.search) : b.indexOf("betaqr.com") > -1 ? "fir.im" !== h && (window.location.href = "https://zeroqr.com/no_betaqr_direct_url") : b !== h && ("fir.im" === h && null === h || (window.location.href = "http://" + h + "/" + e + location.search))), this.needAuthenticationToken = a.need_authentication_token, a.app = y(a.app), a.combo_app = y(a.combo_app), this.platform.is_mobile && a.combo_app && a.app.type !== this.platform.value && n(a, "combo_app", "app"), a.app && a.app.in_short_list && !this.isShow && a.app.wait_time > 0 && (this.wait_time = a.app.wait_time, this.ga("set", "dimension1", a.app.short), this.ga("send", "event", "adFooter", "shortDownload", a.app.name), setTimeout(function () {
                                return $(".main header").removeClass("fade-out")
                            }, 200), this.template_id = "legal_forbidden_new", this.resp = a, o = $("#" + this.template_id).html() || "", this.data.countdown = this.wait_time, m = Mark.up(o, this.data), g.html(m), this.startRedirectInterval()), a.app && a.app.in_short_list && -1 === a.app.wait_time && this.platform.is_mobile && (this.ga("set", "dimension2", 451), this.AD.isError = !0), f = a.app, f.token, this.mayBeRedirectToOnline(f) || window._hmt.push(["_trackPageview", location.pathname])
                        } catch (p) {
                            return i = p, void console.error(i)
                        }
                        return f && (f.is_expired || f.constraint) ? (this.AD.isError = !0, f.is_expired && window._hmt.push(["_trackEvent", "download", "is_expired"]), f.constraint && (window._hmt.push(["_trackEvent", "download", "is_constraint"]), window._hmt.push(["_setCustomVar", 2, "status", status]), this.ga("set", "dimension2", 425), a = {
                            is_expired: f.is_expired,
                            constraint: f.constraint
                        })) : (this.params.download_passwd && this.setDownloadPasswd(this.params.download_passwd), (l = a.app.releases) && (0 !== (null != (k = l.history) ? k.length : void 0) || l.master) || (console.info("没有版本信息"), a = {
                            data_error: !0
                        }, window._hmt.push(["_trackEvent", "download", "query", "no-releases"]))), f && f.in_short_list && a.app.wait_time > 0 ? this.isShow ? this.store(a) : void 0 : f && f.in_short_list && -1 === a.app.wait_time ? this.store({
                            not_find: !0
                        }) : f && f.in_short_list && 0 === a.app.wait_time ? (this.isShow = !0, this.store(a)) : this.store(a)
                    },
                    onError: function (a, b, c) {
                        var d, e, f, g, h;
                        switch (f = a.status, d = a.responseJSON, h = d, f && (window._hmt.push(["_setCustomVar", 2, "status", f]), this.ga("set", "dimension2", f)), f) {
                            case 404:
                                void 0 === h.redirect && (h.redirect = ""), "" !== h.redirect ? window.location.href = h.redirect : (this.store({
                                    not_found: !0
                                }), this.renderAdForErr(h));
                                break;
                            case 451:
                                this.store({
                                    legal_forbidden: !0
                                }), this.renderAdForErr(h);
                                break;
                            case 410:
                                this.store({
                                    legal_forbidden: !0
                                });
                                break;
                            case 427:
                                this.store({
                                    not_app: !0
                                });
                                break;
                            case 454:
                                this.store({
                                    legal_forbidden_download: !0
                                });
                                break;
                            case 453:
                                this.store({
                                    legal_forbidden_bt: !0
                                }), this.renderAdForErr(h);
                                break;
                            case 455:
                                this.store({
                                    not_support: !0
                                });
                                break;
                            case 425:
                                window._hmt.push(["_trackEvent", "download", "is_expired"]), window._hmt.push(["_trackEvent", "download", "is_constraint"]), window._hmt.push(["_setCustomVar", 2, "status", f]), this.ga("set", "dimension2", 425), this.store({
                                    constraint: !0
                                }), this.renderAdForErr(h);
                                break;
                            default:
                                g = a.response || a.responseText;
                                try {
                                    e = JSON.parse(g), this.store($.extend({}, e, {
                                        error: !0
                                    }))
                                } catch (i) {
                                    i
                                }
                        }
                        if (f && this.platform.is_mobile) return this.AD.isError = !0
                    },
                    store: function (a) {
                        return this.prev_template = this.template_id, this.authorized = a.auth, this.appTokenTime = new Date, a.is_expired ? this.template_id = "expired" : a.not_find ? this.template_id = "not_find" : a.constraint ? this.template_id = "constraint" : a.require_pwd ? this.template_id = "passwd" : a.forbidden ? this.template_id = "forbidden" : a.not_found ? this.template_id = "not_found" : a.not_app ? this.template_id = "not_app" : a.legal_forbidden ? this.template_id = "legal_forbidden" : a.legal_forbidden_download ? this.template_id = "legal_forbidden_download" : a.legal_forbidden_bt ? this.template_id = "legal_forbidden_bt" : a.not_support ? this.template_id = "not_support" : a.data_error ? this.template_id = "data_error" : a.error || !a.app ? this.template_id = "error" : (this.template_id = "app", a.app = h(a.app), a.combo_app = h(a.combo_app), a.ios = "ios" === a.app.type ? a.app : a.combo_app, a.android = "android" === a.app.type ? a.app : a.combo_app, a.combo_app && !this.platform.is_mobile && (this.template_id = "combo", this.has_combo = !0)), a.countdown = 10, this.data = a, this.afterStore()
                    },
                    virusStatus: function (a) {
                        var b;
                        switch (b = A[this.locale], a) {
                            case "SCANED":
                                return b.VIRUS_PASS;
                            case "LOWRISK":
                                return b.LOW_RISK;
                            case "HIGHRISK":
                                return b.HIGH_RISK;
                            case "VIRUS":
                                return b.VIRUS;
                            default:
                                return ""
                        }
                    },
                    storeVirus: function (b) {
                        var c, e, f, g, h, i;
                        if (!(h = (b.releases.master || b.releases).scan_virus)) return {};
                        switch (e = h.kingsoft, c = h.baidu, g = {
                            virus: [],
                            show: !1,
                            status: 0,
                            statusText: ""
                        }, f = A[this.locale], e && "NOT_SCANED" !== e && (i = {
                            name: f.KING_SOFT,
                            logo: d
                        }, i.status = e, i.statusText = this.virusStatus(e), i.statusText && g.virus.push(i)), c && "NOT_SCANED" !== c && (i = {
                            name: f.BAIDU,
                            logo: a
                        }, i.status = c, i.statusText = this.virusStatus(c), i.statusText && g.virus.push(i)), g.virus.length > 0 ? (g.show = !0, 1 === g.virus.length ? g.status = g.virus[0].status : g.virus[0].status === g.virus[1].status ? "SCANED" === g.virus[0].status && (g.status = "SCANED") : g.status = "RISK") : g.show = !1, g.status) {
                            case "SCANED":
                                g.text = f.SAFE, g.statusText = f.SAFE_TEXT, g.safe = !0;
                                break;
                            default:
                                g.text = f.RISK, g.statusText = f.RISK_TEXT
                        }
                        return g
                    },
                    afterStore: function () {
                        var a, b, c, d, e, f, g, h, i;
                        if (this.data.app) {
                            for (b = this.data, e = this.params, f = this.platform, b.is_mobile = f.is_mobile, b.total_screenshots = 0, !b.app.desc && b.combo_app && (b.app.desc = b.combo_app.desc), e.release_id && (b.app.master = b.app.releases), b.android && b.android.releases && (this.virus_data = this.storeVirus(b.android)), g = [b.app, b.combo_app], c = 0, d = g.length; c < d; c++)(a = g[c]) && (i = [], i = function () {
                                var b, c, d, e;
                                for (d = a.screenshots, e = [], b = 0, c = d.length; b < c; b++) h = d[b], this.config.screenshotPrefix.test(h) ? e.push(h + "?imageView2/0/w/426/h/240") : e.push(h);
                                return e
                            }.call(this), 0 === i.length && a.market_app_info && Array.prototype.push.apply(i, a.market_app_info.screenshot_urls), b.total_screenshots += Math.min(i.length, 5), a.screenshots = i.slice(0, 5));
                            return f.is_mobile && (b.platform_matching = b.app.type === f.value), b.platform = f, b.is_ios = b.app.is_ios, b.is_wechat = !f.isWechat, b.is_android = b.app.is_android, b.is_android ? (b.show_matching_tips = f.is_ios, b.download_visible = !f.is_ios) : (b.download_visible = b.platform_matching, b.show_matching_tips = !b.platform_matching && f.is_phone), b.show_app_type_icon = f.is_mobile || !this.has_combo, f.isIPadOS ? b.download_visible = !0 : void 0
                        }
                    },
                    render: function () {
                        var a, b, c, d, h;
                        return console.log("download接口请求成功"), "passwd" === this.prev_template && "passwd" === this.template_id ? ($("#required-pwd").hide(), $("#passwd-wrong").show(), void setTimeout(function () {
                            return $("#required-pwd").show(), $("#passwd-wrong").hide()
                        }, 2e3)) : (this.data.app && !this.data.error ? (a = $("#meta").html(), this.data.app.desciption = this.data.app.desc, d = Mark.up(a, this.data.app), $("head").append(d), f.removeClass("no-scroll")) : "passwd" === this.template_id && (a = $("#meta_simple").html(), d = Mark.up(a, this.data.app), $("head").append(d)), this.has_combo && f.addClass("combo"), h = $("#" + this.template_id).html() || "", d = Mark.up(h, this.data), g.html(d), c = v(e + "_domain_warn") || this.no_custom_download_domain_warn, "true" !== c && !0 !== c || (b = Mark.up($("#middle-page").html()), g.html(b)), this.virus_data.show && this.renderTooltip(), (this.platform.is_android || this.platform.is_ios) && $("main header table").height(Math.min(t, 900)), f.addClass(this.template_id), this.afterRender())
                    },
                    getTooltipOffset: function (a, b) {
                        var c;
                        return a || (a = $(".tip")), c = a.offset(), {
                            top: c.top + 25,
                            left: c.left - 20
                        }
                    },
                    renderTooltip: function () {
                        var a, b, c, d, e, f;
                        if (d = $("#virus_result").html(), e = Mark.up(d, this.virus_data), this.has_combo ? (a = $(".per-type-info .icon-android"), a.parent().append(e)) : ($("header .name").append(e), b = "en" === this.locale ? 195 : 200, $("header .name .icon-warp").css("max-width", b + "px")), !this.platform.is_mobile) return d = $(".tip"), "en" === this.locale && d.addClass("en"), f = $("#tooltip").html(), f = Mark.up(f, this.virus_data), $("body").append(f), f = $(f), c = this.getTooltipOffset(d, f), f.css("top", c.top).css("left", c.left)
                    },
                    wechat: function (a) {
                        var b, c;
                        if (b = this.data.app, c = b.icon_url, wx && b) return wx.config({
                            debug: !1,
                            appId: "wx98dbd6cc53bd9cf2",
                            timestamp: a.timestamp,
                            nonceStr: a.noncestr,
                            signature: a.signature,
                            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                        }), wx.ready(function () {
                            return wx.onMenuShareTimeline({
                                title: document.title,
                                link: "https://www.betaqr.com/" + b.short,
                                imgUrl: k(c)
                            }), wx.onMenuShareAppMessage({
                                title: document.title,
                                link: "https://www.betaqr.com/" + b.short,
                                imgUrl: k(c)
                            })
                        })
                    },
                    afterRender: function () {
                        var a, c, d, e, f;
                        return a = this.data.app, this.platform.is_mobile && a && this.getAppAD(a), this.platform.isWechat && a && "betaqr.com" === b && $.ajax({
                            url: this.config.server + "/wechat",
                            method: "get",
                            success: this.wechat.bind(this)
                        }), this.OneKeyReport(a), this.pickElement(), this.authorized ? (this.generateQrcode(), this.loadIcon(), $(".releases-section").delegate(".changelog-toggle", "click", function (a) {
                            return $(this).parent().next().toggleClass("show")
                        }), $(".releases-toggle").click(function (a) {
                            return $(this).parents(".releases-section").toggleClass("show-all"), $(this).parent().hide()
                        })) : (c = $(".app-brief .icon img"), c.error(function () {
                            return c.attr("src", l)
                        })), this.data.require_pwd && ($("#confirmPwd").click(function (a) {
                            return FIR.confirmPasswd()
                        }), this.generateQrcode()), "not_found" !== this.template_id && "not_app" !== this.template_id && "legal_forbidden" !== this.template_id && "forbidden" !== this.template_id && "not_find" !== this.template_id && "legal_forbidden_new" !== this.template_id && "legal_forbidden_download" !== this.template_id && "legal_forbidden_bt" !== this.template_id && "not_support" !== this.template_id || (setTimeout(function () {
                            return $(".main header").removeClass("fade-out")
                        }, 200), $(".visiable-moblie").removeClass("visiable-moblie")), e = $(".tip"), f = $(".tooltip"), d = this, e.on("mouseenter", function (a) {
                            var b, c;
                            return c = a.target, b = d.getTooltipOffset($(c), f), f.css("top", b.top).css("left", b.left).show()
                        }), e.on("mouseleave", function (a) {
                            return f.hide()
                        })
                    },
                    getAppAD: function (a) {
                        var b, c;
                        if (b = this.AD.label, a.is_embedded_ad ? (this.AD.type = "new_box", c = "new_box", "box" !== a.new_ad_tag && this.ga("send", "event", "adFooter", "render_new_box_error", a.short), $.ajax({
                                url: this.config.api + "/" + c + "/" + b,
                                method: "get",
                                success: this.onADSuccess.bind(this)
                            })) : a.is_embedded_caipiao ? (this.AD.type = "new_cp", c = "new_cp", "cp" !== a.new_ad_tag && this.ga("send", "event", "adFooter", "render_new_cp_error", a.short), $.ajax({
                                url: this.config.api + "/" + c + "/" + b,
                                method: "get",
                                success: this.onADSuccess.bind(this)
                            })) : a.new_ad_tag && (this.AD.type = "new_" + a.new_ad_tag, c = "new_" + a.new_ad_tag, $.ajax({
                                url: this.config.api + "/" + c + "/" + b,
                                method: "post",
                                success: this.onADSuccess.bind(this),
                                error: function (a) {
                                    return function (b) {
                                        return a.ga("send", "event", "adFooter", "render" + a.AD.type + "_" + b.status)
                                    }
                                }(this)
                            })), a.new_ad_tag) return this.AD.tag = a.new_ad_tag, $.ajax({
                            url: this.config.api + "/new_" + a.new_ad_tag + "/" + b + "/?ad_space_category=downloaded",
                            method: "post",
                            success: this.onOtherSuccess.bind(this)
                        })
                    },
                    getErrorAD: function (a) {
                        var b;
                        return this.AD.type = "Status", b = this.AD.label, $.ajax({
                            url: this.config.api + "/status/" + b + "?code=" + a,
                            method: "get",
                            success: this.onADSuccess.bind(this)
                        })
                    },
                    renderAdForErr: function (a) {
                        var b, c;
                        if (this.AD.type = "new_" + a.new_ad_tag, this.platform.is_mobile && a.new_ad_tag && (b = this.AD.label, c = "new_" + a.new_ad_tag, $.ajax({
                                url: this.config.api + "/" + c + "/" + b,
                                method: "get",
                                success: this.onADSuccess.bind(this),
                                error: function (a) {
                                    return function (b) {
                                        return a.ga("send", "event", "adFooter", "render" + a.AD.type + "_" + b.status)
                                    }
                                }(this)
                            }), a.new_ad_tag)) return $.ajax({
                            url: this.config.api + "/new_" + a.new_ad_tag + "/" + b + "/?ad_space_category=downloaded",
                            method: "get",
                            success: this.onOtherSuccess.bind(this)
                        })
                    },
                    onOtherSuccess: function (a) {
                        var b, c, d, e, f, g;
                        if (g = this.platform.isWechat ? "-wechat" : "", this.AD.adType = a.style_name, Array.isArray(a.list))
                            for (f = a.list, d = 0, e = f.length; d < e; d++) b = f[d], c = b.title, b.fileName = "" + c + g;
                        else c = o(a.content), a.fileName = "" + c + g;
                        return this.AD.otherInfo = a.list, this.AD.isAfterInstall = !0
                    },
                    onADSuccess: function (a) {
                        var b, c, d, e, f;
                        if (this.AD.info = a, f = this.platform.isWechat ? "-wechat" : "", Array.isArray(a)) {
                            for (d = 0, e = a.length; d < e; d++) b = a[d], c = b.title, b.fileName = "" + c + f;
                            if (this.AD.is_use_ga = a[0].is_use_ga, !this.data.app && !this.data.require_pwd) return this.renderOtherADWithoutApp()
                        } else if ("object" == typeof a && a.content) return "new_box" === this.AD.type && "ios" === this.AD.label && $.ajax({
                            url: "https://www.admqr.com/apic/v1/api/knifes/statis",
                            type: "post",
                            data: {
                                knife_client_key: "343f6ccde9894e6ca69b35a05319e963",
                                unique_code: "ios_box",
                                tag: "fir_ios_box_ad_footer",
                                extra: a,
                                client_ua: window.navigator.userAgent,
                                referer: this.AD.type + this.AD.label
                            }
                        }), this.AD.is_use_ga = a.is_use_ga, c = o(a.content), a.fileName = "" + c + f, this.renderHashAD(a)
                    },
                    renderHashAD: function (a) {
                        var b, c, d, f;
                        return f = $("#app_bottom_fixed").html() || "", b = Mark.up(f, a), c = new Image, a.fileName || (d = this.AD.label, a.fileName = "null", this.ga("set", "dimension1", e), this.ga("send", "pageview"), this.ga("send", "event", "adFooter", "render" + this.AD.type, a.fileName), window._hmt.push(["_trackEvent", "adFooter", "render" + this.AD.type, "" + d])), c.onload = function (c) {
                            return function () {
                                if (d = c.AD.label, c.ga("set", "dimension1", e), c.ga("send", "pageview"), c.ga("send", "event", "adFooter", "render" + c.AD.type, a.fileName), window._hmt.push(["_trackEvent", "adFooter", "render" + c.AD.type, "" + d]), a.redirect_url && "." !== a.redirect_url) return $("body").append(b)
                            }
                        }(this), c.src = a.content
                    },
                    renderInstallAD: function () {
                        var a, b, c, d, e, f, g, h;
                        if (a = this.AD.otherInfo, e = "", f = $("#after-install").html() || "", a && 0 !== a.length) return "style1" === this.AD.adType && a.length > 3 ? this.AD.isAgain ? (a = a.slice(3, a.length), this.AD.isAgain = !1, this.AD.isAgainClick = !0) : (a = a.slice(0, 3), this.AD.isAgain = !0) : "style2" === this.AD.adType ? (f = $("#after-install-zhibo").html() || "", this.data.app.desc && this.data.app.desc.length > 30 && (e = this.data.app.desc.substring(0, 30), e += "...")) : "style3" === this.AD.adType && ("more_ad" === this.data.app.web_template ? ($(".new_layout").css("display", "block"), h = $(".new_layout").offset().top, $("html,body").animate({
                            scrollTop: h
                        }, 1e3), $(".store-section, .footer, .releases-section, .screenshots-section, .desc-section, .master-section, .app_bottom_fixed").css("display", "none"), f = $("#after-install-new-layout").html() || "") : f = $("#after-install-games").html() || ""), d = a.length > 1 ? this.renderMultiADs(a) : this.renderSimpleADs(a), g = A[this.locale], c = this.platform.is_ios ? g.VIEW_IN_DESKTOP : g.VIEW_IN_BROWSER, this.platform.is_ios, setTimeout(function (a) {
                            return function () {
                                return $("#wait_result").html('<div class="info-text">' + c + "</div>")
                            }
                        }(), 1e3), b = Mark.up(f, {
                            list: d,
                            app: this.data.app,
                            installText: c,
                            msg: e
                        }), "more_ad" === this.data.app.web_template ? $(".new_layout").append(b) : $("body").append(b), "style2" === this.AD.adType && u.init({
                            anim: !0,
                            selectorName: ".samLazyImg"
                        }), this.startWaitDotInterval()
                    },
                    renderAdList: function () {
                        return this.renderInstallAD(), this.ga("send", "event", "adFooter", "clickAgain")
                    },
                    renderOtherADWithoutApp: function () {
                        var a, b, c, d;
                        if (a = this.AD.info, 0 !== a.length) return c = a.length > 1 ? this.renderMultiADs(a) : this.renderSimpleADs(a), d = $("#bottom-popularize").html() || "", b = Mark.up(d, {
                            html: c
                        }), $(".cell-container").append(b)
                    },
                    renderSimpleADs: function (a) {
                        var b, c;
                        return b = a[0], window._hmt.push(["_trackEvent", "adFooter", "renderOtherSingle", this.AD.label]), this.ga("send", "event", "adFooter", "renderOtherSingle", b.fileName), c = $("#popularize-app-detail").html() || "", Mark.up(c, {
                            app: b
                        })
                    },
                    renderMultiADs: function (a) {
                        var b, c, d, e, f, g, h, i;
                        for (i = $("#popularize-apps").html() || "", this.AD.isError && window._hmt.push(["_trackEvent", "adFooter", "render" + this.AD.type, "" + this.AD.label]), this.AD.isAgainClick || this.AD.isError || window._hmt.push(["_trackEvent", "adFooter", "render_" + this.AD.tag + "_" + this.AD.adType, this.AD.label]), c = [], e = 0, f = a.length; e < f; e++) b = a[e], c.push(o(b.title));
                        return d = c.join("-"), h = this.platform.isWechat ? "-wechat" : "", this.AD.isError && (this.ga("send", "pageview"), this.ga("send", "event", "adFooter", "render" + this.AD.type, "" + d + h)), this.AD.isAgainClick || this.AD.isError || this.ga("send", "event", "adFooter", "render_" + this.AD.tag + "_" + this.AD.adType, "" + d + h), "style2" === this.AD.adType ? i = $("#popularize-apps-zhibo").html() || "" : "style1" === this.AD.adType ? i = $("#popularize-apps").html() || "" : "style3" === this.AD.adType && (i = "more_ad" === this.data.app.web_template ? $("#popularize-apps-new-layout").html() || "" : $("#popularize-apps-games").html() || ""), g = !1, this.AD.otherInfo && this.AD.otherInfo.length > 4 && (g = !0), Mark.up(i, {
                            apps: a,
                            showChange: g
                        })
                    },
                    generateQrcode: function () {
                        var a, b, d;
                        return b = this.elems.head_qrcode[0], d = c, d += "?utm_source=fir&utm_medium=qr", !this.data.app.token || this.data.app.is_opened || this.data.app.has_passwd || (d += "&download_token=" + this.data.app.token), this.params.release_id && (d += "&release_id=" + this.params.release_id), this.params.fir_source && (d += "&fir_source=" + this.params.fir_source), this.params.fir_campaign && (d += "&fir_campaign=" + this.params.fir_campaign), E(b, {
                            text: d,
                            width: 200,
                            height: 200
                        }), console.info("QRCode url: ", d), a = $(".release-qrcode"), a.each(function (a) {
                            return function (b, c) {
                                var e, f, g;
                                return a.has_combo ? (g = $(c).parents(".type").data("app-type"), e = a.data[g]) : e = a.data.app, f = $(c).data("release"), d = location.protocol + "//" + location.host + "/" + e.short + "?release_id=" + f, d += "&utm_source=fir&utm_medium=qr", e.is_opened || e.has_passwd || (d += "&download_token=" + e.token), E(c, {
                                    text: d,
                                    bg: "#FFFFFF",
                                    width: 180,
                                    height: 180
                                })
                            }
                        }(this))
                    },
                    loadIcon: function () {
                        var a;
                        if (a = $("header .icon img"), this.data.app.icon_url !== l) return a.error(function () {
                            return a.attr("src", l)
                        })
                    },
                    pickElement: function () {
                        return this.elems.passwd_field = $("#passwdField"), this.elems.head_qrcode = $(".app-brief .qrcode")
                    },
                    confirmPasswd: function () {
                        var a;
                        return !!(a = this.elems.passwd_field.val()) && (this.params.download_passwd = a, this.query(), !1)
                    },
                    plistUrl: function (a) {
                        var b, c;
                        return this.config.server, c = this.platform.ios_6_x ? "http" : "https", b = c + "://fir.im/plists/" + a, "itms-services://?action=download-manifest&url=" + encodeURIComponent(b)
                    },
                    iosSchema: function (a) {
                        var b, c, d;
                        return d = "https:", b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), b && (c = parseInt(b[1], 10), d = c > 6 ? "https:" : "http:"), "itms-services://?action=download-manifest&url=" + encodeURIComponent(d + a)
                    },
                    getWechatOpenId: function (a) {
                        var b;
                        return b = $.Deferred(), $.ajax({
                            url: this.config.server + "/wechat/get_open_id",
                            method: "get",
                            data: {
                                code: a
                            }
                        }).done(function (a) {
                            var c;
                            return c = a.open_id, c ? (z("rio_wechat_openid", c, {
                                "max-age": 31536e6
                            }), b.resolve(c)) : b.reject()
                        }).fail(function (a) {
                            return b.reject(a)
                        }), b.promise()
                    },
                    getUUIDByWechatOpenId: function (a) {
                        var b;
                        return b = $.Deferred(), $.ajax({
                            url: this.config.server + "/users/fetch_token",
                            method: "post",
                            data: {
                                key: a,
                                category: "weixin"
                            }
                        }).done(function (a) {
                            var c;
                            return c = a.authentication_token, b.resolve(c)
                        }).fail(function (a) {
                            return i("rio_wechat_openid"), b.resolve()
                        }), b.promise()
                    },
                    getUUIDByPhone: function (a, b, c) {
                        var d;
                        return d = $.Deferred(), $.ajax({
                            url: this.config.server + "/users/fetch_token",
                            method: "post",
                            data: {
                                category: "telephone",
                                key: a,
                                verification_code: b,
                                sms_type: c
                            }
                        }).done(function (a) {
                            var b;
                            return b = a.authentication_token, d.resolve(b)
                        }).fail(function (a) {
                            return a && a.responseJSON && "code_error" === a.responseJSON.errors ? alert("验证码错误") : alert("验证失败请刷新后重试")
                        }), d.promise()
                    },
                    appendVerifyDialog: function () {
                        var a;
                        if (!this.mountVerifyDialog) return this.mountVerifyDialog = !0, this.platform.is_mobile, a = $(Mark.up($("#verify-dialog-template").html())), $("body").append(a), $(".verify-dialog .dialog-close").click(function (a) {
                            return function (b) {
                                return a.closeVerifyDialog()
                            }
                        }(this)), $(".verify-dialog .captcha-image").click(function (a) {
                            return function (b) {
                                return a.ChangeCaptchaImg(b, a.config.server)
                            }
                        }(this)), $(".verify-dialog .btn-send").click(function (a) {
                            return function (b) {
                                return a.sendPhoneCode()
                            }
                        }(this)), $(".btn-verify-submit").click(function (a) {
                            return function (b) {
                                var c, d;
                                return d = $("#verify-phone").val(), c = $("#verify-phone-code").val(), 11 !== d.length ? alert("手机号不合法") : c ? a.getUUIDByPhone(d, c, a.smsType).then(a.verifyDeferred.resolve, a.verifyDeferred.reject) : alert("请填写短信验证码")
                            }
                        }(this))
                    },
                    sendPhoneCode: function () {
                        var a, b, c, d;
                        return console.log(s.length), c = $("#verify-phone").val(), d = $("#verify-image-code").val(), 11 !== c.length ? alert("手机号不合法") : d ? (a = $(".verify-dialog .btn-send"), b = s[x++ % s.length], this.smsType = b, a.attr("disabled", "disabled").text("正在发送"), $.ajax({
                            url: this.config.server + "/tools/verification_code",
                            data: {
                                telephone: c,
                                verification_code: d,
                                rucaptcha_id: this.rucaptcha_id,
                                sms_type: b
                            },
                            error: function (b) {
                                return function (c) {
                                    var d;
                                    if (b.stopInterval(a), b.ChangeCaptchaImg({
                                            target: $(".verify-dialog .captcha-image")
                                        }, b.config.server), c && c.responseJSON) {
                                        if ("rucaptcha_wrong" === (d = c.responseJSON.errors)) return x--, alert("图形验证码错误");
                                        if ("send_sms" === d) return alert("手机号发送频繁，请稍后再试");
                                        if ("has_send" === d) return alert("已发送验证码，请稍后再试")
                                    }
                                    return alert("图形验证码发送失败")
                                }
                            }(this),
                            success: function (b) {
                                return function () {
                                    return b.setDisabledText(a), b.timer = setInterval(function () {
                                        return b.setDisabledText(a, function () {
                                            return b.clearVerifyImageCode()
                                        })
                                    }, 1e3)
                                }
                            }(this)
                        })) : alert("请填写图形验证码")
                    },
                    openVerifyDialog: function () {
                        var a;
                        return this.verifyDeferred = $.Deferred(), this.appendVerifyDialog(), $("body").addClass("hidden-overflow"), this.ChangeCaptchaImg({
                            target: $(".verify-dialog .captcha-image")
                        }, this.config.server), $("#verify-phone").val(""), $("#verify-image-code").val(""), $("#verify-phone-code").val(""), a = $(".verify-dialog"), a.height($(window).height()), this.platform.is_mobile ? (a.css({
                            left: "100%",
                            display: "block"
                        }).addClass("animate"), window.setTimeout(function () {
                            return a.css("left", "0")
                        }, 1)) : ($("#MaskLayer").show(), a.show()), this.verifyDeferred.promise().then(function (a) {
                            return function (b) {
                                return a.closeVerifyDialog(), b
                            }
                        }(this))
                    },
                    closeVerifyDialog: function () {
                        var a;
                        return this.verifyDeferred.reject({
                            close: !0
                        }), this.platform.is_mobile || $("#MaskLayer").hide(), this.platform.is_mobile ? (a = $(".verify-dialog").addClass("animate").css("left", "100%"), window.setTimeout(function () {
                            return a.hide()
                        }, 500)) : $(".verify-dialog").hide(), $("body").removeClass("hidden-overflow")
                    },
                    clearVerifyImageCode: function () {
                        return $("#verify-image-code").val(""), this.ChangeCaptchaImg({
                            target: $(".verify-dialog .captcha-image")
                        }, this.config.server)
                    },
                    getAuthenticationToken: function () {
                        var a, b, c, d;
                        return a = $.Deferred(), c = v("rio_download_authentication_token"), d = v("rio_wechat_openid"), b = function (b) {
                            return function () {
                                return b.openVerifyDialog().then(a.resolve, a.reject)
                            }
                        }(this), d && !c ? this.getUUIDByWechatOpenId(d).then(a.resolve, b) : c || !this.needAuthenticationToken ? a.resolve(c) : b(), a.promise()
                    },
                    install: function (a) {
                        var b, c, d, e;
                        if (this.platform.isUnabledInstall) return window._hmt.push(["_trackEvent", "download", "click", "wechat-install"]), d = A[this.locale], "more_ad" === this.data.app.web_template ? $(".action-animate").html("<p class='strong'>" + d.UNABLE_INSTALL + "</p>").css({
                            marginTop: "0px",
                            "background-color": "#fff",
                            color: "#32B2A7"
                        }) : $("#actions").html("<p class='strong'>" + d.UNABLE_INSTALL + "</p>").css("marginTop", "0px"), $(".release-info").hide(), $(".name").css("marginBottom", "0px"), $(".pattern").hide(), $(".wechat_tip_content").html("<div class='wechat_tip'><i class='triangle-up'></i>" + d.GO_OUT_WECHAT_TIP + "</div>"), void f.scrollTop(0);
                        e = function (a) {
                            return function () {
                                var b, c;
                                return "more_ad" === a.data.app.web_template ? (b = $(".action-animate"), "ios" === a.data.app.type && ("adhoc" !== a.data.app.master.release_type && "" !== a.data.app.master.release_type ? setTimeout(function () {
                                    return $(".action-animate").html("<a href='https://ali-static.jappstore.com/embedded.mobileprovision' class='action-animate-trust'>" + A[a.locale].TRUST_IMMEDIATELY + "</a>")
                                }, 1e4) : setTimeout(function () {
                                    return $(".action-animate").html("<div class='action-animate-trust'>下载完成</div>")
                                }, 1e4)), "android" === a.data.app.type && setTimeout(function () {
                                    return $(".action-animate").html("<div class='action-animate-trust'>下载完成</div>")
                                }, 1e4), b.css("background-color", "#A9B1B3"), $(".action-animate-text").text("正在下载"), $(".action-animate-text").removeAttr("onclick"), $(".action-animate-active").css("display", "block")) : (b = $("#actions button"), b.html("&nbsp;").css({
                                    "min-width": "43px",
                                    width: "43px",
                                    padding: "12px 0",
                                    "border-top-color": "transparent",
                                    "border-left-color": "transparent"
                                }).prop("disabled", !0), c = a.data.app.system_prefer_storage_name, setTimeout(function () {
                                    return "tencent" === c ? b.addClass("loading_ten") : b.addClass("loading")
                                }, 200), "ios" === a.data.app.type ? "adhoc" !== a.data.app.master.release_type && "" !== a.data.app.master.release_type ? setTimeout(function () {
                                    return $("#actions").html("<div><p>" + A[a.locale].VIEW_IN_DESKTOP + "</p><p><a href='https://ali-static.jappstore.com/embedded.mobileprovision' class='trust'>" + A[a.locale].TRUST_IMMEDIATELY + "</a></p></div>")
                                }, 5e3) : setTimeout(function () {
                                    return $("#actions").html("<p>" + A[a.locale].VIEW_IN_DESKTOP + "</p>")
                                }, 5e3) : void 0)
                            }
                        }(this), c = function (b) {
                            return function (c, d) {
                                var e, f;
                                if (window._hmt.push(["_trackEvent", "download", "click", "install"]), f = b.getInstallUrl(a, c, d), window.location = f, (e = b.AD.otherInfo) && 0 !== e.length) return setTimeout(function () {
                                    if (b.AD.isAfterInstall) return b.AD.type = "OtherNew", b.renderInstallAD()
                                }, 1e3)
                            }
                        }(this), b = function (b) {
                            return function (d) {
                                var f;
                                return a || e(), d && z("rio_download_authentication_token", d, {
                                    "max-age": 31536e6
                                }), f = new Date, b.data.app.download_token_can_expired && f.getTime() - b.appTokenTime.getTime() > b.config.downloadTokenExpireTime ? b.getDownloadToken(function (a) {
                                    return c(a, d)
                                }) : c(b.data.app.token, d)
                            }
                        }(this), this.getAuthenticationToken().then(b)
                    },
                    getInstallUrl: function (a, b, c) {
                        var d, e;
                        return d = this.config.server + "/apps/" + this.data.app.id + "/install?short=" + this.data.app.short + "&download_token=" + b, e = q(), e && e.prefer_storage_name ? d += "&prefer_storage_name=" + e.prefer_storage_name : e && "2" === e.d && (d += "&prefer_storage_name=baidu"), b = b || this.data.app.token, a = a || this.params.release_id || this.data.app.master.id, c && (d += "&authentication_token=" + c), a && (d += "&release_id=" + a), this.params.fir_campaign && (d += "&fir_campaign=" + this.params.fir_campaign), this.params.fir_source && (d += "&fir_source=" + this.params.fir_source), r() && (d += "&protocol=http"), "ios" === this.data.app.type && (d = this.iosSchema(d)), d
                    },
                    showMenu: function (a) {
                        return a.stopPropagation(), $(".dropdown-menu").show(), $(".report_select").addClass("dropup")
                    },
                    SelectClick: function (a) {
                        return a.stopPropagation(), $(".report_select").find("span").html($(a.target).text().trim()), $(".dropdown-menu").hide(), $(".report_select").removeClass("dropup")
                    },
                    stopInterval: function (a) {
                        return clearInterval(this.timer), $(a).text("发送短信").removeAttr("disabled", "disabled"), this.intervalNumber = 60
                    },
                    setDisabledText: function (a, b) {
                        var c, d;
                        if (d = this.intervalNumber, c = $(a), c.attr("disabled", "disabled").text("再次发送 (" + d + "s)"), this.intervalNumber = this.intervalNumber - 1, this.intervalNumber < 0) return this.stopInterval(c), b && b()
                    },
                    startInterval: function (a) {
                        var b, c, d, e;
                        if (c = $("#report-captcha").val().trim(), d = $("#report-phone").val().trim(), b = $(".btn-phone"), !$(".report_phone").hasClass("wait")) return "" === c ? this.setError("请填写图形验证码") : "" === d || 11 !== d.length ? this.setError("手机号不合法") : (e = "//fir-api.fircli.cn/apps/" + a.id + "/verification_code?_rucaptcha=" + c + "&rucaptcha_id=" + this.rucaptcha_id + "&telephone=" + d, $.ajax({
                            url: e,
                            error: function (a) {
                                var b;
                                return b = "", a && a.response && (b = JSON.parse(a.response).errors) && b.exception && b.exception[0] && "rucaptcha_wrong" === b.exception[0] ? _self.setError("图形验证码错误") : alert("发送验证码失败")
                            },
                            success: function (a) {
                                return function () {
                                    return a.setDisabledText(b), a.timer = setInterval(function () {
                                        return a.setDisabledText(b)
                                    }, 1e3)
                                }
                            }(this)
                        }))
                    },
                    setError: function (a) {
                        return $("#report-error").text(a)
                    },
                    ShowReportFiles: function () {
                        var a;
                        return a = "", this.report_files.forEach(function (b) {
                            return a += "<div><img src='/images/" + b.type.split("/")[1] + ".png'></img><span title='" + b.name + "'>" + b.name + "</span></div>"
                        }), $(".files_item").html(a)
                    },
                    ShowMainDom: function () {
                        return z(e + "_domain_warn", "false", {
                            "max-age": 432e5
                        }), this.render()
                    },
                    ReportFileChange: function (a) {
                        var b, c;
                        return b = a.target.files[0], c = b.type, c.indexOf("jpg") > -1 || c.indexOf("jpeg") > -1 || c.indexOf("png") > -1 || c.indexOf("zip") > -1 || c.indexOf("pdf") > -1 || c.indexOf("msword") > -1 ? (console.log(), b.size > 2097152 ? ($("#report_file").val(""), this.setError("文件大小不能超过2M")) : this.report_files.length > 2 ? this.setError("最多上传三个文件") : (this.report_files.push(b), this.ShowReportFiles())) : this.setError("不支持的文件类型")
                    },
                    ChangeCaptchaImg: function (a, b) {
                        var c, d, e;
                        return this.rucaptcha_id = j(), c = $(a.target), d = c.is("img") ? c : c.find("image"), e = d.parent(), e.addClass("loading"), d.attr("src", b + "/rucaptcha?rucaptcha_id=" + this.rucaptcha_id)
                    },
                    loadedCaptcha: function (a) {
                        return $(a).parent().removeClass("loading")
                    },
                    OneKeyReport: function (a) {
                        var b, c, d, e;
                        if (a && (b = $("body").find("div.main > div.footer > a.one-key-report"), !(b.length < 1))) return this.platform.is_mobile, d = this, e = "//fir-api.fircli.cn/apps/" + a.id + "/report_email", c = $(Mark.up($("#report-template").html())), $("body").append(c), $(".report_select").on("click", function (a) {
                            return d.showMenu(a)
                        }), $(".one-key-report-dialog .captcha-image").click(function (a) {
                            return function (b) {
                                return a.ChangeCaptchaImg(b, a.config.api)
                            }
                        }(this)), $(".btn-phone").click(function () {
                            return d.startInterval(a)
                        }), $(".report_select").find("li").on("click", function (a) {
                            return d.SelectClick(a)
                        }), $(".report_upload").click(function () {
                            return $("#report_file").click()
                        }), $("#report_file").on("change", function (a) {
                            return d.ReportFileChange(a)
                        }), $(window).on("click", function () {
                            return $(".dropdown-menu").hide(), $(".report_select").removeClass("dropup")
                        }), c.find("div.dialog-close").click(function () {
                            return d.hideDialog()
                        }), c.find("div.dialog-action>a.btn-report").click(function () {
                            var a, b, c, f, g, h, i, j;
                            return j = /\d/, b = $(".report_select").find("span").text(), a = $("#report-content"), h = $("#report-name").val(), $("#report-id-card").val(), i = $("#report-phone").val(), c = $("#report-captcha").val(), f = $("#report-code").val(), "" === b.trim() || "请选择举报原因" === b.trim() ? d.setError("请选择举报类型") : "" === a.val().trim() ? (a.focus(), d.setError("请填写举报内容")) : "" === h || j.test(h) ? ($("#report-name").focus(), d.setError("名字不合法")) : "" !== i && /^1[3|4|5|8][0-9]\d{4,8}$/.test(i) ? "" === c ? ($("#report-captcha").focus(), d.setError("请填写验证码")) : "" === f ? ($("#report-code").focus(), d.setError("请填写手机验证码")) : (g = new FormData, g.append("tag", b), g.append("content", "" + a.val().trim()), g.append("real_name", h), d.report_files.length && d.report_files.forEach(function (a) {
                                return g.append("files[]", a)
                            }), g.append("verification_code", f), g.append("_rucaptcha", c), g.append("telephone", i), $.ajax({
                                url: e,
                                type: "post",
                                dataType: "json",
                                contentType: !1,
                                processData: !1,
                                data: g,
                                beforeSend: function () {
                                    return $("#report-sending").show()
                                },
                                success: function (a) {
                                    return $("div.report-form").hide(), $("div.report-feedback").show()
                                },
                                error: function (a) {
                                    var b;
                                    if (b = "", a && a.response) try {
                                        switch (b = JSON.parse(a.response).errors, b.exception[0]) {
                                            case "code_error":
                                                d.setError("手机验证码错误");
                                                break;
                                            case "rucaptcha_wrong":
                                                d.setError("图形验证码错误");
                                                break;
                                            case "id_card":
                                                d.setError("身份证错误");
                                                break;
                                            case "real_name":
                                                d.setError("姓名错误");
                                                break;
                                            default:
                                                alert("举报错误，请稍后重试")
                                        }
                                        return
                                    } catch (c) {
                                        c
                                    }
                                    return alert("举报错误，请稍后重试")
                                },
                                complete: function () {
                                    return $("#report-sending").hide()
                                }
                            })) : ($("#report-phone").focus(), d.setError("手机号不合法"))
                        }), c.find("div.custom-checkbox").click(function () {
                            return $(this).addClass("active").siblings().removeClass("active")
                        }), b.click(function () {
                            return d.showReport()
                        })
                    },
                    showReport: function () {
                        var a;
                        return $("body").addClass("hidden-overflow"), this.resetReport(), this.ChangeCaptchaImg({
                            target: $(".one-key-report-dialog .captcha-image")
                        }, this.config.api), this.platform.is_mobile || $("#MaskLayer").show(), this.platform.is_mobile ? (a = $("#reportDialog").css({
                            left: "100%",
                            display: "block"
                        }).addClass("animate"), window.setTimeout(function () {
                            return a.css("left", "0")
                        }, 1)) : $("#reportDialog").show()
                    },
                    showIosInhouseTip: function () {
                        var a;
                        return $("body").addClass("hidden-overflow"), a = $("#ios-inhouse-tip").html(), $("body").append(a), $("#iosInhouseTip").show()
                    },
                    hideDialog: function () {
                        var a;
                        return this.platform.is_mobile || $("#MaskLayer").hide(), this.platform.is_mobile ? (a = $("#reportDialog").addClass("animate").css("left", "100%"), window.setTimeout(function () {
                            return a.hide()
                        }, 500)) : $("#reportDialog").hide(), $("body").removeClass("hidden-overflow")
                    },
                    hideIosInhouseTip: function () {
                        return $("#iosInhouseTip").hide(), $("body").removeClass("hidden-overflow")
                    },
                    resetReport: function () {
                        return $("#report-email").val(""), $("#report-type").find("div.custom-checkbox").removeClass("active"), $("#report-content").val(""), $("#report-error").find("div").hide(), $("#report-form").show(), $("#report-feedback").hide()
                    },
                    startWaitDotInterval: function () {
                        var a, b, c, d, e;
                        return a = $(".waiting-dot"), d = 0, b = ".", e = void 0, c = function () {
                            var f, g, h;
                            for (d = (d + 1) % 5, f = [], g = 0; g < d;) f.push(b), g++;
                            return h = f.join(""), a.text(h), e = setTimeout(c, 500)
                        }, a.length && c(), e
                    },
                    clickFooterAd: function () {
                        var a, b;
                        if (a = this.AD.info) return b = "download" + this.AD.type, this.clickAnalyse(a.redirect_url, a.content, this.AD.type, a.ad_unique_name), this.ga("send", "event", "adFooter", b, a.fileName), window._hmt.push(["_trackEvent", "adFooter", b, this.AD.label])
                    },
                    startRedirectInterval: function () {
                        var a, b;
                        return this.isShow = !1, a = this, b = setInterval(function () {
                            if ($("#countdown").html(--a.wait_time), 0 === a.wait_time) return clearInterval(b), a.isShow = !0, a.template_id = "app", a.onSuccess(a.resp), a.render(), $("body").removeClass("legal_forbidden_new")
                        }, 1e3)
                    },
                    clickAnalyse: function (a, b, c, d, e, f, g, h) {
                        var i;
                        return null == a && (a = ""), null == b && (b = ""), i = {
                            url: a,
                            img: b,
                            ad_unique_name: d,
                            name: h
                        }, f && (i.category = "downloaded"), (e || 0 === e) && (i.index = e + 1), g && (i.style = g), $.ajax({
                            url: this.config.server + "/click_" + c + "/" + this.AD.label,
                            type: "post",
                            data: i
                        })
                    },
                    clickPopularize: function (a) {
                        var b, c, d;
                        return c = "download" + this.AD.type, d = "", "OtherNew" === this.AD.type ? (this.AD.isAgainClick && (a += 3), b = this.AD.otherInfo[a], d = b.ad_unique_name, c = "download_" + this.AD.tag + "_" + this.AD.adType) : b = this.AD.info[a], this.clickAnalyse(b.install_url, b.icon, "new_" + this.AD.tag, d, a, c, this.AD.adType, b.title), window._hmt.push(["_trackEvent", "adFooter", c, this.AD.label]), this.ga("send", "event", "adFooter", c, b.fileName)
                    },
                    closeAfterLayer: function () {
                        return $(".after-install-close").remove(), $(".after-install-fixed").remove()
                    },
                    getMobileProvision: function () {
                        return $.ajax({
                            url: "/embedded.mobileprovision",
                            method: "get"
                        })
                    },
                    exChangeAds: function () {
                        var a, b;
                        return b = this.AD, a = this, $.ajax({
                            url: this.config.api + "/new_" + b.tag + "/" + b.label + "/?ad_space_category=downloaded&downloaded_page=" + C,
                            method: "get",
                            success: function (b) {
                                var c, d, e;
                                return C < 4 ? C += 1 : C = 0, e = $("#after-install-new-layout").html() || "", d = a.renderMultiADs(b.list), c = Mark.up(e, {
                                    list: d
                                }), $(".new_layout").html(c)
                            }
                        })
                    }
                }, $(".btn-xxx").click(function () {
                    return FIR.openVerifyDialog()
                }), H = function (a, b) {
                    var c;
                    return c = a.replace(new RegExp("[?&]" + b + "=[^&]*"), ""), c && "?" !== c[0] ? c = "?" + c : "?" === c && (c = ""), c
                }, G = function (a, b, c) {
                    var d;
                    return d = location.search, d = H(d, "code"), d = H(d, "state"), d = d ? d + "&openId=" + c : "?openId=" + c, w(null, document.title, "/" + e + d)
                }, D = function () {
                    var a, b;
                    if (FIR.platform.isWechat) {
                        if (!FIR.params.openId && (a = v("rio_wechat_openid"))) return G(null, document.title, a)
                    } else if (FIR.params.openId) return z("rio_wechat_openid", FIR.params.openId, {
                        "max-age": 31536e6
                    }), b = location.search, b = H(b, "openId"), w(null, document.title, "/" + e + b, !0)
                }, F = function (a) {
                    return FIR.getWechatOpenId(a).then(function (a) {
                        return G(null, document.title, a)
                    })
                }, b.indexOf("betaqr.com") > -1 && (window.location.href = "https://zeroqr.com/no_betaqr_direct_url"), FIR.init(), "betaqr.com" === b && D(), FIR.params.code && FIR.platform.isWechat ? F(FIR.params.code).then(function () {
                    return FIR.query()
                }, function () {
                    return FIR.query()
                }) : FIR.query()
            })
    }.call(this);