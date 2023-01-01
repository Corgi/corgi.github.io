/*
 * fitty v2.2.5 - Snugly resizes text to fit its parent container
 * Copyright (c) 2017 Rik Schennink <hello@rikschennink.nl> (http://rikschennink.nl/)
 */
!(function (e, t) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], t);
    else if ("undefined" != typeof exports) t(module, exports);
    else {
        var n = { exports: {} };
        t(n, n.exports), (e.fitty = n.exports);
    }
})(this, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            }
            return e;
        };
    (t.default = (function (e) {
        function t(e, t) {
            var i = n({}, F, t),
                r = e.map(function (e) {
                    var t = n({}, i, { element: e });
                    return S(t), T(t), { element: e, fit: b(t, o.DIRTY), unsubscribe: w(t) };
                });
            return l(), r;
        }
        function i(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return "string" == typeof e ? t(r(document.querySelectorAll(e)), n) : t([e], n)[0];
        }
        if (e) {
            var r = function (e) {
                    return [].slice.call(e);
                },
                o = { IDLE: 0, DIRTY_CONTENT: 1, DIRTY_LAYOUT: 2, DIRTY: 3 },
                u = [],
                a = null,
                l =
                    "requestAnimationFrame" in e
                        ? function () {
                              e.cancelAnimationFrame(a),
                                  (a = e.requestAnimationFrame(function () {
                                      s(
                                          u.filter(function (e) {
                                              return e.dirty;
                                          })
                                      );
                                  }));
                          }
                        : function () {},
                c = function (e) {
                    return function () {
                        u.forEach(function (t) {
                            t.dirty = e;
                        }),
                            l();
                    };
                },
                s = function (e) {
                    e
                        .filter(function (e) {
                            return !e.styleComputed;
                        })
                        .forEach(function (e) {
                            e.styleComputed = p(e);
                        }),
                        e.filter(m).forEach(y),
                        e.filter(d).forEach(f),
                        e.forEach(v),
                        e.forEach(h);
                },
                f = function (e) { //This section edited to define a max height. Courtesy https://github.com/rikschennink/fitty/issues/9#issuecomment-680705761
                    (e.availableWidth = e.element.parentNode.clientWidth),
                        (e.currentWidth = e.element.scrollWidth),
                        (e.availableHeight = e.element.parentNode.clientHeight),
                        (e.currentHeight = e.element.scrollHeight),
                        (e.previousFontSize = e.currentFontSize),
                        (e.currentFontSize = Math.min(Math.min(Math.max(e.minSize, (e.availableWidth / e.currentWidth) * e.previousFontSize), e.maxSize), Math.min(Math.max(e.minSize, (e.availableHeight / e.currentHeight) * e.previousFontSize), e.maxSize))),
                        (e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap");
                },
                d = function (e) {
                    return e.dirty !== o.DIRTY_LAYOUT || (e.dirty === o.DIRTY_LAYOUT && e.element.parentNode.clientWidth !== e.availableWidth);
                },
                p = function (t) {
                    var n = e.getComputedStyle(t.element, null);
                    (t.currentFontSize = parseInt(n.getPropertyValue("font-size"), 10)), (t.display = n.getPropertyValue("display")), (t.whiteSpace = n.getPropertyValue("white-space"));
                },
                m = function (e) {
                    var t = !1;
                    return /inline-/.test(e.display) || ((t = !0), (e.display = "inline-block")), "nowrap" !== e.whiteSpace && ((t = !0), (e.whiteSpace = "nowrap")), t;
                },
                v = function (e) {
                    y(e), (e.dirty = o.IDLE);
                },
                y = function (e) {
                    e.originalStyle || (e.originalStyle = e.element.getAttribute("style") || ""),
                        (e.element.style.cssText = e.originalStyle + ";white-space:" + e.whiteSpace + ";display:" + e.display + ";font-size:" + e.currentFontSize + "px");
                },
                h = function (e) {
                    e.element.dispatchEvent(new CustomEvent("fit", { detail: { oldValue: e.previousFontSize, newValue: e.currentFontSize, scaleFactor: e.currentFontSize / e.previousFontSize } }));
                },
                b = function (e, t) {
                    return function () {
                        (e.dirty = t), l();
                    };
                },
                S = function (e) {
                    (e.newbie = !0), (e.dirty = !0), u.push(e);
                },
                w = function (e) {
                    return function () {
                        (u = u.filter(function (t) {
                            return t.element !== e.element;
                        })),
                            e.observeMutations && e.observer.disconnect(),
                            (e.element.style.cssText = e.originalStyle);
                    };
                },
                T = function (e) {
                    e.observeMutations && ((e.observer = new MutationObserver(b(e, o.DIRTY_CONTENT))), e.observer.observe(e.element, e.observeMutations));
                },
                z = { subtree: !0, childList: !0, characterData: !0 },
                F = { minSize: 16, maxSize: 512, multiLine: !0, observeMutations: "MutationObserver" in e && z },
                g = null,
                D = function () {
                    e.clearTimeout(g), (g = e.setTimeout(c(o.DIRTY_LAYOUT), i.observeWindowDelay));
                },
                E = ["resize", "orientationchange"];
            return (
                Object.defineProperty(i, "observeWindow", {
                    set: function (t) {
                        var n = (t ? "add" : "remove") + "EventListener";
                        E.forEach(function (t) {
                            e[n](t, D);
                        });
                    },
                }),
                (i.observeWindow = !0),
                (i.observeWindowDelay = 100),
                (i.fitAll = c(o.DIRTY)),
                i
            );
        }
    })("undefined" == typeof window ? null : window)),
        (e.exports = t.default);
});
