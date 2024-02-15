! function () {
   "use strict";
   var e = "top",
      t = "bottom",
      i = "right",
      n = "left",
      s = "auto",
      r = [e, t, i, n],
      o = "start",
      a = "end",
      l = "clippingParents",
      c = "viewport",
      u = "popper",
      h = "reference",
      d = r.reduce((function (e, t) {
         return e.concat([t + "-" + o, t + "-" + a])
      }), []),
      p = [].concat(r, [s]).reduce((function (e, t) {
         return e.concat([t, t + "-" + o, t + "-" + a])
      }), []),
      f = "beforeRead",
      m = "read",
      g = "afterRead",
      b = "beforeMain",
      y = "main",
      v = "afterMain",
      _ = "beforeWrite",
      w = "write",
      T = "afterWrite",
      k = [f, m, g, b, y, v, _, w, T];

   function E(e) {
      return e ? (e.nodeName || "").toLowerCase() : null
   }

   function x(e) {
      if (null == e) return window;
      if ("[object Window]" !== e.toString()) {
         var t = e.ownerDocument;
         return t && t.defaultView || window
      }
      return e
   }

   function A(e) {
      return e instanceof x(e).Element || e instanceof Element
   }

   function C(e) {
      return e instanceof x(e).HTMLElement || e instanceof HTMLElement
   }

   function S(e) {
      return "undefined" != typeof ShadowRoot && (e instanceof x(e).ShadowRoot || e instanceof ShadowRoot)
   }
   var O = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function (e) {
         var t = e.state;
         Object.keys(t.elements).forEach((function (e) {
            var i = t.styles[e] || {},
               n = t.attributes[e] || {},
               s = t.elements[e];
            C(s) && E(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function (e) {
               var t = n[e];
               !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t)
            })))
         }))
      },
      effect: function (e) {
         var t = e.state,
            i = {
               popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0"
               },
               arrow: {
                  position: "absolute"
               },
               reference: {}
            };
         return Object.assign(t.elements.popper.style, i.popper), t.styles = i, t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
            function () {
               Object.keys(t.elements).forEach((function (e) {
                  var n = t.elements[e],
                     s = t.attributes[e] || {},
                     r = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]).reduce((function (e, t) {
                        return e[t] = "", e
                     }), {});
                  C(n) && E(n) && (Object.assign(n.style, r), Object.keys(s).forEach((function (e) {
                     n.removeAttribute(e)
                  })))
               }))
            }
      },
      requires: ["computeStyles"]
   };

   function P(e) {
      return e.split("-")[0]
   }
   var M = Math.max,
      L = Math.min,
      N = Math.round;

   function I(e, t) {
      void 0 === t && (t = !1);
      var i = e.getBoundingClientRect(),
         n = 1,
         s = 1;
      if (C(e) && t) {
         var r = e.offsetHeight,
            o = e.offsetWidth;
         o > 0 && (n = N(i.width) / o || 1), r > 0 && (s = N(i.height) / r || 1)
      }
      return {
         width: i.width / n,
         height: i.height / s,
         top: i.top / s,
         right: i.right / n,
         bottom: i.bottom / s,
         left: i.left / n,
         x: i.left / n,
         y: i.top / s
      }
   }

   function D(e) {
      var t = I(e),
         i = e.offsetWidth,
         n = e.offsetHeight;
      return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
         x: e.offsetLeft,
         y: e.offsetTop,
         width: i,
         height: n
      }
   }

   function R(e, t) {
      var i = t.getRootNode && t.getRootNode();
      if (e.contains(t)) return !0;
      if (i && S(i)) {
         var n = t;
         do {
            if (n && e.isSameNode(n)) return !0;
            n = n.parentNode || n.host
         } while (n)
      }
      return !1
   }

   function B(e) {
      return x(e).getComputedStyle(e)
   }

   function j(e) {
      return ["table", "td", "th"].indexOf(E(e)) >= 0
   }

   function F(e) {
      return ((A(e) ? e.ownerDocument : e.document) || window.document).documentElement
   }

   function H(e) {
      return "html" === E(e) ? e : e.assignedSlot || e.parentNode || (S(e) ? e.host : null) || F(e)
   }

   function z(e) {
      return C(e) && "fixed" !== B(e).position ? e.offsetParent : null
   }

   function V(e) {
      for (var t = x(e), i = z(e); i && j(i) && "static" === B(i).position;) i = z(i);
      return i && ("html" === E(i) || "body" === E(i) && "static" === B(i).position) ? t : i || function (e) {
         var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
         if (-1 !== navigator.userAgent.indexOf("Trident") && C(e) && "fixed" === B(e).position) return null;
         for (var i = H(e); C(i) && ["html", "body"].indexOf(E(i)) < 0;) {
            var n = B(i);
            if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || t && "filter" === n.willChange || t && n.filter && "none" !== n.filter) return i;
            i = i.parentNode
         }
         return null
      }(e) || t
   }

   function q(e) {
      return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
   }

   function W(e, t, i) {
      return M(e, L(t, i))
   }

   function U(e) {
      return Object.assign({}, {
         top: 0,
         right: 0,
         bottom: 0,
         left: 0
      }, e)
   }

   function Y(e, t) {
      return t.reduce((function (t, i) {
         return t[i] = e, t
      }), {})
   }
   var X = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (s) {
         var o, a = s.state,
            l = s.name,
            c = s.options,
            u = a.elements.arrow,
            h = a.modifiersData.popperOffsets,
            d = P(a.placement),
            p = q(d),
            f = [n, i].indexOf(d) >= 0 ? "height" : "width";
         if (u && h) {
            var m = function (e, t) {
                  return U("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                     placement: t.placement
                  })) : e) ? e : Y(e, r))
               }(c.padding, a),
               g = D(u),
               b = "y" === p ? e : n,
               y = "y" === p ? t : i,
               v = a.rects.reference[f] + a.rects.reference[p] - h[p] - a.rects.popper[f],
               _ = h[p] - a.rects.reference[p],
               w = V(u),
               T = w ? "y" === p ? w.clientHeight || 0 : w.clientWidth || 0 : 0,
               k = v / 2 - _ / 2,
               E = m[b],
               x = T - g[f] - m[y],
               A = T / 2 - g[f] / 2 + k,
               C = W(E, A, x),
               S = p;
            a.modifiersData[l] = ((o = {})[S] = C, o.centerOffset = C - A, o)
         }
      },
      effect: function (e) {
         var t = e.state,
            i = e.options.element,
            n = void 0 === i ? "[data-popper-arrow]" : i;
         null != n && ("string" != typeof n || (n = t.elements.popper.querySelector(n))) && R(t.elements.popper, n) && (t.elements.arrow = n)
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
   };

   function K(e) {
      return e.split("-")[1]
   }
   var Q = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
   };

   function G(s) {
      var r, o = s.popper,
         l = s.popperRect,
         c = s.placement,
         u = s.variation,
         h = s.offsets,
         d = s.position,
         p = s.gpuAcceleration,
         f = s.adaptive,
         m = s.roundOffsets,
         g = s.isFixed,
         b = h.x,
         y = void 0 === b ? 0 : b,
         v = h.y,
         _ = void 0 === v ? 0 : v,
         w = "function" == typeof m ? m({
            x: y,
            y: _
         }) : {
            x: y,
            y: _
         };
      y = w.x, _ = w.y;
      var T = h.hasOwnProperty("x"),
         k = h.hasOwnProperty("y"),
         E = n,
         A = e,
         C = window;
      if (f) {
         var S = V(o),
            O = "clientHeight",
            P = "clientWidth";
         if (S === x(o) && "static" !== B(S = F(o)).position && "absolute" === d && (O = "scrollHeight", P = "scrollWidth"), S = S, c === e || (c === n || c === i) && u === a) A = t, _ -= (g && C.visualViewport ? C.visualViewport.height : S[O]) - l.height, _ *= p ? 1 : -1;
         if (c === n || (c === e || c === t) && u === a) E = i, y -= (g && C.visualViewport ? C.visualViewport.width : S[P]) - l.width, y *= p ? 1 : -1
      }
      var M, L = Object.assign({
            position: d
         }, f && Q),
         I = !0 === m ? function (e) {
            var t = e.x,
               i = e.y,
               n = window.devicePixelRatio || 1;
            return {
               x: N(t * n) / n || 0,
               y: N(i * n) / n || 0
            }
         }({
            x: y,
            y: _
         }) : {
            x: y,
            y: _
         };
      return y = I.x, _ = I.y, p ? Object.assign({}, L, ((M = {})[A] = k ? "0" : "", M[E] = T ? "0" : "", M.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + _ + "px)" : "translate3d(" + y + "px, " + _ + "px, 0)", M)) : Object.assign({}, L, ((r = {})[A] = k ? _ + "px" : "", r[E] = T ? y + "px" : "", r.transform = "", r))
   }
   var J = {
         name: "computeStyles",
         enabled: !0,
         phase: "beforeWrite",
         fn: function (e) {
            var t = e.state,
               i = e.options,
               n = i.gpuAcceleration,
               s = void 0 === n || n,
               r = i.adaptive,
               o = void 0 === r || r,
               a = i.roundOffsets,
               l = void 0 === a || a,
               c = {
                  placement: P(t.placement),
                  variation: K(t.placement),
                  popper: t.elements.popper,
                  popperRect: t.rects.popper,
                  gpuAcceleration: s,
                  isFixed: "fixed" === t.options.strategy
               };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, G(Object.assign({}, c, {
               offsets: t.modifiersData.popperOffsets,
               position: t.options.strategy,
               adaptive: o,
               roundOffsets: l
            })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, G(Object.assign({}, c, {
               offsets: t.modifiersData.arrow,
               position: "absolute",
               adaptive: !1,
               roundOffsets: l
            })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
               "data-popper-placement": t.placement
            })
         },
         data: {}
      },
      Z = {
         passive: !0
      };
   var ee = {
         name: "eventListeners",
         enabled: !0,
         phase: "write",
         fn: function () {},
         effect: function (e) {
            var t = e.state,
               i = e.instance,
               n = e.options,
               s = n.scroll,
               r = void 0 === s || s,
               o = n.resize,
               a = void 0 === o || o,
               l = x(t.elements.popper),
               c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return r && c.forEach((function (e) {
                  e.addEventListener("scroll", i.update, Z)
               })), a && l.addEventListener("resize", i.update, Z),
               function () {
                  r && c.forEach((function (e) {
                     e.removeEventListener("scroll", i.update, Z)
                  })), a && l.removeEventListener("resize", i.update, Z)
               }
         },
         data: {}
      },
      te = {
         left: "right",
         right: "left",
         bottom: "top",
         top: "bottom"
      };

   function ie(e) {
      return e.replace(/left|right|bottom|top/g, (function (e) {
         return te[e]
      }))
   }
   var ne = {
      start: "end",
      end: "start"
   };

   function se(e) {
      return e.replace(/start|end/g, (function (e) {
         return ne[e]
      }))
   }

   function re(e) {
      var t = x(e);
      return {
         scrollLeft: t.pageXOffset,
         scrollTop: t.pageYOffset
      }
   }

   function oe(e) {
      return I(F(e)).left + re(e).scrollLeft
   }

   function ae(e) {
      var t = B(e),
         i = t.overflow,
         n = t.overflowX,
         s = t.overflowY;
      return /auto|scroll|overlay|hidden/.test(i + s + n)
   }

   function le(e) {
      return ["html", "body", "#document"].indexOf(E(e)) >= 0 ? e.ownerDocument.body : C(e) && ae(e) ? e : le(H(e))
   }

   function ce(e, t) {
      var i;
      void 0 === t && (t = []);
      var n = le(e),
         s = n === (null == (i = e.ownerDocument) ? void 0 : i.body),
         r = x(n),
         o = s ? [r].concat(r.visualViewport || [], ae(n) ? n : []) : n,
         a = t.concat(o);
      return s ? a : a.concat(ce(H(o)))
   }

   function ue(e) {
      return Object.assign({}, e, {
         left: e.x,
         top: e.y,
         right: e.x + e.width,
         bottom: e.y + e.height
      })
   }

   function he(e, t) {
      return t === c ? ue(function (e) {
         var t = x(e),
            i = F(e),
            n = t.visualViewport,
            s = i.clientWidth,
            r = i.clientHeight,
            o = 0,
            a = 0;
         return n && (s = n.width, r = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (o = n.offsetLeft, a = n.offsetTop)), {
            width: s,
            height: r,
            x: o + oe(e),
            y: a
         }
      }(e)) : A(t) ? function (e) {
         var t = I(e);
         return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t
      }(t) : ue(function (e) {
         var t, i = F(e),
            n = re(e),
            s = null == (t = e.ownerDocument) ? void 0 : t.body,
            r = M(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
            o = M(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
            a = -n.scrollLeft + oe(e),
            l = -n.scrollTop;
         return "rtl" === B(s || i).direction && (a += M(i.clientWidth, s ? s.clientWidth : 0) - r), {
            width: r,
            height: o,
            x: a,
            y: l
         }
      }(F(e)))
   }

   function de(e, t, i) {
      var n = "clippingParents" === t ? function (e) {
            var t = ce(H(e)),
               i = ["absolute", "fixed"].indexOf(B(e).position) >= 0 && C(e) ? V(e) : e;
            return A(i) ? t.filter((function (e) {
               return A(e) && R(e, i) && "body" !== E(e)
            })) : []
         }(e) : [].concat(t),
         s = [].concat(n, [i]),
         r = s[0],
         o = s.reduce((function (t, i) {
            var n = he(e, i);
            return t.top = M(n.top, t.top), t.right = L(n.right, t.right), t.bottom = L(n.bottom, t.bottom), t.left = M(n.left, t.left), t
         }), he(e, r));
      return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o
   }

   function pe(s) {
      var r, l = s.reference,
         c = s.element,
         u = s.placement,
         h = u ? P(u) : null,
         d = u ? K(u) : null,
         p = l.x + l.width / 2 - c.width / 2,
         f = l.y + l.height / 2 - c.height / 2;
      switch (h) {
         case e:
            r = {
               x: p,
               y: l.y - c.height
            };
            break;
         case t:
            r = {
               x: p,
               y: l.y + l.height
            };
            break;
         case i:
            r = {
               x: l.x + l.width,
               y: f
            };
            break;
         case n:
            r = {
               x: l.x - c.width,
               y: f
            };
            break;
         default:
            r = {
               x: l.x,
               y: l.y
            }
      }
      var m = h ? q(h) : null;
      if (null != m) {
         var g = "y" === m ? "height" : "width";
         switch (d) {
            case o:
               r[m] = r[m] - (l[g] / 2 - c[g] / 2);
               break;
            case a:
               r[m] = r[m] + (l[g] / 2 - c[g] / 2)
         }
      }
      return r
   }

   function fe(n, s) {
      void 0 === s && (s = {});
      var o = s,
         a = o.placement,
         d = void 0 === a ? n.placement : a,
         p = o.boundary,
         f = void 0 === p ? l : p,
         m = o.rootBoundary,
         g = void 0 === m ? c : m,
         b = o.elementContext,
         y = void 0 === b ? u : b,
         v = o.altBoundary,
         _ = void 0 !== v && v,
         w = o.padding,
         T = void 0 === w ? 0 : w,
         k = U("number" != typeof T ? T : Y(T, r)),
         E = y === u ? h : u,
         x = n.rects.popper,
         C = n.elements[_ ? E : y],
         S = de(A(C) ? C : C.contextElement || F(n.elements.popper), f, g),
         O = I(n.elements.reference),
         P = pe({
            reference: O,
            element: x,
            strategy: "absolute",
            placement: d
         }),
         M = ue(Object.assign({}, x, P)),
         L = y === u ? M : O,
         N = {
            top: S.top - L.top + k.top,
            bottom: L.bottom - S.bottom + k.bottom,
            left: S.left - L.left + k.left,
            right: L.right - S.right + k.right
         },
         D = n.modifiersData.offset;
      if (y === u && D) {
         var R = D[d];
         Object.keys(N).forEach((function (n) {
            var s = [i, t].indexOf(n) >= 0 ? 1 : -1,
               r = [e, t].indexOf(n) >= 0 ? "y" : "x";
            N[n] += R[r] * s
         }))
      }
      return N
   }

   function me(e, t) {
      void 0 === t && (t = {});
      var i = t,
         n = i.placement,
         s = i.boundary,
         o = i.rootBoundary,
         a = i.padding,
         l = i.flipVariations,
         c = i.allowedAutoPlacements,
         u = void 0 === c ? p : c,
         h = K(n),
         f = h ? l ? d : d.filter((function (e) {
            return K(e) === h
         })) : r,
         m = f.filter((function (e) {
            return u.indexOf(e) >= 0
         }));
      0 === m.length && (m = f);
      var g = m.reduce((function (t, i) {
         return t[i] = fe(e, {
            placement: i,
            boundary: s,
            rootBoundary: o,
            padding: a
         })[P(i)], t
      }), {});
      return Object.keys(g).sort((function (e, t) {
         return g[e] - g[t]
      }))
   }
   var ge = {
      name: "flip",
      enabled: !0,
      phase: "main",
      fn: function (r) {
         var a = r.state,
            l = r.options,
            c = r.name;
         if (!a.modifiersData[c]._skip) {
            for (var u = l.mainAxis, h = void 0 === u || u, d = l.altAxis, p = void 0 === d || d, f = l.fallbackPlacements, m = l.padding, g = l.boundary, b = l.rootBoundary, y = l.altBoundary, v = l.flipVariations, _ = void 0 === v || v, w = l.allowedAutoPlacements, T = a.options.placement, k = P(T), E = f || (k === T || !_ ? [ie(T)] : function (e) {
                  if (P(e) === s) return [];
                  var t = ie(e);
                  return [se(e), t, se(t)]
               }(T)), x = [T].concat(E).reduce((function (e, t) {
                  return e.concat(P(t) === s ? me(a, {
                     placement: t,
                     boundary: g,
                     rootBoundary: b,
                     padding: m,
                     flipVariations: _,
                     allowedAutoPlacements: w
                  }) : t)
               }), []), A = a.rects.reference, C = a.rects.popper, S = new Map, O = !0, M = x[0], L = 0; L < x.length; L++) {
               var N = x[L],
                  I = P(N),
                  D = K(N) === o,
                  R = [e, t].indexOf(I) >= 0,
                  B = R ? "width" : "height",
                  j = fe(a, {
                     placement: N,
                     boundary: g,
                     rootBoundary: b,
                     altBoundary: y,
                     padding: m
                  }),
                  F = R ? D ? i : n : D ? t : e;
               A[B] > C[B] && (F = ie(F));
               var H = ie(F),
                  z = [];
               if (h && z.push(j[I] <= 0), p && z.push(j[F] <= 0, j[H] <= 0), z.every((function (e) {
                     return e
                  }))) {
                  M = N, O = !1;
                  break
               }
               S.set(N, z)
            }
            if (O)
               for (var V = function (e) {
                     var t = x.find((function (t) {
                        var i = S.get(t);
                        if (i) return i.slice(0, e).every((function (e) {
                           return e
                        }))
                     }));
                     if (t) return M = t, "break"
                  }, q = _ ? 3 : 1; q > 0; q--) {
                  if ("break" === V(q)) break
               }
            a.placement !== M && (a.modifiersData[c]._skip = !0, a.placement = M, a.reset = !0)
         }
      },
      requiresIfExists: ["offset"],
      data: {
         _skip: !1
      }
   };

   function be(e, t, i) {
      return void 0 === i && (i = {
         x: 0,
         y: 0
      }), {
         top: e.top - t.height - i.y,
         right: e.right - t.width + i.x,
         bottom: e.bottom - t.height + i.y,
         left: e.left - t.width - i.x
      }
   }

   function ye(s) {
      return [e, i, t, n].some((function (e) {
         return s[e] >= 0
      }))
   }
   var ve = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (e) {
         var t = e.state,
            i = e.name,
            n = t.rects.reference,
            s = t.rects.popper,
            r = t.modifiersData.preventOverflow,
            o = fe(t, {
               elementContext: "reference"
            }),
            a = fe(t, {
               altBoundary: !0
            }),
            l = be(o, n),
            c = be(a, s, r),
            u = ye(l),
            h = ye(c);
         t.modifiersData[i] = {
            referenceClippingOffsets: l,
            popperEscapeOffsets: c,
            isReferenceHidden: u,
            hasPopperEscaped: h
         }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": u,
            "data-popper-escaped": h
         })
      }
   };
   var _e = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (t) {
         var s = t.state,
            r = t.options,
            o = t.name,
            a = r.offset,
            l = void 0 === a ? [0, 0] : a,
            c = p.reduce((function (t, r) {
               return t[r] = function (t, s, r) {
                  var o = P(t),
                     a = [n, e].indexOf(o) >= 0 ? -1 : 1,
                     l = "function" == typeof r ? r(Object.assign({}, s, {
                        placement: t
                     })) : r,
                     c = l[0],
                     u = l[1];
                  return c = c || 0, u = (u || 0) * a, [n, i].indexOf(o) >= 0 ? {
                     x: u,
                     y: c
                  } : {
                     x: c,
                     y: u
                  }
               }(r, s.rects, l), t
            }), {}),
            u = c[s.placement],
            h = u.x,
            d = u.y;
         null != s.modifiersData.popperOffsets && (s.modifiersData.popperOffsets.x += h, s.modifiersData.popperOffsets.y += d), s.modifiersData[o] = c
      }
   };
   var we = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (e) {
         var t = e.state,
            i = e.name;
         t.modifiersData[i] = pe({
            reference: t.rects.reference,
            element: t.rects.popper,
            strategy: "absolute",
            placement: t.placement
         })
      },
      data: {}
   };
   var Te = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (s) {
         var r = s.state,
            a = s.options,
            l = s.name,
            c = a.mainAxis,
            u = void 0 === c || c,
            h = a.altAxis,
            d = void 0 !== h && h,
            p = a.boundary,
            f = a.rootBoundary,
            m = a.altBoundary,
            g = a.padding,
            b = a.tether,
            y = void 0 === b || b,
            v = a.tetherOffset,
            _ = void 0 === v ? 0 : v,
            w = fe(r, {
               boundary: p,
               rootBoundary: f,
               padding: g,
               altBoundary: m
            }),
            T = P(r.placement),
            k = K(r.placement),
            E = !k,
            x = q(T),
            A = "x" === x ? "y" : "x",
            C = r.modifiersData.popperOffsets,
            S = r.rects.reference,
            O = r.rects.popper,
            N = "function" == typeof _ ? _(Object.assign({}, r.rects, {
               placement: r.placement
            })) : _,
            I = "number" == typeof N ? {
               mainAxis: N,
               altAxis: N
            } : Object.assign({
               mainAxis: 0,
               altAxis: 0
            }, N),
            R = r.modifiersData.offset ? r.modifiersData.offset[r.placement] : null,
            B = {
               x: 0,
               y: 0
            };
         if (C) {
            if (u) {
               var j, F = "y" === x ? e : n,
                  H = "y" === x ? t : i,
                  z = "y" === x ? "height" : "width",
                  U = C[x],
                  Y = U + w[F],
                  X = U - w[H],
                  Q = y ? -O[z] / 2 : 0,
                  G = k === o ? S[z] : O[z],
                  J = k === o ? -O[z] : -S[z],
                  Z = r.elements.arrow,
                  ee = y && Z ? D(Z) : {
                     width: 0,
                     height: 0
                  },
                  te = r.modifiersData["arrow#persistent"] ? r.modifiersData["arrow#persistent"].padding : {
                     top: 0,
                     right: 0,
                     bottom: 0,
                     left: 0
                  },
                  ie = te[F],
                  ne = te[H],
                  se = W(0, S[z], ee[z]),
                  re = E ? S[z] / 2 - Q - se - ie - I.mainAxis : G - se - ie - I.mainAxis,
                  oe = E ? -S[z] / 2 + Q + se + ne + I.mainAxis : J + se + ne + I.mainAxis,
                  ae = r.elements.arrow && V(r.elements.arrow),
                  le = ae ? "y" === x ? ae.clientTop || 0 : ae.clientLeft || 0 : 0,
                  ce = null != (j = null == R ? void 0 : R[x]) ? j : 0,
                  ue = U + oe - ce,
                  he = W(y ? L(Y, U + re - ce - le) : Y, U, y ? M(X, ue) : X);
               C[x] = he, B[x] = he - U
            }
            if (d) {
               var de, pe = "x" === x ? e : n,
                  me = "x" === x ? t : i,
                  ge = C[A],
                  be = "y" === A ? "height" : "width",
                  ye = ge + w[pe],
                  ve = ge - w[me],
                  _e = -1 !== [e, n].indexOf(T),
                  we = null != (de = null == R ? void 0 : R[A]) ? de : 0,
                  Te = _e ? ye : ge - S[be] - O[be] - we + I.altAxis,
                  ke = _e ? ge + S[be] + O[be] - we - I.altAxis : ve,
                  Ee = y && _e ? function (e, t, i) {
                     var n = W(e, t, i);
                     return n > i ? i : n
                  }(Te, ge, ke) : W(y ? Te : ye, ge, y ? ke : ve);
               C[A] = Ee, B[A] = Ee - ge
            }
            r.modifiersData[l] = B
         }
      },
      requiresIfExists: ["offset"]
   };

   function ke(e, t, i) {
      void 0 === i && (i = !1);
      var n, s, r = C(t),
         o = C(t) && function (e) {
            var t = e.getBoundingClientRect(),
               i = N(t.width) / e.offsetWidth || 1,
               n = N(t.height) / e.offsetHeight || 1;
            return 1 !== i || 1 !== n
         }(t),
         a = F(t),
         l = I(e, o),
         c = {
            scrollLeft: 0,
            scrollTop: 0
         },
         u = {
            x: 0,
            y: 0
         };
      return (r || !r && !i) && (("body" !== E(t) || ae(a)) && (c = (n = t) !== x(n) && C(n) ? {
         scrollLeft: (s = n).scrollLeft,
         scrollTop: s.scrollTop
      } : re(n)), C(t) ? ((u = I(t, !0)).x += t.clientLeft, u.y += t.clientTop) : a && (u.x = oe(a))), {
         x: l.left + c.scrollLeft - u.x,
         y: l.top + c.scrollTop - u.y,
         width: l.width,
         height: l.height
      }
   }

   function Ee(e) {
      var t = new Map,
         i = new Set,
         n = [];

      function s(e) {
         i.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function (e) {
            if (!i.has(e)) {
               var n = t.get(e);
               n && s(n)
            }
         })), n.push(e)
      }
      return e.forEach((function (e) {
         t.set(e.name, e)
      })), e.forEach((function (e) {
         i.has(e.name) || s(e)
      })), n
   }
   var xe = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
   };

   function Ae() {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      return !t.some((function (e) {
         return !(e && "function" == typeof e.getBoundingClientRect)
      }))
   }

   function Ce(e) {
      void 0 === e && (e = {});
      var t = e,
         i = t.defaultModifiers,
         n = void 0 === i ? [] : i,
         s = t.defaultOptions,
         r = void 0 === s ? xe : s;
      return function (e, t, i) {
         void 0 === i && (i = r);
         var s, o, a = {
               placement: "bottom",
               orderedModifiers: [],
               options: Object.assign({}, xe, r),
               modifiersData: {},
               elements: {
                  reference: e,
                  popper: t
               },
               attributes: {},
               styles: {}
            },
            l = [],
            c = !1,
            u = {
               state: a,
               setOptions: function (i) {
                  var s = "function" == typeof i ? i(a.options) : i;
                  h(), a.options = Object.assign({}, r, a.options, s), a.scrollParents = {
                     reference: A(e) ? ce(e) : e.contextElement ? ce(e.contextElement) : [],
                     popper: ce(t)
                  };
                  var o, c, d = function (e) {
                     var t = Ee(e);
                     return k.reduce((function (e, i) {
                        return e.concat(t.filter((function (e) {
                           return e.phase === i
                        })))
                     }), [])
                  }((o = [].concat(n, a.options.modifiers), c = o.reduce((function (e, t) {
                     var i = e[t.name];
                     return e[t.name] = i ? Object.assign({}, i, t, {
                        options: Object.assign({}, i.options, t.options),
                        data: Object.assign({}, i.data, t.data)
                     }) : t, e
                  }), {}), Object.keys(c).map((function (e) {
                     return c[e]
                  }))));
                  return a.orderedModifiers = d.filter((function (e) {
                     return e.enabled
                  })), a.orderedModifiers.forEach((function (e) {
                     var t = e.name,
                        i = e.options,
                        n = void 0 === i ? {} : i,
                        s = e.effect;
                     if ("function" == typeof s) {
                        var r = s({
                              state: a,
                              name: t,
                              instance: u,
                              options: n
                           }),
                           o = function () {};
                        l.push(r || o)
                     }
                  })), u.update()
               },
               forceUpdate: function () {
                  if (!c) {
                     var e = a.elements,
                        t = e.reference,
                        i = e.popper;
                     if (Ae(t, i)) {
                        a.rects = {
                           reference: ke(t, V(i), "fixed" === a.options.strategy),
                           popper: D(i)
                        }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function (e) {
                           return a.modifiersData[e.name] = Object.assign({}, e.data)
                        }));
                        for (var n = 0; n < a.orderedModifiers.length; n++)
                           if (!0 !== a.reset) {
                              var s = a.orderedModifiers[n],
                                 r = s.fn,
                                 o = s.options,
                                 l = void 0 === o ? {} : o,
                                 h = s.name;
                              "function" == typeof r && (a = r({
                                 state: a,
                                 options: l,
                                 name: h,
                                 instance: u
                              }) || a)
                           } else a.reset = !1, n = -1
                     }
                  }
               },
               update: (s = function () {
                  return new Promise((function (e) {
                     u.forceUpdate(), e(a)
                  }))
               }, function () {
                  return o || (o = new Promise((function (e) {
                     Promise.resolve().then((function () {
                        o = void 0, e(s())
                     }))
                  }))), o
               }),
               destroy: function () {
                  h(), c = !0
               }
            };
         if (!Ae(e, t)) return u;

         function h() {
            l.forEach((function (e) {
               return e()
            })), l = []
         }
         return u.setOptions(i).then((function (e) {
            !c && i.onFirstUpdate && i.onFirstUpdate(e)
         })), u
      }
   }
   var Se = Ce(),
      Oe = Ce({
         defaultModifiers: [ee, we, J, O]
      }),
      Pe = Ce({
         defaultModifiers: [ee, we, J, O, _e, ge, Te, X, ve]
      }),
      Me = Object.freeze({
         __proto__: null,
         popperGenerator: Ce,
         detectOverflow: fe,
         createPopperBase: Se,
         createPopper: Pe,
         createPopperLite: Oe,
         top: e,
         bottom: t,
         right: i,
         left: n,
         auto: s,
         basePlacements: r,
         start: o,
         end: a,
         clippingParents: l,
         viewport: c,
         popper: u,
         reference: h,
         variationPlacements: d,
         placements: p,
         beforeRead: f,
         read: m,
         afterRead: g,
         beforeMain: b,
         main: y,
         afterMain: v,
         beforeWrite: _,
         write: w,
         afterWrite: T,
         modifierPhases: k,
         applyStyles: O,
         arrow: X,
         computeStyles: J,
         eventListeners: ee,
         flip: ge,
         hide: ve,
         offset: _e,
         popperOffsets: we,
         preventOverflow: Te
      });
   /*!
    * Bootstrap v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
   const Le = "transitionend",
      Ne = e => {
         let t = e.getAttribute("data-bs-target");
         if (!t || "#" === t) {
            let i = e.getAttribute("href");
            if (!i || !i.includes("#") && !i.startsWith(".")) return null;
            i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), t = i && "#" !== i ? i.trim() : null
         }
         return t
      },
      Ie = e => {
         const t = Ne(e);
         return t && document.querySelector(t) ? t : null
      },
      De = e => {
         const t = Ne(e);
         return t ? document.querySelector(t) : null
      },
      Re = e => {
         e.dispatchEvent(new Event(Le))
      },
      Be = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
      je = e => Be(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(e) : null,
      Fe = (e, t, i) => {
         Object.keys(i).forEach((n => {
            const s = i[n],
               r = t[n],
               o = r && Be(r) ? "element" : null == (a = r) ? `${a}` : {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();
            var a;
            if (!new RegExp(s).test(o)) throw new TypeError(`${e.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${s}".`)
         }))
      },
      He = e => !(!Be(e) || 0 === e.getClientRects().length) && "visible" === getComputedStyle(e).getPropertyValue("visibility"),
      $e = e => !e || e.nodeType !== Node.ELEMENT_NODE || (!!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled"))),
      ze = e => {
         if (!document.documentElement.attachShadow) return null;
         if ("function" == typeof e.getRootNode) {
            const t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null
         }
         return e instanceof ShadowRoot ? e : e.parentNode ? ze(e.parentNode) : null
      },
      Ve = () => {},
      qe = e => {
         e.offsetHeight
      },
      We = () => {
         const {
            jQuery: e
         } = window;
         return e && !document.body.hasAttribute("data-bs-no-jquery") ? e : null
      },
      Ue = [],
      Ye = () => "rtl" === document.documentElement.dir,
      Xe = e => {
         var t;
         t = () => {
            const $ = We();
            if ($) {
               const t = e.NAME,
                  i = $.fn[t];
               $.fn[t] = e.jQueryInterface, $.fn[t].Constructor = e, $.fn[t].noConflict = () => ($.fn[t] = i, e.jQueryInterface)
            }
         }, "loading" === document.readyState ? (Ue.length || document.addEventListener("DOMContentLoaded", (() => {
            Ue.forEach((e => e()))
         })), Ue.push(t)) : t()
      },
      Ke = e => {
         "function" == typeof e && e()
      },
      Qe = (e, t, i = !0) => {
         if (!i) return void Ke(e);
         const n = (e => {
            if (!e) return 0;
            let {
               transitionDuration: t,
               transitionDelay: i
            } = window.getComputedStyle(e);
            const n = Number.parseFloat(t),
               s = Number.parseFloat(i);
            return n || s ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(t) + Number.parseFloat(i))) : 0
         })(t) + 5;
         let s = !1;
         const r = ({
            target: i
         }) => {
            i === t && (s = !0, t.removeEventListener(Le, r), Ke(e))
         };
         t.addEventListener(Le, r), setTimeout((() => {
            s || Re(t)
         }), n)
      },
      Ge = (e, t, i, n) => {
         let s = e.indexOf(t);
         if (-1 === s) return e[!i && n ? e.length - 1 : 0];
         const r = e.length;
         return s += i ? 1 : -1, n && (s = (s + r) % r), e[Math.max(0, Math.min(s, r - 1))]
      },
      Je = /[^.]*(?=\..*)\.|.*/,
      Ze = /\..*/,
      et = /::\d+$/,
      tt = {};
   let it = 1;
   const nt = {
         mouseenter: "mouseover",
         mouseleave: "mouseout"
      },
      st = /^(mouseenter|mouseleave)/i,
      rt = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

   function ot(e, t) {
      return t && `${t}::${it++}` || e.uidEvent || it++
   }

   function at(e) {
      const t = ot(e);
      return e.uidEvent = t, tt[t] = tt[t] || {}, tt[t]
   }

   function lt(e, t, i = null) {
      const n = Object.keys(e);
      for (let s = 0, r = n.length; s < r; s++) {
         const r = e[n[s]];
         if (r.originalHandler === t && r.delegationSelector === i) return r
      }
      return null
   }

   function ct(e, t, i) {
      const n = "string" == typeof t,
         s = n ? i : t;
      let r = dt(e);
      return rt.has(r) || (r = e), [n, s, r]
   }

   function ut(e, t, i, n, s) {
      if ("string" != typeof t || !e) return;
      if (i || (i = n, n = null), st.test(t)) {
         const e = e => function (t) {
            if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t)
         };
         n ? n = e(n) : i = e(i)
      }
      const [r, o, a] = ct(t, i, n), l = at(e), c = l[a] || (l[a] = {}), u = lt(c, o, r ? i : null);
      if (u) return void(u.oneOff = u.oneOff && s);
      const h = ot(o, t.replace(Je, "")),
         d = r ? function (e, t, i) {
            return function n(s) {
               const r = e.querySelectorAll(t);
               for (let {
                     target: o
                  } = s; o && o !== this; o = o.parentNode)
                  for (let a = r.length; a--;)
                     if (r[a] === o) return s.delegateTarget = o, n.oneOff && pt.off(e, s.type, t, i), i.apply(o, [s]);
               return null
            }
         }(e, i, n) : function (e, t) {
            return function i(n) {
               return n.delegateTarget = e, i.oneOff && pt.off(e, n.type, t), t.apply(e, [n])
            }
         }(e, i);
      d.delegationSelector = r ? i : null, d.originalHandler = o, d.oneOff = s, d.uidEvent = h, c[h] = d, e.addEventListener(a, d, r)
   }

   function ht(e, t, i, n, s) {
      const r = lt(t[i], n, s);
      r && (e.removeEventListener(i, r, Boolean(s)), delete t[i][r.uidEvent])
   }

   function dt(e) {
      return e = e.replace(Ze, ""), nt[e] || e
   }
   const pt = {
         on(e, t, i, n) {
            ut(e, t, i, n, !1)
         },
         one(e, t, i, n) {
            ut(e, t, i, n, !0)
         },
         off(e, t, i, n) {
            if ("string" != typeof t || !e) return;
            const [s, r, o] = ct(t, i, n), a = o !== t, l = at(e), c = t.startsWith(".");
            if (void 0 !== r) {
               if (!l || !l[o]) return;
               return void ht(e, l, o, r, s ? i : null)
            }
            c && Object.keys(l).forEach((i => {
               ! function (e, t, i, n) {
                  const s = t[i] || {};
                  Object.keys(s).forEach((r => {
                     if (r.includes(n)) {
                        const n = s[r];
                        ht(e, t, i, n.originalHandler, n.delegationSelector)
                     }
                  }))
               }(e, l, i, t.slice(1))
            }));
            const u = l[o] || {};
            Object.keys(u).forEach((i => {
               const n = i.replace(et, "");
               if (!a || t.includes(n)) {
                  const t = u[i];
                  ht(e, l, o, t.originalHandler, t.delegationSelector)
               }
            }))
         },
         trigger(e, t, i) {
            if ("string" != typeof t || !e) return null;
            const $ = We(),
               n = dt(t),
               s = t !== n,
               r = rt.has(n);
            let o, a = !0,
               l = !0,
               c = !1,
               u = null;
            return s && $ && (o = $.Event(t, i), $(e).trigger(o), a = !o.isPropagationStopped(), l = !o.isImmediatePropagationStopped(), c = o.isDefaultPrevented()), r ? (u = document.createEvent("HTMLEvents"), u.initEvent(n, a, !0)) : u = new CustomEvent(t, {
               bubbles: a,
               cancelable: !0
            }), void 0 !== i && Object.keys(i).forEach((e => {
               Object.defineProperty(u, e, {
                  get: () => i[e]
               })
            })), c && u.preventDefault(), l && e.dispatchEvent(u), u.defaultPrevented && void 0 !== o && o.preventDefault(), u
         }
      },
      ft = new Map,
      mt = {
         set(e, t, i) {
            ft.has(e) || ft.set(e, new Map);
            const n = ft.get(e);
            n.has(t) || 0 === n.size ? n.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
         },
         get: (e, t) => ft.has(e) && ft.get(e).get(t) || null,
         remove(e, t) {
            if (!ft.has(e)) return;
            const i = ft.get(e);
            i.delete(t), 0 === i.size && ft.delete(e)
         }
      };
   class gt {
      constructor(e) {
         (e = je(e)) && (this._element = e, mt.set(this._element, this.constructor.DATA_KEY, this))
      }
      dispose() {
         mt.remove(this._element, this.constructor.DATA_KEY), pt.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach((e => {
            this[e] = null
         }))
      }
      _queueCallback(e, t, i = !0) {
         Qe(e, t, i)
      }
      static getInstance(e) {
         return mt.get(je(e), this.DATA_KEY)
      }
      static getOrCreateInstance(e, t = {}) {
         return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
      }
      static get VERSION() {
         return "5.1.3"
      }
      static get NAME() {
         throw new Error('You have to implement the static method "NAME", for each component!')
      }
      static get DATA_KEY() {
         return `bs.${this.NAME}`
      }
      static get EVENT_KEY() {
         return `.${this.DATA_KEY}`
      }
   }
   const bt = (e, t = "hide") => {
      const i = `click.dismiss${e.EVENT_KEY}`,
         n = e.NAME;
      pt.on(document, i, `[data-bs-dismiss="${n}"]`, (function (i) {
         if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), $e(this)) return;
         const s = De(this) || this.closest(`.${n}`);
         e.getOrCreateInstance(s)[t]()
      }))
   };
   class yt extends gt {
      static get NAME() {
         return "alert"
      }
      close() {
         if (pt.trigger(this._element, "close.bs.alert").defaultPrevented) return;
         this._element.classList.remove("show");
         const e = this._element.classList.contains("fade");
         this._queueCallback((() => this._destroyElement()), this._element, e)
      }
      _destroyElement() {
         this._element.remove(), pt.trigger(this._element, "closed.bs.alert"), this.dispose()
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = yt.getOrCreateInstance(this);
            if ("string" == typeof e) {
               if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
               t[e](this)
            }
         }))
      }
   }
   bt(yt, "close"), Xe(yt);
   const vt = '[data-bs-toggle="button"]';
   class _t extends gt {
      static get NAME() {
         return "button"
      }
      toggle() {
         this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = _t.getOrCreateInstance(this);
            "toggle" === e && t[e]()
         }))
      }
   }

   function wt(e) {
      return "true" === e || "false" !== e && (e === Number(e).toString() ? Number(e) : "" === e || "null" === e ? null : e)
   }

   function Tt(e) {
      return e.replace(/[A-Z]/g, (e => `-${e.toLowerCase()}`))
   }
   pt.on(document, "click.bs.button.data-api", vt, (e => {
      e.preventDefault();
      const t = e.target.closest(vt);
      _t.getOrCreateInstance(t).toggle()
   })), Xe(_t);
   const kt = {
         setDataAttribute(e, t, i) {
            e.setAttribute(`data-bs-${Tt(t)}`, i)
         },
         removeDataAttribute(e, t) {
            e.removeAttribute(`data-bs-${Tt(t)}`)
         },
         getDataAttributes(e) {
            if (!e) return {};
            const t = {};
            return Object.keys(e.dataset).filter((e => e.startsWith("bs"))).forEach((i => {
               let n = i.replace(/^bs/, "");
               n = n.charAt(0).toLowerCase() + n.slice(1, n.length), t[n] = wt(e.dataset[i])
            })), t
         },
         getDataAttribute: (e, t) => wt(e.getAttribute(`data-bs-${Tt(t)}`)),
         offset(e) {
            const t = e.getBoundingClientRect();
            return {
               top: t.top + window.pageYOffset,
               left: t.left + window.pageXOffset
            }
         },
         position: e => ({
            top: e.offsetTop,
            left: e.offsetLeft
         })
      },
      Et = {
         find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
         findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
         children: (e, t) => [].concat(...e.children).filter((e => e.matches(t))),
         parents(e, t) {
            const i = [];
            let n = e.parentNode;
            for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;) n.matches(t) && i.push(n), n = n.parentNode;
            return i
         },
         prev(e, t) {
            let i = e.previousElementSibling;
            for (; i;) {
               if (i.matches(t)) return [i];
               i = i.previousElementSibling
            }
            return []
         },
         next(e, t) {
            let i = e.nextElementSibling;
            for (; i;) {
               if (i.matches(t)) return [i];
               i = i.nextElementSibling
            }
            return []
         },
         focusableChildren(e) {
            const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((e => `${e}:not([tabindex^="-"])`)).join(", ");
            return this.find(t, e).filter((e => !$e(e) && He(e)))
         }
      },
      xt = "carousel",
      At = {
         interval: 5e3,
         keyboard: !0,
         slide: !1,
         pause: "hover",
         wrap: !0,
         touch: !0
      },
      Ct = {
         interval: "(number|boolean)",
         keyboard: "boolean",
         slide: "(boolean|string)",
         pause: "(string|boolean)",
         wrap: "boolean",
         touch: "boolean"
      },
      St = "next",
      Ot = "prev",
      Pt = "left",
      Mt = "right",
      Lt = {
         ArrowLeft: Mt,
         ArrowRight: Pt
      },
      Nt = "slid.bs.carousel",
      It = "active",
      Dt = ".active.carousel-item";
   class Rt extends gt {
      constructor(e, t) {
         super(e), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._indicatorsElement = Et.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
      }
      static get Default() {
         return At
      }
      static get NAME() {
         return xt
      }
      next() {
         this._slide(St)
      }
      nextWhenVisible() {
         !document.hidden && He(this._element) && this.next()
      }
      prev() {
         this._slide(Ot)
      }
      pause(e) {
         e || (this._isPaused = !0), Et.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (Re(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
      }
      cycle(e) {
         e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
      }
      to(e) {
         this._activeElement = Et.findOne(Dt, this._element);
         const t = this._getItemIndex(this._activeElement);
         if (e > this._items.length - 1 || e < 0) return;
         if (this._isSliding) return void pt.one(this._element, Nt, (() => this.to(e)));
         if (t === e) return this.pause(), void this.cycle();
         const i = e > t ? St : Ot;
         this._slide(i, this._items[e])
      }
      _getConfig(e) {
         return e = {
            ...At,
            ...kt.getDataAttributes(this._element),
            ..."object" == typeof e ? e : {}
         }, Fe(xt, e, Ct), e
      }
      _handleSwipe() {
         const e = Math.abs(this.touchDeltaX);
         if (e <= 40) return;
         const t = e / this.touchDeltaX;
         this.touchDeltaX = 0, t && this._slide(t > 0 ? Mt : Pt)
      }
      _addEventListeners() {
         this._config.keyboard && pt.on(this._element, "keydown.bs.carousel", (e => this._keydown(e))), "hover" === this._config.pause && (pt.on(this._element, "mouseenter.bs.carousel", (e => this.pause(e))), pt.on(this._element, "mouseleave.bs.carousel", (e => this.cycle(e)))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
      }
      _addTouchEventListeners() {
         const e = e => this._pointerEvent && ("pen" === e.pointerType || "touch" === e.pointerType),
            t = t => {
               e(t) ? this.touchStartX = t.clientX : this._pointerEvent || (this.touchStartX = t.touches[0].clientX)
            },
            i = e => {
               this.touchDeltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this.touchStartX
            },
            n = t => {
               e(t) && (this.touchDeltaX = t.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((e => this.cycle(e)), 500 + this._config.interval))
            };
         Et.find(".carousel-item img", this._element).forEach((e => {
            pt.on(e, "dragstart.bs.carousel", (e => e.preventDefault()))
         })), this._pointerEvent ? (pt.on(this._element, "pointerdown.bs.carousel", (e => t(e))), pt.on(this._element, "pointerup.bs.carousel", (e => n(e))), this._element.classList.add("pointer-event")) : (pt.on(this._element, "touchstart.bs.carousel", (e => t(e))), pt.on(this._element, "touchmove.bs.carousel", (e => i(e))), pt.on(this._element, "touchend.bs.carousel", (e => n(e))))
      }
      _keydown(e) {
         if (/input|textarea/i.test(e.target.tagName)) return;
         const t = Lt[e.key];
         t && (e.preventDefault(), this._slide(t))
      }
      _getItemIndex(e) {
         return this._items = e && e.parentNode ? Et.find(".carousel-item", e.parentNode) : [], this._items.indexOf(e)
      }
      _getItemByOrder(e, t) {
         const i = e === St;
         return Ge(this._items, t, i, this._config.wrap)
      }
      _triggerSlideEvent(e, t) {
         const i = this._getItemIndex(e),
            n = this._getItemIndex(Et.findOne(Dt, this._element));
         return pt.trigger(this._element, "slide.bs.carousel", {
            relatedTarget: e,
            direction: t,
            from: n,
            to: i
         })
      }
      _setActiveIndicatorElement(e) {
         if (this._indicatorsElement) {
            const t = Et.findOne(".active", this._indicatorsElement);
            t.classList.remove(It), t.removeAttribute("aria-current");
            const i = Et.find("[data-bs-target]", this._indicatorsElement);
            for (let t = 0; t < i.length; t++)
               if (Number.parseInt(i[t].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(e)) {
                  i[t].classList.add(It), i[t].setAttribute("aria-current", "true");
                  break
               }
         }
      }
      _updateInterval() {
         const e = this._activeElement || Et.findOne(Dt, this._element);
         if (!e) return;
         const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
         t ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = t) : this._config.interval = this._config.defaultInterval || this._config.interval
      }
      _slide(e, t) {
         const i = this._directionToOrder(e),
            n = Et.findOne(Dt, this._element),
            s = this._getItemIndex(n),
            r = t || this._getItemByOrder(i, n),
            o = this._getItemIndex(r),
            a = Boolean(this._interval),
            l = i === St,
            c = l ? "carousel-item-start" : "carousel-item-end",
            u = l ? "carousel-item-next" : "carousel-item-prev",
            h = this._orderToDirection(i);
         if (r && r.classList.contains(It)) return void(this._isSliding = !1);
         if (this._isSliding) return;
         if (this._triggerSlideEvent(r, h).defaultPrevented) return;
         if (!n || !r) return;
         this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(r), this._activeElement = r;
         const d = () => {
            pt.trigger(this._element, Nt, {
               relatedTarget: r,
               direction: h,
               from: s,
               to: o
            })
         };
         if (this._element.classList.contains("slide")) {
            r.classList.add(u), qe(r), n.classList.add(c), r.classList.add(c);
            const e = () => {
               r.classList.remove(c, u), r.classList.add(It), n.classList.remove(It, u, c), this._isSliding = !1, setTimeout(d, 0)
            };
            this._queueCallback(e, n, !0)
         } else n.classList.remove(It), r.classList.add(It), this._isSliding = !1, d();
         a && this.cycle()
      }
      _directionToOrder(e) {
         return [Mt, Pt].includes(e) ? Ye() ? e === Pt ? Ot : St : e === Pt ? St : Ot : e
      }
      _orderToDirection(e) {
         return [St, Ot].includes(e) ? Ye() ? e === Ot ? Pt : Mt : e === Ot ? Mt : Pt : e
      }
      static carouselInterface(e, t) {
         const i = Rt.getOrCreateInstance(e, t);
         let {
            _config: n
         } = i;
         "object" == typeof t && (n = {
            ...n,
            ...t
         });
         const s = "string" == typeof t ? t : n.slide;
         if ("number" == typeof t) i.to(t);
         else if ("string" == typeof s) {
            if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
            i[s]()
         } else n.interval && n.ride && (i.pause(), i.cycle())
      }
      static jQueryInterface(e) {
         return this.each((function () {
            Rt.carouselInterface(this, e)
         }))
      }
      static dataApiClickHandler(e) {
         const t = De(this);
         if (!t || !t.classList.contains("carousel")) return;
         const i = {
               ...kt.getDataAttributes(t),
               ...kt.getDataAttributes(this)
            },
            n = this.getAttribute("data-bs-slide-to");
         n && (i.interval = !1), Rt.carouselInterface(t, i), n && Rt.getInstance(t).to(n), e.preventDefault()
      }
   }
   pt.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", Rt.dataApiClickHandler), pt.on(window, "load.bs.carousel.data-api", (() => {
      const e = Et.find('[data-bs-ride="carousel"]');
      for (let t = 0, i = e.length; t < i; t++) Rt.carouselInterface(e[t], Rt.getInstance(e[t]))
   })), Xe(Rt);
   const Bt = "collapse",
      jt = "bs.collapse",
      Ft = {
         toggle: !0,
         parent: null
      },
      Ht = {
         toggle: "boolean",
         parent: "(null|element)"
      },
      $t = "show",
      zt = "collapse",
      Vt = "collapsing",
      qt = "collapsed",
      Wt = ":scope .collapse .collapse",
      Ut = '[data-bs-toggle="collapse"]';
   class Yt extends gt {
      constructor(e, t) {
         super(e), this._isTransitioning = !1, this._config = this._getConfig(t), this._triggerArray = [];
         const i = Et.find(Ut);
         for (let e = 0, t = i.length; e < t; e++) {
            const t = i[e],
               n = Ie(t),
               s = Et.find(n).filter((e => e === this._element));
            null !== n && s.length && (this._selector = n, this._triggerArray.push(t))
         }
         this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
      }
      static get Default() {
         return Ft
      }
      static get NAME() {
         return Bt
      }
      toggle() {
         this._isShown() ? this.hide() : this.show()
      }
      show() {
         if (this._isTransitioning || this._isShown()) return;
         let e, t = [];
         if (this._config.parent) {
            const e = Et.find(Wt, this._config.parent);
            t = Et.find(".collapse.show, .collapse.collapsing", this._config.parent).filter((t => !e.includes(t)))
         }
         const i = Et.findOne(this._selector);
         if (t.length) {
            const n = t.find((e => i !== e));
            if (e = n ? Yt.getInstance(n) : null, e && e._isTransitioning) return
         }
         if (pt.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
         t.forEach((t => {
            i !== t && Yt.getOrCreateInstance(t, {
               toggle: !1
            }).hide(), e || mt.set(t, jt, null)
         }));
         const n = this._getDimension();
         this._element.classList.remove(zt), this._element.classList.add(Vt), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
         const s = `scroll${n[0].toUpperCase()+n.slice(1)}`;
         this._queueCallback((() => {
            this._isTransitioning = !1, this._element.classList.remove(Vt), this._element.classList.add(zt, $t), this._element.style[n] = "", pt.trigger(this._element, "shown.bs.collapse")
         }), this._element, !0), this._element.style[n] = `${this._element[s]}px`
      }
      hide() {
         if (this._isTransitioning || !this._isShown()) return;
         if (pt.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
         const e = this._getDimension();
         this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, qe(this._element), this._element.classList.add(Vt), this._element.classList.remove(zt, $t);
         const t = this._triggerArray.length;
         for (let e = 0; e < t; e++) {
            const t = this._triggerArray[e],
               i = De(t);
            i && !this._isShown(i) && this._addAriaAndCollapsedClass([t], !1)
         }
         this._isTransitioning = !0;
         this._element.style[e] = "", this._queueCallback((() => {
            this._isTransitioning = !1, this._element.classList.remove(Vt), this._element.classList.add(zt), pt.trigger(this._element, "hidden.bs.collapse")
         }), this._element, !0)
      }
      _isShown(e = this._element) {
         return e.classList.contains($t)
      }
      _getConfig(e) {
         return (e = {
            ...Ft,
            ...kt.getDataAttributes(this._element),
            ...e
         }).toggle = Boolean(e.toggle), e.parent = je(e.parent), Fe(Bt, e, Ht), e
      }
      _getDimension() {
         return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
      }
      _initializeChildren() {
         if (!this._config.parent) return;
         const e = Et.find(Wt, this._config.parent);
         Et.find(Ut, this._config.parent).filter((t => !e.includes(t))).forEach((e => {
            const t = De(e);
            t && this._addAriaAndCollapsedClass([e], this._isShown(t))
         }))
      }
      _addAriaAndCollapsedClass(e, t) {
         e.length && e.forEach((e => {
            t ? e.classList.remove(qt) : e.classList.add(qt), e.setAttribute("aria-expanded", t)
         }))
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = {};
            "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1);
            const i = Yt.getOrCreateInstance(this, t);
            if ("string" == typeof e) {
               if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
               i[e]()
            }
         }))
      }
   }
   pt.on(document, "click.bs.collapse.data-api", Ut, (function (e) {
      ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
      const t = Ie(this);
      Et.find(t).forEach((e => {
         Yt.getOrCreateInstance(e, {
            toggle: !1
         }).toggle()
      }))
   })), Xe(Yt);
   const Xt = "dropdown",
      Kt = "Escape",
      Qt = "Space",
      Gt = "ArrowUp",
      Jt = "ArrowDown",
      Zt = new RegExp("ArrowUp|ArrowDown|Escape"),
      ei = "click.bs.dropdown.data-api",
      ti = "keydown.bs.dropdown.data-api",
      ii = "show",
      ni = '[data-bs-toggle="dropdown"]',
      si = ".dropdown-menu",
      ri = Ye() ? "top-end" : "top-start",
      oi = Ye() ? "top-start" : "top-end",
      ai = Ye() ? "bottom-end" : "bottom-start",
      li = Ye() ? "bottom-start" : "bottom-end",
      ci = Ye() ? "left-start" : "right-start",
      ui = Ye() ? "right-start" : "left-start",
      hi = {
         offset: [0, 2],
         boundary: "clippingParents",
         reference: "toggle",
         display: "dynamic",
         popperConfig: null,
         autoClose: !0
      },
      di = {
         offset: "(array|string|function)",
         boundary: "(string|element)",
         reference: "(string|element|object)",
         display: "string",
         popperConfig: "(null|object|function)",
         autoClose: "(boolean|string)"
      };
   class pi extends gt {
      constructor(e, t) {
         super(e), this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar()
      }
      static get Default() {
         return hi
      }
      static get DefaultType() {
         return di
      }
      static get NAME() {
         return Xt
      }
      toggle() {
         return this._isShown() ? this.hide() : this.show()
      }
      show() {
         if ($e(this._element) || this._isShown(this._menu)) return;
         const e = {
            relatedTarget: this._element
         };
         if (pt.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) return;
         const t = pi.getParentFromElement(this._element);
         this._inNavbar ? kt.setDataAttribute(this._menu, "popper", "none") : this._createPopper(t), "ontouchstart" in document.documentElement && !t.closest(".navbar-nav") && [].concat(...document.body.children).forEach((e => pt.on(e, "mouseover", Ve))), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ii), this._element.classList.add(ii), pt.trigger(this._element, "shown.bs.dropdown", e)
      }
      hide() {
         if ($e(this._element) || !this._isShown(this._menu)) return;
         const e = {
            relatedTarget: this._element
         };
         this._completeHide(e)
      }
      dispose() {
         this._popper && this._popper.destroy(), super.dispose()
      }
      update() {
         this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
      }
      _completeHide(e) {
         pt.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((e => pt.off(e, "mouseover", Ve))), this._popper && this._popper.destroy(), this._menu.classList.remove(ii), this._element.classList.remove(ii), this._element.setAttribute("aria-expanded", "false"), kt.removeDataAttribute(this._menu, "popper"), pt.trigger(this._element, "hidden.bs.dropdown", e))
      }
      _getConfig(e) {
         if (e = {
               ...this.constructor.Default,
               ...kt.getDataAttributes(this._element),
               ...e
            }, Fe(Xt, e, this.constructor.DefaultType), "object" == typeof e.reference && !Be(e.reference) && "function" != typeof e.reference.getBoundingClientRect) throw new TypeError(`${Xt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
         return e
      }
      _createPopper(e) {
         if (void 0 === Me) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
         let t = this._element;
         "parent" === this._config.reference ? t = e : Be(this._config.reference) ? t = je(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
         const i = this._getPopperConfig(),
            n = i.modifiers.find((e => "applyStyles" === e.name && !1 === e.enabled));
         this._popper = Pe(t, this._menu, i), n && kt.setDataAttribute(this._menu, "popper", "static")
      }
      _isShown(e = this._element) {
         return e.classList.contains(ii)
      }
      _getMenuElement() {
         return Et.next(this._element, si)[0]
      }
      _getPlacement() {
         const e = this._element.parentNode;
         if (e.classList.contains("dropend")) return ci;
         if (e.classList.contains("dropstart")) return ui;
         const t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
         return e.classList.contains("dropup") ? t ? oi : ri : t ? li : ai
      }
      _detectNavbar() {
         return null !== this._element.closest(".navbar")
      }
      _getOffset() {
         const {
            offset: e
         } = this._config;
         return "string" == typeof e ? e.split(",").map((e => Number.parseInt(e, 10))) : "function" == typeof e ? t => e(t, this._element) : e
      }
      _getPopperConfig() {
         const e = {
            placement: this._getPlacement(),
            modifiers: [{
               name: "preventOverflow",
               options: {
                  boundary: this._config.boundary
               }
            }, {
               name: "offset",
               options: {
                  offset: this._getOffset()
               }
            }]
         };
         return "static" === this._config.display && (e.modifiers = [{
            name: "applyStyles",
            enabled: !1
         }]), {
            ...e,
            ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
         }
      }
      _selectMenuItem({
         key: e,
         target: t
      }) {
         const i = Et.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(He);
         i.length && Ge(i, t, e === Jt, !i.includes(t)).focus()
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = pi.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e]()
            }
         }))
      }
      static clearMenus(e) {
         if (e && (2 === e.button || "keyup" === e.type && "Tab" !== e.key)) return;
         const t = Et.find(ni);
         for (let i = 0, n = t.length; i < n; i++) {
            const n = pi.getInstance(t[i]);
            if (!n || !1 === n._config.autoClose) continue;
            if (!n._isShown()) continue;
            const s = {
               relatedTarget: n._element
            };
            if (e) {
               const t = e.composedPath(),
                  i = t.includes(n._menu);
               if (t.includes(n._element) || "inside" === n._config.autoClose && !i || "outside" === n._config.autoClose && i) continue;
               if (n._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName))) continue;
               "click" === e.type && (s.clickEvent = e)
            }
            n._completeHide(s)
         }
      }
      static getParentFromElement(e) {
         return De(e) || e.parentNode
      }
      static dataApiKeydownHandler(e) {
         if (/input|textarea/i.test(e.target.tagName) ? e.key === Qt || e.key !== Kt && (e.key !== Jt && e.key !== Gt || e.target.closest(si)) : !Zt.test(e.key)) return;
         const t = this.classList.contains(ii);
         if (!t && e.key === Kt) return;
         if (e.preventDefault(), e.stopPropagation(), $e(this)) return;
         const i = this.matches(ni) ? this : Et.prev(this, ni)[0],
            n = pi.getOrCreateInstance(i);
         if (e.key !== Kt) return e.key === Gt || e.key === Jt ? (t || n.show(), void n._selectMenuItem(e)) : void(t && e.key !== Qt || pi.clearMenus());
         n.hide()
      }
   }
   pt.on(document, ti, ni, pi.dataApiKeydownHandler), pt.on(document, ti, si, pi.dataApiKeydownHandler), pt.on(document, ei, pi.clearMenus), pt.on(document, "keyup.bs.dropdown.data-api", pi.clearMenus), pt.on(document, ei, ni, (function (e) {
      e.preventDefault(), pi.getOrCreateInstance(this).toggle()
   })), Xe(pi);
   const fi = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      mi = ".sticky-top";
   class gi {
      constructor() {
         this._element = document.body
      }
      getWidth() {
         const e = document.documentElement.clientWidth;
         return Math.abs(window.innerWidth - e)
      }
      hide() {
         const e = this.getWidth();
         this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (t => t + e)), this._setElementAttributes(fi, "paddingRight", (t => t + e)), this._setElementAttributes(mi, "marginRight", (t => t - e))
      }
      _disableOverFlow() {
         this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
      }
      _setElementAttributes(e, t, i) {
         const n = this.getWidth();
         this._applyManipulationCallback(e, (e => {
            if (e !== this._element && window.innerWidth > e.clientWidth + n) return;
            this._saveInitialAttribute(e, t);
            const s = window.getComputedStyle(e)[t];
            e.style[t] = `${i(Number.parseFloat(s))}px`
         }))
      }
      reset() {
         this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(fi, "paddingRight"), this._resetElementAttributes(mi, "marginRight")
      }
      _saveInitialAttribute(e, t) {
         const i = e.style[t];
         i && kt.setDataAttribute(e, t, i)
      }
      _resetElementAttributes(e, t) {
         this._applyManipulationCallback(e, (e => {
            const i = kt.getDataAttribute(e, t);
            void 0 === i ? e.style.removeProperty(t) : (kt.removeDataAttribute(e, t), e.style[t] = i)
         }))
      }
      _applyManipulationCallback(e, t) {
         Be(e) ? t(e) : Et.find(e, this._element).forEach(t)
      }
      isOverflowing() {
         return this.getWidth() > 0
      }
   }
   const bi = {
         className: "modal-backdrop",
         isVisible: !0,
         isAnimated: !1,
         rootElement: "body",
         clickCallback: null
      },
      yi = {
         className: "string",
         isVisible: "boolean",
         isAnimated: "boolean",
         rootElement: "(element|string)",
         clickCallback: "(function|null)"
      },
      vi = "backdrop",
      _i = "show",
      wi = "mousedown.bs.backdrop";
   class Ti {
      constructor(e) {
         this._config = this._getConfig(e), this._isAppended = !1, this._element = null
      }
      show(e) {
         this._config.isVisible ? (this._append(), this._config.isAnimated && qe(this._getElement()), this._getElement().classList.add(_i), this._emulateAnimation((() => {
            Ke(e)
         }))) : Ke(e)
      }
      hide(e) {
         this._config.isVisible ? (this._getElement().classList.remove(_i), this._emulateAnimation((() => {
            this.dispose(), Ke(e)
         }))) : Ke(e)
      }
      _getElement() {
         if (!this._element) {
            const e = document.createElement("div");
            e.className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e
         }
         return this._element
      }
      _getConfig(e) {
         return (e = {
            ...bi,
            ..."object" == typeof e ? e : {}
         }).rootElement = je(e.rootElement), Fe(vi, e, yi), e
      }
      _append() {
         this._isAppended || (this._config.rootElement.append(this._getElement()), pt.on(this._getElement(), wi, (() => {
            Ke(this._config.clickCallback)
         })), this._isAppended = !0)
      }
      dispose() {
         this._isAppended && (pt.off(this._element, wi), this._element.remove(), this._isAppended = !1)
      }
      _emulateAnimation(e) {
         Qe(e, this._getElement(), this._config.isAnimated)
      }
   }
   const ki = {
         trapElement: null,
         autofocus: !0
      },
      Ei = {
         trapElement: "element",
         autofocus: "boolean"
      },
      xi = ".bs.focustrap",
      Ai = "backward";
   class Ci {
      constructor(e) {
         this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null
      }
      activate() {
         const {
            trapElement: e,
            autofocus: t
         } = this._config;
         this._isActive || (t && e.focus(), pt.off(document, xi), pt.on(document, "focusin.bs.focustrap", (e => this._handleFocusin(e))), pt.on(document, "keydown.tab.bs.focustrap", (e => this._handleKeydown(e))), this._isActive = !0)
      }
      deactivate() {
         this._isActive && (this._isActive = !1, pt.off(document, xi))
      }
      _handleFocusin(e) {
         const {
            target: t
         } = e, {
            trapElement: i
         } = this._config;
         if (t === document || t === i || i.contains(t)) return;
         const n = Et.focusableChildren(i);
         0 === n.length ? i.focus() : this._lastTabNavDirection === Ai ? n[n.length - 1].focus() : n[0].focus()
      }
      _handleKeydown(e) {
         "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? Ai : "forward")
      }
      _getConfig(e) {
         return e = {
            ...ki,
            ..."object" == typeof e ? e : {}
         }, Fe("focustrap", e, Ei), e
      }
   }
   const Si = "modal",
      Oi = ".bs.modal",
      Pi = "Escape",
      Mi = {
         backdrop: !0,
         keyboard: !0,
         focus: !0
      },
      Li = {
         backdrop: "(boolean|string)",
         keyboard: "boolean",
         focus: "boolean"
      },
      Ni = "hidden.bs.modal",
      Ii = "show.bs.modal",
      Di = "resize.bs.modal",
      Ri = "click.dismiss.bs.modal",
      Bi = "keydown.dismiss.bs.modal",
      ji = "mousedown.dismiss.bs.modal",
      Fi = "modal-open",
      Hi = "show",
      $i = "modal-static";
   class zi extends gt {
      constructor(e, t) {
         super(e), this._config = this._getConfig(t), this._dialog = Et.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollBar = new gi
      }
      static get Default() {
         return Mi
      }
      static get NAME() {
         return Si
      }
      toggle(e) {
         return this._isShown ? this.hide() : this.show(e)
      }
      show(e) {
         if (this._isShown || this._isTransitioning) return;
         pt.trigger(this._element, Ii, {
            relatedTarget: e
         }).defaultPrevented || (this._isShown = !0, this._isAnimated() && (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(Fi), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), pt.on(this._dialog, ji, (() => {
            pt.one(this._element, "mouseup.dismiss.bs.modal", (e => {
               e.target === this._element && (this._ignoreBackdropClick = !0)
            }))
         })), this._showBackdrop((() => this._showElement(e))))
      }
      hide() {
         if (!this._isShown || this._isTransitioning) return;
         if (pt.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
         this._isShown = !1;
         const e = this._isAnimated();
         e && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), this._focustrap.deactivate(), this._element.classList.remove(Hi), pt.off(this._element, Ri), pt.off(this._dialog, ji), this._queueCallback((() => this._hideModal()), this._element, e)
      }
      dispose() {
         [window, this._dialog].forEach((e => pt.off(e, Oi))), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
      }
      handleUpdate() {
         this._adjustDialog()
      }
      _initializeBackDrop() {
         return new Ti({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated()
         })
      }
      _initializeFocusTrap() {
         return new Ci({
            trapElement: this._element
         })
      }
      _getConfig(e) {
         return e = {
            ...Mi,
            ...kt.getDataAttributes(this._element),
            ..."object" == typeof e ? e : {}
         }, Fe(Si, e, Li), e
      }
      _showElement(e) {
         const t = this._isAnimated(),
            i = Et.findOne(".modal-body", this._dialog);
         this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), t && qe(this._element), this._element.classList.add(Hi);
         this._queueCallback((() => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, pt.trigger(this._element, "shown.bs.modal", {
               relatedTarget: e
            })
         }), this._dialog, t)
      }
      _setEscapeEvent() {
         this._isShown ? pt.on(this._element, Bi, (e => {
            this._config.keyboard && e.key === Pi ? (e.preventDefault(), this.hide()) : this._config.keyboard || e.key !== Pi || this._triggerBackdropTransition()
         })) : pt.off(this._element, Bi)
      }
      _setResizeEvent() {
         this._isShown ? pt.on(window, Di, (() => this._adjustDialog())) : pt.off(window, Di)
      }
      _hideModal() {
         this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
            document.body.classList.remove(Fi), this._resetAdjustments(), this._scrollBar.reset(), pt.trigger(this._element, Ni)
         }))
      }
      _showBackdrop(e) {
         pt.on(this._element, Ri, (e => {
            this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : e.target === e.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
         })), this._backdrop.show(e)
      }
      _isAnimated() {
         return this._element.classList.contains("fade")
      }
      _triggerBackdropTransition() {
         if (pt.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
         const {
            classList: e,
            scrollHeight: t,
            style: i
         } = this._element, n = t > document.documentElement.clientHeight;
         !n && "hidden" === i.overflowY || e.contains($i) || (n || (i.overflowY = "hidden"), e.add($i), this._queueCallback((() => {
            e.remove($i), n || this._queueCallback((() => {
               i.overflowY = ""
            }), this._dialog)
         }), this._dialog), this._element.focus())
      }
      _adjustDialog() {
         const e = this._element.scrollHeight > document.documentElement.clientHeight,
            t = this._scrollBar.getWidth(),
            i = t > 0;
         (!i && e && !Ye() || i && !e && Ye()) && (this._element.style.paddingLeft = `${t}px`), (i && !e && !Ye() || !i && e && Ye()) && (this._element.style.paddingRight = `${t}px`)
      }
      _resetAdjustments() {
         this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
      }
      static jQueryInterface(e, t) {
         return this.each((function () {
            const i = zi.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
               i[e](t)
            }
         }))
      }
   }
   pt.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function (e) {
      const t = De(this);
      ["A", "AREA"].includes(this.tagName) && e.preventDefault(), pt.one(t, Ii, (e => {
         e.defaultPrevented || pt.one(t, Ni, (() => {
            He(this) && this.focus()
         }))
      }));
      const i = Et.findOne(".modal.show");
      i && zi.getInstance(i).hide();
      zi.getOrCreateInstance(t).toggle(this)
   })), bt(zi), Xe(zi);
   const Vi = "offcanvas",
      qi = {
         backdrop: !0,
         keyboard: !0,
         scroll: !1
      },
      Wi = {
         backdrop: "boolean",
         keyboard: "boolean",
         scroll: "boolean"
      },
      Ui = "show",
      Yi = ".offcanvas.show",
      Xi = "hidden.bs.offcanvas";
   class Ki extends gt {
      constructor(e, t) {
         super(e), this._config = this._getConfig(t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
      }
      static get NAME() {
         return Vi
      }
      static get Default() {
         return qi
      }
      toggle(e) {
         return this._isShown ? this.hide() : this.show(e)
      }
      show(e) {
         if (this._isShown) return;
         if (pt.trigger(this._element, "show.bs.offcanvas", {
               relatedTarget: e
            }).defaultPrevented) return;
         this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || (new gi).hide(), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Ui);
         this._queueCallback((() => {
            this._config.scroll || this._focustrap.activate(), pt.trigger(this._element, "shown.bs.offcanvas", {
               relatedTarget: e
            })
         }), this._element, !0)
      }
      hide() {
         if (!this._isShown) return;
         if (pt.trigger(this._element, "hide.bs.offcanvas").defaultPrevented) return;
         this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.remove(Ui), this._backdrop.hide();
         this._queueCallback((() => {
            this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || (new gi).reset(), pt.trigger(this._element, Xi)
         }), this._element, !0)
      }
      dispose() {
         this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
      }
      _getConfig(e) {
         return e = {
            ...qi,
            ...kt.getDataAttributes(this._element),
            ..."object" == typeof e ? e : {}
         }, Fe(Vi, e, Wi), e
      }
      _initializeBackDrop() {
         return new Ti({
            className: "offcanvas-backdrop",
            isVisible: this._config.backdrop,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: () => this.hide()
         })
      }
      _initializeFocusTrap() {
         return new Ci({
            trapElement: this._element
         })
      }
      _addEventListeners() {
         pt.on(this._element, "keydown.dismiss.bs.offcanvas", (e => {
            this._config.keyboard && "Escape" === e.key && this.hide()
         }))
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = Ki.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
               t[e](this)
            }
         }))
      }
   }
   pt.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function (e) {
      const t = De(this);
      if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), $e(this)) return;
      pt.one(t, Xi, (() => {
         He(this) && this.focus()
      }));
      const i = Et.findOne(Yi);
      i && i !== t && Ki.getInstance(i).hide();
      Ki.getOrCreateInstance(t).toggle(this)
   })), pt.on(window, "load.bs.offcanvas.data-api", (() => Et.find(Yi).forEach((e => Ki.getOrCreateInstance(e).show())))), bt(Ki), Xe(Ki);
   const Qi = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
      Gi = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
      Ji = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
      Zi = (e, t) => {
         const i = e.nodeName.toLowerCase();
         if (t.includes(i)) return !Qi.has(i) || Boolean(Gi.test(e.nodeValue) || Ji.test(e.nodeValue));
         const n = t.filter((e => e instanceof RegExp));
         for (let e = 0, t = n.length; e < t; e++)
            if (n[e].test(i)) return !0;
         return !1
      },
      en = {
         "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
         a: ["target", "href", "title", "rel"],
         area: [],
         b: [],
         br: [],
         col: [],
         code: [],
         div: [],
         em: [],
         hr: [],
         h1: [],
         h2: [],
         h3: [],
         h4: [],
         h5: [],
         h6: [],
         i: [],
         img: ["src", "srcset", "alt", "title", "width", "height"],
         li: [],
         ol: [],
         p: [],
         pre: [],
         s: [],
         small: [],
         span: [],
         sub: [],
         sup: [],
         strong: [],
         u: [],
         ul: []
      };

   function tn(e, t, i) {
      if (!e.length) return e;
      if (i && "function" == typeof i) return i(e);
      const n = (new window.DOMParser).parseFromString(e, "text/html"),
         s = [].concat(...n.body.querySelectorAll("*"));
      for (let e = 0, i = s.length; e < i; e++) {
         const i = s[e],
            n = i.nodeName.toLowerCase();
         if (!Object.keys(t).includes(n)) {
            i.remove();
            continue
         }
         const r = [].concat(...i.attributes),
            o = [].concat(t["*"] || [], t[n] || []);
         r.forEach((e => {
            Zi(e, o) || i.removeAttribute(e.nodeName)
         }))
      }
      return n.body.innerHTML
   }
   const nn = "tooltip",
      sn = new Set(["sanitize", "allowList", "sanitizeFn"]),
      rn = {
         animation: "boolean",
         template: "string",
         title: "(string|element|function)",
         trigger: "string",
         delay: "(number|object)",
         html: "boolean",
         selector: "(string|boolean)",
         placement: "(string|function)",
         offset: "(array|string|function)",
         container: "(string|element|boolean)",
         fallbackPlacements: "array",
         boundary: "(string|element)",
         customClass: "(string|function)",
         sanitize: "boolean",
         sanitizeFn: "(null|function)",
         allowList: "object",
         popperConfig: "(null|object|function)"
      },
      on = {
         AUTO: "auto",
         TOP: "top",
         RIGHT: Ye() ? "left" : "right",
         BOTTOM: "bottom",
         LEFT: Ye() ? "right" : "left"
      },
      an = {
         animation: !0,
         template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
         trigger: "hover focus",
         title: "",
         delay: 0,
         html: !1,
         selector: !1,
         placement: "top",
         offset: [0, 0],
         container: !1,
         fallbackPlacements: ["top", "right", "bottom", "left"],
         boundary: "clippingParents",
         customClass: "",
         sanitize: !0,
         sanitizeFn: null,
         allowList: en,
         popperConfig: null
      },
      ln = {
         HIDE: "hide.bs.tooltip",
         HIDDEN: "hidden.bs.tooltip",
         SHOW: "show.bs.tooltip",
         SHOWN: "shown.bs.tooltip",
         INSERTED: "inserted.bs.tooltip",
         CLICK: "click.bs.tooltip",
         FOCUSIN: "focusin.bs.tooltip",
         FOCUSOUT: "focusout.bs.tooltip",
         MOUSEENTER: "mouseenter.bs.tooltip",
         MOUSELEAVE: "mouseleave.bs.tooltip"
      },
      cn = "fade",
      un = "show",
      hn = "show",
      dn = "out",
      pn = ".tooltip-inner",
      fn = ".modal",
      mn = "hide.bs.modal",
      gn = "hover",
      bn = "focus";
   class yn extends gt {
      constructor(e, t) {
         if (void 0 === Me) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
         super(e), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(t), this.tip = null, this._setListeners()
      }
      static get Default() {
         return an
      }
      static get NAME() {
         return nn
      }
      static get Event() {
         return ln
      }
      static get DefaultType() {
         return rn
      }
      enable() {
         this._isEnabled = !0
      }
      disable() {
         this._isEnabled = !1
      }
      toggleEnabled() {
         this._isEnabled = !this._isEnabled
      }
      toggle(e) {
         if (this._isEnabled)
            if (e) {
               const t = this._initializeOnDelegatedTarget(e);
               t._activeTrigger.click = !t._activeTrigger.click, t._isWithActiveTrigger() ? t._enter(null, t) : t._leave(null, t)
            } else {
               if (this.getTipElement().classList.contains(un)) return void this._leave(null, this);
               this._enter(null, this)
            }
      }
      dispose() {
         clearTimeout(this._timeout), pt.off(this._element.closest(fn), mn, this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose()
      }
      show() {
         if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
         if (!this.isWithContent() || !this._isEnabled) return;
         const e = pt.trigger(this._element, this.constructor.Event.SHOW),
            t = ze(this._element),
            i = null === t ? this._element.ownerDocument.documentElement.contains(this._element) : t.contains(this._element);
         if (e.defaultPrevented || !i) return;
         "tooltip" === this.constructor.NAME && this.tip && this.getTitle() !== this.tip.querySelector(pn).innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
         const n = this.getTipElement(),
            s = (e => {
               do {
                  e += Math.floor(1e6 * Math.random())
               } while (document.getElementById(e));
               return e
            })(this.constructor.NAME);
         n.setAttribute("id", s), this._element.setAttribute("aria-describedby", s), this._config.animation && n.classList.add(cn);
         const r = "function" == typeof this._config.placement ? this._config.placement.call(this, n, this._element) : this._config.placement,
            o = this._getAttachment(r);
         this._addAttachmentClass(o);
         const {
            container: a
         } = this._config;
         mt.set(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (a.append(n), pt.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = Pe(this._element, n, this._getPopperConfig(o)), n.classList.add(un);
         const l = this._resolvePossibleFunction(this._config.customClass);
         l && n.classList.add(...l.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((e => {
            pt.on(e, "mouseover", Ve)
         }));
         const c = this.tip.classList.contains(cn);
         this._queueCallback((() => {
            const e = this._hoverState;
            this._hoverState = null, pt.trigger(this._element, this.constructor.Event.SHOWN), e === dn && this._leave(null, this)
         }), this.tip, c)
      }
      hide() {
         if (!this._popper) return;
         const e = this.getTipElement();
         if (pt.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) return;
         e.classList.remove(un), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((e => pt.off(e, "mouseover", Ve))), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1;
         const t = this.tip.classList.contains(cn);
         this._queueCallback((() => {
            this._isWithActiveTrigger() || (this._hoverState !== hn && e.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), pt.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper())
         }), this.tip, t), this._hoverState = ""
      }
      update() {
         null !== this._popper && this._popper.update()
      }
      isWithContent() {
         return Boolean(this.getTitle())
      }
      getTipElement() {
         if (this.tip) return this.tip;
         const e = document.createElement("div");
         e.innerHTML = this._config.template;
         const t = e.children[0];
         return this.setContent(t), t.classList.remove(cn, un), this.tip = t, this.tip
      }
      setContent(e) {
         this._sanitizeAndSetContent(e, this.getTitle(), pn)
      }
      _sanitizeAndSetContent(e, t, i) {
         const n = Et.findOne(i, e);
         t || !n ? this.setElementContent(n, t) : n.remove()
      }
      setElementContent(e, t) {
         if (null !== e) return Be(t) ? (t = je(t), void(this._config.html ? t.parentNode !== e && (e.innerHTML = "", e.append(t)) : e.textContent = t.textContent)) : void(this._config.html ? (this._config.sanitize && (t = tn(t, this._config.allowList, this._config.sanitizeFn)), e.innerHTML = t) : e.textContent = t)
      }
      getTitle() {
         const e = this._element.getAttribute("data-bs-original-title") || this._config.title;
         return this._resolvePossibleFunction(e)
      }
      updateAttachment(e) {
         return "right" === e ? "end" : "left" === e ? "start" : e
      }
      _initializeOnDelegatedTarget(e, t) {
         return t || this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
      }
      _getOffset() {
         const {
            offset: e
         } = this._config;
         return "string" == typeof e ? e.split(",").map((e => Number.parseInt(e, 10))) : "function" == typeof e ? t => e(t, this._element) : e
      }
      _resolvePossibleFunction(e) {
         return "function" == typeof e ? e.call(this._element) : e
      }
      _getPopperConfig(e) {
         const t = {
            placement: e,
            modifiers: [{
               name: "flip",
               options: {
                  fallbackPlacements: this._config.fallbackPlacements
               }
            }, {
               name: "offset",
               options: {
                  offset: this._getOffset()
               }
            }, {
               name: "preventOverflow",
               options: {
                  boundary: this._config.boundary
               }
            }, {
               name: "arrow",
               options: {
                  element: `.${this.constructor.NAME}-arrow`
               }
            }, {
               name: "onChange",
               enabled: !0,
               phase: "afterWrite",
               fn: e => this._handlePopperPlacementChange(e)
            }],
            onFirstUpdate: e => {
               e.options.placement !== e.placement && this._handlePopperPlacementChange(e)
            }
         };
         return {
            ...t,
            ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
         }
      }
      _addAttachmentClass(e) {
         this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(e)}`)
      }
      _getAttachment(e) {
         return on[e.toUpperCase()]
      }
      _setListeners() {
         this._config.trigger.split(" ").forEach((e => {
            if ("click" === e) pt.on(this._element, this.constructor.Event.CLICK, this._config.selector, (e => this.toggle(e)));
            else if ("manual" !== e) {
               const t = e === gn ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
                  i = e === gn ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
               pt.on(this._element, t, this._config.selector, (e => this._enter(e))), pt.on(this._element, i, this._config.selector, (e => this._leave(e)))
            }
         })), this._hideModalHandler = () => {
            this._element && this.hide()
         }, pt.on(this._element.closest(fn), mn, this._hideModalHandler), this._config.selector ? this._config = {
            ...this._config,
            trigger: "manual",
            selector: ""
         } : this._fixTitle()
      }
      _fixTitle() {
         const e = this._element.getAttribute("title"),
            t = typeof this._element.getAttribute("data-bs-original-title");
         (e || "string" !== t) && (this._element.setAttribute("data-bs-original-title", e || ""), !e || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", e), this._element.setAttribute("title", ""))
      }
      _enter(e, t) {
         t = this._initializeOnDelegatedTarget(e, t), e && (t._activeTrigger["focusin" === e.type ? bn : gn] = !0), t.getTipElement().classList.contains(un) || t._hoverState === hn ? t._hoverState = hn : (clearTimeout(t._timeout), t._hoverState = hn, t._config.delay && t._config.delay.show ? t._timeout = setTimeout((() => {
            t._hoverState === hn && t.show()
         }), t._config.delay.show) : t.show())
      }
      _leave(e, t) {
         t = this._initializeOnDelegatedTarget(e, t), e && (t._activeTrigger["focusout" === e.type ? bn : gn] = t._element.contains(e.relatedTarget)), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = dn, t._config.delay && t._config.delay.hide ? t._timeout = setTimeout((() => {
            t._hoverState === dn && t.hide()
         }), t._config.delay.hide) : t.hide())
      }
      _isWithActiveTrigger() {
         for (const e in this._activeTrigger)
            if (this._activeTrigger[e]) return !0;
         return !1
      }
      _getConfig(e) {
         const t = kt.getDataAttributes(this._element);
         return Object.keys(t).forEach((e => {
            sn.has(e) && delete t[e]
         })), (e = {
            ...this.constructor.Default,
            ...t,
            ..."object" == typeof e && e ? e : {}
         }).container = !1 === e.container ? document.body : je(e.container), "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
         }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), Fe(nn, e, this.constructor.DefaultType), e.sanitize && (e.template = tn(e.template, e.allowList, e.sanitizeFn)), e
      }
      _getDelegateConfig() {
         const e = {};
         for (const t in this._config) this.constructor.Default[t] !== this._config[t] && (e[t] = this._config[t]);
         return e
      }
      _cleanTipClass() {
         const e = this.getTipElement(),
            t = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g"),
            i = e.getAttribute("class").match(t);
         null !== i && i.length > 0 && i.map((e => e.trim())).forEach((t => e.classList.remove(t)))
      }
      _getBasicClassPrefix() {
         return "bs-tooltip"
      }
      _handlePopperPlacementChange(e) {
         const {
            state: t
         } = e;
         t && (this.tip = t.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(t.placement)))
      }
      _disposePopper() {
         this._popper && (this._popper.destroy(), this._popper = null)
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = yn.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e]()
            }
         }))
      }
   }
   Xe(yn);
   const vn = {
         ...yn.Default,
         placement: "right",
         offset: [0, 8],
         trigger: "click",
         content: "",
         template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      },
      _n = {
         ...yn.DefaultType,
         content: "(string|element|function)"
      },
      wn = {
         HIDE: "hide.bs.popover",
         HIDDEN: "hidden.bs.popover",
         SHOW: "show.bs.popover",
         SHOWN: "shown.bs.popover",
         INSERTED: "inserted.bs.popover",
         CLICK: "click.bs.popover",
         FOCUSIN: "focusin.bs.popover",
         FOCUSOUT: "focusout.bs.popover",
         MOUSEENTER: "mouseenter.bs.popover",
         MOUSELEAVE: "mouseleave.bs.popover"
      };
   class Tn extends yn {
      static get Default() {
         return vn
      }
      static get NAME() {
         return "popover"
      }
      static get Event() {
         return wn
      }
      static get DefaultType() {
         return _n
      }
      isWithContent() {
         return this.getTitle() || this._getContent()
      }
      setContent(e) {
         this._sanitizeAndSetContent(e, this.getTitle(), ".popover-header"), this._sanitizeAndSetContent(e, this._getContent(), ".popover-body")
      }
      _getContent() {
         return this._resolvePossibleFunction(this._config.content)
      }
      _getBasicClassPrefix() {
         return "bs-popover"
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = Tn.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e]()
            }
         }))
      }
   }
   Xe(Tn);
   const kn = "scrollspy",
      En = ".bs.scrollspy",
      xn = {
         offset: 10,
         method: "auto",
         target: ""
      },
      An = {
         offset: "number",
         method: "string",
         target: "(string|element)"
      },
      Cn = "dropdown-item",
      Sn = "active",
      On = ".nav-link",
      Pn = ".nav-link, .list-group-item, .dropdown-item",
      Mn = "position";
   class Ln extends gt {
      constructor(e, t) {
         super(e), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(t), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, pt.on(this._scrollElement, "scroll.bs.scrollspy", (() => this._process())), this.refresh(), this._process()
      }
      static get Default() {
         return xn
      }
      static get NAME() {
         return kn
      }
      refresh() {
         const e = this._scrollElement === this._scrollElement.window ? "offset" : Mn,
            t = "auto" === this._config.method ? e : this._config.method,
            i = t === Mn ? this._getScrollTop() : 0;
         this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight();
         Et.find(Pn, this._config.target).map((e => {
            const n = Ie(e),
               s = n ? Et.findOne(n) : null;
            if (s) {
               const e = s.getBoundingClientRect();
               if (e.width || e.height) return [kt[t](s).top + i, n]
            }
            return null
         })).filter((e => e)).sort(((e, t) => e[0] - t[0])).forEach((e => {
            this._offsets.push(e[0]), this._targets.push(e[1])
         }))
      }
      dispose() {
         pt.off(this._scrollElement, En), super.dispose()
      }
      _getConfig(e) {
         return (e = {
            ...xn,
            ...kt.getDataAttributes(this._element),
            ..."object" == typeof e && e ? e : {}
         }).target = je(e.target) || document.documentElement, Fe(kn, e, An), e
      }
      _getScrollTop() {
         return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
      }
      _getScrollHeight() {
         return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }
      _getOffsetHeight() {
         return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
      }
      _process() {
         const e = this._getScrollTop() + this._config.offset,
            t = this._getScrollHeight(),
            i = this._config.offset + t - this._getOffsetHeight();
         if (this._scrollHeight !== t && this.refresh(), e >= i) {
            const e = this._targets[this._targets.length - 1];
            this._activeTarget !== e && this._activate(e)
         } else {
            if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
            for (let t = this._offsets.length; t--;) {
               this._activeTarget !== this._targets[t] && e >= this._offsets[t] && (void 0 === this._offsets[t + 1] || e < this._offsets[t + 1]) && this._activate(this._targets[t])
            }
         }
      }
      _activate(e) {
         this._activeTarget = e, this._clear();
         const t = Pn.split(",").map((t => `${t}[data-bs-target="${e}"],${t}[href="${e}"]`)),
            i = Et.findOne(t.join(","), this._config.target);
         i.classList.add(Sn), i.classList.contains(Cn) ? Et.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add(Sn) : Et.parents(i, ".nav, .list-group").forEach((e => {
            Et.prev(e, ".nav-link, .list-group-item").forEach((e => e.classList.add(Sn))), Et.prev(e, ".nav-item").forEach((e => {
               Et.children(e, On).forEach((e => e.classList.add(Sn)))
            }))
         })), pt.trigger(this._scrollElement, "activate.bs.scrollspy", {
            relatedTarget: e
         })
      }
      _clear() {
         Et.find(Pn, this._config.target).filter((e => e.classList.contains(Sn))).forEach((e => e.classList.remove(Sn)))
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = Ln.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e]()
            }
         }))
      }
   }
   pt.on(window, "load.bs.scrollspy.data-api", (() => {
      Et.find('[data-bs-spy="scroll"]').forEach((e => new Ln(e)))
   })), Xe(Ln);
   const Nn = "active",
      In = "fade",
      Dn = "show",
      Rn = ".active",
      Bn = ":scope > li > .active";
   class jn extends gt {
      static get NAME() {
         return "tab"
      }
      show() {
         if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(Nn)) return;
         let e;
         const t = De(this._element),
            i = this._element.closest(".nav, .list-group");
         if (i) {
            const t = "UL" === i.nodeName || "OL" === i.nodeName ? Bn : Rn;
            e = Et.find(t, i), e = e[e.length - 1]
         }
         const n = e ? pt.trigger(e, "hide.bs.tab", {
            relatedTarget: this._element
         }) : null;
         if (pt.trigger(this._element, "show.bs.tab", {
               relatedTarget: e
            }).defaultPrevented || null !== n && n.defaultPrevented) return;
         this._activate(this._element, i);
         const s = () => {
            pt.trigger(e, "hidden.bs.tab", {
               relatedTarget: this._element
            }), pt.trigger(this._element, "shown.bs.tab", {
               relatedTarget: e
            })
         };
         t ? this._activate(t, t.parentNode, s) : s()
      }
      _activate(e, t, i) {
         const n = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? Et.children(t, Rn) : Et.find(Bn, t))[0],
            s = i && n && n.classList.contains(In),
            r = () => this._transitionComplete(e, n, i);
         n && s ? (n.classList.remove(Dn), this._queueCallback(r, e, !0)) : r()
      }
      _transitionComplete(e, t, i) {
         if (t) {
            t.classList.remove(Nn);
            const e = Et.findOne(":scope > .dropdown-menu .active", t.parentNode);
            e && e.classList.remove(Nn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
         }
         e.classList.add(Nn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), qe(e), e.classList.contains(In) && e.classList.add(Dn);
         let n = e.parentNode;
         if (n && "LI" === n.nodeName && (n = n.parentNode), n && n.classList.contains("dropdown-menu")) {
            const t = e.closest(".dropdown");
            t && Et.find(".dropdown-toggle", t).forEach((e => e.classList.add(Nn))), e.setAttribute("aria-expanded", !0)
         }
         i && i()
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = jn.getOrCreateInstance(this);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e]()
            }
         }))
      }
   }
   pt.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', (function (e) {
      if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), $e(this)) return;
      jn.getOrCreateInstance(this).show()
   })), Xe(jn);
   const Fn = "toast",
      Hn = "hide",
      $n = "show",
      zn = "showing",
      Vn = {
         animation: "boolean",
         autohide: "boolean",
         delay: "number"
      },
      qn = {
         animation: !0,
         autohide: !0,
         delay: 5e3
      };
   class Wn extends gt {
      constructor(e, t) {
         super(e), this._config = this._getConfig(t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
      }
      static get DefaultType() {
         return Vn
      }
      static get Default() {
         return qn
      }
      static get NAME() {
         return Fn
      }
      show() {
         if (pt.trigger(this._element, "show.bs.toast").defaultPrevented) return;
         this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
         this._element.classList.remove(Hn), qe(this._element), this._element.classList.add($n), this._element.classList.add(zn), this._queueCallback((() => {
            this._element.classList.remove(zn), pt.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
         }), this._element, this._config.animation)
      }
      hide() {
         if (!this._element.classList.contains($n)) return;
         if (pt.trigger(this._element, "hide.bs.toast").defaultPrevented) return;
         this._element.classList.add(zn), this._queueCallback((() => {
            this._element.classList.add(Hn), this._element.classList.remove(zn), this._element.classList.remove($n), pt.trigger(this._element, "hidden.bs.toast")
         }), this._element, this._config.animation)
      }
      dispose() {
         this._clearTimeout(), this._element.classList.contains($n) && this._element.classList.remove($n), super.dispose()
      }
      _getConfig(e) {
         return e = {
            ...qn,
            ...kt.getDataAttributes(this._element),
            ..."object" == typeof e && e ? e : {}
         }, Fe(Fn, e, this.constructor.DefaultType), e
      }
      _maybeScheduleHide() {
         this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
            this.hide()
         }), this._config.delay)))
      }
      _onInteraction(e, t) {
         switch (e.type) {
            case "mouseover":
            case "mouseout":
               this._hasMouseInteraction = t;
               break;
            case "focusin":
            case "focusout":
               this._hasKeyboardInteraction = t
         }
         if (t) return void this._clearTimeout();
         const i = e.relatedTarget;
         this._element === i || this._element.contains(i) || this._maybeScheduleHide()
      }
      _setListeners() {
         pt.on(this._element, "mouseover.bs.toast", (e => this._onInteraction(e, !0))), pt.on(this._element, "mouseout.bs.toast", (e => this._onInteraction(e, !1))), pt.on(this._element, "focusin.bs.toast", (e => this._onInteraction(e, !0))), pt.on(this._element, "focusout.bs.toast", (e => this._onInteraction(e, !1)))
      }
      _clearTimeout() {
         clearTimeout(this._timeout), this._timeout = null
      }
      static jQueryInterface(e) {
         return this.each((function () {
            const t = Wn.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
               if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
               t[e](this)
            }
         }))
      }
   }

   function Un(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
   }

   function Yn(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
   }
   /*!
    * GSAP 3.9.1
    * https://greensock.com
    *
    * @license Copyright 2008-2021, GreenSock. All rights reserved.
    * Subject to the terms at https://greensock.com/standard-license or for
    * Club GreenSock members, the agreement issued with that membership.
    * @author: Jack Doyle, jack@greensock.com
    */
   bt(Wn), Xe(Wn);
   var Xn, Kn, Qn, Gn, Jn, Zn, es, ts, is, ns, ss, rs, os, as = {
         autoSleep: 120,
         force3D: "auto",
         nullTargetWarn: 1,
         units: {
            lineHeight: ""
         }
      },
      ls = {
         duration: .5,
         overwrite: !1,
         delay: 0
      },
      cs = 1e8,
      us = 1e-8,
      hs = 2 * Math.PI,
      ds = hs / 4,
      ps = 0,
      fs = Math.sqrt,
      ms = Math.cos,
      gs = Math.sin,
      bs = function (e) {
         return "string" == typeof e
      },
      ys = function (e) {
         return "function" == typeof e
      },
      vs = function (e) {
         return "number" == typeof e
      },
      _s = function (e) {
         return void 0 === e
      },
      ws = function (e) {
         return "object" == typeof e
      },
      Ts = function (e) {
         return !1 !== e
      },
      ks = function () {
         return "undefined" != typeof window
      },
      Es = function (e) {
         return ys(e) || bs(e)
      },
      xs = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () {},
      As = Array.isArray,
      Cs = /(?:-?\.?\d|\.)+/gi,
      Ss = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      Os = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      Ps = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      Ms = /[+-]=-?[.\d]+/,
      Ls = /[^,'"\[\]\s]+/gi,
      Ns = /[\d.+\-=]+(?:e[-+]\d*)*/i,
      Is = {},
      Ds = {},
      Rs = function (e) {
         return (Ds = ar(e, Is)) && Qo
      },
      Bs = function (e, t) {
         return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
      },
      js = function (e, t) {
         return !t && console.warn(e)
      },
      Fs = function (e, t) {
         return e && (Is[e] = t) && Ds && (Ds[e] = t) || Is
      },
      Hs = function () {
         return 0
      },
      $s = {},
      zs = [],
      Vs = {},
      qs = {},
      Ws = {},
      Us = 30,
      Ys = [],
      Xs = "",
      Ks = function (e) {
         var t, i, n = e[0];
         if (ws(n) || ys(n) || (e = [e]), !(t = (n._gsap || {}).harness)) {
            for (i = Ys.length; i-- && !Ys[i].targetTest(n););
            t = Ys[i]
         }
         for (i = e.length; i--;) e[i] && (e[i]._gsap || (e[i]._gsap = new _o(e[i], t))) || e.splice(i, 1);
         return e
      },
      Qs = function (e) {
         return e._gsap || Ks(jr(e))[0]._gsap
      },
      Gs = function (e, t, i) {
         return (i = e[t]) && ys(i) ? e[t]() : _s(i) && e.getAttribute && e.getAttribute(t) || i
      },
      Js = function (e, t) {
         return (e = e.split(",")).forEach(t) || e
      },
      Zs = function (e) {
         return Math.round(1e5 * e) / 1e5 || 0
      },
      er = function (e) {
         return Math.round(1e7 * e) / 1e7 || 0
      },
      tr = function (e, t) {
         for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i;);
         return n < i
      },
      ir = function () {
         var e, t, i = zs.length,
            n = zs.slice(0);
         for (Vs = {}, zs.length = 0, e = 0; e < i; e++)(t = n[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0)
      },
      nr = function (e, t, i, n) {
         zs.length && ir(), e.render(t, i, n), zs.length && ir()
      },
      sr = function (e) {
         var t = parseFloat(e);
         return (t || 0 === t) && (e + "").match(Ls).length < 2 ? t : bs(e) ? e.trim() : e
      },
      rr = function (e) {
         return e
      },
      or = function (e, t) {
         for (var i in t) i in e || (e[i] = t[i]);
         return e
      },
      ar = function (e, t) {
         for (var i in t) e[i] = t[i];
         return e
      },
      lr = function e(t, i) {
         for (var n in i) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (t[n] = ws(i[n]) ? e(t[n] || (t[n] = {}), i[n]) : i[n]);
         return t
      },
      cr = function (e, t) {
         var i, n = {};
         for (i in e) i in t || (n[i] = e[i]);
         return n
      },
      ur = function (e) {
         var t, i = e.parent || Kn,
            n = e.keyframes ? (t = As(e.keyframes), function (e, i) {
               for (var n in i) n in e || "duration" === n && t || "ease" === n || (e[n] = i[n])
            }) : or;
         if (Ts(e.inherit))
            for (; i;) n(e, i.vars.defaults), i = i.parent || i._dp;
         return e
      },
      hr = function (e, t, i, n) {
         void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
         var s = t._prev,
            r = t._next;
         s ? s._next = r : e[i] === t && (e[i] = r), r ? r._prev = s : e[n] === t && (e[n] = s), t._next = t._prev = t.parent = null
      },
      dr = function (e, t) {
         e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e), e._act = 0
      },
      pr = function (e, t) {
         if (e && (!t || t._end > e._dur || t._start < 0))
            for (var i = e; i;) i._dirty = 1, i = i.parent;
         return e
      },
      fr = function (e) {
         for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
         return e
      },
      mr = function e(t) {
         return !t || t._ts && e(t.parent)
      },
      gr = function (e) {
         return e._repeat ? br(e._tTime, e = e.duration() + e._rDelay) * e : 0
      },
      br = function (e, t) {
         var i = Math.floor(e /= t);
         return e && i === e ? i - 1 : i
      },
      yr = function (e, t) {
         return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
      },
      vr = function (e) {
         return e._end = er(e._start + (e._tDur / Math.abs(e._ts || e._rts || us) || 0))
      },
      _r = function (e, t) {
         var i = e._dp;
         return i && i.smoothChildTiming && e._ts && (e._start = er(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), vr(e), i._dirty || pr(i, e)), e
      },
      wr = function (e, t) {
         var i;
         if ((t._time || t._initted && !t._dur) && (i = yr(e.rawTime(), t), (!t._dur || Nr(0, t.totalDuration(), i) - t._tTime > us) && t.render(i, !0)), pr(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
            if (e._dur < e.duration())
               for (i = e; i._dp;) i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
            e._zTime = -1e-8
         }
      },
      Tr = function (e, t, i, n) {
         return t.parent && dr(t), t._start = er((vs(i) ? i : i || e !== Kn ? Pr(e, i, t) : e._time) + t._delay), t._end = er(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
            function (e, t, i, n, s) {
               void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
               var r, o = e[n];
               if (s)
                  for (r = t[s]; o && o[s] > r;) o = o._prev;
               o ? (t._next = o._next, o._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = o, t.parent = t._dp = e
            }(e, t, "_first", "_last", e._sort ? "_start" : 0), Ar(t) || (e._recent = t), n || wr(e, t), e
      },
      kr = function (e, t) {
         return (Is.ScrollTrigger || Bs("scrollTrigger", t)) && Is.ScrollTrigger.create(t, e)
      },
      Er = function (e, t, i, n) {
         return Co(e, t), e._initted ? !i && e._pt && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && es !== oo.frame ? (zs.push(e), e._lazy = [t, n], 1) : void 0 : 1
      },
      xr = function e(t) {
         var i = t.parent;
         return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || e(i))
      },
      Ar = function (e) {
         var t = e.data;
         return "isFromStart" === t || "isStart" === t
      },
      Cr = function (e, t, i, n) {
         var s = e._repeat,
            r = er(t) || 0,
            o = e._tTime / e._tDur;
         return o && !n && (e._time *= r / e._dur), e._dur = r, e._tDur = s ? s < 0 ? 1e10 : er(r * (s + 1) + e._rDelay * s) : r, o > 0 && !n ? _r(e, e._tTime = e._tDur * o) : e.parent && vr(e), i || pr(e.parent, e), e
      },
      Sr = function (e) {
         return e instanceof To ? pr(e) : Cr(e, e._dur)
      },
      Or = {
         _start: 0,
         endTime: Hs,
         totalDuration: Hs
      },
      Pr = function e(t, i, n) {
         var s, r, o, a = t.labels,
            l = t._recent || Or,
            c = t.duration() >= cs ? l.endTime(!1) : t._dur;
         return bs(i) && (isNaN(i) || i in a) ? (r = i.charAt(0), o = "%" === i.substr(-1), s = i.indexOf("="), "<" === r || ">" === r ? (s >= 0 && (i = i.replace(/=/, "")), ("<" === r ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (o ? (s < 0 ? l : n).totalDuration() / 100 : 1)) : s < 0 ? (i in a || (a[i] = c), a[i]) : (r = parseFloat(i.charAt(s - 1) + i.substr(s + 1)), o && n && (r = r / 100 * (As(n) ? n[0] : n).totalDuration()), s > 1 ? e(t, i.substr(0, s - 1), n) + r : c + r)) : null == i ? c : +i
      },
      Mr = function (e, t, i) {
         var n, s, r = vs(t[1]),
            o = (r ? 2 : 1) + (e < 2 ? 0 : 1),
            a = t[o];
         if (r && (a.duration = t[1]), a.parent = i, e) {
            for (n = a, s = i; s && !("immediateRender" in n);) n = s.vars.defaults || {}, s = Ts(s.vars.inherit) && s.parent;
            a.immediateRender = Ts(n.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[o - 1]
         }
         return new Lo(t[0], a, t[o + 1])
      },
      Lr = function (e, t) {
         return e || 0 === e ? t(e) : t
      },
      Nr = function (e, t, i) {
         return i < e ? e : i > t ? t : i
      },
      Ir = function (e, t) {
         return bs(e) && (t = Ns.exec(e)) ? e.substr(t.index + t[0].length) : ""
      },
      Dr = [].slice,
      Rr = function (e, t) {
         return e && ws(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ws(e[0])) && !e.nodeType && e !== Qn
      },
      Br = function (e, t, i) {
         return void 0 === i && (i = []), e.forEach((function (e) {
            var n;
            return bs(e) && !t || Rr(e, 1) ? (n = i).push.apply(n, jr(e)) : i.push(e)
         })) || i
      },
      jr = function (e, t, i) {
         return !bs(e) || i || !Gn && ao() ? As(e) ? Br(e, i) : Rr(e) ? Dr.call(e, 0) : e ? [e] : [] : Dr.call((t || Jn).querySelectorAll(e), 0)
      },
      Fr = function (e) {
         return e.sort((function () {
            return .5 - Math.random()
         }))
      },
      Hr = function (e) {
         if (ys(e)) return e;
         var t = ws(e) ? e : {
               each: e
            },
            i = mo(t.ease),
            n = t.from || 0,
            s = parseFloat(t.base) || 0,
            r = {},
            o = n > 0 && n < 1,
            a = isNaN(n) || o,
            l = t.axis,
            c = n,
            u = n;
         return bs(n) ? c = u = {
               center: .5,
               edges: .5,
               end: 1
            } [n] || 0 : !o && a && (c = n[0], u = n[1]),
            function (e, o, h) {
               var d, p, f, m, g, b, y, v, _, w = (h || t).length,
                  T = r[w];
               if (!T) {
                  if (!(_ = "auto" === t.grid ? 0 : (t.grid || [1, cs])[1])) {
                     for (y = -1e8; y < (y = h[_++].getBoundingClientRect().left) && _ < w;);
                     _--
                  }
                  for (T = r[w] = [], d = a ? Math.min(_, w) * c - .5 : n % _, p = _ === cs ? 0 : a ? w * u / _ - .5 : n / _ | 0, y = 0, v = cs, b = 0; b < w; b++) f = b % _ - d, m = p - (b / _ | 0), T[b] = g = l ? Math.abs("y" === l ? m : f) : fs(f * f + m * m), g > y && (y = g), g < v && (v = g);
                  "random" === n && Fr(T), T.max = y - v, T.min = v, T.v = w = (parseFloat(t.amount) || parseFloat(t.each) * (_ > w ? w - 1 : l ? "y" === l ? w / _ : _ : Math.max(_, w / _)) || 0) * ("edges" === n ? -1 : 1), T.b = w < 0 ? s - w : s, T.u = Ir(t.amount || t.each) || 0, i = i && w < 0 ? po(i) : i
               }
               return w = (T[e] - T.min) / T.max || 0, er(T.b + (i ? i(w) : w) * T.v) + T.u
            }
      },
      $r = function (e) {
         var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
         return function (i) {
            var n = Math.round(parseFloat(i) / e) * e * t;
            return (n - n % 1) / t + (vs(i) ? 0 : Ir(i))
         }
      },
      zr = function (e, t) {
         var i, n, s = As(e);
         return !s && ws(e) && (i = s = e.radius || cs, e.values ? (e = jr(e.values), (n = !vs(e[0])) && (i *= i)) : e = $r(e.increment)), Lr(t, s ? ys(e) ? function (t) {
            return n = e(t), Math.abs(n - t) <= i ? n : t
         } : function (t) {
            for (var s, r, o = parseFloat(n ? t.x : t), a = parseFloat(n ? t.y : 0), l = cs, c = 0, u = e.length; u--;)(s = n ? (s = e[u].x - o) * s + (r = e[u].y - a) * r : Math.abs(e[u] - o)) < l && (l = s, c = u);
            return c = !i || l <= i ? e[c] : t, n || c === t || vs(t) ? c : c + Ir(t)
         } : $r(e))
      },
      Vr = function (e, t, i, n) {
         return Lr(As(e) ? !t : !0 === i ? !!(i = 0) : !n, (function () {
            return As(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + .99 * i)) / i) * i * n) / n
         }))
      },
      qr = function (e, t, i) {
         return Lr(i, (function (i) {
            return e[~~t(i)]
         }))
      },
      Wr = function (e) {
         for (var t, i, n, s, r = 0, o = ""; ~(t = e.indexOf("random(", r));) n = e.indexOf(")", t), s = "[" === e.charAt(t + 7), i = e.substr(t + 7, n - t - 7).match(s ? Ls : Cs), o += e.substr(r, t - r) + Vr(s ? i : +i[0], s ? 0 : +i[1], +i[2] || 1e-5), r = n + 1;
         return o + e.substr(r, e.length - r)
      },
      Ur = function (e, t, i, n, s) {
         var r = t - e,
            o = n - i;
         return Lr(s, (function (t) {
            return i + ((t - e) / r * o || 0)
         }))
      },
      Yr = function (e, t, i) {
         var n, s, r, o = e.labels,
            a = cs;
         for (n in o)(s = o[n] - t) < 0 == !!i && s && a > (s = Math.abs(s)) && (r = n, a = s);
         return r
      },
      Xr = function (e, t, i) {
         var n, s, r = e.vars,
            o = r[t];
         if (o) return n = r[t + "Params"], s = r.callbackScope || e, i && zs.length && ir(), n ? o.apply(s, n) : o.call(s)
      },
      Kr = function (e) {
         return dr(e), e.scrollTrigger && e.scrollTrigger.kill(!1), e.progress() < 1 && Xr(e, "onInterrupt"), e
      },
      Qr = function (e) {
         var t = (e = !e.name && e.default || e).name,
            i = ys(e),
            n = t && !i && e.init ? function () {
               this._props = []
            } : e,
            s = {
               init: Hs,
               render: $o,
               add: xo,
               kill: Vo,
               modifier: zo,
               rawVars: 0
            },
            r = {
               targetTest: 0,
               get: 0,
               getSetter: Bo,
               aliases: {},
               register: 0
            };
         if (ao(), e !== n) {
            if (qs[t]) return;
            or(n, or(cr(e, s), r)), ar(n.prototype, ar(s, cr(e, r))), qs[n.prop = t] = n, e.targetTest && (Ys.push(n), $s[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
         }
         Fs(t, n), e.register && e.register(Qo, n, Uo)
      },
      Gr = 255,
      Jr = {
         aqua: [0, Gr, Gr],
         lime: [0, Gr, 0],
         silver: [192, 192, 192],
         black: [0, 0, 0],
         maroon: [128, 0, 0],
         teal: [0, 128, 128],
         blue: [0, 0, Gr],
         navy: [0, 0, 128],
         white: [Gr, Gr, Gr],
         olive: [128, 128, 0],
         yellow: [Gr, Gr, 0],
         orange: [Gr, 165, 0],
         gray: [128, 128, 128],
         purple: [128, 0, 128],
         green: [0, 128, 0],
         red: [Gr, 0, 0],
         pink: [Gr, 192, 203],
         cyan: [0, Gr, Gr],
         transparent: [Gr, Gr, Gr, 0]
      },
      Zr = function (e, t, i) {
         return (6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1 ? t + (i - t) * e * 6 : e < .5 ? i : 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * Gr + .5 | 0
      },
      eo = function (e, t, i) {
         var n, s, r, o, a, l, c, u, h, d, p = e ? vs(e) ? [e >> 16, e >> 8 & Gr, e & Gr] : 0 : Jr.black;
         if (!p) {
            if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Jr[e]) p = Jr[e];
            else if ("#" === e.charAt(0)) {
               if (e.length < 6 && (n = e.charAt(1), s = e.charAt(2), r = e.charAt(3), e = "#" + n + n + s + s + r + r + (5 === e.length ? e.charAt(4) + e.charAt(4) : "")), 9 === e.length) return [(p = parseInt(e.substr(1, 6), 16)) >> 16, p >> 8 & Gr, p & Gr, parseInt(e.substr(7), 16) / 255];
               p = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & Gr, e & Gr]
            } else if ("hsl" === e.substr(0, 3))
               if (p = d = e.match(Cs), t) {
                  if (~e.indexOf("=")) return p = e.match(Ss), i && p.length < 4 && (p[3] = 1), p
               } else o = +p[0] % 360 / 360, a = +p[1] / 100, n = 2 * (l = +p[2] / 100) - (s = l <= .5 ? l * (a + 1) : l + a - l * a), p.length > 3 && (p[3] *= 1), p[0] = Zr(o + 1 / 3, n, s), p[1] = Zr(o, n, s), p[2] = Zr(o - 1 / 3, n, s);
            else p = e.match(Cs) || Jr.transparent;
            p = p.map(Number)
         }
         return t && !d && (n = p[0] / Gr, s = p[1] / Gr, r = p[2] / Gr, l = ((c = Math.max(n, s, r)) + (u = Math.min(n, s, r))) / 2, c === u ? o = a = 0 : (h = c - u, a = l > .5 ? h / (2 - c - u) : h / (c + u), o = c === n ? (s - r) / h + (s < r ? 6 : 0) : c === s ? (r - n) / h + 2 : (n - s) / h + 4, o *= 60), p[0] = ~~(o + .5), p[1] = ~~(100 * a + .5), p[2] = ~~(100 * l + .5)), i && p.length < 4 && (p[3] = 1), p
      },
      to = function (e) {
         var t = [],
            i = [],
            n = -1;
         return e.split(no).forEach((function (e) {
            var s = e.match(Os) || [];
            t.push.apply(t, s), i.push(n += s.length + 1)
         })), t.c = i, t
      },
      io = function (e, t, i) {
         var n, s, r, o, a = "",
            l = (e + a).match(no),
            c = t ? "hsla(" : "rgba(",
            u = 0;
         if (!l) return e;
         if (l = l.map((function (e) {
               return (e = eo(e, t, 1)) && c + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")"
            })), i && (r = to(e), (n = i.c).join(a) !== r.c.join(a)))
            for (o = (s = e.replace(no, "1").split(Os)).length - 1; u < o; u++) a += s[u] + (~n.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (r.length ? r : l.length ? l : i).shift());
         if (!s)
            for (o = (s = e.split(no)).length - 1; u < o; u++) a += s[u] + l[u];
         return a + s[o]
      },
      no = function () {
         var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
         for (e in Jr) t += "|" + e + "\\b";
         return new RegExp(t + ")", "gi")
      }(),
      so = /hsl[a]?\(/,
      ro = function (e) {
         var t, i = e.join(" ");
         if (no.lastIndex = 0, no.test(i)) return t = so.test(i), e[1] = io(e[1], t), e[0] = io(e[0], t, to(e[1])), !0
      },
      oo = function () {
         var e, t, i, n, s, r, o = Date.now,
            a = 500,
            l = 33,
            c = o(),
            u = c,
            h = 1e3 / 240,
            d = h,
            p = [],
            f = function i(f) {
               var m, g, b, y, v = o() - u,
                  _ = !0 === f;
               if (v > a && (c += v - l), ((m = (b = (u += v) - c) - d) > 0 || _) && (y = ++n.frame, s = b - 1e3 * n.time, n.time = b /= 1e3, d += m + (m >= h ? 4 : h - m), g = 1), _ || (e = t(i)), g)
                  for (r = 0; r < p.length; r++) p[r](b, s, y, f)
            };
         return n = {
            time: 0,
            frame: 0,
            tick: function () {
               f(!0)
            },
            deltaRatio: function (e) {
               return s / (1e3 / (e || 60))
            },
            wake: function () {
               Zn && (!Gn && ks() && (Qn = Gn = window, Jn = Qn.document || {}, Is.gsap = Qo, (Qn.gsapVersions || (Qn.gsapVersions = [])).push(Qo.version), Rs(Ds || Qn.GreenSockGlobals || !Qn.gsap && Qn || {}), i = Qn.requestAnimationFrame), e && n.sleep(), t = i || function (e) {
                  return setTimeout(e, d - 1e3 * n.time + 1 | 0)
               }, is = 1, f(2))
            },
            sleep: function () {
               (i ? Qn.cancelAnimationFrame : clearTimeout)(e), is = 0, t = Hs
            },
            lagSmoothing: function (e, t) {
               a = e || 1e8, l = Math.min(t, a, 0)
            },
            fps: function (e) {
               h = 1e3 / (e || 240), d = 1e3 * n.time + h
            },
            add: function (e) {
               p.indexOf(e) < 0 && p.push(e), ao()
            },
            remove: function (e, t) {
               ~(t = p.indexOf(e)) && p.splice(t, 1) && r >= t && r--
            },
            _listeners: p
         }
      }(),
      ao = function () {
         return !is && oo.wake()
      },
      lo = {},
      co = /^[\d.\-M][\d.\-,\s]/,
      uo = /["']/g,
      ho = function (e) {
         for (var t, i, n, s = {}, r = e.substr(1, e.length - 3).split(":"), o = r[0], a = 1, l = r.length; a < l; a++) i = r[a], t = a !== l - 1 ? i.lastIndexOf(",") : i.length, n = i.substr(0, t), s[o] = isNaN(n) ? n.replace(uo, "").trim() : +n, o = i.substr(t + 1).trim();
         return s
      },
      po = function (e) {
         return function (t) {
            return 1 - e(1 - t)
         }
      },
      fo = function e(t, i) {
         for (var n, s = t._first; s;) s instanceof To ? e(s, i) : !s.vars.yoyoEase || s._yoyo && s._repeat || s._yoyo === i || (s.timeline ? e(s.timeline, i) : (n = s._ease, s._ease = s._yEase, s._yEase = n, s._yoyo = i)), s = s._next
      },
      mo = function (e, t) {
         return e && (ys(e) ? e : lo[e] || function (e) {
            var t, i, n, s, r = (e + "").split("("),
               o = lo[r[0]];
            return o && r.length > 1 && o.config ? o.config.apply(null, ~e.indexOf("{") ? [ho(r[1])] : (t = e, i = t.indexOf("(") + 1, n = t.indexOf(")"), s = t.indexOf("(", i), t.substring(i, ~s && s < n ? t.indexOf(")", n + 1) : n)).split(",").map(sr)) : lo._CE && co.test(e) ? lo._CE("", e) : o
         }(e)) || t
      },
      go = function (e, t, i, n) {
         void 0 === i && (i = function (e) {
            return 1 - t(1 - e)
         }), void 0 === n && (n = function (e) {
            return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2
         });
         var s, r = {
            easeIn: t,
            easeOut: i,
            easeInOut: n
         };
         return Js(e, (function (e) {
            for (var t in lo[e] = Is[e] = r, lo[s = e.toLowerCase()] = i, r) lo[s + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = lo[e + "." + t] = r[t]
         })), r
      },
      bo = function (e) {
         return function (t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
         }
      },
      yo = function e(t, i, n) {
         var s = i >= 1 ? i : 1,
            r = (n || (t ? .3 : .45)) / (i < 1 ? i : 1),
            o = r / hs * (Math.asin(1 / s) || 0),
            a = function (e) {
               return 1 === e ? 1 : s * Math.pow(2, -10 * e) * gs((e - o) * r) + 1
            },
            l = "out" === t ? a : "in" === t ? function (e) {
               return 1 - a(1 - e)
            } : bo(a);
         return r = hs / r, l.config = function (i, n) {
            return e(t, i, n)
         }, l
      },
      vo = function e(t, i) {
         void 0 === i && (i = 1.70158);
         var n = function (e) {
               return e ? --e * e * ((i + 1) * e + i) + 1 : 0
            },
            s = "out" === t ? n : "in" === t ? function (e) {
               return 1 - n(1 - e)
            } : bo(n);
         return s.config = function (i) {
            return e(t, i)
         }, s
      };
   Js("Linear,Quad,Cubic,Quart,Quint,Strong", (function (e, t) {
      var i = t < 5 ? t + 1 : t;
      go(e + ",Power" + (i - 1), t ? function (e) {
         return Math.pow(e, i)
      } : function (e) {
         return e
      }, (function (e) {
         return 1 - Math.pow(1 - e, i)
      }), (function (e) {
         return e < .5 ? Math.pow(2 * e, i) / 2 : 1 - Math.pow(2 * (1 - e), i) / 2
      }))
   })), lo.Linear.easeNone = lo.none = lo.Linear.easeIn, go("Elastic", yo("in"), yo("out"), yo()), ns = 7.5625, rs = 1 / (ss = 2.75), go("Bounce", (function (e) {
      return 1 - os(1 - e)
   }), os = function (e) {
      return e < rs ? ns * e * e : e < .7272727272727273 ? ns * Math.pow(e - 1.5 / ss, 2) + .75 : e < .9090909090909092 ? ns * (e -= 2.25 / ss) * e + .9375 : ns * Math.pow(e - 2.625 / ss, 2) + .984375
   }), go("Expo", (function (e) {
      return e ? Math.pow(2, 10 * (e - 1)) : 0
   })), go("Circ", (function (e) {
      return -(fs(1 - e * e) - 1)
   })), go("Sine", (function (e) {
      return 1 === e ? 1 : 1 - ms(e * ds)
   })), go("Back", vo("in"), vo("out"), vo()), lo.SteppedEase = lo.steps = Is.SteppedEase = {
      config: function (e, t) {
         void 0 === e && (e = 1);
         var i = 1 / e,
            n = e + (t ? 0 : 1),
            s = t ? 1 : 0;
         return function (e) {
            return ((n * Nr(0, .99999999, e) | 0) + s) * i
         }
      }
   }, ls.ease = lo["quad.out"], Js("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function (e) {
      return Xs += e + "," + e + "Params,"
   }));
   var _o = function (e, t) {
         this.id = ps++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Gs, this.set = t ? t.getSetter : Bo
      },
      wo = function () {
         function e(e) {
            this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Cr(this, +e.duration, 1, 1), this.data = e.data, is || oo.wake()
         }
         var t = e.prototype;
         return t.delay = function (e) {
            return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay
         }, t.duration = function (e) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur
         }, t.totalDuration = function (e) {
            return arguments.length ? (this._dirty = 0, Cr(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
         }, t.totalTime = function (e, t) {
            if (ao(), !arguments.length) return this._tTime;
            var i = this._dp;
            if (i && i.smoothChildTiming && this._ts) {
               for (_r(this, e), !i._dp || i.parent || wr(i, this); i && i.parent;) i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), i = i.parent;
               !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Tr(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === us || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), nr(this, e, t)), this
         }, t.time = function (e, t) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + gr(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time
         }, t.totalProgress = function (e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
         }, t.progress = function (e, t) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + gr(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
         }, t.iteration = function (e, t) {
            var i = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (e - 1) * i, t) : this._repeat ? br(this._tTime, i) + 1 : 1
         }, t.timeScale = function (e) {
            if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === e) return this;
            var t = this.parent && this._ts ? yr(this.parent._time, this) : this._tTime;
            return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, fr(this.totalTime(Nr(-this._delay, this._tDur, t), !0)), vr(this), this
         }, t.paused = function (e) {
            return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ao(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== us && (this._tTime -= us)))), this) : this._ps
         }, t.startTime = function (e) {
            if (arguments.length) {
               this._start = e;
               var t = this.parent || this._dp;
               return t && (t._sort || !this.parent) && Tr(t, this, e - this._delay), this
            }
            return this._start
         }, t.endTime = function (e) {
            return this._start + (Ts(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
         }, t.rawTime = function (e) {
            var t = this.parent || this._dp;
            return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? yr(t.rawTime(e), this) : this._tTime : this._tTime
         }, t.globalTime = function (e) {
            for (var t = this, i = arguments.length ? e : t.rawTime(); t;) i = t._start + i / (t._ts || 1), t = t._dp;
            return i
         }, t.repeat = function (e) {
            return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, Sr(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
         }, t.repeatDelay = function (e) {
            if (arguments.length) {
               var t = this._time;
               return this._rDelay = e, Sr(this), t ? this.time(t) : this
            }
            return this._rDelay
         }, t.yoyo = function (e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
         }, t.seek = function (e, t) {
            return this.totalTime(Pr(this, e), Ts(t))
         }, t.restart = function (e, t) {
            return this.play().totalTime(e ? -this._delay : 0, Ts(t))
         }, t.play = function (e, t) {
            return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
         }, t.reverse = function (e, t) {
            return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
         }, t.pause = function (e, t) {
            return null != e && this.seek(e, t), this.paused(!0)
         }, t.resume = function () {
            return this.paused(!1)
         }, t.reversed = function (e) {
            return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -1e-8 : 0)), this) : this._rts < 0
         }, t.invalidate = function () {
            return this._initted = this._act = 0, this._zTime = -1e-8, this
         }, t.isActive = function () {
            var e, t = this.parent || this._dp,
               i = this._start;
            return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= i && e < this.endTime(!0) - us))
         }, t.eventCallback = function (e, t, i) {
            var n = this.vars;
            return arguments.length > 1 ? (t ? (n[e] = t, i && (n[e + "Params"] = i), "onUpdate" === e && (this._onUpdate = t)) : delete n[e], this) : n[e]
         }, t.then = function (e) {
            var t = this;
            return new Promise((function (i) {
               var n = ys(e) ? e : rr,
                  s = function () {
                     var e = t.then;
                     t.then = null, ys(n) && (n = n(t)) && (n.then || n === t) && (t.then = e), i(n), t.then = e
                  };
               t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? s() : t._prom = s
            }))
         }, t.kill = function () {
            Kr(this)
         }, e
      }();
   or(wo.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1
   });
   var To = function (e) {
      function t(t, i) {
         var n;
         return void 0 === t && (t = {}), (n = e.call(this, t) || this).labels = {}, n.smoothChildTiming = !!t.smoothChildTiming, n.autoRemoveChildren = !!t.autoRemoveChildren, n._sort = Ts(t.sortChildren), Kn && Tr(t.parent || Kn, Un(n), i), t.reversed && n.reverse(), t.paused && n.paused(!0), t.scrollTrigger && kr(Un(n), t.scrollTrigger), n
      }
      Yn(t, e);
      var i = t.prototype;
      return i.to = function (e, t, i) {
         return Mr(0, arguments, this), this
      }, i.from = function (e, t, i) {
         return Mr(1, arguments, this), this
      }, i.fromTo = function (e, t, i, n) {
         return Mr(2, arguments, this), this
      }, i.set = function (e, t, i) {
         return t.duration = 0, t.parent = this, ur(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new Lo(e, t, Pr(this, i), 1), this
      }, i.call = function (e, t, i) {
         return Tr(this, Lo.delayedCall(0, e, t), i)
      }, i.staggerTo = function (e, t, i, n, s, r, o) {
         return i.duration = t, i.stagger = i.stagger || n, i.onComplete = r, i.onCompleteParams = o, i.parent = this, new Lo(e, i, Pr(this, s)), this
      }, i.staggerFrom = function (e, t, i, n, s, r, o) {
         return i.runBackwards = 1, ur(i).immediateRender = Ts(i.immediateRender), this.staggerTo(e, t, i, n, s, r, o)
      }, i.staggerFromTo = function (e, t, i, n, s, r, o, a) {
         return n.startAt = i, ur(n).immediateRender = Ts(n.immediateRender), this.staggerTo(e, t, n, s, r, o, a)
      }, i.render = function (e, t, i) {
         var n, s, r, o, a, l, c, u, h, d, p, f, m = this._time,
            g = this._dirty ? this.totalDuration() : this._tDur,
            b = this._dur,
            y = e <= 0 ? 0 : er(e),
            v = this._zTime < 0 != e < 0 && (this._initted || !b);
         if (this !== Kn && y > g && e >= 0 && (y = g), y !== this._tTime || i || v) {
            if (m !== this._time && b && (y += this._time - m, e += this._time - m), n = y, h = this._start, l = !(u = this._ts), v && (b || (m = this._zTime), (e || !t) && (this._zTime = e)), this._repeat) {
               if (p = this._yoyo, a = b + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(100 * a + e, t, i);
               if (n = er(y % a), y === g ? (o = this._repeat, n = b) : ((o = ~~(y / a)) && o === y / a && (n = b, o--), n > b && (n = b)), d = br(this._tTime, a), !m && this._tTime && d !== o && (d = o), p && 1 & o && (n = b - n, f = 1), o !== d && !this._lock) {
                  var _ = p && 1 & d,
                     w = _ === (p && 1 & o);
                  if (o < d && (_ = !_), m = _ ? 0 : b, this._lock = 1, this.render(m || (f ? 0 : er(o * a)), t, !b)._lock = 0, this._tTime = y, !t && this.parent && Xr(this, "onRepeat"), this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1), m && m !== this._time || l !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                  if (b = this._dur, g = this._tDur, w && (this._lock = 2, m = _ ? b : -1e-4, this.render(m, !0), this.vars.repeatRefresh && !f && this.invalidate()), this._lock = 0, !this._ts && !l) return this;
                  fo(this, f)
               }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (c = function (e, t, i) {
                  var n;
                  if (i > t)
                     for (n = e._first; n && n._start <= i;) {
                        if ("isPause" === n.data && n._start > t) return n;
                        n = n._next
                     } else
                        for (n = e._last; n && n._start >= i;) {
                           if ("isPause" === n.data && n._start < t) return n;
                           n = n._prev
                        }
               }(this, er(m), er(n)), c && (y -= n - (n = c._start))), this._tTime = y, this._time = n, this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e, m = 0), !m && n && !t && (Xr(this, "onStart"), this._tTime !== y)) return this;
            if (n >= m && e >= 0)
               for (s = this._first; s;) {
                  if (r = s._next, (s._act || n >= s._start) && s._ts && c !== s) {
                     if (s.parent !== this) return this.render(e, t, i);
                     if (s.render(s._ts > 0 ? (n - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (n - s._start) * s._ts, t, i), n !== this._time || !this._ts && !l) {
                        c = 0, r && (y += this._zTime = -1e-8);
                        break
                     }
                  }
                  s = r
               } else {
                  s = this._last;
                  for (var T = e < 0 ? e : n; s;) {
                     if (r = s._prev, (s._act || T <= s._end) && s._ts && c !== s) {
                        if (s.parent !== this) return this.render(e, t, i);
                        if (s.render(s._ts > 0 ? (T - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (T - s._start) * s._ts, t, i), n !== this._time || !this._ts && !l) {
                           c = 0, r && (y += this._zTime = T ? -1e-8 : us);
                           break
                        }
                     }
                     s = r
                  }
               }
            if (c && !t && (this.pause(), c.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1, this._ts)) return this._start = h, vr(this), this.render(e, t, i);
            this._onUpdate && !t && Xr(this, "onUpdate", !0), (y === g && g >= this.totalDuration() || !y && m) && (h !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || ((e || !b) && (y === g && this._ts > 0 || !y && this._ts < 0) && dr(this, 1), t || e < 0 && !m || !y && !m && g || (Xr(this, y === g && e >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(y < g && this.timeScale() > 0) && this._prom())))
         }
         return this
      }, i.add = function (e, t) {
         var i = this;
         if (vs(t) || (t = Pr(this, t, e)), !(e instanceof wo)) {
            if (As(e)) return e.forEach((function (e) {
               return i.add(e, t)
            })), this;
            if (bs(e)) return this.addLabel(e, t);
            if (!ys(e)) return this;
            e = Lo.delayedCall(0, e)
         }
         return this !== e ? Tr(this, e, t) : this
      }, i.getChildren = function (e, t, i, n) {
         void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === i && (i = !0), void 0 === n && (n = -1e8);
         for (var s = [], r = this._first; r;) r._start >= n && (r instanceof Lo ? t && s.push(r) : (i && s.push(r), e && s.push.apply(s, r.getChildren(!0, t, i)))), r = r._next;
         return s
      }, i.getById = function (e) {
         for (var t = this.getChildren(1, 1, 1), i = t.length; i--;)
            if (t[i].vars.id === e) return t[i]
      }, i.remove = function (e) {
         return bs(e) ? this.removeLabel(e) : ys(e) ? this.killTweensOf(e) : (hr(this, e), e === this._recent && (this._recent = this._last), pr(this))
      }, i.totalTime = function (t, i) {
         return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = er(oo.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, i), this._forcing = 0, this) : this._tTime
      }, i.addLabel = function (e, t) {
         return this.labels[e] = Pr(this, t), this
      }, i.removeLabel = function (e) {
         return delete this.labels[e], this
      }, i.addPause = function (e, t, i) {
         var n = Lo.delayedCall(0, t || Hs, i);
         return n.data = "isPause", this._hasPause = 1, Tr(this, n, Pr(this, e))
      }, i.removePause = function (e) {
         var t = this._first;
         for (e = Pr(this, e); t;) t._start === e && "isPause" === t.data && dr(t), t = t._next
      }, i.killTweensOf = function (e, t, i) {
         for (var n = this.getTweensOf(e, i), s = n.length; s--;) ko !== n[s] && n[s].kill(e, t);
         return this
      }, i.getTweensOf = function (e, t) {
         for (var i, n = [], s = jr(e), r = this._first, o = vs(t); r;) r instanceof Lo ? tr(r._targets, s) && (o ? (!ko || r._initted && r._ts) && r.globalTime(0) <= t && r.globalTime(r.totalDuration()) > t : !t || r.isActive()) && n.push(r) : (i = r.getTweensOf(s, t)).length && n.push.apply(n, i), r = r._next;
         return n
      }, i.tweenTo = function (e, t) {
         t = t || {};
         var i, n = this,
            s = Pr(n, e),
            r = t,
            o = r.startAt,
            a = r.onStart,
            l = r.onStartParams,
            c = r.immediateRender,
            u = Lo.to(n, or({
               ease: t.ease || "none",
               lazy: !1,
               immediateRender: !1,
               time: s,
               overwrite: "auto",
               duration: t.duration || Math.abs((s - (o && "time" in o ? o.time : n._time)) / n.timeScale()) || us,
               onStart: function () {
                  if (n.pause(), !i) {
                     var e = t.duration || Math.abs((s - (o && "time" in o ? o.time : n._time)) / n.timeScale());
                     u._dur !== e && Cr(u, e, 0, 1).render(u._time, !0, !0), i = 1
                  }
                  a && a.apply(u, l || [])
               }
            }, t));
         return c ? u.render(0) : u
      }, i.tweenFromTo = function (e, t, i) {
         return this.tweenTo(t, or({
            startAt: {
               time: Pr(this, e)
            }
         }, i))
      }, i.recent = function () {
         return this._recent
      }, i.nextLabel = function (e) {
         return void 0 === e && (e = this._time), Yr(this, Pr(this, e))
      }, i.previousLabel = function (e) {
         return void 0 === e && (e = this._time), Yr(this, Pr(this, e), 1)
      }, i.currentLabel = function (e) {
         return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + us)
      }, i.shiftChildren = function (e, t, i) {
         void 0 === i && (i = 0);
         for (var n, s = this._first, r = this.labels; s;) s._start >= i && (s._start += e, s._end += e), s = s._next;
         if (t)
            for (n in r) r[n] >= i && (r[n] += e);
         return pr(this)
      }, i.invalidate = function () {
         var t = this._first;
         for (this._lock = 0; t;) t.invalidate(), t = t._next;
         return e.prototype.invalidate.call(this)
      }, i.clear = function (e) {
         void 0 === e && (e = !0);
         for (var t, i = this._first; i;) t = i._next, this.remove(i), i = t;
         return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), pr(this)
      }, i.totalDuration = function (e) {
         var t, i, n, s = 0,
            r = this,
            o = r._last,
            a = cs;
         if (arguments.length) return r.timeScale((r._repeat < 0 ? r.duration() : r.totalDuration()) / (r.reversed() ? -e : e));
         if (r._dirty) {
            for (n = r.parent; o;) t = o._prev, o._dirty && o.totalDuration(), (i = o._start) > a && r._sort && o._ts && !r._lock ? (r._lock = 1, Tr(r, o, i - o._delay, 1)._lock = 0) : a = i, i < 0 && o._ts && (s -= i, (!n && !r._dp || n && n.smoothChildTiming) && (r._start += i / r._ts, r._time -= i, r._tTime -= i), r.shiftChildren(-i, !1, -Infinity), a = 0), o._end > s && o._ts && (s = o._end), o = t;
            Cr(r, r === Kn && r._time > s ? r._time : s, 1, 1), r._dirty = 0
         }
         return r._tDur
      }, t.updateRoot = function (e) {
         if (Kn._ts && (nr(Kn, yr(e, Kn)), es = oo.frame), oo.frame >= Us) {
            Us += as.autoSleep || 120;
            var t = Kn._first;
            if ((!t || !t._ts) && as.autoSleep && oo._listeners.length < 2) {
               for (; t && !t._ts;) t = t._next;
               t || oo.sleep()
            }
         }
      }, t
   }(wo);
   or(To.prototype, {
      _lock: 0,
      _hasPause: 0,
      _forcing: 0
   });
   var ko, Eo = function (e, t, i, n, s, r, o) {
         var a, l, c, u, h, d, p, f, m = new Uo(this._pt, e, t, 0, 1, Ho, null, s),
            g = 0,
            b = 0;
         for (m.b = i, m.e = n, i += "", (p = ~(n += "").indexOf("random(")) && (n = Wr(n)), r && (r(f = [i, n], e, t), i = f[0], n = f[1]), l = i.match(Ps) || []; a = Ps.exec(n);) u = a[0], h = n.substring(g, a.index), c ? c = (c + 1) % 5 : "rgba(" === h.substr(-5) && (c = 1), u !== l[b++] && (d = parseFloat(l[b - 1]) || 0, m._pt = {
            _next: m._pt,
            p: h || 1 === b ? h : ",",
            s: d,
            c: "=" === u.charAt(1) ? parseFloat(u.substr(2)) * ("-" === u.charAt(0) ? -1 : 1) : parseFloat(u) - d,
            m: c && c < 4 ? Math.round : 0
         }, g = Ps.lastIndex);
         return m.c = g < n.length ? n.substring(g, n.length) : "", m.fp = o, (Ms.test(n) || p) && (m.e = 0), this._pt = m, m
      },
      xo = function (e, t, i, n, s, r, o, a, l) {
         ys(n) && (n = n(s || 0, e, r));
         var c, u = e[t],
            h = "get" !== i ? i : ys(u) ? l ? e[t.indexOf("set") || !ys(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : u,
            d = ys(u) ? l ? Do : Io : No;
         if (bs(n) && (~n.indexOf("random(") && (n = Wr(n)), "=" === n.charAt(1) && ((c = parseFloat(h) + parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) + (Ir(h) || 0)) || 0 === c) && (n = c)), h !== n) return isNaN(h * n) || "" === n ? (!u && !(t in e) && Bs(t, n), Eo.call(this, e, t, h, n, d, a || as.stringFilter, l)) : (c = new Uo(this._pt, e, t, +h || 0, n - (h || 0), "boolean" == typeof u ? Fo : jo, 0, d), l && (c.fp = l), o && c.modifier(o, this, e), this._pt = c)
      },
      Ao = function (e, t, i, n, s, r) {
         var o, a, l, c;
         if (qs[e] && !1 !== (o = new qs[e]).init(s, o.rawVars ? t[e] : function (e, t, i, n, s) {
               if (ys(e) && (e = Oo(e, s, t, i, n)), !ws(e) || e.style && e.nodeType || As(e) || xs(e)) return bs(e) ? Oo(e, s, t, i, n) : e;
               var r, o = {};
               for (r in e) o[r] = Oo(e[r], s, t, i, n);
               return o
            }(t[e], n, s, r, i), i, n, r) && (i._pt = a = new Uo(i._pt, s, e, 0, 1, o.render, o, 0, o.priority), i !== ts))
            for (l = i._ptLookup[i._targets.indexOf(s)], c = o._props.length; c--;) l[o._props[c]] = a;
         return o
      },
      Co = function e(t, i) {
         var n, s, r, o, a, l, c, u, h, d, p, f, m, g = t.vars,
            b = g.ease,
            y = g.startAt,
            v = g.immediateRender,
            _ = g.lazy,
            w = g.onUpdate,
            T = g.onUpdateParams,
            k = g.callbackScope,
            E = g.runBackwards,
            x = g.yoyoEase,
            A = g.keyframes,
            C = g.autoRevert,
            S = t._dur,
            O = t._startAt,
            P = t._targets,
            M = t.parent,
            L = M && "nested" === M.data ? M.parent._targets : P,
            N = "auto" === t._overwrite && !Xn,
            I = t.timeline;
         if (I && (!A || !b) && (b = "none"), t._ease = mo(b, ls.ease), t._yEase = x ? po(mo(!0 === x ? b : x, ls.ease)) : 0, x && t._yoyo && !t._repeat && (x = t._yEase, t._yEase = t._ease, t._ease = x), t._from = !I && !!g.runBackwards, !I || A && !g.stagger) {
            if (f = (u = P[0] ? Qs(P[0]).harness : 0) && g[u.prop], n = cr(g, $s), O && dr(O.render(-1, !0)), y)
               if (dr(t._startAt = Lo.set(P, or({
                     data: "isStart",
                     overwrite: !1,
                     parent: M,
                     immediateRender: !0,
                     lazy: Ts(_),
                     startAt: null,
                     delay: 0,
                     onUpdate: w,
                     onUpdateParams: T,
                     callbackScope: k,
                     stagger: 0
                  }, y))), i < 0 && !v && !C && t._startAt.render(-1, !0), v) {
                  if (i > 0 && !C && (t._startAt = 0), S && i <= 0) return void(i && (t._zTime = i))
               } else !1 === C && (t._startAt = 0);
            else if (E && S)
               if (O) !C && (t._startAt = 0);
               else if (i && (v = !1), r = or({
                  overwrite: !1,
                  data: "isFromStart",
                  lazy: v && Ts(_),
                  immediateRender: v,
                  stagger: 0,
                  parent: M
               }, n), f && (r[u.prop] = f), dr(t._startAt = Lo.set(P, r)), i < 0 && t._startAt.render(-1, !0), t._zTime = i, v) {
               if (!i) return
            } else e(t._startAt, us);
            for (t._pt = 0, _ = S && Ts(_) || _ && !S, s = 0; s < P.length; s++) {
               if (c = (a = P[s])._gsap || Ks(P)[s]._gsap, t._ptLookup[s] = d = {}, Vs[c.id] && zs.length && ir(), p = L === P ? s : L.indexOf(a), u && !1 !== (h = new u).init(a, f || n, t, p, L) && (t._pt = o = new Uo(t._pt, a, h.name, 0, 1, h.render, h, 0, h.priority),
                     h._props.forEach((function (e) {
                        d[e] = o
                     })), h.priority && (l = 1)), !u || f)
                  for (r in n) qs[r] && (h = Ao(r, n, t, p, a, L)) ? h.priority && (l = 1) : d[r] = o = xo.call(t, a, r, "get", n[r], p, L, 0, g.stringFilter);
               t._op && t._op[s] && t.kill(a, t._op[s]), N && t._pt && (ko = t, Kn.killTweensOf(a, d, t.globalTime(i)), m = !t.parent, ko = 0), t._pt && _ && (Vs[c.id] = 1)
            }
            l && Wo(t), t._onInit && t._onInit(t)
         }
         t._onUpdate = w, t._initted = (!t._op || t._pt) && !m, A && i <= 0 && I.render(cs, !0, !0)
      },
      So = function (e, t, i, n) {
         var s, r, o = t.ease || n || "power1.inOut";
         if (As(t)) r = i[e] || (i[e] = []), t.forEach((function (e, i) {
            return r.push({
               t: i / (t.length - 1) * 100,
               v: e,
               e: o
            })
         }));
         else
            for (s in t) r = i[s] || (i[s] = []), "ease" === s || r.push({
               t: parseFloat(e),
               v: t[s],
               e: o
            })
      },
      Oo = function (e, t, i, n, s) {
         return ys(e) ? e.call(t, i, n, s) : bs(e) && ~e.indexOf("random(") ? Wr(e) : e
      },
      Po = Xs + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      Mo = {};
   Js(Po + ",id,stagger,delay,duration,paused,scrollTrigger", (function (e) {
      return Mo[e] = 1
   }));
   var Lo = function (e) {
      function t(t, i, n, s) {
         var r;
         "number" == typeof i && (n.duration = i, i = n, n = null);
         var o, a, l, c, u, h, d, p, f = (r = e.call(this, s ? i : ur(i)) || this).vars,
            m = f.duration,
            g = f.delay,
            b = f.immediateRender,
            y = f.stagger,
            v = f.overwrite,
            _ = f.keyframes,
            w = f.defaults,
            T = f.scrollTrigger,
            k = f.yoyoEase,
            E = i.parent || Kn,
            x = (As(t) || xs(t) ? vs(t[0]) : "length" in i) ? [t] : jr(t);
         if (r._targets = x.length ? Ks(x) : js("GSAP target " + t + " not found. https://greensock.com", !as.nullTargetWarn) || [], r._ptLookup = [], r._overwrite = v, _ || y || Es(m) || Es(g)) {
            if (i = r.vars, (o = r.timeline = new To({
                  data: "nested",
                  defaults: w || {}
               })).kill(), o.parent = o._dp = Un(r), o._start = 0, y || Es(m) || Es(g)) {
               if (c = x.length, d = y && Hr(y), ws(y))
                  for (u in y) ~Po.indexOf(u) && (p || (p = {}), p[u] = y[u]);
               for (a = 0; a < c; a++)(l = cr(i, Mo)).stagger = 0, k && (l.yoyoEase = k), p && ar(l, p), h = x[a], l.duration = +Oo(m, Un(r), a, h, x), l.delay = (+Oo(g, Un(r), a, h, x) || 0) - r._delay, !y && 1 === c && l.delay && (r._delay = g = l.delay, r._start += g, l.delay = 0), o.to(h, l, d ? d(a, h, x) : 0), o._ease = lo.none;
               o.duration() ? m = g = 0 : r.timeline = 0
            } else if (_) {
               ur(or(o.vars.defaults, {
                  ease: "none"
               })), o._ease = mo(_.ease || i.ease || "none");
               var A, C, S, O = 0;
               if (As(_)) _.forEach((function (e) {
                  return o.to(x, e, ">")
               }));
               else {
                  for (u in l = {}, _) "ease" === u || "easeEach" === u || So(u, _[u], l, _.easeEach);
                  for (u in l)
                     for (A = l[u].sort((function (e, t) {
                           return e.t - t.t
                        })), O = 0, a = 0; a < A.length; a++)(S = {
                        ease: (C = A[a]).e,
                        duration: (C.t - (a ? A[a - 1].t : 0)) / 100 * m
                     })[u] = C.v, o.to(x, S, O), O += S.duration;
                  o.duration() < m && o.to({}, {
                     duration: m - o.duration()
                  })
               }
            }
            m || r.duration(m = o.duration())
         } else r.timeline = 0;
         return !0 !== v || Xn || (ko = Un(r), Kn.killTweensOf(x), ko = 0), Tr(E, Un(r), n), i.reversed && r.reverse(), i.paused && r.paused(!0), (b || !m && !_ && r._start === er(E._time) && Ts(b) && mr(Un(r)) && "nested" !== E.data) && (r._tTime = -1e-8, r.render(Math.max(0, -g))), T && kr(Un(r), T), r
      }
      Yn(t, e);
      var i = t.prototype;
      return i.render = function (e, t, i) {
         var n, s, r, o, a, l, c, u, h, d = this._time,
            p = this._tDur,
            f = this._dur,
            m = e > p - us && e >= 0 ? p : e < us ? 0 : e;
         if (f) {
            if (m !== this._tTime || !e || i || !this._initted && this._tTime || this._startAt && this._zTime < 0 != e < 0) {
               if (n = m, u = this.timeline, this._repeat) {
                  if (o = f + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(100 * o + e, t, i);
                  if (n = er(m % o), m === p ? (r = this._repeat, n = f) : ((r = ~~(m / o)) && r === m / o && (n = f, r--), n > f && (n = f)), (l = this._yoyo && 1 & r) && (h = this._yEase, n = f - n), a = br(this._tTime, o), n === d && !i && this._initted) return this;
                  r !== a && (u && this._yEase && fo(u, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = i = 1, this.render(er(o * r), !0).invalidate()._lock = 0))
               }
               if (!this._initted) {
                  if (Er(this, e < 0 ? e : n, i, t)) return this._tTime = 0, this;
                  if (f !== this._dur) return this.render(e, t, i)
               }
               if (this._tTime = m, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = c = (h || this._ease)(n / f), this._from && (this.ratio = c = 1 - c), n && !d && !t && (Xr(this, "onStart"), this._tTime !== m)) return this;
               for (s = this._pt; s;) s.r(c, s.d), s = s._next;
               u && u.render(e < 0 ? e : !n && l ? -1e-8 : u._dur * u._ease(n / this._dur), t, i) || this._startAt && (this._zTime = e), this._onUpdate && !t && (e < 0 && this._startAt && this._startAt.render(e, !0, i), Xr(this, "onUpdate")), this._repeat && r !== a && this.vars.onRepeat && !t && this.parent && Xr(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (e < 0 && this._startAt && !this._onUpdate && this._startAt.render(e, !0, !0), (e || !f) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0) && dr(this, 1), t || e < 0 && !d || !m && !d || (Xr(this, m === p ? "onComplete" : "onReverseComplete", !0), this._prom && !(m < p && this.timeScale() > 0) && this._prom()))
            }
         } else ! function (e, t, i, n) {
            var s, r, o, a = e.ratio,
               l = t < 0 || !t && (!e._start && xr(e) && (e._initted || !Ar(e)) || (e._ts < 0 || e._dp._ts < 0) && !Ar(e)) ? 0 : 1,
               c = e._rDelay,
               u = 0;
            if (c && e._repeat && (u = Nr(0, e._tDur, t), r = br(u, c), e._yoyo && 1 & r && (l = 1 - l), r !== br(e._tTime, c) && (a = 1 - l, e.vars.repeatRefresh && e._initted && e.invalidate())), l !== a || n || e._zTime === us || !t && e._zTime) {
               if (!e._initted && Er(e, t, n, i)) return;
               for (o = e._zTime, e._zTime = t || (i ? us : 0), i || (i = t && !o), e.ratio = l, e._from && (l = 1 - l), e._time = 0, e._tTime = u, s = e._pt; s;) s.r(l, s.d), s = s._next;
               e._startAt && t < 0 && e._startAt.render(t, !0, !0), e._onUpdate && !i && Xr(e, "onUpdate"), u && e._repeat && !i && e.parent && Xr(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === l && (l && dr(e, 1), i || (Xr(e, l ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()))
            } else e._zTime || (e._zTime = t)
         }(this, e, t, i);
         return this
      }, i.targets = function () {
         return this._targets
      }, i.invalidate = function () {
         return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), e.prototype.invalidate.call(this)
      }, i.kill = function (e, t) {
         if (void 0 === t && (t = "all"), !(e || t && "all" !== t)) return this._lazy = this._pt = 0, this.parent ? Kr(this) : this;
         if (this.timeline) {
            var i = this.timeline.totalDuration();
            return this.timeline.killTweensOf(e, t, ko && !0 !== ko.vars.overwrite)._first || Kr(this), this.parent && i !== this.timeline.totalDuration() && Cr(this, this._dur * this.timeline._tDur / i, 0, 1), this
         }
         var n, s, r, o, a, l, c, u = this._targets,
            h = e ? jr(e) : u,
            d = this._ptLookup,
            p = this._pt;
         if ((!t || "all" === t) && function (e, t) {
               for (var i = e.length, n = i === t.length; n && i-- && e[i] === t[i];);
               return i < 0
            }(u, h)) return "all" === t && (this._pt = 0), Kr(this);
         for (n = this._op = this._op || [], "all" !== t && (bs(t) && (a = {}, Js(t, (function (e) {
               return a[e] = 1
            })), t = a), t = function (e, t) {
               var i, n, s, r, o = e[0] ? Qs(e[0]).harness : 0,
                  a = o && o.aliases;
               if (!a) return t;
               for (n in i = ar({}, t), a)
                  if (n in i)
                     for (s = (r = a[n].split(",")).length; s--;) i[r[s]] = i[n];
               return i
            }(u, t)), c = u.length; c--;)
            if (~h.indexOf(u[c]))
               for (a in s = d[c], "all" === t ? (n[c] = t, o = s, r = {}) : (r = n[c] = n[c] || {}, o = t), o)(l = s && s[a]) && ("kill" in l.d && !0 !== l.d.kill(a) || hr(this, l, "_pt"), delete s[a]), "all" !== r && (r[a] = 1);
         return this._initted && !this._pt && p && Kr(this), this
      }, t.to = function (e, i) {
         return new t(e, i, arguments[2])
      }, t.from = function (e, t) {
         return Mr(1, arguments)
      }, t.delayedCall = function (e, i, n, s) {
         return new t(i, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: e,
            onComplete: i,
            onReverseComplete: i,
            onCompleteParams: n,
            onReverseCompleteParams: n,
            callbackScope: s
         })
      }, t.fromTo = function (e, t, i) {
         return Mr(2, arguments)
      }, t.set = function (e, i) {
         return i.duration = 0, i.repeatDelay || (i.repeat = 0), new t(e, i)
      }, t.killTweensOf = function (e, t, i) {
         return Kn.killTweensOf(e, t, i)
      }, t
   }(wo);
   or(Lo.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0
   }), Js("staggerTo,staggerFrom,staggerFromTo", (function (e) {
      Lo[e] = function () {
         var t = new To,
            i = Dr.call(arguments, 0);
         return i.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, i)
      }
   }));
   var No = function (e, t, i) {
         return e[t] = i
      },
      Io = function (e, t, i) {
         return e[t](i)
      },
      Do = function (e, t, i, n) {
         return e[t](n.fp, i)
      },
      Ro = function (e, t, i) {
         return e.setAttribute(t, i)
      },
      Bo = function (e, t) {
         return ys(e[t]) ? Io : _s(e[t]) && e.setAttribute ? Ro : No
      },
      jo = function (e, t) {
         return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t)
      },
      Fo = function (e, t) {
         return t.set(t.t, t.p, !!(t.s + t.c * e), t)
      },
      Ho = function (e, t) {
         var i = t._pt,
            n = "";
         if (!e && t.b) n = t.b;
         else if (1 === e && t.e) n = t.e;
         else {
            for (; i;) n = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round(1e4 * (i.s + i.c * e)) / 1e4) + n, i = i._next;
            n += t.c
         }
         t.set(t.t, t.p, n, t)
      },
      $o = function (e, t) {
         for (var i = t._pt; i;) i.r(e, i.d), i = i._next
      },
      zo = function (e, t, i, n) {
         for (var s, r = this._pt; r;) s = r._next, r.p === n && r.modifier(e, t, i), r = s
      },
      Vo = function (e) {
         for (var t, i, n = this._pt; n;) i = n._next, n.p === e && !n.op || n.op === e ? hr(this, n, "_pt") : n.dep || (t = 1), n = i;
         return !t
      },
      qo = function (e, t, i, n) {
         n.mSet(e, t, n.m.call(n.tween, i, n.mt), n)
      },
      Wo = function (e) {
         for (var t, i, n, s, r = e._pt; r;) {
            for (t = r._next, i = n; i && i.pr > r.pr;) i = i._next;
            (r._prev = i ? i._prev : s) ? r._prev._next = r: n = r, (r._next = i) ? i._prev = r : s = r, r = t
         }
         e._pt = n
      },
      Uo = function () {
         function e(e, t, i, n, s, r, o, a, l) {
            this.t = t, this.s = n, this.c = s, this.p = i, this.r = r || jo, this.d = o || this, this.set = a || No, this.pr = l || 0, this._next = e, e && (e._prev = this)
         }
         return e.prototype.modifier = function (e, t, i) {
            this.mSet = this.mSet || this.set, this.set = qo, this.m = e, this.mt = i, this.tween = t
         }, e
      }();
   Js(Xs + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function (e) {
      return $s[e] = 1
   })), Is.TweenMax = Is.TweenLite = Lo, Is.TimelineLite = Is.TimelineMax = To, Kn = new To({
      sortChildren: !1,
      defaults: ls,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0
   }), as.stringFilter = ro;
   var Yo = {
      registerPlugin: function () {
         for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
         t.forEach((function (e) {
            return Qr(e)
         }))
      },
      timeline: function (e) {
         return new To(e)
      },
      getTweensOf: function (e, t) {
         return Kn.getTweensOf(e, t)
      },
      getProperty: function (e, t, i, n) {
         bs(e) && (e = jr(e)[0]);
         var s = Qs(e || {}).get,
            r = i ? rr : sr;
         return "native" === i && (i = ""), e ? t ? r((qs[t] && qs[t].get || s)(e, t, i, n)) : function (t, i, n) {
            return r((qs[t] && qs[t].get || s)(e, t, i, n))
         } : e
      },
      quickSetter: function (e, t, i) {
         if ((e = jr(e)).length > 1) {
            var n = e.map((function (e) {
                  return Qo.quickSetter(e, t, i)
               })),
               s = n.length;
            return function (e) {
               for (var t = s; t--;) n[t](e)
            }
         }
         e = e[0] || {};
         var r = qs[t],
            o = Qs(e),
            a = o.harness && (o.harness.aliases || {})[t] || t,
            l = r ? function (t) {
               var n = new r;
               ts._pt = 0, n.init(e, i ? t + i : t, ts, 0, [e]), n.render(1, n), ts._pt && $o(1, ts)
            } : o.set(e, a);
         return r ? l : function (t) {
            return l(e, a, i ? t + i : t, o, 1)
         }
      },
      isTweening: function (e) {
         return Kn.getTweensOf(e, !0).length > 0
      },
      defaults: function (e) {
         return e && e.ease && (e.ease = mo(e.ease, ls.ease)), lr(ls, e || {})
      },
      config: function (e) {
         return lr(as, e || {})
      },
      registerEffect: function (e) {
         var t = e.name,
            i = e.effect,
            n = e.plugins,
            s = e.defaults,
            r = e.extendTimeline;
         (n || "").split(",").forEach((function (e) {
            return e && !qs[e] && !Is[e] && js(t + " effect requires " + e + " plugin.")
         })), Ws[t] = function (e, t, n) {
            return i(jr(e), or(t || {}, s), n)
         }, r && (To.prototype[t] = function (e, i, n) {
            return this.add(Ws[t](e, ws(i) ? i : (n = i) && {}, this), n)
         })
      },
      registerEase: function (e, t) {
         lo[e] = mo(t)
      },
      parseEase: function (e, t) {
         return arguments.length ? mo(e, t) : lo
      },
      getById: function (e) {
         return Kn.getById(e)
      },
      exportRoot: function (e, t) {
         void 0 === e && (e = {});
         var i, n, s = new To(e);
         for (s.smoothChildTiming = Ts(e.smoothChildTiming), Kn.remove(s), s._dp = 0, s._time = s._tTime = Kn._time, i = Kn._first; i;) n = i._next, !t && !i._dur && i instanceof Lo && i.vars.onComplete === i._targets[0] || Tr(s, i, i._start - i._delay), i = n;
         return Tr(Kn, s, 0), s
      },
      utils: {
         wrap: function e(t, i, n) {
            var s = i - t;
            return As(t) ? qr(t, e(0, t.length), i) : Lr(n, (function (e) {
               return (s + (e - t) % s) % s + t
            }))
         },
         wrapYoyo: function e(t, i, n) {
            var s = i - t,
               r = 2 * s;
            return As(t) ? qr(t, e(0, t.length - 1), i) : Lr(n, (function (e) {
               return t + ((e = (r + (e - t) % r) % r || 0) > s ? r - e : e)
            }))
         },
         distribute: Hr,
         random: Vr,
         snap: zr,
         normalize: function (e, t, i) {
            return Ur(e, t, 0, 1, i)
         },
         getUnit: Ir,
         clamp: function (e, t, i) {
            return Lr(i, (function (i) {
               return Nr(e, t, i)
            }))
         },
         splitColor: eo,
         toArray: jr,
         selector: function (e) {
            return e = jr(e)[0] || js("Invalid scope") || {},
               function (t) {
                  var i = e.current || e.nativeElement || e;
                  return jr(t, i.querySelectorAll ? i : i === e ? js("Invalid scope") || Jn.createElement("div") : e)
               }
         },
         mapRange: Ur,
         pipe: function () {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return function (e) {
               return t.reduce((function (e, t) {
                  return t(e)
               }), e)
            }
         },
         unitize: function (e, t) {
            return function (i) {
               return e(parseFloat(i)) + (t || Ir(i))
            }
         },
         interpolate: function e(t, i, n, s) {
            var r = isNaN(t + i) ? 0 : function (e) {
               return (1 - e) * t + e * i
            };
            if (!r) {
               var o, a, l, c, u, h = bs(t),
                  d = {};
               if (!0 === n && (s = 1) && (n = null), h) t = {
                  p: t
               }, i = {
                  p: i
               };
               else if (As(t) && !As(i)) {
                  for (l = [], c = t.length, u = c - 2, a = 1; a < c; a++) l.push(e(t[a - 1], t[a]));
                  c--, r = function (e) {
                     e *= c;
                     var t = Math.min(u, ~~e);
                     return l[t](e - t)
                  }, n = i
               } else s || (t = ar(As(t) ? [] : {}, t));
               if (!l) {
                  for (o in i) xo.call(d, t, o, "get", i[o]);
                  r = function (e) {
                     return $o(e, d) || (h ? t.p : t)
                  }
               }
            }
            return Lr(n, r)
         },
         shuffle: Fr
      },
      install: Rs,
      effects: Ws,
      ticker: oo,
      updateRoot: To.updateRoot,
      plugins: qs,
      globalTimeline: Kn,
      core: {
         PropTween: Uo,
         globals: Fs,
         Tween: Lo,
         Timeline: To,
         Animation: wo,
         getCache: Qs,
         _removeLinkedListItem: hr,
         suppressOverwrites: function (e) {
            return Xn = e
         }
      }
   };
   Js("to,from,fromTo,delayedCall,set,killTweensOf", (function (e) {
      return Yo[e] = Lo[e]
   })), oo.add(To.updateRoot), ts = Yo.to({}, {
      duration: 0
   });
   var Xo = function (e, t) {
         for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t;) i = i._next;
         return i
      },
      Ko = function (e, t) {
         return {
            name: e,
            rawVars: 1,
            init: function (e, i, n) {
               n._onInit = function (e) {
                  var n, s;
                  if (bs(i) && (n = {}, Js(i, (function (e) {
                        return n[e] = 1
                     })), i = n), t) {
                     for (s in n = {}, i) n[s] = t(i[s]);
                     i = n
                  }! function (e, t) {
                     var i, n, s, r = e._targets;
                     for (i in t)
                        for (n = r.length; n--;)(s = e._ptLookup[n][i]) && (s = s.d) && (s._pt && (s = Xo(s, i)), s && s.modifier && s.modifier(t[i], e, r[n], i))
                  }(e, i)
               }
            }
         }
      },
      Qo = Yo.registerPlugin({
         name: "attr",
         init: function (e, t, i, n, s) {
            var r, o;
            for (r in t)(o = this.add(e, "setAttribute", (e.getAttribute(r) || 0) + "", t[r], n, s, 0, 0, r)) && (o.op = r), this._props.push(r)
         }
      }, {
         name: "endArray",
         init: function (e, t) {
            for (var i = t.length; i--;) this.add(e, i, e[i] || 0, t[i])
         }
      }, Ko("roundProps", $r), Ko("modifiers"), Ko("snap", zr)) || Yo;
   Lo.version = To.version = Qo.version = "3.9.1", Zn = 1, ks() && ao(), lo.Power0, lo.Power1, lo.Power2, lo.Power3, lo.Power4, lo.Linear, lo.Quad, lo.Cubic, lo.Quart, lo.Quint, lo.Strong, lo.Elastic, lo.Back, lo.SteppedEase, lo.Bounce, lo.Sine, lo.Expo, lo.Circ;
   /*!
    * CSSPlugin 3.9.1
    * https://greensock.com
    *
    * Copyright 2008-2021, GreenSock. All rights reserved.
    * Subject to the terms at https://greensock.com/standard-license or for
    * Club GreenSock members, the agreement issued with that membership.
    * @author: Jack Doyle, jack@greensock.com
    */
   var Go, Jo, Zo, ea, ta, ia, na, sa = {},
      ra = 180 / Math.PI,
      oa = Math.PI / 180,
      aa = Math.atan2,
      la = /([A-Z])/g,
      ca = /(?:left|right|width|margin|padding|x)/i,
      ua = /[\s,\(]\S/,
      ha = {
         autoAlpha: "opacity,visibility",
         scale: "scaleX,scaleY",
         alpha: "opacity"
      },
      da = function (e, t) {
         return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
      },
      pa = function (e, t) {
         return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
      },
      fa = function (e, t) {
         return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t)
      },
      ma = function (e, t) {
         var i = t.s + t.c * e;
         t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t)
      },
      ga = function (e, t) {
         return t.set(t.t, t.p, e ? t.e : t.b, t)
      },
      ba = function (e, t) {
         return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t)
      },
      ya = function (e, t, i) {
         return e.style[t] = i
      },
      va = function (e, t, i) {
         return e.style.setProperty(t, i)
      },
      _a = function (e, t, i) {
         return e._gsap[t] = i
      },
      wa = function (e, t, i) {
         return e._gsap.scaleX = e._gsap.scaleY = i
      },
      Ta = function (e, t, i, n, s) {
         var r = e._gsap;
         r.scaleX = r.scaleY = i, r.renderTransform(s, r)
      },
      ka = function (e, t, i, n, s) {
         var r = e._gsap;
         r[t] = i, r.renderTransform(s, r)
      },
      Ea = "transform",
      xa = Ea + "Origin",
      Aa = function (e, t) {
         var i = Jo.createElementNS ? Jo.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Jo.createElement(e);
         return i.style ? i : Jo.createElement(e)
      },
      Ca = function e(t, i, n) {
         var s = getComputedStyle(t);
         return s[i] || s.getPropertyValue(i.replace(la, "-$1").toLowerCase()) || s.getPropertyValue(i) || !n && e(t, Oa(i) || i, 1) || ""
      },
      Sa = "O,Moz,ms,Ms,Webkit".split(","),
      Oa = function (e, t, i) {
         var n = (t || ta).style,
            s = 5;
         if (e in n && !i) return e;
         for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(Sa[s] + e in n););
         return s < 0 ? null : (3 === s ? "ms" : s >= 0 ? Sa[s] : "") + e
      },
      Pa = function () {
         "undefined" != typeof window && window.document && (Go = window, Jo = Go.document, Zo = Jo.documentElement, ta = Aa("div") || {
            style: {}
         }, Aa("div"), Ea = Oa(Ea), xa = Ea + "Origin", ta.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", na = !!Oa("perspective"), ea = 1)
      },
      Ma = function e(t) {
         var i, n = Aa("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            s = this.parentNode,
            r = this.nextSibling,
            o = this.style.cssText;
         if (Zo.appendChild(n), n.appendChild(this), this.style.display = "block", t) try {
            i = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e
         } catch (e) {} else this._gsapBBox && (i = this._gsapBBox());
         return s && (r ? s.insertBefore(this, r) : s.appendChild(this)), Zo.removeChild(n), this.style.cssText = o, i
      },
      La = function (e, t) {
         for (var i = t.length; i--;)
            if (e.hasAttribute(t[i])) return e.getAttribute(t[i])
      },
      Na = function (e) {
         var t;
         try {
            t = e.getBBox()
         } catch (i) {
            t = Ma.call(e, !0)
         }
         return t && (t.width || t.height) || e.getBBox === Ma || (t = Ma.call(e, !0)), !t || t.width || t.x || t.y ? t : {
            x: +La(e, ["x", "cx", "x1"]) || 0,
            y: +La(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
         }
      },
      Ia = function (e) {
         return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !Na(e))
      },
      Da = function (e, t) {
         if (t) {
            var i = e.style;
            t in sa && t !== xa && (t = Ea), i.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), i.removeProperty(t.replace(la, "-$1").toLowerCase())) : i.removeAttribute(t)
         }
      },
      Ra = function (e, t, i, n, s, r) {
         var o = new Uo(e._pt, t, i, 0, 1, r ? ba : ga);
         return e._pt = o, o.b = n, o.e = s, e._props.push(i), o
      },
      Ba = {
         deg: 1,
         rad: 1,
         turn: 1
      },
      ja = function e(t, i, n, s) {
         var r, o, a, l, c = parseFloat(n) || 0,
            u = (n + "").trim().substr((c + "").length) || "px",
            h = ta.style,
            d = ca.test(i),
            p = "svg" === t.tagName.toLowerCase(),
            f = (p ? "client" : "offset") + (d ? "Width" : "Height"),
            m = 100,
            g = "px" === s,
            b = "%" === s;
         return s === u || !c || Ba[s] || Ba[u] ? c : ("px" !== u && !g && (c = e(t, i, n, "px")), l = t.getCTM && Ia(t), !b && "%" !== u || !sa[i] && !~i.indexOf("adius") ? (h[d ? "width" : "height"] = m + (g ? u : s), o = ~i.indexOf("adius") || "em" === s && t.appendChild && !p ? t : t.parentNode, l && (o = (t.ownerSVGElement || {}).parentNode), o && o !== Jo && o.appendChild || (o = Jo.body), (a = o._gsap) && b && a.width && d && a.time === oo.time ? Zs(c / a.width * m) : ((b || "%" === u) && (h.position = Ca(t, "position")), o === t && (h.position = "static"), o.appendChild(ta), r = ta[f], o.removeChild(ta), h.position = "absolute", d && b && ((a = Qs(o)).time = oo.time, a.width = o[f]), Zs(g ? r * c / m : r && c ? m / r * c : 0))) : (r = l ? t.getBBox()[d ? "width" : "height"] : t[f], Zs(b ? c / r * m : c / 100 * r)))
      },
      Fa = function (e, t, i, n) {
         var s;
         return ea || Pa(), t in ha && "transform" !== t && ~(t = ha[t]).indexOf(",") && (t = t.split(",")[0]), sa[t] && "transform" !== t ? (s = Qa(e, n), s = "transformOrigin" !== t ? s[t] : s.svg ? s.origin : Ga(Ca(e, xa)) + " " + s.zOrigin + "px") : (!(s = e.style[t]) || "auto" === s || n || ~(s + "").indexOf("calc(")) && (s = Va[t] && Va[t](e, t, i) || Ca(e, t) || Gs(e, t) || ("opacity" === t ? 1 : 0)), i && !~(s + "").trim().indexOf(" ") ? ja(e, t, s, i) + i : s
      },
      Ha = function (e, t, i, n) {
         if (!i || "none" === i) {
            var s = Oa(t, e, 1),
               r = s && Ca(e, s, 1);
            r && r !== i ? (t = s, i = r) : "borderColor" === t && (i = Ca(e, "borderTopColor"))
         }
         var o, a, l, c, u, h, d, p, f, m, g, b, y = new Uo(this._pt, e.style, t, 0, 1, Ho),
            v = 0,
            _ = 0;
         if (y.b = i, y.e = n, i += "", "auto" === (n += "") && (e.style[t] = n, n = Ca(e, t) || n, e.style[t] = i), ro(o = [i, n]), i = o[0], n = o[1], l = i.match(Os) || [], (n.match(Os) || []).length) {
            for (; a = Os.exec(n);) d = a[0], f = n.substring(v, a.index), u ? u = (u + 1) % 5 : "rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5) || (u = 1), d !== (h = l[_++] || "") && (c = parseFloat(h) || 0, g = h.substr((c + "").length), (b = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)), p = parseFloat(d), m = d.substr((p + "").length), v = Os.lastIndex - m.length, m || (m = m || as.units[t] || g, v === n.length && (n += m, y.e += m)), g !== m && (c = ja(e, t, h, m) || 0), y._pt = {
               _next: y._pt,
               p: f || 1 === _ ? f : ",",
               s: c,
               c: b ? b * p : p - c,
               m: u && u < 4 || "zIndex" === t ? Math.round : 0
            });
            y.c = v < n.length ? n.substring(v, n.length) : ""
         } else y.r = "display" === t && "none" === n ? ba : ga;
         return Ms.test(n) && (y.e = 0), this._pt = y, y
      },
      $a = {
         top: "0%",
         bottom: "100%",
         left: "0%",
         right: "100%",
         center: "50%"
      },
      za = function (e, t) {
         if (t.tween && t.tween._time === t.tween._dur) {
            var i, n, s, r = t.t,
               o = r.style,
               a = t.u,
               l = r._gsap;
            if ("all" === a || !0 === a) o.cssText = "", n = 1;
            else
               for (s = (a = a.split(",")).length; --s > -1;) i = a[s], sa[i] && (n = 1, i = "transformOrigin" === i ? xa : Ea), Da(r, i);
            n && (Da(r, Ea), l && (l.svg && r.removeAttribute("transform"), Qa(r, 1), l.uncache = 1))
         }
      },
      Va = {
         clearProps: function (e, t, i, n, s) {
            if ("isFromStart" !== s.data) {
               var r = e._pt = new Uo(e._pt, t, i, 0, 0, za);
               return r.u = n, r.pr = -10, r.tween = s, e._props.push(i), 1
            }
         }
      },
      qa = [1, 0, 0, 1, 0, 0],
      Wa = {},
      Ua = function (e) {
         return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e
      },
      Ya = function (e) {
         var t = Ca(e, Ea);
         return Ua(t) ? qa : t.substr(7).match(Ss).map(Zs)
      },
      Xa = function (e, t) {
         var i, n, s, r, o = e._gsap || Qs(e),
            a = e.style,
            l = Ya(e);
         return o.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(s = e.transform.baseVal.consolidate().matrix).a, s.b, s.c, s.d, s.e, s.f]).join(",") ? qa : l : (l !== qa || e.offsetParent || e === Zo || o.svg || (s = a.display, a.display = "block", (i = e.parentNode) && e.offsetParent || (r = 1, n = e.nextSibling, Zo.appendChild(e)), l = Ya(e), s ? a.display = s : Da(e, "display"), r && (n ? i.insertBefore(e, n) : i ? i.appendChild(e) : Zo.removeChild(e))), t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
      },
      Ka = function (e, t, i, n, s, r) {
         var o, a, l, c = e._gsap,
            u = s || Xa(e, !0),
            h = c.xOrigin || 0,
            d = c.yOrigin || 0,
            p = c.xOffset || 0,
            f = c.yOffset || 0,
            m = u[0],
            g = u[1],
            b = u[2],
            y = u[3],
            v = u[4],
            _ = u[5],
            w = t.split(" "),
            T = parseFloat(w[0]) || 0,
            k = parseFloat(w[1]) || 0;
         i ? u !== qa && (a = m * y - g * b) && (l = T * (-g / a) + k * (m / a) - (m * _ - g * v) / a, T = T * (y / a) + k * (-b / a) + (b * _ - y * v) / a, k = l) : (T = (o = Na(e)).x + (~w[0].indexOf("%") ? T / 100 * o.width : T), k = o.y + (~(w[1] || w[0]).indexOf("%") ? k / 100 * o.height : k)), n || !1 !== n && c.smooth ? (v = T - h, _ = k - d, c.xOffset = p + (v * m + _ * b) - v, c.yOffset = f + (v * g + _ * y) - _) : c.xOffset = c.yOffset = 0, c.xOrigin = T, c.yOrigin = k, c.smooth = !!n, c.origin = t, c.originIsAbsolute = !!i, e.style[xa] = "0px 0px", r && (Ra(r, c, "xOrigin", h, T), Ra(r, c, "yOrigin", d, k), Ra(r, c, "xOffset", p, c.xOffset), Ra(r, c, "yOffset", f, c.yOffset)), e.setAttribute("data-svg-origin", T + " " + k)
      },
      Qa = function (e, t) {
         var i = e._gsap || new _o(e);
         if ("x" in i && !t && !i.uncache) return i;
         var n, s, r, o, a, l, c, u, h, d, p, f, m, g, b, y, v, _, w, T, k, E, x, A, C, S, O, P, M, L, N, I, D = e.style,
            R = i.scaleX < 0,
            B = "px",
            j = "deg",
            F = Ca(e, xa) || "0";
         return n = s = r = l = c = u = h = d = p = 0, o = a = 1, i.svg = !(!e.getCTM || !Ia(e)), g = Xa(e, i.svg), i.svg && (A = (!i.uncache || "0px 0px" === F) && !t && e.getAttribute("data-svg-origin"), Ka(e, A || F, !!A || i.originIsAbsolute, !1 !== i.smooth, g)), f = i.xOrigin || 0, m = i.yOrigin || 0, g !== qa && (_ = g[0], w = g[1], T = g[2], k = g[3], n = E = g[4], s = x = g[5], 6 === g.length ? (o = Math.sqrt(_ * _ + w * w), a = Math.sqrt(k * k + T * T), l = _ || w ? aa(w, _) * ra : 0, (h = T || k ? aa(T, k) * ra + l : 0) && (a *= Math.abs(Math.cos(h * oa))), i.svg && (n -= f - (f * _ + m * T), s -= m - (f * w + m * k))) : (I = g[6], L = g[7], O = g[8], P = g[9], M = g[10], N = g[11], n = g[12], s = g[13], r = g[14], c = (b = aa(I, M)) * ra, b && (A = E * (y = Math.cos(-b)) + O * (v = Math.sin(-b)), C = x * y + P * v, S = I * y + M * v, O = E * -v + O * y, P = x * -v + P * y, M = I * -v + M * y, N = L * -v + N * y, E = A, x = C, I = S), u = (b = aa(-T, M)) * ra, b && (y = Math.cos(-b), N = k * (v = Math.sin(-b)) + N * y, _ = A = _ * y - O * v, w = C = w * y - P * v, T = S = T * y - M * v), l = (b = aa(w, _)) * ra, b && (A = _ * (y = Math.cos(b)) + w * (v = Math.sin(b)), C = E * y + x * v, w = w * y - _ * v, x = x * y - E * v, _ = A, E = C), c && Math.abs(c) + Math.abs(l) > 359.9 && (c = l = 0, u = 180 - u), o = Zs(Math.sqrt(_ * _ + w * w + T * T)), a = Zs(Math.sqrt(x * x + I * I)), b = aa(E, x), h = Math.abs(b) > 2e-4 ? b * ra : 0, p = N ? 1 / (N < 0 ? -N : N) : 0), i.svg && (A = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !Ua(Ca(e, Ea)), A && e.setAttribute("transform", A))), Math.abs(h) > 90 && Math.abs(h) < 270 && (R ? (o *= -1, h += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (a *= -1, h += h <= 0 ? 180 : -180)), i.x = n - ((i.xPercent = n && (i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + B, i.y = s - ((i.yPercent = s && (i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-s) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + B, i.z = r + B, i.scaleX = Zs(o), i.scaleY = Zs(a), i.rotation = Zs(l) + j, i.rotationX = Zs(c) + j, i.rotationY = Zs(u) + j, i.skewX = h + j, i.skewY = d + j, i.transformPerspective = p + B, (i.zOrigin = parseFloat(F.split(" ")[2]) || 0) && (D[xa] = Ga(F)), i.xOffset = i.yOffset = 0, i.force3D = as.force3D, i.renderTransform = i.svg ? sl : na ? nl : Za, i.uncache = 0, i
      },
      Ga = function (e) {
         return (e = e.split(" "))[0] + " " + e[1]
      },
      Ja = function (e, t, i) {
         var n = Ir(t);
         return Zs(parseFloat(t) + parseFloat(ja(e, "x", i + "px", n))) + n
      },
      Za = function (e, t) {
         t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, nl(e, t)
      },
      el = "0deg",
      tl = "0px",
      il = ") ",
      nl = function (e, t) {
         var i = t || this,
            n = i.xPercent,
            s = i.yPercent,
            r = i.x,
            o = i.y,
            a = i.z,
            l = i.rotation,
            c = i.rotationY,
            u = i.rotationX,
            h = i.skewX,
            d = i.skewY,
            p = i.scaleX,
            f = i.scaleY,
            m = i.transformPerspective,
            g = i.force3D,
            b = i.target,
            y = i.zOrigin,
            v = "",
            _ = "auto" === g && e && 1 !== e || !0 === g;
         if (y && (u !== el || c !== el)) {
            var w, T = parseFloat(c) * oa,
               k = Math.sin(T),
               E = Math.cos(T);
            T = parseFloat(u) * oa, w = Math.cos(T), r = Ja(b, r, k * w * -y), o = Ja(b, o, -Math.sin(T) * -y), a = Ja(b, a, E * w * -y + y)
         }
         m !== tl && (v += "perspective(" + m + il), (n || s) && (v += "translate(" + n + "%, " + s + "%) "), (_ || r !== tl || o !== tl || a !== tl) && (v += a !== tl || _ ? "translate3d(" + r + ", " + o + ", " + a + ") " : "translate(" + r + ", " + o + il), l !== el && (v += "rotate(" + l + il), c !== el && (v += "rotateY(" + c + il), u !== el && (v += "rotateX(" + u + il), h === el && d === el || (v += "skew(" + h + ", " + d + il), 1 === p && 1 === f || (v += "scale(" + p + ", " + f + il), b.style[Ea] = v || "translate(0, 0)"
      },
      sl = function (e, t) {
         var i, n, s, r, o, a = t || this,
            l = a.xPercent,
            c = a.yPercent,
            u = a.x,
            h = a.y,
            d = a.rotation,
            p = a.skewX,
            f = a.skewY,
            m = a.scaleX,
            g = a.scaleY,
            b = a.target,
            y = a.xOrigin,
            v = a.yOrigin,
            _ = a.xOffset,
            w = a.yOffset,
            T = a.forceCSS,
            k = parseFloat(u),
            E = parseFloat(h);
         d = parseFloat(d), p = parseFloat(p), (f = parseFloat(f)) && (p += f = parseFloat(f), d += f), d || p ? (d *= oa, p *= oa, i = Math.cos(d) * m, n = Math.sin(d) * m, s = Math.sin(d - p) * -g, r = Math.cos(d - p) * g, p && (f *= oa, o = Math.tan(p - f), s *= o = Math.sqrt(1 + o * o), r *= o, f && (o = Math.tan(f), i *= o = Math.sqrt(1 + o * o), n *= o)), i = Zs(i), n = Zs(n), s = Zs(s), r = Zs(r)) : (i = m, r = g, n = s = 0), (k && !~(u + "").indexOf("px") || E && !~(h + "").indexOf("px")) && (k = ja(b, "x", u, "px"), E = ja(b, "y", h, "px")), (y || v || _ || w) && (k = Zs(k + y - (y * i + v * s) + _), E = Zs(E + v - (y * n + v * r) + w)), (l || c) && (o = b.getBBox(), k = Zs(k + l / 100 * o.width), E = Zs(E + c / 100 * o.height)), o = "matrix(" + i + "," + n + "," + s + "," + r + "," + k + "," + E + ")", b.setAttribute("transform", o), T && (b.style[Ea] = o)
      },
      rl = function (e, t, i, n, s, r) {
         var o, a, l = 360,
            c = bs(s),
            u = parseFloat(s) * (c && ~s.indexOf("rad") ? ra : 1),
            h = r ? u * r : u - n,
            d = n + h + "deg";
         return c && ("short" === (o = s.split("_")[1]) && (h %= l) !== h % 180 && (h += h < 0 ? l : -360), "cw" === o && h < 0 ? h = (h + 36e9) % l - ~~(h / l) * l : "ccw" === o && h > 0 && (h = (h - 36e9) % l - ~~(h / l) * l)), e._pt = a = new Uo(e._pt, t, i, n, h, pa), a.e = d, a.u = "deg", e._props.push(i), a
      },
      ol = function (e, t) {
         for (var i in t) e[i] = t[i];
         return e
      },
      al = function (e, t, i) {
         var n, s, r, o, a, l, c, u = ol({}, i._gsap),
            h = i.style;
         for (s in u.svg ? (r = i.getAttribute("transform"), i.setAttribute("transform", ""), h[Ea] = t, n = Qa(i, 1), Da(i, Ea), i.setAttribute("transform", r)) : (r = getComputedStyle(i)[Ea], h[Ea] = t, n = Qa(i, 1), h[Ea] = r), sa)(r = u[s]) !== (o = n[s]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(s) < 0 && (a = Ir(r) !== (c = Ir(o)) ? ja(i, s, r, c) : parseFloat(r), l = parseFloat(o), e._pt = new Uo(e._pt, n, s, a, l - a, da), e._pt.u = c || 0, e._props.push(s));
         ol(n, u)
      };
   Js("padding,margin,Width,Radius", (function (e, t) {
      var i = "Top",
         n = "Right",
         s = "Bottom",
         r = "Left",
         o = (t < 3 ? [i, n, s, r] : [i + r, i + n, s + n, s + r]).map((function (i) {
            return t < 2 ? e + i : "border" + i + e
         }));
      Va[t > 1 ? "border" + e : e] = function (e, t, i, n, s) {
         var r, a;
         if (arguments.length < 4) return r = o.map((function (t) {
            return Fa(e, t, i)
         })), 5 === (a = r.join(" ")).split(r[0]).length ? r[0] : a;
         r = (n + "").split(" "), a = {}, o.forEach((function (e, t) {
            return a[e] = r[t] = r[t] || r[(t - 1) / 2 | 0]
         })), e.init(t, a, s)
      }
   }));
   var ll, cl, ul, hl = {
      name: "css",
      register: Pa,
      targetTest: function (e) {
         return e.style && e.nodeType
      },
      init: function (e, t, i, n, s) {
         var r, o, a, l, c, u, h, d, p, f, m, g, b, y, v, _, w, T, k, E = this._props,
            x = e.style,
            A = i.vars.startAt;
         for (h in ea || Pa(), t)
            if ("autoRound" !== h && (o = t[h], !qs[h] || !Ao(h, t, i, n, e, s)))
               if (c = typeof o, u = Va[h], "function" === c && (c = typeof (o = o.call(i, n, e, s))), "string" === c && ~o.indexOf("random(") && (o = Wr(o)), u) u(this, e, h, o, i) && (v = 1);
               else if ("--" === h.substr(0, 2)) r = (getComputedStyle(e).getPropertyValue(h) + "").trim(), o += "", no.lastIndex = 0, no.test(r) || (d = Ir(r), p = Ir(o)), p ? d !== p && (r = ja(e, h, r, p) + p) : d && (o += d), this.add(x, "setProperty", r, o, n, s, 0, 0, h), E.push(h);
         else if ("undefined" !== c) {
            if (A && h in A ? (r = "function" == typeof A[h] ? A[h].call(i, n, e, s) : A[h], bs(r) && ~r.indexOf("random(") && (r = Wr(r)), Ir(r + "") || (r += as.units[h] || Ir(Fa(e, h)) || ""), "=" === (r + "").charAt(1) && (r = Fa(e, h))) : r = Fa(e, h), l = parseFloat(r), (f = "string" === c && "=" === o.charAt(1) ? +(o.charAt(0) + "1") : 0) && (o = o.substr(2)), a = parseFloat(o), h in ha && ("autoAlpha" === h && (1 === l && "hidden" === Fa(e, "visibility") && a && (l = 0), Ra(this, x, "visibility", l ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)), "scale" !== h && "transform" !== h && ~(h = ha[h]).indexOf(",") && (h = h.split(",")[0])), m = h in sa)
               if (g || ((b = e._gsap).renderTransform && !t.parseTransform || Qa(e, t.parseTransform), y = !1 !== t.smoothOrigin && b.smooth, (g = this._pt = new Uo(this._pt, x, Ea, 0, 1, b.renderTransform, b, 0, -1)).dep = 1), "scale" === h) this._pt = new Uo(this._pt, b, "scaleY", b.scaleY, (f ? f * a : a - b.scaleY) || 0), E.push("scaleY", h), h += "X";
               else {
                  if ("transformOrigin" === h) {
                     w = void 0, T = void 0, k = void 0, w = (_ = o).split(" "), T = w[0], k = w[1] || "50%", "top" !== T && "bottom" !== T && "left" !== k && "right" !== k || (_ = T, T = k, k = _), w[0] = $a[T] || T, w[1] = $a[k] || k, o = w.join(" "), b.svg ? Ka(e, o, 0, y, 0, this) : ((p = parseFloat(o.split(" ")[2]) || 0) !== b.zOrigin && Ra(this, b, "zOrigin", b.zOrigin, p), Ra(this, x, h, Ga(r), Ga(o)));
                     continue
                  }
                  if ("svgOrigin" === h) {
                     Ka(e, o, 1, y, 0, this);
                     continue
                  }
                  if (h in Wa) {
                     rl(this, b, h, l, o, f);
                     continue
                  }
                  if ("smoothOrigin" === h) {
                     Ra(this, b, "smooth", b.smooth, o);
                     continue
                  }
                  if ("force3D" === h) {
                     b[h] = o;
                     continue
                  }
                  if ("transform" === h) {
                     al(this, o, e);
                     continue
                  }
               }
            else h in x || (h = Oa(h) || h);
            if (m || (a || 0 === a) && (l || 0 === l) && !ua.test(o) && h in x) a || (a = 0), (d = (r + "").substr((l + "").length)) !== (p = Ir(o) || (h in as.units ? as.units[h] : d)) && (l = ja(e, h, r, p)), this._pt = new Uo(this._pt, m ? b : x, h, l, f ? f * a : a - l, m || "px" !== p && "zIndex" !== h || !1 === t.autoRound ? da : ma), this._pt.u = p || 0, d !== p && "%" !== p && (this._pt.b = r, this._pt.r = fa);
            else if (h in x) Ha.call(this, e, h, r, o);
            else {
               if (!(h in e)) {
                  Bs(h, o);
                  continue
               }
               this.add(e, h, r || e[h], o, n, s)
            }
            E.push(h)
         }
         v && Wo(this)
      },
      get: Fa,
      aliases: ha,
      getSetter: function (e, t, i) {
         var n = ha[t];
         return n && n.indexOf(",") < 0 && (t = n), t in sa && t !== xa && (e._gsap.x || Fa(e, "x")) ? i && ia === i ? "scale" === t ? wa : _a : (ia = i || {}) && ("scale" === t ? Ta : ka) : e.style && !_s(e.style[t]) ? ya : ~t.indexOf("-") ? va : Bo(e, t)
      },
      core: {
         _removeProperty: Da,
         _getMatrix: Xa
      }
   };
   Qo.utils.checkPrefix = Oa, ul = Js((ll = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (cl = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function (e) {
      sa[e] = 1
   })), Js(cl, (function (e) {
      as.units[e] = "deg", Wa[e] = 1
   })), ha[ul[13]] = ll + "," + cl, Js("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function (e) {
      var t = e.split(":");
      ha[t[1]] = ul[t[0]]
   })), Js("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function (e) {
      as.units[e] = "px"
   })), Qo.registerPlugin(hl);
   var dl = Qo.registerPlugin(hl) || Qo;
   dl.core.Tween;
   /*!
    * ScrollTrigger 3.9.1
    * https://greensock.com
    *
    * @license Copyright 2008-2021, GreenSock. All rights reserved.
    * Subject to the terms at https://greensock.com/standard-license or for
    * Club GreenSock members, the agreement issued with that membership.
    * @author: Jack Doyle, jack@greensock.com
    */
   var pl, fl, ml, gl, bl, yl, vl, _l, wl, Tl, kl, El, xl, Al, Cl, Sl, Ol, Pl, Ml, Ll, Nl, Il, Dl, Rl, Bl, jl, Fl = 1,
      Hl = [],
      $l = [],
      zl = Date.now,
      Vl = zl(),
      ql = 0,
      Wl = 1,
      Ul = function (e) {
         return e
      },
      Yl = function (e) {
         return wl(e)[0] || (nc(e) && !1 !== pl.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
      },
      Xl = function (e) {
         return Math.round(1e5 * e) / 1e5 || 0
      },
      Kl = function () {
         return "undefined" != typeof window
      },
      Ql = function () {
         return pl || Kl() && (pl = window.gsap) && pl.registerPlugin && pl
      },
      Gl = function (e) {
         return !!~vl.indexOf(e)
      },
      Jl = function (e, t) {
         return ~Hl.indexOf(e) && Hl[Hl.indexOf(e) + 1][t]
      },
      Zl = function (e, t) {
         var i = t.s,
            n = t.sc,
            s = $l.indexOf(e),
            r = n === Pc.sc ? 1 : 2;
         return !~s && (s = $l.push(e) - 1), $l[s + r] || ($l[s + r] = Jl(e, i) || (Gl(e) ? n : function (t) {
            return arguments.length ? e[i] = t : e[i]
         }))
      },
      ec = function (e) {
         return Jl(e, "getBoundingClientRect") || (Gl(e) ? function () {
            return bu.width = ml.innerWidth, bu.height = ml.innerHeight, bu
         } : function () {
            return Nc(e)
         })
      },
      tc = function (e, t) {
         var i = t.s,
            n = t.d2,
            s = t.d,
            r = t.a;
         return (i = "scroll" + n) && (r = Jl(e, i)) ? r() - ec(e)()[s] : Gl(e) ? (yl[i] || bl[i]) - (ml["inner" + n] || bl["client" + n] || yl["client" + n]) : e[i] - e["offset" + n]
      },
      ic = function (e, t) {
         for (var i = 0; i < Ml.length; i += 3)(!t || ~t.indexOf(Ml[i + 1])) && e(Ml[i], Ml[i + 1], Ml[i + 2])
      },
      nc = function (e) {
         return "string" == typeof e
      },
      sc = function (e) {
         return "function" == typeof e
      },
      rc = function (e) {
         return "number" == typeof e
      },
      oc = function (e) {
         return "object" == typeof e
      },
      ac = function (e) {
         return sc(e) && e()
      },
      lc = function (e, t) {
         return function () {
            var i = ac(e),
               n = ac(t);
            return function () {
               ac(i), ac(n)
            }
         }
      },
      cc = function (e, t, i) {
         return e && e.progress(t ? 0 : 1) && i && e.pause()
      },
      uc = function (e, t) {
         if (e.enabled) {
            var i = t(e);
            i && i.totalTime && (e.callbackAnimation = i)
         }
      },
      hc = Math.abs,
      dc = "scrollLeft",
      pc = "scrollTop",
      fc = "left",
      mc = "top",
      gc = "right",
      bc = "bottom",
      yc = "width",
      vc = "height",
      _c = "Right",
      wc = "Left",
      Tc = "Top",
      kc = "Bottom",
      Ec = "padding",
      xc = "margin",
      Ac = "Width",
      Cc = "Height",
      Sc = "px",
      Oc = {
         s: dc,
         p: fc,
         p2: wc,
         os: gc,
         os2: _c,
         d: yc,
         d2: Ac,
         a: "x",
         sc: function (e) {
            return arguments.length ? ml.scrollTo(e, Pc.sc()) : ml.pageXOffset || gl.scrollLeft || bl.scrollLeft || yl.scrollLeft || 0
         }
      },
      Pc = {
         s: pc,
         p: mc,
         p2: Tc,
         os: bc,
         os2: kc,
         d: vc,
         d2: Cc,
         a: "y",
         op: Oc,
         sc: function (e) {
            return arguments.length ? ml.scrollTo(Oc.sc(), e) : ml.pageYOffset || gl.scrollTop || bl.scrollTop || yl.scrollTop || 0
         }
      },
      Mc = function (e) {
         return ml.getComputedStyle(e)
      },
      Lc = function (e, t) {
         for (var i in t) i in e || (e[i] = t[i]);
         return e
      },
      Nc = function (e, t) {
         var i = t && "matrix(1, 0, 0, 1, 0, 0)" !== Mc(e)[Cl] && pl.to(e, {
               x: 0,
               y: 0,
               xPercent: 0,
               yPercent: 0,
               rotation: 0,
               rotationX: 0,
               rotationY: 0,
               scale: 1,
               skewX: 0,
               skewY: 0
            }).progress(1),
            n = e.getBoundingClientRect();
         return i && i.progress(0).kill(), n
      },
      Ic = function (e, t) {
         var i = t.d2;
         return e["offset" + i] || e["client" + i] || 0
      },
      Dc = function (e) {
         var t, i = [],
            n = e.labels,
            s = e.duration();
         for (t in n) i.push(n[t] / s);
         return i
      },
      Rc = function (e) {
         var t = pl.utils.snap(e),
            i = Array.isArray(e) && e.slice(0).sort((function (e, t) {
               return e - t
            }));
         return i ? function (e, n, s) {
            var r;
            if (void 0 === s && (s = .001), !n) return t(e);
            if (n > 0) {
               for (e -= s, r = 0; r < i.length; r++)
                  if (i[r] >= e) return i[r];
               return i[r - 1]
            }
            for (r = i.length, e += s; r--;)
               if (i[r] <= e) return i[r];
            return i[0]
         } : function (i, n, s) {
            void 0 === s && (s = .001);
            var r = t(i);
            return !n || Math.abs(r - i) < s || r - i < 0 == n < 0 ? r : t(n < 0 ? i - e : i + e)
         }
      },
      Bc = function (e, t, i, n) {
         return i.split(",").forEach((function (i) {
            return e(t, i, n)
         }))
      },
      jc = function (e, t, i) {
         return e.addEventListener(t, i, {
            passive: !0
         })
      },
      Fc = function (e, t, i) {
         return e.removeEventListener(t, i)
      },
      Hc = {
         startColor: "green",
         endColor: "red",
         indent: 0,
         fontSize: "16px",
         fontWeight: "normal"
      },
      $c = {
         toggleActions: "play",
         anticipatePin: 0
      },
      zc = {
         top: 0,
         left: 0,
         center: .5,
         bottom: 1,
         right: 1
      },
      Vc = function (e, t) {
         if (nc(e)) {
            var i = e.indexOf("="),
               n = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
            ~i && (e.indexOf("%") > i && (n *= t / 100), e = e.substr(0, i - 1)), e = n + (e in zc ? zc[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
         }
         return e
      },
      qc = function (e, t, i, n, s, r, o, a) {
         var l = s.startColor,
            c = s.endColor,
            u = s.fontSize,
            h = s.indent,
            d = s.fontWeight,
            p = gl.createElement("div"),
            f = Gl(i) || "fixed" === Jl(i, "pinType"),
            m = -1 !== e.indexOf("scroller"),
            g = f ? yl : i,
            b = -1 !== e.indexOf("start"),
            y = b ? l : c,
            v = "border-color:" + y + ";font-size:" + u + ";color:" + y + ";font-weight:" + d + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
         return v += "position:" + ((m || a) && f ? "fixed;" : "absolute;"), (m || a || !f) && (v += (n === Pc ? gc : bc) + ":" + (r + parseFloat(h)) + "px;"), o && (v += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), p._isStart = b, p.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), p.style.cssText = v, p.innerText = t || 0 === t ? e + "-" + t : e, g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p), p._offset = p["offset" + n.op.d2], Wc(p, 0, n, b), p
      },
      Wc = function (e, t, i, n) {
         var s = {
               display: "block"
            },
            r = i[n ? "os2" : "p2"],
            o = i[n ? "p2" : "os2"];
         e._isFlipped = n, s[i.a + "Percent"] = n ? -100 : 0, s[i.a] = n ? "1px" : 0, s["border" + r + Ac] = 1, s["border" + o + Ac] = 0, s[i.p] = t + "px", pl.set(e, s)
      },
      Uc = [],
      Yc = {},
      Xc = function () {
         return zl() - ql > 34 && uu()
      },
      Kc = function () {
         uu(), ql || iu("scrollStart"), ql = zl()
      },
      Qc = function () {
         return !xl && !Il && !gl.fullscreenElement && _l.restart(!0)
      },
      Gc = {},
      Jc = [],
      Zc = [],
      eu = function (e) {
         var t, i = pl.ticker.frame,
            n = [],
            s = 0;
         if (Bl !== i || Fl) {
            for (ru(); s < Zc.length; s += 4)(t = ml.matchMedia(Zc[s]).matches) !== Zc[s + 3] && (Zc[s + 3] = t, t ? n.push(s) : ru(1, Zc[s]) || sc(Zc[s + 2]) && Zc[s + 2]());
            for (su(), s = 0; s < n.length; s++) t = n[s], Rl = Zc[t], Zc[t + 2] = Zc[t + 1](e);
            Rl = 0, fl && au(0, 1), Bl = i, iu("matchMedia")
         }
      },
      tu = function e() {
         return Fc(Tu, "scrollEnd", e) || au(!0)
      },
      iu = function (e) {
         return Gc[e] && Gc[e].map((function (e) {
            return e()
         })) || Jc
      },
      nu = [],
      su = function (e) {
         for (var t = 0; t < nu.length; t += 5) e && nu[t + 4] !== e || (nu[t].style.cssText = nu[t + 1], nu[t].getBBox && nu[t].setAttribute("transform", nu[t + 2] || ""), nu[t + 3].uncache = 1)
      },
      ru = function (e, t) {
         var i;
         for (Sl = 0; Sl < Uc.length; Sl++) i = Uc[Sl], t && i.media !== t || (e ? i.kill(1) : i.revert());
         t && su(t), t || iu("revert")
      },
      ou = function () {
         return $l.forEach((function (e) {
            return "function" == typeof e && (e.rec = 0)
         }))
      },
      au = function (e, t) {
         if (!ql || e) {
            jl = !0;
            var i = iu("refreshInit");
            Ll && Tu.sort(), t || ru(), Uc.forEach((function (e) {
               return e.refresh()
            })), Uc.forEach((function (e) {
               return "max" === e.vars.end && e.setPositions(e.start, tc(e.scroller, e._dir))
            })), i.forEach((function (e) {
               return e && e.render && e.render(-1)
            })), ou(), _l.pause(), jl = !1, iu("refresh")
         } else jc(Tu, "scrollEnd", tu)
      },
      lu = 0,
      cu = 1,
      uu = function () {
         if (!jl) {
            var e = Uc.length,
               t = zl(),
               i = t - Vl >= 50,
               n = e && Uc[0].scroll();
            if (cu = lu > n ? -1 : 1, lu = n, i && (ql && !Al && t - ql > 200 && (ql = 0, iu("scrollEnd")), kl = Vl, Vl = t), cu < 0) {
               for (Sl = e; Sl-- > 0;) Uc[Sl] && Uc[Sl].update(0, i);
               cu = 1
            } else
               for (Sl = 0; Sl < e; Sl++) Uc[Sl] && Uc[Sl].update(0, i)
         }
      },
      hu = [fc, mc, bc, gc, "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
      du = hu.concat([yc, vc, "boxSizing", "maxWidth", "maxHeight", "position", xc, Ec, "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]),
      pu = function (e, t, i, n) {
         if (e.parentNode !== t) {
            for (var s, r = hu.length, o = t.style, a = e.style; r--;) o[s = hu[r]] = i[s];
            o.position = "absolute" === i.position ? "absolute" : "relative", "inline" === i.display && (o.display = "inline-block"), a.bottom = a.right = o.flexBasis = "auto", o.overflow = "visible", o.boxSizing = "border-box", o.width = Ic(e, Oc) + Sc, o.height = Ic(e, Pc) + Sc, o.padding = a.margin = a.top = a.left = "0", mu(n), a.width = a.maxWidth = i.width, a.height = a.maxHeight = i.height, a.padding = i.padding, e.parentNode.insertBefore(t, e), t.appendChild(e)
         }
      },
      fu = /([A-Z])/g,
      mu = function (e) {
         if (e) {
            var t, i, n = e.t.style,
               s = e.length,
               r = 0;
            for ((e.t._gsap || pl.core.getCache(e.t)).uncache = 1; r < s; r += 2) i = e[r + 1], t = e[r], i ? n[t] = i : n[t] && n.removeProperty(t.replace(fu, "-$1").toLowerCase())
         }
      },
      gu = function (e) {
         for (var t = du.length, i = e.style, n = [], s = 0; s < t; s++) n.push(du[s], i[du[s]]);
         return n.t = e, n
      },
      bu = {
         left: 0,
         top: 0
      },
      yu = function (e, t, i, n, s, r, o, a, l, c, u, h, d) {
         sc(e) && (e = e(a)), nc(e) && "max" === e.substr(0, 3) && (e = h + ("=" === e.charAt(4) ? Vc("0" + e.substr(3), i) : 0));
         var p, f, m, g = d ? d.time() : 0;
         if (d && d.seek(0), rc(e)) o && Wc(o, i, n, !0);
         else {
            sc(t) && (t = t(a));
            var b, y, v, _, w = e.split(" ");
            m = Yl(t) || yl, (b = Nc(m) || {}) && (b.left || b.top) || "none" !== Mc(m).display || (_ = m.style.display, m.style.display = "block", b = Nc(m), _ ? m.style.display = _ : m.style.removeProperty("display")), y = Vc(w[0], b[n.d]), v = Vc(w[1] || "0", i), e = b[n.p] - l[n.p] - c + y + s - v, o && Wc(o, v, n, i - v < 20 || o._isStart && v > 20), i -= i - v
         }
         if (r) {
            var T = e + i,
               k = r._isStart;
            p = "scroll" + n.d2, Wc(r, T, n, k && T > 20 || !k && (u ? Math.max(yl[p], bl[p]) : r.parentNode[p]) <= T + 1), u && (l = Nc(o), u && (r.style[n.op.p] = l[n.op.p] - n.op.m - r._offset + Sc))
         }
         return d && m && (p = Nc(m), d.seek(h), f = Nc(m), d._caScrollDist = p[n.p] - f[n.p], e = e / d._caScrollDist * h), d && d.seek(g), d ? e : Math.round(e)
      },
      vu = /(?:webkit|moz|length|cssText|inset)/i,
      _u = function (e, t, i, n) {
         if (e.parentNode !== t) {
            var s, r, o = e.style;
            if (t === yl) {
               for (s in e._stOrig = o.cssText, r = Mc(e)) + s || vu.test(s) || !r[s] || "string" != typeof o[s] || "0" === s || (o[s] = r[s]);
               o.top = i, o.left = n
            } else o.cssText = e._stOrig;
            pl.core.getCache(e).uncache = 1, t.appendChild(e)
         }
      },
      wu = function (e, t) {
         var i, n, s = Zl(e, t),
            r = "_scroll" + t.p2,
            o = function t(o, a, l, c, u) {
               var h = t.tween,
                  d = a.onComplete,
                  p = {};
               return h && h.kill(), i = Math.round(l), a[r] = o, a.modifiers = p, p[r] = function (e) {
                  return (e = Xl(s())) !== i && e !== n && Math.abs(e - i) > 2 && Math.abs(e - n) > 2 ? (h.kill(), t.tween = 0) : e = l + c * h.ratio + u * h.ratio * h.ratio, n = i, i = Xl(e)
               }, a.onComplete = function () {
                  t.tween = 0, d && d.call(h)
               }, h = t.tween = pl.to(e, a)
            };
         return e[r] = s, jc(e, "wheel", (function () {
            return o.tween && o.tween.kill() && (o.tween = 0)
         })), o
      };
   Oc.op = Pc;
   var Tu = function () {
      function e(t, i) {
         fl || e.register(pl) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(t, i)
      }
      return e.prototype.init = function (t, i) {
         if (this.progress = this.start = 0, this.vars && this.kill(1), Wl) {
            var n, s, r, o, a, l, c, u, h, d, p, f, m, g, b, y, v, _, w, T, k, E, x, A, C, S, O, P, M, L, N, I, D, R, B, j, F, H, z, V, q = t = Lc(nc(t) || rc(t) || t.nodeType ? {
                  trigger: t
               } : t, $c),
               W = q.onUpdate,
               U = q.toggleClass,
               Y = q.id,
               X = q.onToggle,
               K = q.onRefresh,
               Q = q.scrub,
               G = q.trigger,
               J = q.pin,
               Z = q.pinSpacing,
               ee = q.invalidateOnRefresh,
               te = q.anticipatePin,
               ie = q.onScrubComplete,
               ne = q.onSnapComplete,
               se = q.once,
               re = q.snap,
               oe = q.pinReparent,
               ae = q.pinSpacer,
               le = q.containerAnimation,
               ce = q.fastScrollEnd,
               ue = q.preventOverlaps,
               he = t.horizontal || t.containerAnimation && !1 !== t.horizontal ? Oc : Pc,
               de = !Q && 0 !== Q,
               pe = Yl(t.scroller || ml),
               fe = pl.core.getCache(pe),
               me = Gl(pe),
               ge = "fixed" === ("pinType" in t ? t.pinType : Jl(pe, "pinType") || me && "fixed"),
               be = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
               ye = de && t.toggleActions.split(" "),
               ve = "markers" in t ? t.markers : $c.markers,
               _e = me ? 0 : parseFloat(Mc(pe)["border" + he.p2 + Ac]) || 0,
               we = this,
               Te = t.onRefreshInit && function () {
                  return t.onRefreshInit(we)
               },
               ke = function (e, t, i) {
                  var n = i.d,
                     s = i.d2,
                     r = i.a;
                  return (r = Jl(e, "getBoundingClientRect")) ? function () {
                     return r()[n]
                  } : function () {
                     return (t ? ml["inner" + s] : e["client" + s]) || 0
                  }
               }(pe, me, he),
               Ee = function (e, t) {
                  return !t || ~Hl.indexOf(e) ? ec(e) : function () {
                     return bu
                  }
               }(pe, me),
               xe = 0,
               Ae = Zl(pe, he);
            if (we.media = Rl, we._dir = he, te *= 45, we.scroller = pe, we.scroll = le ? le.time.bind(le) : Ae, o = Ae(), we.vars = t, i = i || t.animation, "refreshPriority" in t && (Ll = 1), fe.tweenScroll = fe.tweenScroll || {
                  top: wu(pe, Pc),
                  left: wu(pe, Oc)
               }, we.tweenTo = n = fe.tweenScroll[he.p], i && (i.vars.lazy = !1, i._initted || !1 !== i.vars.immediateRender && !1 !== t.immediateRender && i.render(0, !0, !0), we.animation = i.pause(), i.scrollTrigger = we, (N = rc(Q) && Q) && (L = pl.to(i, {
                  ease: "power3",
                  duration: N,
                  onComplete: function () {
                     return ie && ie(we)
                  }
               })), P = 0, Y || (Y = i.vars.id)), Uc.push(we), re && (oc(re) && !re.push || (re = {
                  snapTo: re
               }), "scrollBehavior" in yl.style && pl.set(me ? [yl, bl] : pe, {
                  scrollBehavior: "auto"
               }), r = sc(re.snapTo) ? re.snapTo : "labels" === re.snapTo ? function (e) {
                  return function (t) {
                     return pl.utils.snap(Dc(e), t)
                  }
               }(i) : "labelsDirectional" === re.snapTo ? (H = i, function (e, t) {
                  return Rc(Dc(H))(e, t.direction)
               }) : !1 !== re.directional ? function (e, t) {
                  return Rc(re.snapTo)(e, t.direction)
               } : pl.utils.snap(re.snapTo), I = re.duration || {
                  min: .1,
                  max: 2
               }, I = oc(I) ? Tl(I.min, I.max) : Tl(I, I), D = pl.delayedCall(re.delay || N / 2 || .1, (function () {
                  if (Math.abs(we.getVelocity()) < 10 && !Al && xe !== Ae()) {
                     var e = i && !de ? i.totalProgress() : we.progress,
                        t = (e - M) / (zl() - kl) * 1e3 || 0,
                        s = pl.utils.clamp(-we.progress, 1 - we.progress, hc(t / 2) * t / .185),
                        o = we.progress + (!1 === re.inertia ? 0 : s),
                        a = Tl(0, 1, r(o, we)),
                        u = Ae(),
                        h = Math.round(l + a * m),
                        d = re,
                        p = d.onStart,
                        f = d.onInterrupt,
                        g = d.onComplete,
                        b = n.tween;
                     if (u <= c && u >= l && h !== u) {
                        if (b && !b._initted && b.data <= hc(h - u)) return;
                        !1 === re.inertia && (s = a - we.progress), n(h, {
                           duration: I(hc(.185 * Math.max(hc(o - e), hc(a - e)) / t / .05 || 0)),
                           ease: re.ease || "power3",
                           data: hc(h - u),
                           onInterrupt: function () {
                              return D.restart(!0) && f && f(we)
                           },
                           onComplete: function () {
                              we.update(), xe = Ae(), P = M = i && !de ? i.totalProgress() : we.progress, ne && ne(we), g && g(we)
                           }
                        }, u, s * m, h - u - s * m), p && p(we, n.tween)
                     }
                  } else we.isActive && D.restart(!0)
               })).pause()), Y && (Yc[Y] = we), G = we.trigger = Yl(G || J), J = !0 === J ? G : Yl(J), nc(U) && (U = {
                  targets: G,
                  className: U
               }), J && (!1 === Z || Z === xc || (Z = !(!Z && "flex" === Mc(J.parentNode).display) && Ec), we.pin = J, !1 !== t.force3D && pl.set(J, {
                  force3D: !0
               }), (s = pl.core.getCache(J)).spacer ? g = s.pinState : (ae && ((ae = Yl(ae)) && !ae.nodeType && (ae = ae.current || ae.nativeElement), s.spacerIsNative = !!ae, ae && (s.spacerState = gu(ae))), s.spacer = v = ae || gl.createElement("div"), v.classList.add("pin-spacer"), Y && v.classList.add("pin-spacer-" + Y), s.pinState = g = gu(J)), we.spacer = v = s.spacer, O = Mc(J), x = O[Z + he.os2], w = pl.getProperty(J), T = pl.quickSetter(J, he.a, Sc), pu(J, v, O), y = gu(J)), ve && (f = oc(ve) ? Lc(ve, Hc) : Hc, d = qc("scroller-start", Y, pe, he, f, 0), p = qc("scroller-end", Y, pe, he, f, 0, d), _ = d["offset" + he.op.d2], u = qc("start", Y, pe, he, f, _, 0, le), h = qc("end", Y, pe, he, f, _, 0, le), le && (F = pl.quickSetter([u, h], he.a, Sc)), ge || Hl.length && !0 === Jl(pe, "fixedMarkers") || (V = Mc(z = me ? yl : pe).position, z.style.position = "absolute" === V || "fixed" === V ? V : "relative", pl.set([d, p], {
                  force3D: !0
               }), C = pl.quickSetter(d, he.a, Sc), S = pl.quickSetter(p, he.a, Sc))), le) {
               var Ce = le.vars.onUpdate,
                  Se = le.vars.onUpdateParams;
               le.eventCallback("onUpdate", (function () {
                  we.update(0, 0, 1), Ce && Ce.apply(Se || [])
               }))
            }
            we.previous = function () {
               return Uc[Uc.indexOf(we) - 1]
            }, we.next = function () {
               return Uc[Uc.indexOf(we) + 1]
            }, we.revert = function (e) {
               var t = !1 !== e || !we.enabled,
                  n = xl;
               t !== we.isReverted && (t && (we.scroll.rec || (we.scroll.rec = Ae()), B = Math.max(Ae(), we.scroll.rec || 0), R = we.progress, j = i && i.progress()), u && [u, h, d, p].forEach((function (e) {
                  return e.style.display = t ? "none" : "block"
               })), t && (xl = 1), we.update(t), xl = n, J && (t ? function (e, t, i) {
                  mu(i);
                  var n = e._gsap;
                  if (n.spacerIsNative) mu(n.spacerState);
                  else if (e.parentNode === t) {
                     var s = t.parentNode;
                     s && (s.insertBefore(e, t), s.removeChild(t))
                  }
               }(J, v, g) : (!oe || !we.isActive) && pu(J, v, Mc(J), A)), we.isReverted = t)
            }, we.refresh = function (n, s) {
               if (!xl && we.enabled || s)
                  if (J && n && ql) jc(e, "scrollEnd", tu);
                  else {
                     xl = 1, L && L.pause(), ee && i && i.time(-.01, !0).invalidate(), we.isReverted || we.revert();
                     for (var r, f, _, T, x, C, S, O, P, M, N = ke(), I = Ee(), D = le ? le.duration() : tc(pe, he), F = 0, H = 0, z = t.end, V = t.endTrigger || G, q = t.start || (0 !== t.start && G ? J ? "0 0" : "0 100%" : 0), W = t.pinnedContainer && Yl(t.pinnedContainer), U = G && Math.max(0, Uc.indexOf(we)) || 0, Y = U; Y--;)(C = Uc[Y]).end || C.refresh(0, 1) || (xl = 1), !(S = C.pin) || S !== G && S !== J || C.isReverted || (M || (M = []), M.unshift(C), C.revert());
                     for (sc(q) && (q = q(we)), l = yu(q, G, N, he, Ae(), u, d, we, I, _e, ge, D, le) || (J ? -.001 : 0), sc(z) && (z = z(we)), nc(z) && !z.indexOf("+=") && (~z.indexOf(" ") ? z = (nc(q) ? q.split(" ")[0] : "") + z : (F = Vc(z.substr(2), N), z = nc(q) ? q : l + F, V = G)), c = Math.max(l, yu(z || (V ? "100% 0" : D), V, N, he, Ae() + F, h, p, we, I, _e, ge, D, le)) || -.001, m = c - l || (l -= .01) && .001, F = 0, Y = U; Y--;)(S = (C = Uc[Y]).pin) && C.start - C._pinPush < l && !le && (r = C.end - C.start, S !== G && S !== W || rc(q) || (F += r * (1 - C.progress)), S === J && (H += r));
                     if (l += F, c += F, we._pinPush = H, u && F && ((r = {})[he.a] = "+=" + F, W && (r[he.p] = "-=" + Ae()), pl.set([u, h], r)), J) r = Mc(J), T = he === Pc, _ = Ae(), k = parseFloat(w(he.a)) + H, !D && c > 1 && ((me ? yl : pe).style["overflow-" + he.a] = "scroll"), pu(J, v, r), y = gu(J), f = Nc(J, !0), O = ge && Zl(pe, T ? Oc : Pc)(), Z && ((A = [Z + he.os2, m + H + Sc]).t = v, (Y = Z === Ec ? Ic(J, he) + m + H : 0) && A.push(he.d, Y + Sc), mu(A), ge && Ae(B)), ge && ((x = {
                        top: f.top + (T ? _ - l : O) + Sc,
                        left: f.left + (T ? O : _ - l) + Sc,
                        boxSizing: "border-box",
                        position: "fixed"
                     }).width = x.maxWidth = Math.ceil(f.width) + Sc, x.height = x.maxHeight = Math.ceil(f.height) + Sc, x.margin = x.marginTop = x.marginRight = x.marginBottom = x.marginLeft = "0", x.padding = r.padding, x.paddingTop = r.paddingTop, x.paddingRight = r.paddingRight, x.paddingBottom = r.paddingBottom, x.paddingLeft = r.paddingLeft, b = function (e, t, i) {
                        for (var n, s = [], r = e.length, o = i ? 8 : 0; o < r; o += 2) n = e[o], s.push(n, n in t ? t[n] : e[o + 1]);
                        return s.t = e.t, s
                     }(g, x, oe)), i ? (P = i._initted, Nl(1), i.render(i.duration(), !0, !0), E = w(he.a) - k + m + H, m !== E && b.splice(b.length - 2, 2), i.render(0, !0, !0), P || i.invalidate(), Nl(0)) : E = m;
                     else if (G && Ae() && !le)
                        for (f = G.parentNode; f && f !== yl;) f._pinOffset && (l -= f._pinOffset, c -= f._pinOffset), f = f.parentNode;
                     M && M.forEach((function (e) {
                        return e.revert(!1)
                     })), we.start = l, we.end = c, o = a = Ae(), le || (o < B && Ae(B), we.scroll.rec = 0), we.revert(!1), xl = 0, i && de && i._initted && i.progress() !== j && i.progress(j, !0).render(i.time(), !0, !0), (R !== we.progress || le) && (i && !de && i.totalProgress(R, !0), we.progress = R, we.update(0, 0, 1)), J && Z && (v._pinOffset = Math.round(we.progress * E)), K && K(we)
                  }
            }, we.getVelocity = function () {
               return (Ae() - a) / (zl() - kl) * 1e3 || 0
            }, we.endAnimation = function () {
               cc(we.callbackAnimation), i && (L ? L.progress(1) : i.paused() ? de || cc(i, we.direction < 0, 1) : cc(i, i.reversed()))
            }, we.labelToScroll = function (e) {
               return i && i.labels && (l || we.refresh() || l) + i.labels[e] / i.duration() * m || 0
            }, we.getTrailing = function (e) {
               var t = Uc.indexOf(we),
                  i = we.direction > 0 ? Uc.slice(0, t).reverse() : Uc.slice(t + 1);
               return nc(e) ? i.filter((function (t) {
                  return t.vars.preventOverlaps === e
               })) : i
            }, we.update = function (e, t, s) {
               if (!le || s || e) {
                  var r, u, h, p, f, g, _, w = we.scroll(),
                     A = e ? 0 : (w - l) / m,
                     O = A < 0 ? 0 : A > 1 ? 1 : A || 0,
                     N = we.progress;
                  if (t && (a = o, o = le ? Ae() : w, re && (M = P, P = i && !de ? i.totalProgress() : O)), te && !O && J && !xl && !Fl && ql && l < w + (w - a) / (zl() - kl) * te && (O = 1e-4), O !== N && we.enabled) {
                     if (p = (f = (r = we.isActive = !!O && O < 1) !== (!!N && N < 1)) || !!O != !!N, we.direction = O > N ? 1 : -1, we.progress = O, p && !xl && (u = O && !N ? 0 : 1 === O ? 1 : 1 === N ? 2 : 3, de && (h = !f && "none" !== ye[u + 1] && ye[u + 1] || ye[u], _ = i && ("complete" === h || "reset" === h || h in i))), ue && f && (_ || Q || !i) && (sc(ue) ? ue(we) : we.getTrailing(ue).forEach((function (e) {
                           return e.endAnimation()
                        }))), de || (!L || xl || Fl ? i && i.totalProgress(O, !!xl) : (L.vars.totalProgress = O, L.invalidate().restart())), J)
                        if (e && Z && (v.style[Z + he.os2] = x), ge) {
                           if (p) {
                              if (g = !e && O > N && c + 1 > w && w + 1 >= tc(pe, he), oe)
                                 if (e || !r && !g) _u(J, v);
                                 else {
                                    var I = Nc(J, !0),
                                       R = w - l;
                                    _u(J, yl, I.top + (he === Pc ? R : 0) + Sc, I.left + (he === Pc ? 0 : R) + Sc)
                                 } mu(r || g ? b : y), E !== m && O < 1 && r || T(k + (1 !== O || g ? 0 : E))
                           }
                        } else T(k + E * O);
                     re && !n.tween && !xl && !Fl && D.restart(!0), U && (f || se && O && (O < 1 || !Dl)) && wl(U.targets).forEach((function (e) {
                        return e.classList[r || se ? "add" : "remove"](U.className)
                     })), W && !de && !e && W(we), p && !xl ? (de && (_ && ("complete" === h ? i.pause().totalProgress(1) : "reset" === h ? i.restart(!0).pause() : "restart" === h ? i.restart(!0) : i[h]()), W && W(we)), !f && Dl || (X && f && uc(we, X), be[u] && uc(we, be[u]), se && (1 === O ? we.kill(!1, 1) : be[u] = 0), f || be[u = 1 === O ? 1 : 3] && uc(we, be[u])), ce && !r && Math.abs(we.getVelocity()) > (rc(ce) ? ce : 2500) && (cc(we.callbackAnimation), L ? L.progress(1) : cc(i, !O, 1))) : de && W && !xl && W(we)
                  }
                  if (S) {
                     var B = le ? w / le.duration() * (le._caScrollDist || 0) : w;
                     C(B + (d._isFlipped ? 1 : 0)), S(B)
                  }
                  F && F(-w / le.duration() * (le._caScrollDist || 0))
               }
            }, we.enable = function (t, i) {
               we.enabled || (we.enabled = !0, jc(pe, "resize", Qc), jc(pe, "scroll", Kc), Te && jc(e, "refreshInit", Te), !1 !== t && (we.progress = R = 0, o = a = xe = Ae()), !1 !== i && we.refresh())
            }, we.getTween = function (e) {
               return e && n ? n.tween : L
            }, we.setPositions = function (e, t) {
               J && (k += e - l, E += t - e - m), we.start = l = e, we.end = c = t, m = t - e, we.update()
            }, we.disable = function (t, i) {
               if (we.enabled && (!1 !== t && we.revert(), we.enabled = we.isActive = !1, i || L && L.pause(), B = 0, s && (s.uncache = 1), Te && Fc(e, "refreshInit", Te), D && (D.pause(), n.tween && n.tween.kill() && (n.tween = 0)), !me)) {
                  for (var r = Uc.length; r--;)
                     if (Uc[r].scroller === pe && Uc[r] !== we) return;
                  Fc(pe, "resize", Qc), Fc(pe, "scroll", Kc)
               }
            }, we.kill = function (e, t) {
               we.disable(e, t), L && L.kill(), Y && delete Yc[Y];
               var n = Uc.indexOf(we);
               n >= 0 && Uc.splice(n, 1), n === Sl && cu > 0 && Sl--, n = 0, Uc.forEach((function (e) {
                  return e.scroller === we.scroller && (n = 1)
               })), n || (we.scroll.rec = 0), i && (i.scrollTrigger = null, e && i.render(-1), t || i.kill()), u && [u, h, d, p].forEach((function (e) {
                  return e.parentNode && e.parentNode.removeChild(e)
               })), J && (s && (s.uncache = 1), n = 0, Uc.forEach((function (e) {
                  return e.pin === J && n++
               })), n || (s.spacer = 0))
            }, we.enable(!1, !1), i && i.add && !m ? pl.delayedCall(.01, (function () {
               return l || c || we.refresh()
            })) && (m = .01) && (l = c = 0) : we.refresh()
         } else this.update = this.refresh = this.kill = Ul
      }, e.register = function (t) {
         if (!fl && (pl = t || Ql(), Kl() && window.document && (ml = window, gl = document, bl = gl.documentElement, yl = gl.body), pl && (wl = pl.utils.toArray, Tl = pl.utils.clamp, Nl = pl.core.suppressOverwrites || Ul, pl.core.globals("ScrollTrigger", e), yl))) {
            jc(ml, "wheel", Kc), vl = [ml, gl, bl, yl], jc(gl, "scroll", Kc);
            var i, n = yl.style,
               s = n.borderTopStyle;
            n.borderTopStyle = "solid", i = Nc(yl), Pc.m = Math.round(i.top + Pc.sc()) || 0, Oc.m = Math.round(i.left + Oc.sc()) || 0, s ? n.borderTopStyle = s : n.removeProperty("border-top-style"), El = setInterval(Xc, 200), pl.delayedCall(.5, (function () {
               return Fl = 0
            })), jc(gl, "touchcancel", Ul), jc(yl, "touchstart", Ul), Bc(jc, gl, "pointerdown,touchstart,mousedown", (function () {
               return Al = 1
            })), Bc(jc, gl, "pointerup,touchend,mouseup", (function () {
               return Al = 0
            })), Cl = pl.utils.checkPrefix("transform"), du.push(Cl), fl = zl(), _l = pl.delayedCall(.2, au).pause(), Ml = [gl, "visibilitychange", function () {
               var e = ml.innerWidth,
                  t = ml.innerHeight;
               gl.hidden ? (Ol = e, Pl = t) : Ol === e && Pl === t || Qc()
            }, gl, "DOMContentLoaded", au, ml, "load", function () {
               return ql || au()
            }, ml, "resize", Qc], ic(jc)
         }
         return fl
      }, e.defaults = function (e) {
         if (e)
            for (var t in e) $c[t] = e[t];
         return $c
      }, e.kill = function () {
         Wl = 0, Uc.slice(0).forEach((function (e) {
            return e.kill(1)
         }))
      }, e.config = function (e) {
         "limitCallbacks" in e && (Dl = !!e.limitCallbacks);
         var t = e.syncInterval;
         t && clearInterval(El) || (El = t) && setInterval(Xc, t), "autoRefreshEvents" in e && (ic(Fc) || ic(jc, e.autoRefreshEvents || "none"), Il = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
      }, e.scrollerProxy = function (e, t) {
         var i = Yl(e),
            n = $l.indexOf(i),
            s = Gl(i);
         ~n && $l.splice(n, s ? 6 : 2), t && (s ? Hl.unshift(ml, t, yl, t, bl, t) : Hl.unshift(i, t))
      }, e.matchMedia = function (e) {
         var t, i, n, s, r;
         for (i in e) n = Zc.indexOf(i), s = e[i], Rl = i, "all" === i ? s() : (t = ml.matchMedia(i)) && (t.matches && (r = s()), ~n ? (Zc[n + 1] = lc(Zc[n + 1], s), Zc[n + 2] = lc(Zc[n + 2], r)) : (n = Zc.length, Zc.push(i, s, r), t.addListener ? t.addListener(eu) : t.addEventListener("change", eu)), Zc[n + 3] = t.matches), Rl = 0;
         return Zc
      }, e.clearMatchMedia = function (e) {
         e || (Zc.length = 0), (e = Zc.indexOf(e)) >= 0 && Zc.splice(e, 4)
      }, e.isInViewport = function (e, t, i) {
         var n = (nc(e) ? Yl(e) : e).getBoundingClientRect(),
            s = n[i ? yc : vc] * t || 0;
         return i ? n.right - s > 0 && n.left + s < ml.innerWidth : n.bottom - s > 0 && n.top + s < ml.innerHeight
      }, e.positionInViewport = function (e, t, i) {
         nc(e) && (e = Yl(e));
         var n = e.getBoundingClientRect(),
            s = n[i ? yc : vc],
            r = null == t ? s / 2 : t in zc ? zc[t] * s : ~t.indexOf("%") ? parseFloat(t) * s / 100 : parseFloat(t) || 0;
         return i ? (n.left + r) / ml.innerWidth : (n.top + r) / ml.innerHeight
      }, e
   }();
   Tu.version = "3.9.1", Tu.saveStyles = function (e) {
      return e ? wl(e).forEach((function (e) {
         if (e && e.style) {
            var t = nu.indexOf(e);
            t >= 0 && nu.splice(t, 5), nu.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), pl.core.getCache(e), Rl)
         }
      })) : nu
   }, Tu.revert = function (e, t) {
      return ru(!e, t)
   }, Tu.create = function (e, t) {
      return new Tu(e, t)
   }, Tu.refresh = function (e) {
      return e ? Qc() : (fl || Tu.register()) && au(!0)
   }, Tu.update = uu, Tu.clearScrollMemory = ou, Tu.maxScroll = function (e, t) {
      return tc(e, t ? Oc : Pc)
   }, Tu.getScrollFunc = function (e, t) {
      return Zl(Yl(e), t ? Oc : Pc)
   }, Tu.getById = function (e) {
      return Yc[e]
   }, Tu.getAll = function () {
      return Uc.slice(0)
   }, Tu.isScrolling = function () {
      return !!ql
   }, Tu.snapDirectional = Rc, Tu.addEventListener = function (e, t) {
      var i = Gc[e] || (Gc[e] = []);
      ~i.indexOf(t) || i.push(t)
   }, Tu.removeEventListener = function (e, t) {
      var i = Gc[e],
         n = i && i.indexOf(t);
      n >= 0 && i.splice(n, 1)
   }, Tu.batch = function (e, t) {
      var i, n = [],
         s = {},
         r = t.interval || .016,
         o = t.batchMax || 1e9,
         a = function (e, t) {
            var i = [],
               n = [],
               s = pl.delayedCall(r, (function () {
                  t(i, n), i = [], n = []
               })).pause();
            return function (e) {
               i.length || s.restart(!0), i.push(e.trigger), n.push(e), o <= i.length && s.progress(1)
            }
         };
      for (i in t) s[i] = "on" === i.substr(0, 2) && sc(t[i]) && "onRefreshInit" !== i ? a(0, t[i]) : t[i];
      return sc(o) && (o = o(), jc(Tu, "refresh", (function () {
         return o = t.batchMax()
      }))), wl(e).forEach((function (e) {
         var t = {};
         for (i in s) t[i] = s[i];
         t.trigger = e, n.push(Tu.create(t))
      })), n
   }, Tu.sort = function (e) {
      return Uc.sort(e || function (e, t) {
         return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0))
      })
   }, Ql() && pl.registerPlugin(Tu);
   /*!
    * ScrollToPlugin 3.9.1
    * https://greensock.com
    *
    * @license Copyright 2008-2021, GreenSock. All rights reserved.
    * Subject to the terms at https://greensock.com/standard-license or for
    * Club GreenSock members, the agreement issued with that membership.
    * @author: Jack Doyle, jack@greensock.com
    */
   var ku, Eu, xu, Au, Cu, Su, Ou, Pu = function () {
         return "undefined" != typeof window
      },
      Mu = function () {
         return ku || Pu() && (ku = window.gsap) && ku.registerPlugin && ku
      },
      Lu = function (e) {
         return "string" == typeof e
      },
      Nu = function (e) {
         return "function" == typeof e
      },
      Iu = function (e, t) {
         var i = "x" === t ? "Width" : "Height",
            n = "scroll" + i,
            s = "client" + i;
         return e === xu || e === Au || e === Cu ? Math.max(Au[n], Cu[n]) - (xu["inner" + i] || Au[s] || Cu[s]) : e[n] - e["offset" + i]
      },
      Du = function (e, t) {
         var i = "scroll" + ("x" === t ? "Left" : "Top");
         return e === xu && (null != e.pageXOffset ? i = "page" + t.toUpperCase() + "Offset" : e = null != Au[i] ? Au : Cu),
            function () {
               return e[i]
            }
      },
      Ru = function (e, t) {
         if (!(e = Su(e)[0]) || !e.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
         };
         var i = e.getBoundingClientRect(),
            n = !t || t === xu || t === Cu,
            s = n ? {
               top: Au.clientTop - (xu.pageYOffset || Au.scrollTop || Cu.scrollTop || 0),
               left: Au.clientLeft - (xu.pageXOffset || Au.scrollLeft || Cu.scrollLeft || 0)
            } : t.getBoundingClientRect(),
            r = {
               x: i.left - s.left,
               y: i.top - s.top
            };
         return !n && t && (r.x += Du(t, "x")(), r.y += Du(t, "y")()), r
      },
      Bu = function (e, t, i, n, s) {
         return isNaN(e) || "object" == typeof e ? Lu(e) && "=" === e.charAt(1) ? parseFloat(e.substr(2)) * ("-" === e.charAt(0) ? -1 : 1) + n - s : "max" === e ? Iu(t, i) - s : Math.min(Iu(t, i), Ru(e, t)[i] - s) : parseFloat(e) - s
      },
      ju = function () {
         ku = Mu(), Pu() && ku && document.body && (xu = window, Cu = document.body, Au = document.documentElement, Su = ku.utils.toArray, ku.config({
            autoKillThreshold: 7
         }), Ou = ku.config(), Eu = 1)
      },
      Fu = {
         version: "3.9.1",
         name: "scrollTo",
         rawVars: 1,
         register: function (e) {
            ku = e, ju()
         },
         init: function (e, t, i, n, s) {
            Eu || ju();
            var r = this,
               o = ku.getProperty(e, "scrollSnapType");
            r.isWin = e === xu, r.target = e, r.tween = i, t = function (e, t, i, n) {
               if (Nu(e) && (e = e(t, i, n)), "object" != typeof e) return Lu(e) && "max" !== e && "=" !== e.charAt(1) ? {
                  x: e,
                  y: e
               } : {
                  y: e
               };
               if (e.nodeType) return {
                  y: e,
                  x: e
               };
               var s, r = {};
               for (s in e) r[s] = "onAutoKill" !== s && Nu(e[s]) ? e[s](t, i, n) : e[s];
               return r
            }(t, n, e, s), r.vars = t, r.autoKill = !!t.autoKill, r.getX = Du(e, "x"), r.getY = Du(e, "y"), r.x = r.xPrev = r.getX(), r.y = r.yPrev = r.getY(), o && "none" !== o && (r.snap = 1, r.snapInline = e.style.scrollSnapType, e.style.scrollSnapType = "none"), null != t.x ? (r.add(r, "x", r.x, Bu(t.x, e, "x", r.x, t.offsetX || 0), n, s), r._props.push("scrollTo_x")) : r.skipX = 1, null != t.y ? (r.add(r, "y", r.y, Bu(t.y, e, "y", r.y, t.offsetY || 0), n, s), r._props.push("scrollTo_y")) : r.skipY = 1
         },
         render: function (e, t) {
            for (var i, n, s, r, o, a = t._pt, l = t.target, c = t.tween, u = t.autoKill, h = t.xPrev, d = t.yPrev, p = t.isWin, f = t.snap, m = t.snapInline; a;) a.r(e, a.d), a = a._next;
            i = p || !t.skipX ? t.getX() : h, s = (n = p || !t.skipY ? t.getY() : d) - d, r = i - h, o = Ou.autoKillThreshold, t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), u && (!t.skipX && (r > o || r < -o) && i < Iu(l, "x") && (t.skipX = 1), !t.skipY && (s > o || s < -o) && n < Iu(l, "y") && (t.skipY = 1), t.skipX && t.skipY && (c.kill(), t.vars.onAutoKill && t.vars.onAutoKill.apply(c, t.vars.onAutoKillParams || []))), p ? xu.scrollTo(t.skipX ? i : t.x, t.skipY ? n : t.y) : (t.skipY || (l.scrollTop = t.y), t.skipX || (l.scrollLeft = t.x)), !f || 1 !== e && 0 !== e || (n = l.scrollTop, i = l.scrollLeft, m ? l.style.scrollSnapType = m : l.style.removeProperty("scroll-snap-type"), l.scrollTop = n + 1, l.scrollLeft = i + 1, l.scrollTop = n, l.scrollLeft = i), t.xPrev = t.x, t.yPrev = t.y
         },
         kill: function (e) {
            var t = "scrollTo" === e;
            (t || "scrollTo_x" === e) && (this.skipX = 1), (t || "scrollTo_y" === e) && (this.skipY = 1)
         }
      };
   Fu.max = Iu, Fu.getOffset = Ru, Fu.buildGetter = Du, Mu() && ku.registerPlugin(Fu);
   "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
   var Hu, $u = {
      exports: {}
   };
   Hu = $u, "object" == typeof navigator && (Hu.exports = function () {
      function e(e, t, i) {
         return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
         }) : e[t] = i, e
      }

      function t(e, t) {
         for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
         }
      }

      function i(e, t, i) {
         return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
         }) : e[t] = i, e
      }

      function n(e, t) {
         var i = Object.keys(e);
         if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
               return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), i.push.apply(i, n)
         }
         return i
      }

      function s(e) {
         for (var t = 1; t < arguments.length; t++) {
            var s = null != arguments[t] ? arguments[t] : {};
            t % 2 ? n(Object(s), !0).forEach((function (t) {
               i(e, t, s[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : n(Object(s)).forEach((function (t) {
               Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
            }))
         }
         return e
      }
      var r = {
         addCSS: !0,
         thumbWidth: 15,
         watch: !0
      };

      function o(e, t) {
         return function () {
            return Array.from(document.querySelectorAll(t)).includes(this)
         }.call(e, t)
      }
      var a = function (e) {
            return null != e ? e.constructor : null
         },
         l = function (e, t) {
            return !!(e && t && e instanceof t)
         },
         c = function (e) {
            return null == e
         },
         u = function (e) {
            return a(e) === Object
         },
         h = function (e) {
            return a(e) === String
         },
         d = function (e) {
            return Array.isArray(e)
         },
         p = function (e) {
            return l(e, NodeList)
         },
         f = h,
         m = d,
         g = p,
         b = function (e) {
            return l(e, Element)
         },
         y = function (e) {
            return l(e, Event)
         },
         v = function (e) {
            return c(e) || (h(e) || d(e) || p(e)) && !e.length || u(e) && !Object.keys(e).length
         };

      function _(e, t) {
         if (1 > t) {
            var i = function (e) {
               var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
               return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
            }(t);
            return parseFloat(e.toFixed(i))
         }
         return Math.round(e / t) * t
      }
      var w = function () {
         function e(t, i) {
            (function (e, t) {
               if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            })(this, e), b(t) ? this.element = t : f(t) && (this.element = document.querySelector(t)), b(this.element) && v(this.element.rangeTouch) && (this.config = s({}, r, {}, i), this.init())
         }
         return function (e, i, n) {
            i && t(e.prototype, i), n && t(e, n)
         }(e, [{
            key: "init",
            value: function () {
               e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
            }
         }, {
            key: "destroy",
            value: function () {
               e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null)
            }
         }, {
            key: "listeners",
            value: function (e) {
               var t = this,
                  i = e ? "addEventListener" : "removeEventListener";
               ["touchstart", "touchmove", "touchend"].forEach((function (e) {
                  t.element[i](e, (function (e) {
                     return t.set(e)
                  }), !1)
               }))
            }
         }, {
            key: "get",
            value: function (t) {
               if (!e.enabled || !y(t)) return null;
               var i, n = t.target,
                  s = t.changedTouches[0],
                  r = parseFloat(n.getAttribute("min")) || 0,
                  o = parseFloat(n.getAttribute("max")) || 100,
                  a = parseFloat(n.getAttribute("step")) || 1,
                  l = n.getBoundingClientRect(),
                  c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
               return 0 > (i = 100 / l.width * (s.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), r + _(i / 100 * (o - r), a)
            }
         }, {
            key: "set",
            value: function (t) {
               e.enabled && y(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) {
                  if (e && t) {
                     var i = new Event(t, {
                        bubbles: !0
                     });
                     e.dispatchEvent(i)
                  }
               }(t.target, "touchend" === t.type ? "change" : "input"))
            }
         }], [{
            key: "setup",
            value: function (t) {
               var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                  n = null;
               if (v(t) || f(t) ? n = Array.from(document.querySelectorAll(f(t) ? t : 'input[type="range"]')) : b(t) ? n = [t] : g(t) ? n = Array.from(t) : m(t) && (n = t.filter(b)), v(n)) return null;
               var a = s({}, r, {}, i);
               if (f(t) && a.watch) {
                  var l = new MutationObserver((function (i) {
                     Array.from(i).forEach((function (i) {
                        Array.from(i.addedNodes).forEach((function (i) {
                           b(i) && o(i, t) && new e(i, a)
                        }))
                     }))
                  }));
                  l.observe(document.body, {
                     childList: !0,
                     subtree: !0
                  })
               }
               return n.map((function (t) {
                  return new e(t, i)
               }))
            }
         }, {
            key: "enabled",
            get: function () {
               return "ontouchstart" in document.documentElement
            }
         }]), e
      }();
      const T = e => null != e ? e.constructor : null,
         k = (e, t) => Boolean(e && t && e instanceof t),
         E = e => null == e,
         x = e => T(e) === Object,
         A = e => T(e) === String,
         C = e => T(e) === Function,
         S = e => Array.isArray(e),
         O = e => k(e, NodeList),
         P = e => E(e) || (A(e) || S(e) || O(e)) && !e.length || x(e) && !Object.keys(e).length;
      var M = E,
         L = x,
         $ = e => T(e) === Number && !Number.isNaN(e),
         N = A,
         I = e => T(e) === Boolean,
         D = C,
         R = S,
         B = O,
         j = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
         F = e => k(e, Event),
         H = e => k(e, KeyboardEvent),
         z = e => k(e, TextTrack) || !E(e) && A(e.kind),
         V = e => k(e, Promise) && C(e.then),
         q = e => {
            if (k(e, window.URL)) return !0;
            if (!A(e)) return !1;
            let t = e;
            e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);
            try {
               return !P(new URL(t).hostname)
            } catch (e) {
               return !1
            }
         },
         W = P;
      const U = (() => {
         const e = document.createElement("span"),
            t = {
               WebkitTransition: "webkitTransitionEnd",
               MozTransition: "transitionend",
               OTransition: "oTransitionEnd otransitionend",
               transition: "transitionend"
            },
            i = Object.keys(t).find((t => void 0 !== e.style[t]));
         return !!N(i) && t[i]
      })();

      function Y(e, t) {
         setTimeout((() => {
            try {
               e.hidden = !0, e.offsetHeight, e.hidden = !1
            } catch (e) {}
         }), t)
      }
      const X = {
         isIE: Boolean(window.document.documentMode),
         isEdge: window.navigator.userAgent.includes("Edge"),
         isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
         isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
         isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
      };

      function K(e, t) {
         return t.split(".").reduce(((e, t) => e && e[t]), e)
      }

      function Q(e = {}, ...t) {
         if (!t.length) return e;
         const i = t.shift();
         return L(i) ? (Object.keys(i).forEach((t => {
            L(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
               [t]: {}
            }), Q(e[t], i[t])) : Object.assign(e, {
               [t]: i[t]
            })
         })), Q(e, ...t)) : e
      }

      function G(e, t) {
         const i = e.length ? e : [e];
         Array.from(i).reverse().forEach(((e, i) => {
            const n = i > 0 ? t.cloneNode(!0) : t,
               s = e.parentNode,
               r = e.nextSibling;
            n.appendChild(e), r ? s.insertBefore(n, r) : s.appendChild(n)
         }))
      }

      function J(e, t) {
         j(e) && !W(t) && Object.entries(t).filter((([, e]) => !M(e))).forEach((([t, i]) => e.setAttribute(t, i)))
      }

      function Z(e, t, i) {
         const n = document.createElement(e);
         return L(t) && J(n, t), N(i) && (n.innerText = i), n
      }

      function ee(e, t, i, n) {
         j(t) && t.appendChild(Z(e, i, n))
      }

      function te(e) {
         B(e) || R(e) ? Array.from(e).forEach(te) : j(e) && j(e.parentNode) && e.parentNode.removeChild(e)
      }

      function ie(e) {
         if (!j(e)) return;
         let {
            length: t
         } = e.childNodes;
         for (; t > 0;) e.removeChild(e.lastChild), t -= 1
      }

      function ne(e, t) {
         return j(t) && j(t.parentNode) && j(e) ? (t.parentNode.replaceChild(e, t), e) : null
      }

      function se(e, t) {
         if (!N(e) || W(e)) return {};
         const i = {},
            n = Q({}, t);
         return e.split(",").forEach((e => {
            const t = e.trim(),
               s = t.replace(".", ""),
               r = t.replace(/[[\]]/g, "").split("="),
               [o] = r,
               a = r.length > 1 ? r[1].replace(/["']/g, "") : "";
            switch (t.charAt(0)) {
               case ".":
                  N(n.class) ? i.class = `${n.class} ${s}` : i.class = s;
                  break;
               case "#":
                  i.id = t.replace("#", "");
                  break;
               case "[":
                  i[o] = a
            }
         })), Q(n, i)
      }

      function re(e, t) {
         if (!j(e)) return;
         let i = t;
         I(i) || (i = !e.hidden), e.hidden = i
      }

      function oe(e, t, i) {
         if (B(e)) return Array.from(e).map((e => oe(e, t, i)));
         if (j(e)) {
            let n = "toggle";
            return void 0 !== i && (n = i ? "add" : "remove"), e.classList[n](t), e.classList.contains(t)
         }
         return !1
      }

      function ae(e, t) {
         return j(e) && e.classList.contains(t)
      }

      function le(e, t) {
         const {
            prototype: i
         } = Element;
         return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
            return Array.from(document.querySelectorAll(t)).includes(this)
         }).call(e, t)
      }

      function ce(e) {
         return this.elements.container.querySelectorAll(e)
      }

      function ue(e) {
         return this.elements.container.querySelector(e)
      }

      function he(e = null, t = !1) {
         j(e) && (e.focus({
            preventScroll: !0
         }), t && oe(e, this.config.classNames.tabFocus))
      }
      const de = {
            "audio/ogg": "vorbis",
            "audio/wav": "1",
            "video/webm": "vp8, vorbis",
            "video/mp4": "avc1.42E01E, mp4a.40.2",
            "video/ogg": "theora"
         },
         pe = {
            audio: "canPlayType" in document.createElement("audio"),
            video: "canPlayType" in document.createElement("video"),
            check(e, t, i) {
               const n = X.isIPhone && i && pe.playsinline,
                  s = pe[e] || "html5" !== t;
               return {
                  api: s,
                  ui: s && pe.rangeInput && ("video" !== e || !X.isIPhone || n)
               }
            },
            pip: !(X.isIPhone || !D(Z("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Z("video").disablePictureInPicture)),
            airplay: D(window.WebKitPlaybackTargetAvailabilityEvent),
            playsinline: "playsInline" in document.createElement("video"),
            mime(e) {
               if (W(e)) return !1;
               const [t] = e.split("/");
               let i = e;
               if (!this.isHTML5 || t !== this.type) return !1;
               Object.keys(de).includes(i) && (i += `; codecs="${de[e]}"`);
               try {
                  return Boolean(i && this.media.canPlayType(i).replace(/no/, ""))
               } catch (e) {
                  return !1
               }
            },
            textTracks: "textTracks" in document.createElement("video"),
            rangeInput: (() => {
               const e = document.createElement("input");
               return e.type = "range", "range" === e.type
            })(),
            touch: "ontouchstart" in document.documentElement,
            transitions: !1 !== U,
            reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
         },
         fe = (() => {
            let e = !1;
            try {
               const t = Object.defineProperty({}, "passive", {
                  get: () => (e = !0, null)
               });
               window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
            } catch (e) {}
            return e
         })();

      function me(e, t, i, n = !1, s = !0, r = !1) {
         if (!e || !("addEventListener" in e) || W(t) || !D(i)) return;
         const o = t.split(" ");
         let a = r;
         fe && (a = {
            passive: s,
            capture: r
         }), o.forEach((t => {
            this && this.eventListeners && n && this.eventListeners.push({
               element: e,
               type: t,
               callback: i,
               options: a
            }), e[n ? "addEventListener" : "removeEventListener"](t, i, a)
         }))
      }

      function ge(e, t = "", i, n = !0, s = !1) {
         me.call(this, e, t, i, !0, n, s)
      }

      function be(e, t = "", i, n = !0, s = !1) {
         me.call(this, e, t, i, !1, n, s)
      }

      function ye(e, t = "", i, n = !0, s = !1) {
         const r = (...o) => {
            be(e, t, r, n, s), i.apply(this, o)
         };
         me.call(this, e, t, r, !0, n, s)
      }

      function ve(e, t = "", i = !1, n = {}) {
         if (!j(e) || W(t)) return;
         const s = new CustomEvent(t, {
            bubbles: i,
            detail: {
               ...n,
               plyr: this
            }
         });
         e.dispatchEvent(s)
      }

      function _e() {
         this && this.eventListeners && (this.eventListeners.forEach((e => {
            const {
               element: t,
               type: i,
               callback: n,
               options: s
            } = e;
            t.removeEventListener(i, n, s)
         })), this.eventListeners = [])
      }

      function we() {
         return new Promise((e => this.ready ? setTimeout(e, 0) : ge.call(this, this.elements.container, "ready", e))).then((() => {}))
      }

      function Te(e) {
         V(e) && e.then(null, (() => {}))
      }

      function ke(e) {
         return R(e) ? e.filter(((t, i) => e.indexOf(t) === i)) : e
      }

      function Ee(e, t) {
         return R(e) && e.length ? e.reduce(((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e)) : null
      }

      function xe(e) {
         return !(!window || !window.CSS) && window.CSS.supports(e)
      }
      const Ae = [
         [1, 1],
         [4, 3],
         [3, 4],
         [5, 4],
         [4, 5],
         [3, 2],
         [2, 3],
         [16, 10],
         [10, 16],
         [16, 9],
         [9, 16],
         [21, 9],
         [9, 21],
         [32, 9],
         [9, 32]
      ].reduce(((e, [t, i]) => ({
         ...e,
         [t / i]: [t, i]
      })), {});

      function Ce(e) {
         return !!(R(e) || N(e) && e.includes(":")) && (R(e) ? e : e.split(":")).map(Number).every($)
      }

      function Se(e) {
         if (!R(e) || !e.every($)) return null;
         const [t, i] = e, n = (e, t) => 0 === t ? e : n(t, e % t), s = n(t, i);
         return [t / s, i / s]
      }

      function Oe(e) {
         const t = e => Ce(e) ? e.split(":").map(Number) : null;
         let i = t(e);
         if (null === i && (i = t(this.config.ratio)), null === i && !W(this.embed) && R(this.embed.ratio) && ({
               ratio: i
            } = this.embed), null === i && this.isHTML5) {
            const {
               videoWidth: e,
               videoHeight: t
            } = this.media;
            i = [e, t]
         }
         return Se(i)
      }

      function Pe(e) {
         if (!this.isVideo) return {};
         const {
            wrapper: t
         } = this.elements, i = Oe.call(this, e);
         if (!R(i)) return {};
         const [n, s] = Se(i), r = 100 / n * s;
         if (xe(`aspect-ratio: ${n}/${s}`) ? t.style.aspectRatio = `${n}/${s}` : t.style.paddingBottom = `${r}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
            const e = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
               i = (e - r) / (e / 50);
            this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`
         } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
         return {
            padding: r,
            ratio: i
         }
      }

      function Me(e, t, i = .05) {
         const n = e / t,
            s = Ee(Object.keys(Ae), n);
         return Math.abs(s - n) <= i ? Ae[s] : [e, t]
      }
      const Le = {
         getSources() {
            return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter((e => {
               const t = e.getAttribute("type");
               return !!W(t) || pe.mime.call(this, t)
            })) : []
         },
         getQualityOptions() {
            return this.config.quality.forced ? this.config.quality.options : Le.getSources.call(this).map((e => Number(e.getAttribute("size")))).filter(Boolean)
         },
         setup() {
            if (!this.isHTML5) return;
            const e = this;
            e.options.speed = e.config.speed.options, W(this.config.ratio) || Pe.call(e), Object.defineProperty(e.media, "quality", {
               get() {
                  const t = Le.getSources.call(e).find((t => t.getAttribute("src") === e.source));
                  return t && Number(t.getAttribute("size"))
               },
               set(t) {
                  if (e.quality !== t) {
                     if (e.config.quality.forced && D(e.config.quality.onChange)) e.config.quality.onChange(t);
                     else {
                        const i = Le.getSources.call(e).find((e => Number(e.getAttribute("size")) === t));
                        if (!i) return;
                        const {
                           currentTime: n,
                           paused: s,
                           preload: r,
                           readyState: o,
                           playbackRate: a
                        } = e.media;
                        e.media.src = i.getAttribute("src"), ("none" !== r || o) && (e.once("loadedmetadata", (() => {
                           e.speed = a, e.currentTime = n, s || Te(e.play())
                        })), e.media.load())
                     }
                     ve.call(e, e.media, "qualitychange", !1, {
                        quality: t
                     })
                  }
               }
            })
         },
         cancelRequests() {
            this.isHTML5 && (te(Le.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
         }
      };

      function Ne(e, ...t) {
         return W(e) ? e : e.toString().replace(/{(\d+)}/g, ((e, i) => t[i].toString()))
      }
      const Ie = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()),
         De = (e = "") => e.toString().replace(/\w\S*/g, (e => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()));

      function Re(e = "") {
         let t = e.toString();
         return t = function (e = "") {
            let t = e.toString();
            return t = Ie(t, "-", " "), t = Ie(t, "_", " "), t = De(t), Ie(t, " ", "")
         }(t), t.charAt(0).toLowerCase() + t.slice(1)
      }

      function Be(e) {
         const t = document.createElement("div");
         return t.appendChild(e), t.innerHTML
      }
      const je = {
            pip: "PIP",
            airplay: "AirPlay",
            html5: "HTML5",
            vimeo: "Vimeo",
            youtube: "YouTube"
         },
         Fe = {
            get(e = "", t = {}) {
               if (W(e) || W(t)) return "";
               let i = K(t.i18n, e);
               if (W(i)) return Object.keys(je).includes(e) ? je[e] : "";
               const n = {
                  "{seektime}": t.seekTime,
                  "{title}": t.title
               };
               return Object.entries(n).forEach((([e, t]) => {
                  i = Ie(i, e, t)
               })), i
            }
         };
      class He {
         constructor(t) {
            e(this, "get", (e => {
               if (!He.supported || !this.enabled) return null;
               const t = window.localStorage.getItem(this.key);
               if (W(t)) return null;
               const i = JSON.parse(t);
               return N(e) && e.length ? i[e] : i
            })), e(this, "set", (e => {
               if (!He.supported || !this.enabled) return;
               if (!L(e)) return;
               let t = this.get();
               W(t) && (t = {}), Q(t, e);
               try {
                  window.localStorage.setItem(this.key, JSON.stringify(t))
               } catch (e) {}
            })), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
         }
         static get supported() {
            try {
               if (!("localStorage" in window)) return !1;
               const e = "___test";
               return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0
            } catch (e) {
               return !1
            }
         }
      }

      function $e(e, t = "text") {
         return new Promise(((i, n) => {
            try {
               const n = new XMLHttpRequest;
               if (!("withCredentials" in n)) return;
               n.addEventListener("load", (() => {
                  if ("text" === t) try {
                     i(JSON.parse(n.responseText))
                  } catch (e) {
                     i(n.responseText)
                  } else i(n.response)
               })), n.addEventListener("error", (() => {
                  throw new Error(n.status)
               })), n.open("GET", e, !0), n.responseType = t, n.send()
            } catch (e) {
               n(e)
            }
         }))
      }

      function ze(e, t) {
         if (!N(e)) return;
         const i = N(t);
         let n = !1;
         const s = () => null !== document.getElementById(t),
            r = (e, t) => {
               e.innerHTML = t, i && s() || document.body.insertAdjacentElement("afterbegin", e)
            };
         if (!i || !s()) {
            const s = He.supported,
               o = document.createElement("div");
            if (o.setAttribute("hidden", ""), i && o.setAttribute("id", t), s) {
               const e = window.localStorage.getItem(`cache-${t}`);
               if (n = null !== e, n) {
                  const t = JSON.parse(e);
                  r(o, t.content)
               }
            }
            $e(e).then((e => {
               if (!W(e)) {
                  if (s) try {
                     window.localStorage.setItem(`cache-${t}`, JSON.stringify({
                        content: e
                     }))
                  } catch (e) {}
                  r(o, e)
               }
            })).catch((() => {}))
         }
      }
      const Ve = e => Math.trunc(e / 60 / 60 % 60, 10);

      function qe(e = 0, t = !1, i = !1) {
         if (!$(e)) return qe(void 0, t, i);
         const n = e => `0${e}`.slice(-2);
         let s = Ve(e);
         const r = (o = e, Math.trunc(o / 60 % 60, 10));
         var o;
         const a = (e => Math.trunc(e % 60, 10))(e);
         return s = t || s > 0 ? `${s}:` : "", `${i&&e>0?"-":""}${s}${n(r)}:${n(a)}`
      }
      const We = {
         getIconUrl() {
            const e = new URL(this.config.iconUrl, window.location),
               t = window.location.host ? window.location.host : window.top.location.host,
               i = e.host !== t || X.isIE && !window.svg4everybody;
            return {
               url: this.config.iconUrl,
               cors: i
            }
         },
         findElements() {
            try {
               return this.elements.controls = ue.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                  play: ce.call(this, this.config.selectors.buttons.play),
                  pause: ue.call(this, this.config.selectors.buttons.pause),
                  restart: ue.call(this, this.config.selectors.buttons.restart),
                  rewind: ue.call(this, this.config.selectors.buttons.rewind),
                  fastForward: ue.call(this, this.config.selectors.buttons.fastForward),
                  mute: ue.call(this, this.config.selectors.buttons.mute),
                  pip: ue.call(this, this.config.selectors.buttons.pip),
                  airplay: ue.call(this, this.config.selectors.buttons.airplay),
                  settings: ue.call(this, this.config.selectors.buttons.settings),
                  captions: ue.call(this, this.config.selectors.buttons.captions),
                  fullscreen: ue.call(this, this.config.selectors.buttons.fullscreen)
               }, this.elements.progress = ue.call(this, this.config.selectors.progress), this.elements.inputs = {
                  seek: ue.call(this, this.config.selectors.inputs.seek),
                  volume: ue.call(this, this.config.selectors.inputs.volume)
               }, this.elements.display = {
                  buffer: ue.call(this, this.config.selectors.display.buffer),
                  currentTime: ue.call(this, this.config.selectors.display.currentTime),
                  duration: ue.call(this, this.config.selectors.display.duration)
               }, j(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), !0
            } catch (e) {
               return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
            }
         },
         createIcon(e, t) {
            const i = "http://www.w3.org/2000/svg",
               n = We.getIconUrl.call(this),
               s = `${n.cors?"":n.url}#${this.config.iconPrefix}`,
               r = document.createElementNS(i, "svg");
            J(r, Q(t, {
               "aria-hidden": "true",
               focusable: "false"
            }));
            const o = document.createElementNS(i, "use"),
               a = `${s}-${e}`;
            return "href" in o && o.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), o.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), r.appendChild(o), r
         },
         createLabel(e, t = {}) {
            const i = Fe.get(e, this.config);
            return Z("span", {
               ...t,
               class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
            }, i)
         },
         createBadge(e) {
            if (W(e)) return null;
            const t = Z("span", {
               class: this.config.classNames.menu.value
            });
            return t.appendChild(Z("span", {
               class: this.config.classNames.menu.badge
            }, e)), t
         },
         createButton(e, t) {
            const i = Q({}, t);
            let n = Re(e);
            const s = {
               element: "button",
               toggle: !1,
               label: null,
               icon: null,
               labelPressed: null,
               iconPressed: null
            };
            switch (["element", "icon", "label"].forEach((e => {
                  Object.keys(i).includes(e) && (s[e] = i[e], delete i[e])
               })), "button" !== s.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((e => e === this.config.classNames.control)) || Q(i, {
                  class: `${i.class} ${this.config.classNames.control}`
               }) : i.class = this.config.classNames.control, e) {
               case "play":
                  s.toggle = !0, s.label = "play", s.labelPressed = "pause", s.icon = "play", s.iconPressed = "pause";
                  break;
               case "mute":
                  s.toggle = !0, s.label = "mute", s.labelPressed = "unmute", s.icon = "volume", s.iconPressed = "muted";
                  break;
               case "captions":
                  s.toggle = !0, s.label = "enableCaptions", s.labelPressed = "disableCaptions", s.icon = "captions-off", s.iconPressed = "captions-on";
                  break;
               case "fullscreen":
                  s.toggle = !0, s.label = "enterFullscreen", s.labelPressed = "exitFullscreen", s.icon = "enter-fullscreen", s.iconPressed = "exit-fullscreen";
                  break;
               case "play-large":
                  i.class += ` ${this.config.classNames.control}--overlaid`, n = "play", s.label = "play", s.icon = "play";
                  break;
               default:
                  W(s.label) && (s.label = n), W(s.icon) && (s.icon = e)
            }
            const r = Z(s.element);
            return s.toggle ? (r.appendChild(We.createIcon.call(this, s.iconPressed, {
               class: "icon--pressed"
            })), r.appendChild(We.createIcon.call(this, s.icon, {
               class: "icon--not-pressed"
            })), r.appendChild(We.createLabel.call(this, s.labelPressed, {
               class: "label--pressed"
            })), r.appendChild(We.createLabel.call(this, s.label, {
               class: "label--not-pressed"
            }))) : (r.appendChild(We.createIcon.call(this, s.icon)), r.appendChild(We.createLabel.call(this, s.label))), Q(i, se(this.config.selectors.buttons[n], i)), J(r, i), "play" === n ? (R(this.elements.buttons[n]) || (this.elements.buttons[n] = []), this.elements.buttons[n].push(r)) : this.elements.buttons[n] = r, r
         },
         createRange(e, t) {
            const i = Z("input", Q(se(this.config.selectors.inputs[e]), {
               type: "range",
               min: 0,
               max: 100,
               step: .01,
               value: 0,
               autocomplete: "off",
               role: "slider",
               "aria-label": Fe.get(e, this.config),
               "aria-valuemin": 0,
               "aria-valuemax": 100,
               "aria-valuenow": 0
            }, t));
            return this.elements.inputs[e] = i, We.updateRangeFill.call(this, i), w.setup(i), i
         },
         createProgress(e, t) {
            const i = Z("progress", Q(se(this.config.selectors.display[e]), {
               min: 0,
               max: 100,
               value: 0,
               role: "progressbar",
               "aria-hidden": !0
            }, t));
            if ("volume" !== e) {
               i.appendChild(Z("span", null, "0"));
               const t = {
                     played: "played",
                     buffer: "buffered"
                  } [e],
                  n = t ? Fe.get(t, this.config) : "";
               i.innerText = `% ${n.toLowerCase()}`
            }
            return this.elements.display[e] = i, i
         },
         createTime(e, t) {
            const i = se(this.config.selectors.display[e], t),
               n = Z("div", Q(i, {
                  class: `${i.class?i.class:""} ${this.config.classNames.display.time} `.trim(),
                  "aria-label": Fe.get(e, this.config)
               }), "00:00");
            return this.elements.display[e] = n, n
         },
         bindMenuItemShortcuts(e, t) {
            ge.call(this, e, "keydown keyup", (i => {
               if (![32, 38, 39, 40].includes(i.which)) return;
               if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
               const n = le(e, '[role="menuitemradio"]');
               if (!n && [32, 39].includes(i.which)) We.showMenuPanel.call(this, t, !0);
               else {
                  let t;
                  32 !== i.which && (40 === i.which || n && 39 === i.which ? (t = e.nextElementSibling, j(t) || (t = e.parentNode.firstElementChild)) : (t = e.previousElementSibling, j(t) || (t = e.parentNode.lastElementChild)), he.call(this, t, !0))
               }
            }), !1), ge.call(this, e, "keyup", (e => {
               13 === e.which && We.focusFirstMenuItem.call(this, null, !0)
            }))
         },
         createMenuItem({
            value: e,
            list: t,
            type: i,
            title: n,
            badge: s = null,
            checked: r = !1
         }) {
            const o = se(this.config.selectors.inputs[i]),
               a = Z("button", Q(o, {
                  type: "button",
                  role: "menuitemradio",
                  class: `${this.config.classNames.control} ${o.class?o.class:""}`.trim(),
                  "aria-checked": r,
                  value: e
               })),
               l = Z("span");
            l.innerHTML = n, j(s) && l.appendChild(s), a.appendChild(l), Object.defineProperty(a, "checked", {
               enumerable: !0,
               get: () => "true" === a.getAttribute("aria-checked"),
               set(e) {
                  e && Array.from(a.parentNode.children).filter((e => le(e, '[role="menuitemradio"]'))).forEach((e => e.setAttribute("aria-checked", "false"))), a.setAttribute("aria-checked", e ? "true" : "false")
               }
            }), this.listeners.bind(a, "click keyup", (t => {
               if (!H(t) || 32 === t.which) {
                  switch (t.preventDefault(), t.stopPropagation(), a.checked = !0, i) {
                     case "language":
                        this.currentTrack = Number(e);
                        break;
                     case "quality":
                        this.quality = e;
                        break;
                     case "speed":
                        this.speed = parseFloat(e)
                  }
                  We.showMenuPanel.call(this, "home", H(t))
               }
            }), i, !1), We.bindMenuItemShortcuts.call(this, a, i), t.appendChild(a)
         },
         formatTime(e = 0, t = !1) {
            return $(e) ? qe(e, Ve(this.duration) > 0, t) : e
         },
         updateTimeDisplay(e = null, t = 0, i = !1) {
            j(e) && $(t) && (e.innerText = We.formatTime(t, i))
         },
         updateVolume() {
            this.supported.ui && (j(this.elements.inputs.volume) && We.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), j(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
         },
         setRange(e, t = 0) {
            j(e) && (e.value = t, We.updateRangeFill.call(this, e))
         },
         updateProgress(e) {
            if (!this.supported.ui || !F(e)) return;
            let t = 0;
            const i = (e, t) => {
               const i = $(t) ? t : 0,
                  n = j(e) ? e : this.elements.display.buffer;
               if (j(n)) {
                  n.value = i;
                  const e = n.getElementsByTagName("span")[0];
                  j(e) && (e.childNodes[0].nodeValue = i)
               }
            };
            if (e) switch (e.type) {
               case "timeupdate":
               case "seeking":
               case "seeked":
                  n = this.currentTime, s = this.duration, t = 0 === n || 0 === s || Number.isNaN(n) || Number.isNaN(s) ? 0 : (n / s * 100).toFixed(2), "timeupdate" === e.type && We.setRange.call(this, this.elements.inputs.seek, t);
                  break;
               case "playing":
               case "progress":
                  i(this.elements.display.buffer, 100 * this.buffered)
            }
            var n, s
         },
         updateRangeFill(e) {
            const t = F(e) ? e.target : e;
            if (j(t) && "range" === t.getAttribute("type")) {
               if (le(t, this.config.selectors.inputs.seek)) {
                  t.setAttribute("aria-valuenow", this.currentTime);
                  const e = We.formatTime(this.currentTime),
                     i = We.formatTime(this.duration),
                     n = Fe.get("seekLabel", this.config);
                  t.setAttribute("aria-valuetext", n.replace("{currentTime}", e).replace("{duration}", i))
               } else if (le(t, this.config.selectors.inputs.volume)) {
                  const e = 100 * t.value;
                  t.setAttribute("aria-valuenow", e), t.setAttribute("aria-valuetext", `${e.toFixed(1)}%`)
               } else t.setAttribute("aria-valuenow", t.value);
               X.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%")
            }
         },
         updateSeekTooltip(e) {
            if (!this.config.tooltips.seek || !j(this.elements.inputs.seek) || !j(this.elements.display.seekTooltip) || 0 === this.duration) return;
            const t = `${this.config.classNames.tooltip}--visible`,
               i = e => oe(this.elements.display.seekTooltip, t, e);
            if (this.touch) return void i(!1);
            let n = 0;
            const s = this.elements.progress.getBoundingClientRect();
            if (F(e)) n = 100 / s.width * (e.pageX - s.left);
            else {
               if (!ae(this.elements.display.seekTooltip, t)) return;
               n = parseFloat(this.elements.display.seekTooltip.style.left, 10)
            }
            n < 0 ? n = 0 : n > 100 && (n = 100), We.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * n), this.elements.display.seekTooltip.style.left = `${n}%`, F(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type)
         },
         timeUpdate(e) {
            const t = !j(this.elements.display.duration) && this.config.invertTime;
            We.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || We.updateProgress.call(this, e)
         },
         durationUpdate() {
            if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
            if (this.duration >= 2 ** 32) return re(this.elements.display.currentTime, !0), void re(this.elements.progress, !0);
            j(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
            const e = j(this.elements.display.duration);
            !e && this.config.displayDuration && this.paused && We.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && We.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), We.updateSeekTooltip.call(this)
         },
         toggleMenuButton(e, t) {
            re(this.elements.settings.buttons[e], !t)
         },
         updateSetting(e, t, i) {
            const n = this.elements.settings.panels[e];
            let s = null,
               r = t;
            if ("captions" === e) s = this.currentTrack;
            else {
               if (s = W(i) ? this[e] : i, W(s) && (s = this.config[e].default), !W(this.options[e]) && !this.options[e].includes(s)) return void this.debug.warn(`Unsupported value of '${s}' for ${e}`);
               if (!this.config[e].options.includes(s)) return void this.debug.warn(`Disabled value of '${s}' for ${e}`)
            }
            if (j(r) || (r = n && n.querySelector('[role="menu"]')), !j(r)) return;
            this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = We.getLabel.call(this, e, s);
            const o = r && r.querySelector(`[value="${s}"]`);
            j(o) && (o.checked = !0)
         },
         getLabel(e, t) {
            switch (e) {
               case "speed":
                  return 1 === t ? Fe.get("normal", this.config) : `${t}×`;
               case "quality":
                  if ($(t)) {
                     const e = Fe.get(`qualityLabel.${t}`, this.config);
                     return e.length ? e : `${t}p`
                  }
                  return De(t);
               case "captions":
                  return Xe.getLabel.call(this);
               default:
                  return null
            }
         },
         setQualityMenu(e) {
            if (!j(this.elements.settings.panels.quality)) return;
            const t = "quality",
               i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
            R(e) && (this.options.quality = ke(e).filter((e => this.config.quality.options.includes(e))));
            const n = !W(this.options.quality) && this.options.quality.length > 1;
            if (We.toggleMenuButton.call(this, t, n), ie(i), We.checkMenu.call(this), !n) return;
            const s = e => {
               const t = Fe.get(`qualityBadge.${e}`, this.config);
               return t.length ? We.createBadge.call(this, t) : null
            };
            this.options.quality.sort(((e, t) => {
               const i = this.config.quality.options;
               return i.indexOf(e) > i.indexOf(t) ? 1 : -1
            })).forEach((e => {
               We.createMenuItem.call(this, {
                  value: e,
                  list: i,
                  type: t,
                  title: We.getLabel.call(this, "quality", e),
                  badge: s(e)
               })
            })), We.updateSetting.call(this, t, i)
         },
         setCaptionsMenu() {
            if (!j(this.elements.settings.panels.captions)) return;
            const e = "captions",
               t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
               i = Xe.getTracks.call(this),
               n = Boolean(i.length);
            if (We.toggleMenuButton.call(this, e, n), ie(t), We.checkMenu.call(this), !n) return;
            const s = i.map(((e, i) => ({
               value: i,
               checked: this.captions.toggled && this.currentTrack === i,
               title: Xe.getLabel.call(this, e),
               badge: e.language && We.createBadge.call(this, e.language.toUpperCase()),
               list: t,
               type: "language"
            })));
            s.unshift({
               value: -1,
               checked: !this.captions.toggled,
               title: Fe.get("disabled", this.config),
               list: t,
               type: "language"
            }), s.forEach(We.createMenuItem.bind(this)), We.updateSetting.call(this, e, t)
         },
         setSpeedMenu() {
            if (!j(this.elements.settings.panels.speed)) return;
            const e = "speed",
               t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
            this.options.speed = this.options.speed.filter((e => e >= this.minimumSpeed && e <= this.maximumSpeed));
            const i = !W(this.options.speed) && this.options.speed.length > 1;
            We.toggleMenuButton.call(this, e, i), ie(t), We.checkMenu.call(this),
               i && (this.options.speed.forEach((i => {
                  We.createMenuItem.call(this, {
                     value: i,
                     list: t,
                     type: e,
                     title: We.getLabel.call(this, "speed", i)
                  })
               })), We.updateSetting.call(this, e, t))
         },
         checkMenu() {
            const {
               buttons: e
            } = this.elements.settings, t = !W(e) && Object.values(e).some((e => !e.hidden));
            re(this.elements.settings.menu, !t)
         },
         focusFirstMenuItem(e, t = !1) {
            if (this.elements.settings.popup.hidden) return;
            let i = e;
            j(i) || (i = Object.values(this.elements.settings.panels).find((e => !e.hidden)));
            const n = i.querySelector('[role^="menuitem"]');
            he.call(this, n, t)
         },
         toggleMenu(e) {
            const {
               popup: t
            } = this.elements.settings, i = this.elements.buttons.settings;
            if (!j(t) || !j(i)) return;
            const {
               hidden: n
            } = t;
            let s = n;
            if (I(e)) s = e;
            else if (H(e) && 27 === e.which) s = !1;
            else if (F(e)) {
               const n = D(e.composedPath) ? e.composedPath()[0] : e.target,
                  r = t.contains(n);
               if (r || !r && e.target !== i && s) return
            }
            i.setAttribute("aria-expanded", s), re(t, !s), oe(this.elements.container, this.config.classNames.menu.open, s), s && H(e) ? We.focusFirstMenuItem.call(this, null, !0) : s || n || he.call(this, i, H(e))
         },
         getMenuSize(e) {
            const t = e.cloneNode(!0);
            t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
            const i = t.scrollWidth,
               n = t.scrollHeight;
            return te(t), {
               width: i,
               height: n
            }
         },
         showMenuPanel(e = "", t = !1) {
            const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
            if (!j(i)) return;
            const n = i.parentNode,
               s = Array.from(n.children).find((e => !e.hidden));
            if (pe.transitions && !pe.reducedMotion) {
               n.style.width = `${s.scrollWidth}px`, n.style.height = `${s.scrollHeight}px`;
               const e = We.getMenuSize.call(this, i),
                  t = e => {
                     e.target === n && ["width", "height"].includes(e.propertyName) && (n.style.width = "", n.style.height = "", be.call(this, n, U, t))
                  };
               ge.call(this, n, U, t), n.style.width = `${e.width}px`, n.style.height = `${e.height}px`
            }
            re(s, !0), re(i, !1), We.focusFirstMenuItem.call(this, i, t)
         },
         setDownloadUrl() {
            const e = this.elements.buttons.download;
            j(e) && e.setAttribute("href", this.download)
         },
         create(e) {
            const {
               bindMenuItemShortcuts: t,
               createButton: i,
               createProgress: n,
               createRange: s,
               createTime: r,
               setQualityMenu: o,
               setSpeedMenu: a,
               showMenuPanel: l
            } = We;
            this.elements.controls = null, R(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
            const c = Z("div", se(this.config.selectors.controls.wrapper));
            this.elements.controls = c;
            const u = {
               class: "plyr__controls__item"
            };
            return ke(R(this.config.controls) ? this.config.controls : []).forEach((o => {
               if ("restart" === o && c.appendChild(i.call(this, "restart", u)), "rewind" === o && c.appendChild(i.call(this, "rewind", u)), "play" === o && c.appendChild(i.call(this, "play", u)), "fast-forward" === o && c.appendChild(i.call(this, "fast-forward", u)), "progress" === o) {
                  const t = Z("div", {
                        class: `${u.class} plyr__progress__container`
                     }),
                     i = Z("div", se(this.config.selectors.progress));
                  if (i.appendChild(s.call(this, "seek", {
                        id: `plyr-seek-${e.id}`
                     })), i.appendChild(n.call(this, "buffer")), this.config.tooltips.seek) {
                     const e = Z("span", {
                        class: this.config.classNames.tooltip
                     }, "00:00");
                     i.appendChild(e), this.elements.display.seekTooltip = e
                  }
                  this.elements.progress = i, t.appendChild(this.elements.progress), c.appendChild(t)
               }
               if ("current-time" === o && c.appendChild(r.call(this, "currentTime", u)), "duration" === o && c.appendChild(r.call(this, "duration", u)), "mute" === o || "volume" === o) {
                  let {
                     volume: t
                  } = this.elements;
                  if (j(t) && c.contains(t) || (t = Z("div", Q({}, u, {
                        class: `${u.class} plyr__volume`.trim()
                     })), this.elements.volume = t, c.appendChild(t)), "mute" === o && t.appendChild(i.call(this, "mute")), "volume" === o && !X.isIos) {
                     const i = {
                        max: 1,
                        step: .05,
                        value: this.config.volume
                     };
                     t.appendChild(s.call(this, "volume", Q(i, {
                        id: `plyr-volume-${e.id}`
                     })))
                  }
               }
               if ("captions" === o && c.appendChild(i.call(this, "captions", u)), "settings" === o && !W(this.config.settings)) {
                  const n = Z("div", Q({}, u, {
                     class: `${u.class} plyr__menu`.trim(),
                     hidden: ""
                  }));
                  n.appendChild(i.call(this, "settings", {
                     "aria-haspopup": !0,
                     "aria-controls": `plyr-settings-${e.id}`,
                     "aria-expanded": !1
                  }));
                  const s = Z("div", {
                        class: "plyr__menu__container",
                        id: `plyr-settings-${e.id}`,
                        hidden: ""
                     }),
                     r = Z("div"),
                     o = Z("div", {
                        id: `plyr-settings-${e.id}-home`
                     }),
                     a = Z("div", {
                        role: "menu"
                     });
                  o.appendChild(a), r.appendChild(o), this.elements.settings.panels.home = o, this.config.settings.forEach((i => {
                     const n = Z("button", Q(se(this.config.selectors.buttons.settings), {
                        type: "button",
                        class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                        role: "menuitem",
                        "aria-haspopup": !0,
                        hidden: ""
                     }));
                     t.call(this, n, i), ge.call(this, n, "click", (() => {
                        l.call(this, i, !1)
                     }));
                     const s = Z("span", null, Fe.get(i, this.config)),
                        o = Z("span", {
                           class: this.config.classNames.menu.value
                        });
                     o.innerHTML = e[i], s.appendChild(o), n.appendChild(s), a.appendChild(n);
                     const c = Z("div", {
                           id: `plyr-settings-${e.id}-${i}`,
                           hidden: ""
                        }),
                        u = Z("button", {
                           type: "button",
                           class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
                        });
                     u.appendChild(Z("span", {
                        "aria-hidden": !0
                     }, Fe.get(i, this.config))), u.appendChild(Z("span", {
                        class: this.config.classNames.hidden
                     }, Fe.get("menuBack", this.config))), ge.call(this, c, "keydown", (e => {
                        37 === e.which && (e.preventDefault(), e.stopPropagation(), l.call(this, "home", !0))
                     }), !1), ge.call(this, u, "click", (() => {
                        l.call(this, "home", !1)
                     })), c.appendChild(u), c.appendChild(Z("div", {
                        role: "menu"
                     })), r.appendChild(c), this.elements.settings.buttons[i] = n, this.elements.settings.panels[i] = c
                  })), s.appendChild(r), n.appendChild(s), c.appendChild(n), this.elements.settings.popup = s, this.elements.settings.menu = n
               }
               if ("pip" === o && pe.pip && c.appendChild(i.call(this, "pip", u)), "airplay" === o && pe.airplay && c.appendChild(i.call(this, "airplay", u)), "download" === o) {
                  const e = Q({}, u, {
                     element: "a",
                     href: this.download,
                     target: "_blank"
                  });
                  this.isHTML5 && (e.download = "");
                  const {
                     download: t
                  } = this.config.urls;
                  !q(t) && this.isEmbed && Q(e, {
                     icon: `logo-${this.provider}`,
                     label: this.provider
                  }), c.appendChild(i.call(this, "download", e))
               }
               "fullscreen" === o && c.appendChild(i.call(this, "fullscreen", u))
            })), this.isHTML5 && o.call(this, Le.getQualityOptions.call(this)), a.call(this), c
         },
         inject() {
            if (this.config.loadSprite) {
               const e = We.getIconUrl.call(this);
               e.cors && ze(e.url, "sprite-plyr")
            }
            this.id = Math.floor(1e4 * Math.random());
            let e = null;
            this.elements.controls = null;
            const t = {
               id: this.id,
               seektime: this.config.seekTime,
               title: this.config.title
            };
            let i, n = !0;
            if (D(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), j(this.config.controls) || N(this.config.controls) ? e = this.config.controls : (e = We.create.call(this, {
                  id: this.id,
                  seektime: this.config.seekTime,
                  speed: this.speed,
                  quality: this.quality,
                  captions: Xe.getLabel.call(this)
               }), n = !1), n && N(this.config.controls) && (e = (e => {
                  let i = e;
                  return Object.entries(t).forEach((([e, t]) => {
                     i = Ie(i, `{${e}}`, t)
                  })), i
               })(e)), N(this.config.selectors.controls.container) && (i = document.querySelector(this.config.selectors.controls.container)), j(i) || (i = this.elements.container), i[j(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), j(this.elements.controls) || We.findElements.call(this), !W(this.elements.buttons)) {
               const e = e => {
                  const t = this.config.classNames.controlPressed;
                  Object.defineProperty(e, "pressed", {
                     enumerable: !0,
                     get: () => ae(e, t),
                     set(i = !1) {
                        oe(e, t, i)
                     }
                  })
               };
               Object.values(this.elements.buttons).filter(Boolean).forEach((t => {
                  R(t) || B(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t)
               }))
            }
            if (X.isEdge && Y(i), this.config.tooltips.controls) {
               const {
                  classNames: e,
                  selectors: t
               } = this.config, i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`, n = ce.call(this, i);
               Array.from(n).forEach((e => {
                  oe(e, this.config.classNames.hidden, !1), oe(e, this.config.classNames.tooltip, !0)
               }))
            }
         }
      };

      function Ue(e, t = !0) {
         let i = e;
         if (t) {
            const e = document.createElement("a");
            e.href = i, i = e.href
         }
         try {
            return new URL(i)
         } catch (e) {
            return null
         }
      }

      function Ye(e) {
         const t = new URLSearchParams;
         return L(e) && Object.entries(e).forEach((([e, i]) => {
            t.set(e, i)
         })), t
      }
      const Xe = {
            setup() {
               if (!this.supported.ui) return;
               if (!this.isVideo || this.isYouTube || this.isHTML5 && !pe.textTracks) return void(R(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this));
               var e, t;
               if (j(this.elements.captions) || (this.elements.captions = Z("div", se(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, j(e) && j(t) && t.parentNode.insertBefore(e, t.nextSibling)), X.isIE && window.URL) {
                  const e = this.media.querySelectorAll("track");
                  Array.from(e).forEach((e => {
                     const t = e.getAttribute("src"),
                        i = Ue(t);
                     null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && $e(t, "blob").then((t => {
                        e.setAttribute("src", window.URL.createObjectURL(t))
                     })).catch((() => {
                        te(e)
                     }))
                  }))
               }
               const i = ke((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((e => e.split("-")[0])));
               let n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
               "auto" === n && ([n] = i);
               let s = this.storage.get("captions");
               if (I(s) || ({
                     active: s
                  } = this.config.captions), Object.assign(this.captions, {
                     toggled: !1,
                     active: s,
                     language: n,
                     languages: i
                  }), this.isHTML5) {
                  const e = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                  ge.call(this, this.media.textTracks, e, Xe.update.bind(this))
               }
               setTimeout(Xe.update.bind(this), 0)
            },
            update() {
               const e = Xe.getTracks.call(this, !0),
                  {
                     active: t,
                     language: i,
                     meta: n,
                     currentTrackNode: s
                  } = this.captions,
                  r = Boolean(e.find((e => e.language === i)));
               this.isHTML5 && this.isVideo && e.filter((e => !n.get(e))).forEach((e => {
                  this.debug.log("Track added", e), n.set(e, {
                     default: "showing" === e.mode
                  }), "showing" === e.mode && (e.mode = "hidden"), ge.call(this, e, "cuechange", (() => Xe.updateCues.call(this)))
               })), (r && this.language !== i || !e.includes(s)) && (Xe.setLanguage.call(this, i), Xe.toggle.call(this, t && r)), this.elements && oe(this.elements.container, this.config.classNames.captions.enabled, !W(e)), R(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this)
            },
            toggle(e, t = !0) {
               if (!this.supported.ui) return;
               const {
                  toggled: i
               } = this.captions, n = this.config.classNames.captions.active, s = M(e) ? !i : e;
               if (s !== i) {
                  if (t || (this.captions.active = s, this.storage.set({
                        captions: s
                     })), !this.language && s && !t) {
                     const e = Xe.getTracks.call(this),
                        t = Xe.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
                     return this.captions.language = t.language, void Xe.set.call(this, e.indexOf(t))
                  }
                  this.elements.buttons.captions && (this.elements.buttons.captions.pressed = s), oe(this.elements.container, n, s), this.captions.toggled = s, We.updateSetting.call(this, "captions"), ve.call(this, this.media, s ? "captionsenabled" : "captionsdisabled")
               }
               setTimeout((() => {
                  s && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden")
               }))
            },
            set(e, t = !0) {
               const i = Xe.getTracks.call(this);
               if (-1 !== e)
                  if ($(e))
                     if (e in i) {
                        if (this.captions.currentTrack !== e) {
                           this.captions.currentTrack = e;
                           const n = i[e],
                              {
                                 language: s
                              } = n || {};
                           this.captions.currentTrackNode = n, We.updateSetting.call(this, "captions"), t || (this.captions.language = s, this.storage.set({
                              language: s
                           })), this.isVimeo && this.embed.enableTextTrack(s), ve.call(this, this.media, "languagechange")
                        }
                        Xe.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Xe.updateCues.call(this)
                     } else this.debug.warn("Track not found", e);
               else this.debug.warn("Invalid caption argument", e);
               else Xe.toggle.call(this, !1, t)
            },
            setLanguage(e, t = !0) {
               if (!N(e)) return void this.debug.warn("Invalid language argument", e);
               const i = e.toLowerCase();
               this.captions.language = i;
               const n = Xe.getTracks.call(this),
                  s = Xe.findTrack.call(this, [i]);
               Xe.set.call(this, n.indexOf(s), t)
            },
            getTracks(e = !1) {
               return Array.from((this.media || {}).textTracks || []).filter((t => !this.isHTML5 || e || this.captions.meta.has(t))).filter((e => ["captions", "subtitles"].includes(e.kind)))
            },
            findTrack(e, t = !1) {
               const i = Xe.getTracks.call(this),
                  n = e => Number((this.captions.meta.get(e) || {}).default),
                  s = Array.from(i).sort(((e, t) => n(t) - n(e)));
               let r;
               return e.every((e => (r = s.find((t => t.language === e)), !r))), r || (t ? s[0] : void 0)
            },
            getCurrentTrack() {
               return Xe.getTracks.call(this)[this.currentTrack]
            },
            getLabel(e) {
               let t = e;
               return !z(t) && pe.textTracks && this.captions.toggled && (t = Xe.getCurrentTrack.call(this)), z(t) ? W(t.label) ? W(t.language) ? Fe.get("enabled", this.config) : e.language.toUpperCase() : t.label : Fe.get("disabled", this.config)
            },
            updateCues(e) {
               if (!this.supported.ui) return;
               if (!j(this.elements.captions)) return void this.debug.warn("No captions element to render to");
               if (!M(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
               let t = e;
               if (!t) {
                  const e = Xe.getCurrentTrack.call(this);
                  t = Array.from((e || {}).activeCues || []).map((e => e.getCueAsHTML())).map(Be)
               }
               const i = t.map((e => e.trim())).join("\n");
               if (i !== this.elements.captions.innerHTML) {
                  ie(this.elements.captions);
                  const e = Z("span", se(this.config.selectors.caption));
                  e.innerHTML = i, this.elements.captions.appendChild(e), ve.call(this, this.media, "cuechange")
               }
            }
         },
         Ke = {
            enabled: !0,
            title: "",
            debug: !1,
            autoplay: !1,
            autopause: !0,
            playsinline: !0,
            seekTime: 10,
            volume: 1,
            muted: !1,
            duration: null,
            displayDuration: !0,
            invertTime: !0,
            toggleInvert: !0,
            ratio: null,
            clickToPlay: !0,
            hideControls: !0,
            resetOnEnd: !1,
            disableContextMenu: !0,
            loadSprite: !0,
            iconPrefix: "plyr",
            iconUrl: "https://cdn.plyr.io/3.6.12/plyr.svg",
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            quality: {
               default: 576,
               options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
               forced: !1,
               onChange: null
            },
            loop: {
               active: !1
            },
            speed: {
               selected: 1,
               options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
            },
            keyboard: {
               focused: !0,
               global: !1
            },
            tooltips: {
               controls: !1,
               seek: !0
            },
            captions: {
               active: !1,
               language: "auto",
               update: !1
            },
            fullscreen: {
               enabled: !0,
               fallback: !0,
               iosNative: !1
            },
            storage: {
               enabled: !0,
               key: "plyr"
            },
            controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
            settings: ["captions", "quality", "speed"],
            i18n: {
               restart: "Restart",
               rewind: "Rewind {seektime}s",
               play: "Play",
               pause: "Pause",
               fastForward: "Forward {seektime}s",
               seek: "Seek",
               seekLabel: "{currentTime} of {duration}",
               played: "Played",
               buffered: "Buffered",
               currentTime: "Current time",
               duration: "Duration",
               volume: "Volume",
               mute: "Mute",
               unmute: "Unmute",
               enableCaptions: "Enable captions",
               disableCaptions: "Disable captions",
               download: "Download",
               enterFullscreen: "Enter fullscreen",
               exitFullscreen: "Exit fullscreen",
               frameTitle: "Player for {title}",
               captions: "Captions",
               settings: "Settings",
               pip: "PIP",
               menuBack: "Go back to previous menu",
               speed: "Speed",
               normal: "Normal",
               quality: "Quality",
               loop: "Loop",
               start: "Start",
               end: "End",
               all: "All",
               reset: "Reset",
               disabled: "Disabled",
               enabled: "Enabled",
               advertisement: "Ad",
               qualityBadge: {
                  2160: "4K",
                  1440: "HD",
                  1080: "HD",
                  720: "HD",
                  576: "SD",
                  480: "SD"
               }
            },
            urls: {
               download: null,
               vimeo: {
                  sdk: "https://player.vimeo.com/api/player.js",
                  iframe: "https://player.vimeo.com/video/{0}?{1}",
                  api: "https://vimeo.com/api/oembed.json?url={0}"
               },
               youtube: {
                  sdk: "https://www.youtube.com/iframe_api",
                  api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
               },
               googleIMA: {
                  sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
               }
            },
            listeners: {
               seek: null,
               play: null,
               pause: null,
               restart: null,
               rewind: null,
               fastForward: null,
               mute: null,
               volume: null,
               captions: null,
               download: null,
               fullscreen: null,
               pip: null,
               airplay: null,
               speed: null,
               quality: null,
               loop: null,
               language: null
            },
            events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
            selectors: {
               editable: "input, textarea, select, [contenteditable]",
               container: ".plyr",
               controls: {
                  container: null,
                  wrapper: ".plyr__controls"
               },
               labels: "[data-plyr]",
               buttons: {
                  play: '[data-plyr="play"]',
                  pause: '[data-plyr="pause"]',
                  restart: '[data-plyr="restart"]',
                  rewind: '[data-plyr="rewind"]',
                  fastForward: '[data-plyr="fast-forward"]',
                  mute: '[data-plyr="mute"]',
                  captions: '[data-plyr="captions"]',
                  download: '[data-plyr="download"]',
                  fullscreen: '[data-plyr="fullscreen"]',
                  pip: '[data-plyr="pip"]',
                  airplay: '[data-plyr="airplay"]',
                  settings: '[data-plyr="settings"]',
                  loop: '[data-plyr="loop"]'
               },
               inputs: {
                  seek: '[data-plyr="seek"]',
                  volume: '[data-plyr="volume"]',
                  speed: '[data-plyr="speed"]',
                  language: '[data-plyr="language"]',
                  quality: '[data-plyr="quality"]'
               },
               display: {
                  currentTime: ".plyr__time--current",
                  duration: ".plyr__time--duration",
                  buffer: ".plyr__progress__buffer",
                  loop: ".plyr__progress__loop",
                  volume: ".plyr__volume--display"
               },
               progress: ".plyr__progress",
               captions: ".plyr__captions",
               caption: ".plyr__caption"
            },
            classNames: {
               type: "plyr--{0}",
               provider: "plyr--{0}",
               video: "plyr__video-wrapper",
               embed: "plyr__video-embed",
               videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
               embedContainer: "plyr__video-embed__container",
               poster: "plyr__poster",
               posterEnabled: "plyr__poster-enabled",
               ads: "plyr__ads",
               control: "plyr__control",
               controlPressed: "plyr__control--pressed",
               playing: "plyr--playing",
               paused: "plyr--paused",
               stopped: "plyr--stopped",
               loading: "plyr--loading",
               hover: "plyr--hover",
               tooltip: "plyr__tooltip",
               cues: "plyr__cues",
               hidden: "plyr__sr-only",
               hideControls: "plyr--hide-controls",
               isIos: "plyr--is-ios",
               isTouch: "plyr--is-touch",
               uiSupported: "plyr--full-ui",
               noTransition: "plyr--no-transition",
               display: {
                  time: "plyr__time"
               },
               menu: {
                  value: "plyr__menu__value",
                  badge: "plyr__badge",
                  open: "plyr--menu-open"
               },
               captions: {
                  enabled: "plyr--captions-enabled",
                  active: "plyr--captions-active"
               },
               fullscreen: {
                  enabled: "plyr--fullscreen-enabled",
                  fallback: "plyr--fullscreen-fallback"
               },
               pip: {
                  supported: "plyr--pip-supported",
                  active: "plyr--pip-active"
               },
               airplay: {
                  supported: "plyr--airplay-supported",
                  active: "plyr--airplay-active"
               },
               tabFocus: "plyr__tab-focus",
               previewThumbnails: {
                  thumbContainer: "plyr__preview-thumb",
                  thumbContainerShown: "plyr__preview-thumb--is-shown",
                  imageContainer: "plyr__preview-thumb__image-container",
                  timeContainer: "plyr__preview-thumb__time-container",
                  scrubbingContainer: "plyr__preview-scrubbing",
                  scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
               }
            },
            attributes: {
               embed: {
                  provider: "data-plyr-provider",
                  id: "data-plyr-embed-id",
                  hash: "data-plyr-embed-hash"
               }
            },
            ads: {
               enabled: !1,
               publisherId: "",
               tagUrl: ""
            },
            previewThumbnails: {
               enabled: !1,
               src: ""
            },
            vimeo: {
               byline: !1,
               portrait: !1,
               title: !1,
               speed: !0,
               transparent: !1,
               customControls: !0,
               referrerPolicy: null,
               premium: !1
            },
            youtube: {
               rel: 0,
               showinfo: 0,
               iv_load_policy: 3,
               modestbranding: 1,
               customControls: !0,
               noCookie: !1
            }
         },
         Qe = "picture-in-picture",
         Ge = "inline",
         Je = {
            html5: "html5",
            youtube: "youtube",
            vimeo: "vimeo"
         },
         Ze = "audio",
         et = "video",
         tt = () => {};
      class it {
         constructor(e = !1) {
            this.enabled = window.console && e, this.enabled && this.log("Debugging enabled")
         }
         get log() {
            return this.enabled ? Function.prototype.bind.call(console.log, console) : tt
         }
         get warn() {
            return this.enabled ? Function.prototype.bind.call(console.warn, console) : tt
         }
         get error() {
            return this.enabled ? Function.prototype.bind.call(console.error, console) : tt
         }
      }
      class nt {
         constructor(t) {
            e(this, "onChange", (() => {
               if (!this.enabled) return;
               const e = this.player.elements.buttons.fullscreen;
               j(e) && (e.pressed = this.active);
               const t = this.target === this.player.media ? this.target : this.player.elements.container;
               ve.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0)
            })), e(this, "toggleFallback", ((e = !1) => {
               if (e ? this.scrollPosition = {
                     x: window.scrollX || 0,
                     y: window.scrollY || 0
                  } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", oe(this.target, this.player.config.classNames.fullscreen.fallback, e), X.isIos) {
                  let t = document.head.querySelector('meta[name="viewport"]');
                  const i = "viewport-fit=cover";
                  t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
                  const n = N(t.content) && t.content.includes(i);
                  e ? (this.cleanupViewport = !n, n || (t.content += `,${i}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter((e => e.trim() !== i)).join(","))
               }
               this.onChange()
            })), e(this, "trapFocus", (e => {
               if (X.isIos || !this.active || "Tab" !== e.key || 9 !== e.keyCode) return;
               const t = document.activeElement,
                  i = ce.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
                  [n] = i,
                  s = i[i.length - 1];
               t !== s || e.shiftKey ? t === n && e.shiftKey && (s.focus(), e.preventDefault()) : (n.focus(), e.preventDefault())
            })), e(this, "update", (() => {
               if (this.enabled) {
                  let e;
                  e = this.forceFallback ? "Fallback (forced)" : nt.native ? "Native" : "Fallback", this.player.debug.log(`${e} fullscreen enabled`)
               } else this.player.debug.log("Fullscreen not supported and fallback disabled");
               oe(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
            })), e(this, "enter", (() => {
               this.enabled && (X.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !nt.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? W(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({
                  navigationUI: "hide"
               }))
            })), e(this, "exit", (() => {
               if (this.enabled)
                  if (X.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), Te(this.player.play());
                  else if (!nt.native || this.forceFallback) this.toggleFallback(!1);
               else if (this.prefix) {
                  if (!W(this.prefix)) {
                     const e = "moz" === this.prefix ? "Cancel" : "Exit";
                     document[`${this.prefix}${e}${this.property}`]()
                  }
               } else(document.cancelFullScreen || document.exitFullscreen).call(document)
            })), e(this, "toggle", (() => {
               this.active ? this.exit() : this.enter()
            })), this.player = t, this.prefix = nt.prefix, this.property = nt.property, this.scrollPosition = {
               x: 0,
               y: 0
            }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) {
               const {
                  prototype: i
               } = Element;
               return (i.closest || function () {
                  let e = this;
                  do {
                     if (le.matches(e, t)) return e;
                     e = e.parentElement || e.parentNode
                  } while (null !== e && 1 === e.nodeType);
                  return null
               }).call(e, t)
            }(this.player.elements.container, t.config.fullscreen.container), ge.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, (() => {
               this.onChange()
            })), ge.call(this.player, this.player.elements.container, "dblclick", (e => {
               j(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen")
            })), ge.call(this, this.player.elements.container, "keydown", (e => this.trapFocus(e))), this.update()
         }
         static get native() {
            return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
         }
         get usingNative() {
            return nt.native && !this.forceFallback
         }
         static get prefix() {
            if (D(document.exitFullscreen)) return "";
            let e = "";
            return ["webkit", "moz", "ms"].some((t => !(!D(document[`${t}ExitFullscreen`]) && !D(document[`${t}CancelFullScreen`]) || (e = t, 0)))), e
         }
         static get property() {
            return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
         }
         get enabled() {
            return (nt.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
         }
         get active() {
            if (!this.enabled) return !1;
            if (!nt.native || this.forceFallback) return ae(this.target, this.player.config.classNames.fullscreen.fallback);
            const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
            return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target
         }
         get target() {
            return X.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
         }
      }

      function st(e, t = 1) {
         return new Promise(((i, n) => {
            const s = new Image,
               r = () => {
                  delete s.onload, delete s.onerror, (s.naturalWidth >= t ? i : n)(s)
               };
            Object.assign(s, {
               onload: r,
               onerror: r,
               src: e
            })
         }))
      }
      const rt = {
         addStyleHook() {
            oe(this.elements.container, this.config.selectors.container.replace(".", ""), !0), oe(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
         },
         toggleNativeControls(e = !1) {
            e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
         },
         build() {
            if (this.listeners.media(), !this.supported.ui) return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void rt.toggleNativeControls.call(this, !0);
            j(this.elements.controls) || (We.inject.call(this), this.listeners.controls()), rt.toggleNativeControls.call(this), this.isHTML5 && Xe.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, We.updateVolume.call(this), We.timeUpdate.call(this), We.durationUpdate.call(this), rt.checkPlaying.call(this), oe(this.elements.container, this.config.classNames.pip.supported, pe.pip && this.isHTML5 && this.isVideo), oe(this.elements.container, this.config.classNames.airplay.supported, pe.airplay && this.isHTML5), oe(this.elements.container, this.config.classNames.isIos, X.isIos), oe(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout((() => {
               ve.call(this, this.media, "ready")
            }), 0), rt.setTitle.call(this), this.poster && rt.setPoster.call(this, this.poster, !1).catch((() => {})), this.config.duration && We.durationUpdate.call(this)
         },
         setTitle() {
            let e = Fe.get("play", this.config);
            if (N(this.config.title) && !W(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach((t => {
                  t.setAttribute("aria-label", e)
               })), this.isEmbed) {
               const e = ue.call(this, "iframe");
               if (!j(e)) return;
               const t = W(this.config.title) ? "video" : this.config.title,
                  i = Fe.get("frameTitle", this.config);
               e.setAttribute("title", i.replace("{title}", t))
            }
         },
         togglePoster(e) {
            oe(this.elements.container, this.config.classNames.posterEnabled, e)
         },
         setPoster(e, t = !0) {
            return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), we.call(this).then((() => st(e))).catch((t => {
               throw e === this.poster && rt.togglePoster.call(this, !1), t
            })).then((() => {
               if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster")
            })).then((() => (Object.assign(this.elements.poster.style, {
               backgroundImage: `url('${e}')`,
               backgroundSize: ""
            }), rt.togglePoster.call(this, !0), e))))
         },
         checkPlaying(e) {
            oe(this.elements.container, this.config.classNames.playing, this.playing), oe(this.elements.container, this.config.classNames.paused, this.paused), oe(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((e => {
               Object.assign(e, {
                  pressed: this.playing
               }), e.setAttribute("aria-label", Fe.get(this.playing ? "pause" : "play", this.config))
            })), F(e) && "timeupdate" === e.type || rt.toggleControls.call(this)
         },
         checkLoading(e) {
            this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout((() => {
               oe(this.elements.container, this.config.classNames.loading, this.loading), rt.toggleControls.call(this)
            }), this.loading ? 250 : 0)
         },
         toggleControls(e) {
            const {
               controls: t
            } = this.elements;
            if (t && this.config.hideControls) {
               const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
               this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i))
            }
         },
         migrateStyles() {
            Object.values({
               ...this.media.style
            }).filter((e => !W(e) && N(e) && e.startsWith("--plyr"))).forEach((e => {
               this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e)
            })), W(this.media.style) && this.media.removeAttribute("style")
         }
      };
      class ot {
         constructor(t) {
            e(this, "firstTouch", (() => {
               const {
                  player: e
               } = this, {
                  elements: t
               } = e;
               e.touch = !0, oe(t.container, e.config.classNames.isTouch, !0)
            })), e(this, "setTabFocus", (e => {
               const {
                  player: t
               } = this, {
                  elements: i
               } = t;
               if (clearTimeout(this.focusTimer), "keydown" === e.type && 9 !== e.which) return;
               "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
               const n = e.timeStamp - this.lastKeyDown <= 20;
               ("focus" !== e.type || n) && ((() => {
                  const e = t.config.classNames.tabFocus;
                  oe(ce.call(t, `.${e}`), e, !1)
               })(), "focusout" !== e.type && (this.focusTimer = setTimeout((() => {
                  const e = document.activeElement;
                  i.container.contains(e) && oe(document.activeElement, t.config.classNames.tabFocus, !0)
               }), 10)))
            })), e(this, "global", ((e = !0) => {
               const {
                  player: t
               } = this;
               t.config.keyboard.global && me.call(t, window, "keydown keyup", this.handleKey, e, !1), me.call(t, document.body, "click", this.toggleMenu, e), ye.call(t, document.body, "touchstart", this.firstTouch), me.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0)
            })), e(this, "container", (() => {
               const {
                  player: e
               } = this, {
                  config: t,
                  elements: i,
                  timers: n
               } = e;
               !t.keyboard.global && t.keyboard.focused && ge.call(e, i.container, "keydown keyup", this.handleKey, !1), ge.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (t => {
                  const {
                     controls: s
                  } = i;
                  s && "enterfullscreen" === t.type && (s.pressed = !1, s.hover = !1);
                  let r = 0;
                  ["touchstart", "touchmove", "mousemove"].includes(t.type) && (rt.toggleControls.call(e, !0), r = e.touch ? 3e3 : 2e3), clearTimeout(n.controls), n.controls = setTimeout((() => rt.toggleControls.call(e, !1)), r)
               }));
               const s = () => {
                     if (!e.isVimeo || e.config.vimeo.premium) return;
                     const t = i.wrapper,
                        {
                           active: n
                        } = e.fullscreen,
                        [s, r] = Oe.call(e),
                        o = xe(`aspect-ratio: ${s} / ${r}`);
                     if (!n) return void(o ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));
                     const [a, l] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)], c = a / l > s / r;
                     o ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? l / r * s + "px" : null, t.style.margin = c ? "0 auto" : null)
                  },
                  r = () => {
                     clearTimeout(n.resized), n.resized = setTimeout(s, 50)
                  };
               ge.call(e, i.container, "enterfullscreen exitfullscreen", (t => {
                  const {
                     target: n
                  } = e.fullscreen;
                  n === i.container && (!e.isEmbed && W(e.config.ratio) || (s(), ("enterfullscreen" === t.type ? ge : be).call(e, window, "resize", r)))
               }))
            })), e(this, "media", (() => {
               const {
                  player: e
               } = this, {
                  elements: t
               } = e;
               if (ge.call(e, e.media, "timeupdate seeking seeked", (t => We.timeUpdate.call(e, t))), ge.call(e, e.media, "durationchange loadeddata loadedmetadata", (t => We.durationUpdate.call(e, t))), ge.call(e, e.media, "ended", (() => {
                     e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause())
                  })), ge.call(e, e.media, "progress playing seeking seeked", (t => We.updateProgress.call(e, t))), ge.call(e, e.media, "volumechange", (t => We.updateVolume.call(e, t))), ge.call(e, e.media, "playing play pause ended emptied timeupdate", (t => rt.checkPlaying.call(e, t))), ge.call(e, e.media, "waiting canplay seeked playing", (t => rt.checkLoading.call(e, t))), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
                  const i = ue.call(e, `.${e.config.classNames.video}`);
                  if (!j(i)) return;
                  ge.call(e, t.container, "click", (n => {
                     ([t.container, i].includes(n.target) || i.contains(n.target)) && (e.touch && e.config.hideControls || (e.ended ? (this.proxy(n, e.restart, "restart"), this.proxy(n, (() => {
                        Te(e.play())
                     }), "play")) : this.proxy(n, (() => {
                        Te(e.togglePlay())
                     }), "play")))
                  }))
               }
               e.supported.ui && e.config.disableContextMenu && ge.call(e, t.wrapper, "contextmenu", (e => {
                  e.preventDefault()
               }), !1), ge.call(e, e.media, "volumechange", (() => {
                  e.storage.set({
                     volume: e.volume,
                     muted: e.muted
                  })
               })), ge.call(e, e.media, "ratechange", (() => {
                  We.updateSetting.call(e, "speed"), e.storage.set({
                     speed: e.speed
                  })
               })), ge.call(e, e.media, "qualitychange", (t => {
                  We.updateSetting.call(e, "quality", null, t.detail.quality)
               })), ge.call(e, e.media, "ready qualitychange", (() => {
                  We.setDownloadUrl.call(e)
               }));
               const i = e.config.events.concat(["keyup", "keydown"]).join(" ");
               ge.call(e, e.media, i, (i => {
                  let {
                     detail: n = {}
                  } = i;
                  "error" === i.type && (n = e.media.error), ve.call(e, t.container, i.type, !0, n)
               }))
            })), e(this, "proxy", ((e, t, i) => {
               const {
                  player: n
               } = this, s = n.config.listeners[i];
               let r = !0;
               D(s) && (r = s.call(n, e)), !1 !== r && D(t) && t.call(n, e)
            })), e(this, "bind", ((e, t, i, n, s = !0) => {
               const {
                  player: r
               } = this, o = r.config.listeners[n], a = D(o);
               ge.call(r, e, t, (e => this.proxy(e, i, n)), s && !a)
            })), e(this, "controls", (() => {
               const {
                  player: e
               } = this, {
                  elements: t
               } = e, i = X.isIE ? "change" : "input";
               if (t.buttons.play && Array.from(t.buttons.play).forEach((t => {
                     this.bind(t, "click", (() => {
                        Te(e.togglePlay())
                     }), "play")
                  })), this.bind(t.buttons.restart, "click", e.restart, "restart"), this.bind(t.buttons.rewind, "click", (() => {
                     e.lastSeekTime = Date.now(), e.rewind()
                  }), "rewind"), this.bind(t.buttons.fastForward, "click", (() => {
                     e.lastSeekTime = Date.now(), e.forward()
                  }), "fastForward"), this.bind(t.buttons.mute, "click", (() => {
                     e.muted = !e.muted
                  }), "mute"), this.bind(t.buttons.captions, "click", (() => e.toggleCaptions())), this.bind(t.buttons.download, "click", (() => {
                     ve.call(e, e.media, "download")
                  }), "download"), this.bind(t.buttons.fullscreen, "click", (() => {
                     e.fullscreen.toggle()
                  }), "fullscreen"), this.bind(t.buttons.pip, "click", (() => {
                     e.pip = "toggle"
                  }), "pip"), this.bind(t.buttons.airplay, "click", e.airplay, "airplay"), this.bind(t.buttons.settings, "click", (t => {
                     t.stopPropagation(), t.preventDefault(), We.toggleMenu.call(e, t)
                  }), null, !1), this.bind(t.buttons.settings, "keyup", (t => {
                     const i = t.which;
                     [13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), We.toggleMenu.call(e, t)) : We.focusFirstMenuItem.call(e, null, !0))
                  }), null, !1), this.bind(t.settings.menu, "keydown", (t => {
                     27 === t.which && We.toggleMenu.call(e, t)
                  })), this.bind(t.inputs.seek, "mousedown mousemove", (e => {
                     const i = t.progress.getBoundingClientRect(),
                        n = 100 / i.width * (e.pageX - i.left);
                     e.currentTarget.setAttribute("seek-value", n)
                  })), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (t => {
                     const i = t.currentTarget,
                        n = t.keyCode ? t.keyCode : t.which,
                        s = "play-on-seeked";
                     if (H(t) && 39 !== n && 37 !== n) return;
                     e.lastSeekTime = Date.now();
                     const r = i.hasAttribute(s),
                        o = ["mouseup", "touchend", "keyup"].includes(t.type);
                     r && o ? (i.removeAttribute(s), Te(e.play())) : !o && e.playing && (i.setAttribute(s, ""), e.pause())
                  })), X.isIos) {
                  const t = ce.call(e, 'input[type="range"]');
                  Array.from(t).forEach((e => this.bind(e, i, (e => Y(e.target)))))
               }
               this.bind(t.inputs.seek, i, (t => {
                  const i = t.currentTarget;
                  let n = i.getAttribute("seek-value");
                  W(n) && (n = i.value), i.removeAttribute("seek-value"), e.currentTime = n / i.max * e.duration
               }), "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", (t => We.updateSeekTooltip.call(e, t))), this.bind(t.progress, "mousemove touchmove", (t => {
                  const {
                     previewThumbnails: i
                  } = e;
                  i && i.loaded && i.startMove(t)
               })), this.bind(t.progress, "mouseleave touchend click", (() => {
                  const {
                     previewThumbnails: t
                  } = e;
                  t && t.loaded && t.endMove(!1, !0)
               })), this.bind(t.progress, "mousedown touchstart", (t => {
                  const {
                     previewThumbnails: i
                  } = e;
                  i && i.loaded && i.startScrubbing(t)
               })), this.bind(t.progress, "mouseup touchend", (t => {
                  const {
                     previewThumbnails: i
                  } = e;
                  i && i.loaded && i.endScrubbing(t)
               })), X.isWebkit && Array.from(ce.call(e, 'input[type="range"]')).forEach((t => {
                  this.bind(t, "input", (t => We.updateRangeFill.call(e, t.target)))
               })), e.config.toggleInvert && !j(t.display.duration) && this.bind(t.display.currentTime, "click", (() => {
                  0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, We.timeUpdate.call(e))
               })), this.bind(t.inputs.volume, i, (t => {
                  e.volume = t.target.value
               }), "volume"), this.bind(t.controls, "mouseenter mouseleave", (i => {
                  t.controls.hover = !e.touch && "mouseenter" === i.type
               })), t.fullscreen && Array.from(t.fullscreen.children).filter((e => !e.contains(t.container))).forEach((i => {
                  this.bind(i, "mouseenter mouseleave", (i => {
                     t.controls && (t.controls.hover = !e.touch && "mouseenter" === i.type)
                  }))
               })), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", (e => {
                  t.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
               })), this.bind(t.controls, "focusin", (() => {
                  const {
                     config: i,
                     timers: n
                  } = e;
                  oe(t.controls, i.classNames.noTransition, !0), rt.toggleControls.call(e, !0), setTimeout((() => {
                     oe(t.controls, i.classNames.noTransition, !1)
                  }), 0);
                  const s = this.touch ? 3e3 : 4e3;
                  clearTimeout(n.controls), n.controls = setTimeout((() => rt.toggleControls.call(e, !1)), s)
               })), this.bind(t.inputs.volume, "wheel", (t => {
                  const i = t.webkitDirectionInvertedFromDevice,
                     [n, s] = [t.deltaX, -t.deltaY].map((e => i ? -e : e)),
                     r = Math.sign(Math.abs(n) > Math.abs(s) ? n : s);
                  e.increaseVolume(r / 50);
                  const {
                     volume: o
                  } = e.media;
                  (1 === r && o < 1 || -1 === r && o > 0) && t.preventDefault()
               }), "volume", !1)
            })), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
         }
         handleKey(e) {
            const {
               player: t
            } = this, {
               elements: i
            } = t, n = e.keyCode ? e.keyCode : e.which, s = "keydown" === e.type, r = s && n === this.lastKey;
            if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && $(n))
               if (s) {
                  const s = document.activeElement;
                  if (j(s)) {
                     const {
                        editable: n
                     } = t.config.selectors, {
                        seek: r
                     } = i.inputs;
                     if (s !== r && le(s, n)) return;
                     if (32 === e.which && le(s, 'button, [role^="menuitem"]')) return
                  }
                  switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(n) && (e.preventDefault(), e.stopPropagation()), n) {
                     case 48:
                     case 49:
                     case 50:
                     case 51:
                     case 52:
                     case 53:
                     case 54:
                     case 55:
                     case 56:
                     case 57:
                        r || (t.currentTime = t.duration / 10 * (n - 48));
                        break;
                     case 32:
                     case 75:
                        r || Te(t.togglePlay());
                        break;
                     case 38:
                        t.increaseVolume(.1);
                        break;
                     case 40:
                        t.decreaseVolume(.1);
                        break;
                     case 77:
                        r || (t.muted = !t.muted);
                        break;
                     case 39:
                        t.forward();
                        break;
                     case 37:
                        t.rewind();
                        break;
                     case 70:
                        t.fullscreen.toggle();
                        break;
                     case 67:
                        r || t.toggleCaptions();
                        break;
                     case 76:
                        t.loop = !t.loop
                  }
                  27 === n && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = n
               } else this.lastKey = null
         }
         toggleMenu(e) {
            We.toggleMenu.call(this.player, e)
         }
      }
      var at = function (e, t) {
         return e(t = {
            exports: {}
         }, t.exports), t.exports
      }((function (e, t) {
         e.exports = function () {
            var e = function () {},
               t = {},
               i = {},
               n = {};

            function s(e, t) {
               e = e.push ? e : [e];
               var s, r, o, a = [],
                  l = e.length,
                  c = l;
               for (s = function (e, i) {
                     i.length && a.push(e), --c || t(a)
                  }; l--;) r = e[l], (o = i[r]) ? s(r, o) : (n[r] = n[r] || []).push(s)
            }

            function r(e, t) {
               if (e) {
                  var s = n[e];
                  if (i[e] = t, s)
                     for (; s.length;) s[0](e, t), s.splice(0, 1)
               }
            }

            function o(t, i) {
               t.call && (t = {
                  success: t
               }), i.length ? (t.error || e)(i) : (t.success || e)(t)
            }

            function a(t, i, n, s) {
               var r, o, l = document,
                  c = n.async,
                  u = (n.numRetries || 0) + 1,
                  h = n.before || e,
                  d = t.replace(/[\?|#].*$/, ""),
                  p = t.replace(/^(css|img)!/, "");
               s = s || 0, /(^css!|\.css$)/.test(d) ? ((o = l.createElement("link")).rel = "stylesheet", o.href = p, (r = "hideFocus" in o) && o.relList && (r = 0, o.rel = "preload", o.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (o = l.createElement("img")).src = p : ((o = l.createElement("script")).src = t, o.async = void 0 === c || c), o.onload = o.onerror = o.onbeforeload = function (e) {
                  var l = e.type[0];
                  if (r) try {
                     o.sheet.cssText.length || (l = "e")
                  } catch (e) {
                     18 != e.code && (l = "e")
                  }
                  if ("e" == l) {
                     if ((s += 1) < u) return a(t, i, n, s)
                  } else if ("preload" == o.rel && "style" == o.as) return o.rel = "stylesheet";
                  i(t, l, e.defaultPrevented)
               }, !1 !== h(t, o) && l.head.appendChild(o)
            }

            function l(e, t, i) {
               var n, s, r = (e = e.push ? e : [e]).length,
                  o = r,
                  l = [];
               for (n = function (e, i, n) {
                     if ("e" == i && l.push(e), "b" == i) {
                        if (!n) return;
                        l.push(e)
                     }--r || t(l)
                  }, s = 0; s < o; s++) a(e[s], n, i)
            }

            function c(e, i, n) {
               var s, a;
               if (i && i.trim && (s = i), a = (s ? n : i) || {}, s) {
                  if (s in t) throw "LoadJS";
                  t[s] = !0
               }

               function c(t, i) {
                  l(e, (function (e) {
                     o(a, e), t && o({
                        success: t,
                        error: i
                     }, e), r(s, e)
                  }), a)
               }
               if (a.returnPromise) return new Promise(c);
               c()
            }
            return c.ready = function (e, t) {
               return s(e, (function (e) {
                  o(t, e)
               })), c
            }, c.done = function (e) {
               r(e, [])
            }, c.reset = function () {
               t = {}, i = {}, n = {}
            }, c.isDefined = function (e) {
               return e in t
            }, c
         }()
      }));

      function lt(e) {
         return new Promise(((t, i) => {
            at(e, {
               success: t,
               error: i
            })
         }))
      }

      function ct(e) {
         e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"))
      }
      const ut = {
         setup() {
            const e = this;
            oe(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Pe.call(e), L(window.Vimeo) ? ut.ready.call(e) : lt(e.config.urls.vimeo.sdk).then((() => {
               ut.ready.call(e)
            })).catch((t => {
               e.debug.warn("Vimeo SDK (player.js) failed to load", t)
            }))
         },
         ready() {
            const e = this,
               t = e.config.vimeo,
               {
                  premium: i,
                  referrerPolicy: n,
                  ...s
               } = t;
            let r = e.media.getAttribute("src"),
               o = "";
            W(r) ? (r = e.media.getAttribute(e.config.attributes.embed.id), o = e.media.getAttribute(e.config.attributes.embed.hash)) : o = function (e) {
               const t = e.match(/^.*(?:vimeo.com\/|video\/)(?:\d+)(?:\?.*&*h=|\/)+(?<hash>[\d,a-f]+)/);
               return t ? t.groups.hash : null
            }(r);
            const a = o ? {
               h: o
            } : {};
            i && Object.assign(s, {
               controls: !1,
               sidedock: !1
            });
            const l = Ye({
                  loop: e.config.loop.active,
                  autoplay: e.autoplay,
                  muted: e.muted,
                  gesture: "media",
                  playsinline: !this.config.fullscreen.iosNative,
                  ...a,
                  ...s
               }),
               c = W(u = r) ? null : $(Number(u)) ? u : u.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : u;
            var u;
            const h = Z("iframe"),
               d = Ne(e.config.urls.vimeo.iframe, c, l);
            if (h.setAttribute("src", d), h.setAttribute("allowfullscreen", ""), h.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(n) || h.setAttribute("referrerPolicy", n), i || !t.customControls) h.setAttribute("data-poster", e.poster), e.media = ne(h, e.media);
            else {
               const t = Z("div", {
                  class: e.config.classNames.embedContainer,
                  "data-poster": e.poster
               });
               t.appendChild(h), e.media = ne(t, e.media)
            }
            t.customControls || $e(Ne(e.config.urls.vimeo.api, d)).then((t => {
               !W(t) && t.thumbnail_url && rt.setPoster.call(e, t.thumbnail_url).catch((() => {}))
            })), e.embed = new window.Vimeo.Player(h, {
               autopause: e.config.autopause,
               muted: e.muted
            }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (ct.call(e, !0), e.embed.play()), e.media.pause = () => (ct.call(e, !1), e.embed.pause()), e.media.stop = () => {
               e.pause(), e.currentTime = 0
            };
            let {
               currentTime: p
            } = e.media;
            Object.defineProperty(e.media, "currentTime", {
               get: () => p,
               set(t) {
                  const {
                     embed: i,
                     media: n,
                     paused: s,
                     volume: r
                  } = e, o = s && !i.hasPlayed;
                  n.seeking = !0, ve.call(e, n, "seeking"), Promise.resolve(o && i.setVolume(0)).then((() => i.setCurrentTime(t))).then((() => o && i.pause())).then((() => o && i.setVolume(r))).catch((() => {}))
               }
            });
            let f = e.config.speed.selected;
            Object.defineProperty(e.media, "playbackRate", {
               get: () => f,
               set(t) {
                  e.embed.setPlaybackRate(t).then((() => {
                     f = t, ve.call(e, e.media, "ratechange")
                  })).catch((() => {
                     e.options.speed = [1]
                  }))
               }
            });
            let {
               volume: m
            } = e.config;
            Object.defineProperty(e.media, "volume", {
               get: () => m,
               set(t) {
                  e.embed.setVolume(t).then((() => {
                     m = t, ve.call(e, e.media, "volumechange")
                  }))
               }
            });
            let {
               muted: g
            } = e.config;
            Object.defineProperty(e.media, "muted", {
               get: () => g,
               set(t) {
                  const i = !!I(t) && t;
                  e.embed.setVolume(i ? 0 : e.config.volume).then((() => {
                     g = i, ve.call(e, e.media, "volumechange")
                  }))
               }
            });
            let b, {
               loop: y
            } = e.config;
            Object.defineProperty(e.media, "loop", {
               get: () => y,
               set(t) {
                  const i = I(t) ? t : e.config.loop.active;
                  e.embed.setLoop(i).then((() => {
                     y = i
                  }))
               }
            }), e.embed.getVideoUrl().then((t => {
               b = t, We.setDownloadUrl.call(e)
            })).catch((e => {
               this.debug.warn(e)
            })), Object.defineProperty(e.media, "currentSrc", {
               get: () => b
            }), Object.defineProperty(e.media, "ended", {
               get: () => e.currentTime === e.duration
            }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then((t => {
               const [i, n] = t;
               e.embed.ratio = Me(i, n), Pe.call(this)
            })), e.embed.setAutopause(e.config.autopause).then((t => {
               e.config.autopause = t
            })), e.embed.getVideoTitle().then((t => {
               e.config.title = t, rt.setTitle.call(this)
            })), e.embed.getCurrentTime().then((t => {
               p = t, ve.call(e, e.media, "timeupdate")
            })), e.embed.getDuration().then((t => {
               e.media.duration = t, ve.call(e, e.media, "durationchange")
            })), e.embed.getTextTracks().then((t => {
               e.media.textTracks = t, Xe.setup.call(e)
            })), e.embed.on("cuechange", (({
               cues: t = []
            }) => {
               const i = t.map((e => function (e) {
                  const t = document.createDocumentFragment(),
                     i = document.createElement("div");
                  return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText
               }(e.text)));
               Xe.updateCues.call(e, i)
            })), e.embed.on("loaded", (() => {
               e.embed.getPaused().then((t => {
                  ct.call(e, !t), t || ve.call(e, e.media, "playing")
               })), j(e.embed.element) && e.supported.ui && e.embed.element.setAttribute("tabindex", -1)
            })), e.embed.on("bufferstart", (() => {
               ve.call(e, e.media, "waiting")
            })), e.embed.on("bufferend", (() => {
               ve.call(e, e.media, "playing")
            })), e.embed.on("play", (() => {
               ct.call(e, !0), ve.call(e, e.media, "playing")
            })), e.embed.on("pause", (() => {
               ct.call(e, !1)
            })), e.embed.on("timeupdate", (t => {
               e.media.seeking = !1, p = t.seconds, ve.call(e, e.media, "timeupdate")
            })), e.embed.on("progress", (t => {
               e.media.buffered = t.percent, ve.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && ve.call(e, e.media, "canplaythrough"), e.embed.getDuration().then((t => {
                  t !== e.media.duration && (e.media.duration = t, ve.call(e, e.media, "durationchange"))
               }))
            })), e.embed.on("seeked", (() => {
               e.media.seeking = !1, ve.call(e, e.media, "seeked")
            })), e.embed.on("ended", (() => {
               e.media.paused = !0, ve.call(e, e.media, "ended")
            })), e.embed.on("error", (t => {
               e.media.error = t, ve.call(e, e.media, "error")
            })), t.customControls && setTimeout((() => rt.build.call(e)), 0)
         }
      };

      function ht(e) {
         e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"))
      }

      function dt(e) {
         return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
      }
      const pt = {
            setup() {
               if (oe(this.elements.wrapper, this.config.classNames.embed, !0), L(window.YT) && D(window.YT.Player)) pt.ready.call(this);
               else {
                  const e = window.onYouTubeIframeAPIReady;
                  window.onYouTubeIframeAPIReady = () => {
                     D(e) && e(), pt.ready.call(this)
                  }, lt(this.config.urls.youtube.sdk).catch((e => {
                     this.debug.warn("YouTube API failed to load", e)
                  }))
               }
            },
            getTitle(e) {
               $e(Ne(this.config.urls.youtube.api, e)).then((e => {
                  if (L(e)) {
                     const {
                        title: t,
                        height: i,
                        width: n
                     } = e;
                     this.config.title = t, rt.setTitle.call(this), this.embed.ratio = Me(n, i)
                  }
                  Pe.call(this)
               })).catch((() => {
                  Pe.call(this)
               }))
            },
            ready() {
               const e = this,
                  t = e.config.youtube,
                  i = e.media && e.media.getAttribute("id");
               if (!W(i) && i.startsWith("youtube-")) return;
               let n = e.media.getAttribute("src");
               W(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
               const s = W(r = n) ? null : r.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : r;
               var r;
               const o = Z("div", {
                  id: `${e.provider}-${Math.floor(1e4*Math.random())}`,
                  "data-poster": t.customControls ? e.poster : void 0
               });
               if (e.media = ne(o, e.media), t.customControls) {
                  const t = e => `https://i.ytimg.com/vi/${s}/${e}default.jpg`;
                  st(t("maxres"), 121).catch((() => st(t("sd"), 121))).catch((() => st(t("hq")))).then((t => rt.setPoster.call(e, t.src))).then((t => {
                     t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
                  })).catch((() => {}))
               }
               e.embed = new window.YT.Player(e.media, {
                  videoId: s,
                  host: dt(t),
                  playerVars: Q({}, {
                     autoplay: e.config.autoplay ? 1 : 0,
                     hl: e.config.hl,
                     controls: e.supported.ui && t.customControls ? 0 : 1,
                     disablekb: 1,
                     playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                     cc_load_policy: e.captions.active ? 1 : 0,
                     cc_lang_pref: e.config.captions.language,
                     widget_referrer: window ? window.location.href : null
                  }, t),
                  events: {
                     onError(t) {
                        if (!e.media.error) {
                           const i = t.data,
                              n = {
                                 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                 101: "The owner of the requested video does not allow it to be played in embedded players.",
                                 150: "The owner of the requested video does not allow it to be played in embedded players."
                              } [i] || "An unknown error occured";
                           e.media.error = {
                              code: i,
                              message: n
                           }, ve.call(e, e.media, "error")
                        }
                     },
                     onPlaybackRateChange(t) {
                        const i = t.target;
                        e.media.playbackRate = i.getPlaybackRate(), ve.call(e, e.media, "ratechange")
                     },
                     onReady(i) {
                        if (D(e.media.play)) return;
                        const n = i.target;
                        pt.getTitle.call(e, s), e.media.play = () => {
                           ht.call(e, !0), n.playVideo()
                        }, e.media.pause = () => {
                           ht.call(e, !1), n.pauseVideo()
                        }, e.media.stop = () => {
                           n.stopVideo()
                        }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                           get: () => Number(n.getCurrentTime()),
                           set(t) {
                              e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call(e, e.media, "seeking"), n.seekTo(t)
                           }
                        }), Object.defineProperty(e.media, "playbackRate", {
                           get: () => n.getPlaybackRate(),
                           set(e) {
                              n.setPlaybackRate(e)
                           }
                        });
                        let {
                           volume: r
                        } = e.config;
                        Object.defineProperty(e.media, "volume", {
                           get: () => r,
                           set(t) {
                              r = t, n.setVolume(100 * r), ve.call(e, e.media, "volumechange")
                           }
                        });
                        let {
                           muted: o
                        } = e.config;
                        Object.defineProperty(e.media, "muted", {
                           get: () => o,
                           set(t) {
                              const i = I(t) ? t : o;
                              o = i, n[i ? "mute" : "unMute"](), n.setVolume(100 * r), ve.call(e, e.media, "volumechange")
                           }
                        }), Object.defineProperty(e.media, "currentSrc", {
                           get: () => n.getVideoUrl()
                        }), Object.defineProperty(e.media, "ended", {
                           get: () => e.currentTime === e.duration
                        });
                        const a = n.getAvailablePlaybackRates();
                        e.options.speed = a.filter((t => e.config.speed.options.includes(t))), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), ve.call(e, e.media, "timeupdate"), ve.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval((() => {
                           e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ve.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ve.call(e, e.media, "canplaythrough"))
                        }), 200), t.customControls && setTimeout((() => rt.build.call(e)), 50)
                     },
                     onStateChange(i) {
                        const n = i.target;
                        switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, ve.call(e, e.media, "seeked")), i.data) {
                           case -1:
                              ve.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), ve.call(e, e.media, "progress");
                              break;
                           case 0:
                              ht.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : ve.call(e, e.media, "ended");
                              break;
                           case 1:
                              t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (ht.call(e, !0), ve.call(e, e.media, "playing"), e.timers.playing = setInterval((() => {
                                 ve.call(e, e.media, "timeupdate")
                              }), 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), ve.call(e, e.media, "durationchange")));
                              break;
                           case 2:
                              e.muted || e.embed.unMute(), ht.call(e, !1);
                              break;
                           case 3:
                              ve.call(e, e.media, "waiting")
                        }
                        ve.call(e, e.elements.container, "statechange", !1, {
                           code: i.data
                        })
                     }
                  }
               })
            }
         },
         ft = {
            setup() {
               this.media ? (oe(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), oe(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && oe(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Z("div", {
                  class: this.config.classNames.video
               }), G(this.media, this.elements.wrapper), this.elements.poster = Z("div", {
                  class: this.config.classNames.poster
               }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Le.setup.call(this) : this.isYouTube ? pt.setup.call(this) : this.isVimeo && ut.setup.call(this)) : this.debug.warn("No media element found!")
            }
         };
      class mt {
         constructor(t) {
            e(this, "load", (() => {
               this.enabled && (L(window.google) && L(window.google.ima) ? this.ready() : lt(this.player.config.urls.googleIMA.sdk).then((() => {
                  this.ready()
               })).catch((() => {
                  this.trigger("error", new Error("Google IMA SDK failed to load"))
               })))
            })), e(this, "ready", (() => {
               var e;
               this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then((() => {
                  this.clearSafetyTimer("onAdsManagerLoaded()")
               })), this.listeners(), this.setupIMA()
            })), e(this, "setupIMA", (() => {
               this.elements.container = Z("div", {
                  class: this.player.config.classNames.ads
               }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e => this.onAdsManagerLoaded(e)), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e => this.onAdError(e)), !1), this.requestAds()
            })), e(this, "requestAds", (() => {
               const {
                  container: e
               } = this.player.elements;
               try {
                  const t = new google.ima.AdsRequest;
                  t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t)
               } catch (e) {
                  this.onAdError(e)
               }
            })), e(this, "pollCountdown", ((e = !1) => {
               if (!e) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
               this.countdownTimer = setInterval((() => {
                  const e = qe(Math.max(this.manager.getRemainingTime(), 0)),
                     t = `${Fe.get("advertisement",this.player.config)} - ${e}`;
                  this.elements.container.setAttribute("data-badge-text", t)
               }), 100)
            })), e(this, "onAdsManagerLoaded", (e => {
               if (!this.enabled) return;
               const t = new google.ima.AdsRenderingSettings;
               t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e => this.onAdError(e))), Object.keys(google.ima.AdEvent.Type).forEach((e => {
                  this.manager.addEventListener(google.ima.AdEvent.Type[e], (e => this.onAdEvent(e)))
               })), this.trigger("loaded")
            })), e(this, "addCuePoints", (() => {
               W(this.cuePoints) || this.cuePoints.forEach((e => {
                  if (0 !== e && -1 !== e && e < this.player.duration) {
                     const t = this.player.elements.progress;
                     if (j(t)) {
                        const i = 100 / this.player.duration * e,
                           n = Z("span", {
                              class: this.player.config.classNames.cues
                           });
                        n.style.left = `${i.toString()}%`, t.appendChild(n)
                     }
                  }
               }))
            })), e(this, "onAdEvent", (e => {
               const {
                  container: t
               } = this.player.elements, i = e.getAd(), n = e.getAdData();
               switch ((e => {
                     ve.call(this.player, this.player.media, `ads${e.replace(/_/g,"").toLowerCase()}`)
                  })(e.type), e.type) {
                  case google.ima.AdEvent.Type.LOADED:
                     this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
                     break;
                  case google.ima.AdEvent.Type.STARTED:
                     this.manager.setVolume(this.player.volume);
                     break;
                  case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                     this.player.ended ? this.loadAds() : this.loader.contentComplete();
                     break;
                  case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                     this.pauseContent();
                     break;
                  case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                     this.pollCountdown(), this.resumeContent();
                     break;
                  case google.ima.AdEvent.Type.LOG:
                     n.adError && this.player.debug.warn(`Non-fatal ad error: ${n.adError.getMessage()}`)
               }
            })), e(this, "onAdError", (e => {
               this.cancel(), this.player.debug.warn("Ads error", e)
            })), e(this, "listeners", (() => {
               const {
                  container: e
               } = this.player.elements;
               let t;
               this.player.on("canplay", (() => {
                  this.addCuePoints()
               })), this.player.on("ended", (() => {
                  this.loader.contentComplete()
               })), this.player.on("timeupdate", (() => {
                  t = this.player.currentTime
               })), this.player.on("seeked", (() => {
                  const e = this.player.currentTime;
                  W(this.cuePoints) || this.cuePoints.forEach(((i, n) => {
                     t < i && i < e && (this.manager.discardAdBreak(), this.cuePoints.splice(n, 1))
                  }))
               })), window.addEventListener("resize", (() => {
                  this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL)
               }))
            })), e(this, "play", (() => {
               const {
                  container: e
               } = this.player.elements;
               this.managerPromise || this.resumeContent(), this.managerPromise.then((() => {
                  this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
                  try {
                     this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0
                  } catch (e) {
                     this.onAdError(e)
                  }
               })).catch((() => {}))
            })), e(this, "resumeContent", (() => {
               this.elements.container.style.zIndex = "", this.playing = !1, Te(this.player.media.play())
            })), e(this, "pauseContent", (() => {
               this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
            })), e(this, "cancel", (() => {
               this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
            })), e(this, "loadAds", (() => {
               this.managerPromise.then((() => {
                  this.manager && this.manager.destroy(), this.managerPromise = new Promise((e => {
                     this.on("loaded", e), this.player.debug.log(this.manager)
                  })), this.initialized = !1, this.requestAds()
               })).catch((() => {}))
            })), e(this, "trigger", ((e, ...t) => {
               const i = this.events[e];
               R(i) && i.forEach((e => {
                  D(e) && e.apply(this, t)
               }))
            })), e(this, "on", ((e, t) => (R(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this))), e(this, "startSafetyTimer", ((e, t) => {
               this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout((() => {
                  this.cancel(), this.clearSafetyTimer("startSafetyTimer()")
               }), e)
            })), e(this, "clearSafetyTimer", (e => {
               M(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e}`), clearTimeout(this.safetyTimer), this.safetyTimer = null)
            })), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
               container: null,
               displayContainer: null
            }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(((e, t) => {
               this.on("loaded", e), this.on("error", t)
            })), this.load()
         }
         get enabled() {
            const {
               config: e
            } = this;
            return this.player.isHTML5 && this.player.isVideo && e.enabled && (!W(e.publisherId) || q(e.tagUrl))
         }
         get tagUrl() {
            const {
               config: e
            } = this;
            return q(e.tagUrl) ? e.tagUrl : `https://go.aniview.com/api/adserver6/vast/?${Ye({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:e.publisherId})}`
         }
      }
      const gt = e => {
            const t = [];
            return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e => {
               const i = {};
               e.split(/\r\n|\n|\r/).forEach((e => {
                  if ($(i.startTime)) {
                     if (!W(e.trim()) && W(i.text)) {
                        const t = e.trim().split("#xywh=");
                        [i.text] = t, t[1] && ([i.x, i.y, i.w, i.h] = t[1].split(","))
                     }
                  } else {
                     const t = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                     t && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number(`0.${t[4]}`), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number(`0.${t[9]}`))
                  }
               })), i.text && t.push(i)
            })), t
         },
         bt = (e, t) => {
            const i = {};
            return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i
         };
      class yt {
         constructor(t) {
            e(this, "load", (() => {
                  this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then((() => {
                     this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0)
                  }))
               })), e(this, "getThumbnails", (() => new Promise((e => {
                  const {
                     src: t
                  } = this.player.config.previewThumbnails;
                  if (W(t)) throw new Error("Missing previewThumbnails.src config attribute");
                  const i = () => {
                     this.thumbnails.sort(((e, t) => e.height - t.height)), this.player.debug.log("Preview thumbnails", this.thumbnails), e()
                  };
                  if (D(t)) t((e => {
                     this.thumbnails = e, i()
                  }));
                  else {
                     const e = (N(t) ? [t] : t).map((e => this.getThumbnail(e)));
                     Promise.all(e).then(i)
                  }
               })))), e(this, "getThumbnail", (e => new Promise((t => {
                  $e(e).then((i => {
                     const n = {
                        frames: gt(i),
                        height: null,
                        urlPrefix: ""
                     };
                     n.frames[0].text.startsWith("/") || n.frames[0].text.startsWith("http://") || n.frames[0].text.startsWith("https://") || (n.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
                     const s = new Image;
                     s.onload = () => {
                        n.height = s.naturalHeight, n.width = s.naturalWidth, this.thumbnails.push(n), t()
                     }, s.src = n.urlPrefix + n.frames[0].text
                  }))
               })))), e(this, "startMove", (e => {
                  if (this.loaded && F(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
                     if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
                     else {
                        const t = this.player.elements.progress.getBoundingClientRect(),
                           i = 100 / t.width * (e.pageX - t.left);
                        this.seekTime = this.player.media.duration * (i / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = qe(this.seekTime)
                     }
                     this.showImageAtCurrentTime()
                  }
               })), e(this, "endMove", (() => {
                  this.toggleThumbContainer(!1, !0)
               })), e(this, "startScrubbing", (e => {
                  (M(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
               })), e(this, "endScrubbing", (() => {
                  this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : ye.call(this.player, this.player.media, "timeupdate", (() => {
                     this.mouseDown || this.toggleScrubbingContainer(!1)
                  }))
               })), e(this, "listeners", (() => {
                  this.player.on("play", (() => {
                     this.toggleThumbContainer(!1, !0)
                  })), this.player.on("seeked", (() => {
                     this.toggleThumbContainer(!1)
                  })), this.player.on("timeupdate", (() => {
                     this.lastTime = this.player.media.currentTime
                  }))
               })), e(this, "render", (() => {
                  this.elements.thumb.container = Z("div", {
                     class: this.player.config.classNames.previewThumbnails.thumbContainer
                  }), this.elements.thumb.imageContainer = Z("div", {
                     class: this.player.config.classNames.previewThumbnails.imageContainer
                  }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                  const e = Z("div", {
                     class: this.player.config.classNames.previewThumbnails.timeContainer
                  });
                  this.elements.thumb.time = Z("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), j(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = Z("div", {
                     class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                  }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
               })), e(this, "destroy", (() => {
                  this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
               })), e(this, "showImageAtCurrentTime", (() => {
                  this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                  const e = this.thumbnails[0].frames.findIndex((e => this.seekTime >= e.startTime && this.seekTime <= e.endTime)),
                     t = e >= 0;
                  let i = 0;
                  this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach(((t, n) => {
                     this.loadedImages.includes(t.frames[e].text) && (i = n)
                  })), e !== this.showingThumb && (this.showingThumb = e, this.loadImage(i)))
               })), e(this, "loadImage", ((e = 0) => {
                  const t = this.showingThumb,
                     i = this.thumbnails[e],
                     {
                        urlPrefix: n
                     } = i,
                     s = i.frames[t],
                     r = i.frames[t].text,
                     o = n + r;
                  if (this.currentImageElement && this.currentImageElement.dataset.filename === r) this.showImage(this.currentImageElement, s, e, t, r, !1), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);
                  else {
                     this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
                     const i = new Image;
                     i.src = o, i.dataset.index = t, i.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log(`Loading image: ${o}`), i.onload = () => this.showImage(i, s, e, t, r, !0), this.loadingImage = i, this.removeOldImages(i)
                  }
               })), e(this, "showImage", ((e, t, i, n, s, r = !0) => {
                  this.player.debug.log(`Showing thumb: ${s}. num: ${n}. qual: ${i}. newimg: ${r}`), this.setImageSizeAndOffset(e, t), r && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(s) || this.loadedImages.push(s)), this.preloadNearby(n, !0).then(this.preloadNearby(n, !1)).then(this.getHigherQuality(i, e, t, s))
               })), e(this, "removeOldImages", (e => {
                  Array.from(this.currentImageContainer.children).forEach((t => {
                     if ("img" !== t.tagName.toLowerCase()) return;
                     const i = this.usingSprites ? 500 : 1e3;
                     if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
                        t.dataset.deleting = !0;
                        const {
                           currentImageContainer: e
                        } = this;
                        setTimeout((() => {
                           e.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`)
                        }), i)
                     }
                  }))
               })), e(this, "preloadNearby", ((e, t = !0) => new Promise((i => {
                  setTimeout((() => {
                     const n = this.thumbnails[0].frames[e].text;
                     if (this.showingThumbFilename === n) {
                        let s;
                        s = t ? this.thumbnails[0].frames.slice(e) : this.thumbnails[0].frames.slice(0, e).reverse();
                        let r = !1;
                        s.forEach((e => {
                           const t = e.text;
                           if (t !== n && !this.loadedImages.includes(t)) {
                              r = !0, this.player.debug.log(`Preloading thumb filename: ${t}`);
                              const {
                                 urlPrefix: e
                              } = this.thumbnails[0], n = e + t, s = new Image;
                              s.src = n, s.onload = () => {
                                 this.player.debug.log(`Preloaded thumb filename: ${t}`), this.loadedImages.includes(t) || this.loadedImages.push(t), i()
                              }
                           }
                        })), r || i()
                     }
                  }), 300)
               })))), e(this, "getHigherQuality", ((e, t, i, n) => {
                  if (e < this.thumbnails.length - 1) {
                     let s = t.naturalHeight;
                     this.usingSprites && (s = i.h), s < this.thumbContainerHeight && setTimeout((() => {
                        this.showingThumbFilename === n && (this.player.debug.log(`Showing higher quality thumb for: ${n}`), this.loadImage(e + 1))
                     }), 300)
                  }
               })), e(this, "toggleThumbContainer", ((e = !1, t = !1) => {
                  const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                  this.elements.thumb.container.classList.toggle(i, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
               })),
               e(this, "toggleScrubbingContainer", ((e = !1) => {
                  const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                  this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
               })), e(this, "determineContainerAutoSizing", (() => {
                  (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0)
               })), e(this, "setThumbContainerSizeAndPos", (() => {
                  if (this.sizeSpecifiedInCSS) {
                     if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
                        const e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
                        this.elements.thumb.imageContainer.style.width = `${e}px`
                     } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
                        const e = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
                        this.elements.thumb.imageContainer.style.height = `${e}px`
                     }
                  } else {
                     const e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                     this.elements.thumb.imageContainer.style.height = `${this.thumbContainerHeight}px`, this.elements.thumb.imageContainer.style.width = `${e}px`
                  }
                  this.setThumbContainerPos()
               })), e(this, "setThumbContainerPos", (() => {
                  const e = this.player.elements.progress.getBoundingClientRect(),
                     t = this.player.elements.container.getBoundingClientRect(),
                     {
                        container: i
                     } = this.elements.thumb,
                     n = t.left - e.left + 10,
                     s = t.right - e.left - i.clientWidth - 10;
                  let r = this.mousePosX - e.left - i.clientWidth / 2;
                  r < n && (r = n), r > s && (r = s), i.style.left = `${r}px`
               })), e(this, "setScrubbingContainerSize", (() => {
                  const {
                     width: e,
                     height: t
                  } = bt(this.thumbAspectRatio, {
                     width: this.player.media.clientWidth,
                     height: this.player.media.clientHeight
                  });
                  this.elements.scrubbing.container.style.width = `${e}px`, this.elements.scrubbing.container.style.height = `${t}px`
               })), e(this, "setImageSizeAndOffset", ((e, t) => {
                  if (!this.usingSprites) return;
                  const i = this.thumbContainerHeight / t.h;
                  e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x*i}px`, e.style.top = `-${t.y*i}px`
               })), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                  thumb: {},
                  scrubbing: {}
               }, this.load()
         }
         get enabled() {
            return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
         }
         get currentImageContainer() {
            return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
         }
         get usingSprites() {
            return Object.keys(this.thumbnails[0].frames[0]).includes("w")
         }
         get thumbAspectRatio() {
            return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
         }
         get thumbContainerHeight() {
            if (this.mouseDown) {
               const {
                  height: e
               } = bt(this.thumbAspectRatio, {
                  width: this.player.media.clientWidth,
                  height: this.player.media.clientHeight
               });
               return e
            }
            return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
         }
         get currentImageElement() {
            return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
         }
         set currentImageElement(e) {
            this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
         }
      }
      const vt = {
         insertElements(e, t) {
            N(t) ? ee(e, this.media, {
               src: t
            }) : R(t) && t.forEach((t => {
               ee(e, this.media, t)
            }))
         },
         change(e) {
            K(e, "sources.length") ? (Le.cancelRequests.call(this), this.destroy.call(this, (() => {
               this.options.quality = [], te(this.media), this.media = null, j(this.elements.container) && this.elements.container.removeAttribute("class");
               const {
                  sources: t,
                  type: i
               } = e, [{
                  provider: n = Je.html5,
                  src: s
               }] = t, r = "html5" === n ? i : "div", o = "html5" === n ? {} : {
                  src: s
               };
               Object.assign(this, {
                  provider: n,
                  type: i,
                  supported: pe.check(i, n, this.config.playsinline),
                  media: Z(r, o)
               }), this.elements.container.appendChild(this.media), I(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), W(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), rt.addStyleHook.call(this), this.isHTML5 && vt.insertElements.call(this, "source", t), this.config.title = e.title, ft.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && vt.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && rt.build.call(this), this.isHTML5 && this.media.load(), W(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))), this.fullscreen.update()
            }), !0)) : this.debug.warn("Invalid source format")
         }
      };
      class _t {
         constructor(t, i) {
            if (e(this, "play", (() => D(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then((() => this.ads.play())).catch((() => Te(this.media.play()))), this.media.play()) : null)), e(this, "pause", (() => this.playing && D(this.media.pause) ? this.media.pause() : null)), e(this, "togglePlay", (e => (I(e) ? e : !this.playing) ? this.play() : this.pause())), e(this, "stop", (() => {
                  this.isHTML5 ? (this.pause(), this.restart()) : D(this.media.stop) && this.media.stop()
               })), e(this, "restart", (() => {
                  this.currentTime = 0
               })), e(this, "rewind", (e => {
                  this.currentTime -= $(e) ? e : this.config.seekTime
               })), e(this, "forward", (e => {
                  this.currentTime += $(e) ? e : this.config.seekTime
               })), e(this, "increaseVolume", (e => {
                  const t = this.media.muted ? 0 : this.volume;
                  this.volume = t + ($(e) ? e : 0)
               })), e(this, "decreaseVolume", (e => {
                  this.increaseVolume(-e)
               })), e(this, "airplay", (() => {
                  pe.airplay && this.media.webkitShowPlaybackTargetPicker()
               })), e(this, "toggleControls", (e => {
                  if (this.supported.ui && !this.isAudio) {
                     const t = ae(this.elements.container, this.config.classNames.hideControls),
                        i = void 0 === e ? void 0 : !e,
                        n = oe(this.elements.container, this.config.classNames.hideControls, i);
                     if (n && R(this.config.controls) && this.config.controls.includes("settings") && !W(this.config.settings) && We.toggleMenu.call(this, !1), n !== t) {
                        const e = n ? "controlshidden" : "controlsshown";
                        ve.call(this, this.media, e)
                     }
                     return !n
                  }
                  return !1
               })), e(this, "on", ((e, t) => {
                  ge.call(this, this.elements.container, e, t)
               })), e(this, "once", ((e, t) => {
                  ye.call(this, this.elements.container, e, t)
               })), e(this, "off", ((e, t) => {
                  be(this.elements.container, e, t)
               })), e(this, "destroy", ((e, t = !1) => {
                  if (!this.ready) return;
                  const i = () => {
                     document.body.style.overflow = "", this.embed = null, t ? (Object.keys(this.elements).length && (te(this.elements.buttons.play), te(this.elements.captions), te(this.elements.controls), te(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), D(e) && e()) : (_e.call(this), Le.cancelRequests.call(this), ne(this.elements.original, this.elements.container), ve.call(this, this.elements.original, "destroyed", !0), D(e) && e.call(this.elements.original), this.ready = !1, setTimeout((() => {
                        this.elements = null, this.media = null
                     }), 200))
                  };
                  this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (rt.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && D(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
               })), e(this, "supports", (e => pe.mime.call(this, e))), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = pe.touch, this.media = t, N(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || B(this.media) || R(this.media)) && (this.media = this.media[0]), this.config = Q({}, Ke, _t.defaults, i || {}, (() => {
                  try {
                     return JSON.parse(this.media.getAttribute("data-plyr-config"))
                  } catch (e) {
                     return {}
                  }
               })()), this.elements = {
                  container: null,
                  fullscreen: null,
                  captions: null,
                  buttons: {},
                  display: {},
                  progress: {},
                  inputs: {},
                  settings: {
                     popup: null,
                     menu: null,
                     panels: {},
                     buttons: {}
                  }
               }, this.captions = {
                  active: null,
                  currentTrack: -1,
                  meta: new WeakMap
               }, this.fullscreen = {
                  active: !1
               }, this.options = {
                  speed: [],
                  quality: []
               }, this.debug = new it(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", pe), M(this.media) || !j(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
            if (this.media.plyr) return void this.debug.warn("Target already setup");
            if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
            if (!pe.check().api) return void this.debug.error("Setup failed: no support");
            const n = this.media.cloneNode(!0);
            n.autoplay = !1, this.elements.original = n;
            const s = this.media.tagName.toLowerCase();
            let r = null,
               o = null;
            switch (s) {
               case "div":
                  if (r = this.media.querySelector("iframe"), j(r)) {
                     if (o = Ue(r.getAttribute("src")), this.provider = function (e) {
                           return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Je.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Je.vimeo : null
                        }(o.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", o.search.length) {
                        const e = ["1", "true"];
                        e.includes(o.searchParams.get("autoplay")) && (this.config.autoplay = !0), e.includes(o.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = e.includes(o.searchParams.get("playsinline")), this.config.youtube.hl = o.searchParams.get("hl")) : this.config.playsinline = !0
                     }
                  } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                  if (W(this.provider) || !Object.values(Je).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                  this.type = et;
                  break;
               case "video":
               case "audio":
                  this.type = s, this.provider = Je.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                  break;
               default:
                  return void this.debug.error("Setup failed: unsupported type")
            }
            this.supported = pe.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new ot(this), this.storage = new He(this), this.media.plyr = this, j(this.elements.container) || (this.elements.container = Z("div", {
               tabindex: 0
            }), G(this.media, this.elements.container)), rt.migrateStyles.call(this), rt.addStyleHook.call(this), ft.setup.call(this), this.config.debug && ge.call(this, this.elements.container, this.config.events.join(" "), (e => {
               this.debug.log(`event: ${e.type}`)
            })), this.fullscreen = new nt(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && rt.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new mt(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", (() => Te(this.play()))), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))) : this.debug.error("Setup failed: no support")
         }
         get isHTML5() {
            return this.provider === Je.html5
         }
         get isEmbed() {
            return this.isYouTube || this.isVimeo
         }
         get isYouTube() {
            return this.provider === Je.youtube
         }
         get isVimeo() {
            return this.provider === Je.vimeo
         }
         get isVideo() {
            return this.type === et
         }
         get isAudio() {
            return this.type === Ze
         }
         get playing() {
            return Boolean(this.ready && !this.paused && !this.ended)
         }
         get paused() {
            return Boolean(this.media.paused)
         }
         get stopped() {
            return Boolean(this.paused && 0 === this.currentTime)
         }
         get ended() {
            return Boolean(this.media.ended)
         }
         set currentTime(e) {
            if (!this.duration) return;
            const t = $(e) && e > 0;
            this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`)
         }
         get currentTime() {
            return Number(this.media.currentTime)
         }
         get buffered() {
            const {
               buffered: e
            } = this.media;
            return $(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
         }
         get seeking() {
            return Boolean(this.media.seeking)
         }
         get duration() {
            const e = parseFloat(this.config.duration),
               t = (this.media || {}).duration,
               i = $(t) && t !== 1 / 0 ? t : 0;
            return e || i
         }
         set volume(e) {
            let t = e;
            N(t) && (t = Number(t)), $(t) || (t = this.storage.get("volume")), $(t) || ({
               volume: t
            } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !W(e) && this.muted && t > 0 && (this.muted = !1)
         }
         get volume() {
            return Number(this.media.volume)
         }
         set muted(e) {
            let t = e;
            I(t) || (t = this.storage.get("muted")), I(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
         }
         get muted() {
            return Boolean(this.media.muted)
         }
         get hasAudio() {
            return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)
         }
         set speed(e) {
            let t = null;
            $(e) && (t = e), $(t) || (t = this.storage.get("speed")), $(t) || (t = this.config.speed.selected);
            const {
               minimumSpeed: i,
               maximumSpeed: n
            } = this;
            t = function (e = 0, t = 0, i = 255) {
               return Math.min(Math.max(e, t), i)
            }(t, i, n), this.config.speed.selected = t, setTimeout((() => {
               this.media && (this.media.playbackRate = t)
            }), 0)
         }
         get speed() {
            return Number(this.media.playbackRate)
         }
         get minimumSpeed() {
            return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625
         }
         get maximumSpeed() {
            return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16
         }
         set quality(e) {
            const t = this.config.quality,
               i = this.options.quality;
            if (!i.length) return;
            let n = [!W(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find($),
               s = !0;
            if (!i.includes(n)) {
               const e = Ee(i, n);
               this.debug.warn(`Unsupported quality option: ${n}, using ${e} instead`), n = e, s = !1
            }
            t.selected = n, this.media.quality = n, s && this.storage.set({
               quality: n
            })
         }
         get quality() {
            return this.media.quality
         }
         set loop(e) {
            const t = I(e) ? e : this.config.loop.active;
            this.config.loop.active = t, this.media.loop = t
         }
         get loop() {
            return Boolean(this.media.loop)
         }
         set source(e) {
            vt.change.call(this, e)
         }
         get source() {
            return this.media.currentSrc
         }
         get download() {
            const {
               download: e
            } = this.config.urls;
            return q(e) ? e : this.source
         }
         set download(e) {
            q(e) && (this.config.urls.download = e, We.setDownloadUrl.call(this))
         }
         set poster(e) {
            this.isVideo ? rt.setPoster.call(this, e, !1).catch((() => {})) : this.debug.warn("Poster can only be set for video")
         }
         get poster() {
            return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
         }
         get ratio() {
            if (!this.isVideo) return null;
            const e = Se(Oe.call(this));
            return R(e) ? e.join(":") : e
         }
         set ratio(e) {
            this.isVideo ? N(e) && Ce(e) ? (this.config.ratio = Se(e), Pe.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video")
         }
         set autoplay(e) {
            const t = I(e) ? e : this.config.autoplay;
            this.config.autoplay = t
         }
         get autoplay() {
            return Boolean(this.config.autoplay)
         }
         toggleCaptions(e) {
            Xe.toggle.call(this, e, !1)
         }
         set currentTrack(e) {
            Xe.set.call(this, e, !1), Xe.setup()
         }
         get currentTrack() {
            const {
               toggled: e,
               currentTrack: t
            } = this.captions;
            return e ? t : -1
         }
         set language(e) {
            Xe.setLanguage.call(this, e, !1)
         }
         get language() {
            return (Xe.getCurrentTrack.call(this) || {}).language
         }
         set pip(e) {
            if (!pe.pip) return;
            const t = I(e) ? e : !this.pip;
            D(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Qe : Ge), D(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
         }
         get pip() {
            return pe.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Qe : null
         }
         setPreviewThumbnails(e) {
            this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))
         }
         static supported(e, t, i) {
            return pe.check(e, t, i)
         }
         static loadSprite(e, t) {
            return ze(e, t)
         }
         static setup(e, t = {}) {
            let i = null;
            return N(e) ? i = Array.from(document.querySelectorAll(e)) : B(e) ? i = Array.from(e) : R(e) && (i = e.filter(j)), W(i) ? null : i.map((e => new _t(e, t)))
         }
      }
      var wt;
      return _t.defaults = (wt = Ke, JSON.parse(JSON.stringify(wt))), _t
   }());
   var zu = $u.exports;
   ! function (e) {
      e.exports = function (e) {
         var t = {};

         function i(n) {
            if (t[n]) return t[n].exports;
            var s = t[n] = {
               i: n,
               l: !1,
               exports: {}
            };
            return e[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
         }
         return i.m = e, i.c = t, i.d = function (exports, e, t) {
            i.o(exports, e) || Object.defineProperty(exports, e, {
               configurable: !1,
               enumerable: !0,
               get: t
            })
         }, i.n = function (e) {
            var t = e && e.__esModule ? function () {
               return e.default
            } : function () {
               return e
            };
            return i.d(t, "a", t), t
         }, i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
         }, i.p = "", i(i.s = 1)
      }([function (e, exports, t) {
         var i = {
            MOBILE: "mobile",
            TABLET: "tablet",
            SMART_TV: "smarttv",
            CONSOLE: "console",
            WEARABLE: "wearable",
            BROWSER: void 0
         };
         e.exports = {
            BROWSER_TYPES: {
               CHROME: "Chrome",
               FIREFOX: "Firefox",
               OPERA: "Opera",
               YANDEX: "Yandex",
               SAFARI: "Safari",
               INTERNET_EXPLORER: "Internet Explorer",
               EDGE: "Edge",
               CHROMIUM: "Chromium",
               IE: "IE",
               MOBILE_SAFARI: "Mobile Safari",
               EDGE_CHROMIUM: "Edge Chromium"
            },
            DEVICE_TYPES: i,
            OS_TYPES: {
               IOS: "iOS",
               ANDROID: "Android",
               WINDOWS_PHONE: "Windows Phone",
               WINDOWS: "Windows",
               MAC_OS: "Mac OS"
            },
            defaultData: {
               isMobile: !1,
               isTablet: !1,
               isBrowser: !1,
               isSmartTV: !1,
               isConsole: !1,
               isWearable: !1
            }
         }
      }, function (e, exports, t) {
         var i, n = t(2),
            s = t(0),
            r = s.BROWSER_TYPES,
            o = s.OS_TYPES,
            a = s.DEVICE_TYPES,
            l = t(4),
            c = l.checkType,
            u = l.broPayload,
            h = l.mobilePayload,
            d = l.wearPayload,
            p = l.consolePayload,
            f = l.stvPayload,
            m = l.getNavigatorInstance,
            g = l.isIOS13Check,
            b = new n,
            y = b.getBrowser(),
            v = b.getDevice(),
            _ = b.getEngine(),
            w = b.getOS(),
            T = b.getUA(),
            k = r.CHROME,
            E = r.CHROMIUM,
            x = r.IE,
            A = r.INTERNET_EXPLORER,
            C = r.OPERA,
            S = r.FIREFOX,
            O = r.SAFARI,
            P = r.EDGE,
            M = r.YANDEX,
            L = r.MOBILE_SAFARI,
            N = a.MOBILE,
            I = a.TABLET,
            D = a.SMART_TV,
            R = a.BROWSER,
            B = a.WEARABLE,
            j = a.CONSOLE,
            F = o.ANDROID,
            H = o.WINDOWS_PHONE,
            z = o.IOS,
            V = o.WINDOWS,
            q = o.MAC_OS,
            W = function () {
               return w.name === o.WINDOWS && "10" === w.version && ("string" == typeof T && -1 !== T.indexOf("Edg/"))
            },
            U = function () {
               return y.name === P
            },
            Y = function () {
               return g("iPad")
            },
            X = v.type === D,
            K = v.type === j,
            Q = v.type === B,
            G = y.name === L || Y(),
            J = y.name === E,
            Z = function () {
               switch (v.type) {
                  case N:
                  case I:
                     return !0;
                  default:
                     return !1
               }
            }() || Y(),
            ee = v.type === N,
            te = v.type === I || Y(),
            ie = v.type === R,
            ne = w.name === F,
            se = w.name === H,
            re = w.name === z || Y(),
            oe = y.name === k,
            ae = y.name === S,
            le = y.name === O || y.name === L,
            ce = y.name === C,
            ue = y.name === A || y.name === x,
            he = w.version ? w.version : "none",
            de = w.name ? w.name : "none",
            pe = y.major,
            fe = y.version,
            me = y.name,
            ge = v.vendor ? v.vendor : "none",
            be = v.model ? v.model : "none",
            ye = _.name,
            ve = _.version,
            _e = T,
            we = U() || W(),
            Te = y.name === M,
            ke = v.type,
            Ee = (i = m()) && (/iPad|iPhone|iPod/.test(i.platform) || "MacIntel" === i.platform && i.maxTouchPoints > 1) && !window.MSStream,
            xe = Y(),
            Ae = g("iPhone"),
            Ce = g("iPod"),
            Se = function () {
               var e = m(),
                  t = e && e.userAgent.toLowerCase();
               return "string" == typeof t && /electron/.test(t)
            }(),
            Oe = W(),
            Pe = U(),
            Me = w.name === V,
            Le = w.name === q,
            Ne = c(v.type);
         e.exports = {
            deviceDetect: function () {
               var e = Ne.isBrowser,
                  t = Ne.isMobile,
                  i = Ne.isTablet,
                  n = Ne.isSmartTV,
                  s = Ne.isConsole,
                  r = Ne.isWearable;
               return e ? u(e, y, _, w, T) : n ? f(n, _, w, T) : s ? p(s, _, w, T) : t || i ? h(Ne, v, w, T) : r ? d(r, _, w, T) : void 0
            },
            isSmartTV: X,
            isConsole: K,
            isWearable: Q,
            isMobileSafari: G,
            isChromium: J,
            isMobile: Z,
            isMobileOnly: ee,
            isTablet: te,
            isBrowser: ie,
            isAndroid: ne,
            isWinPhone: se,
            isIOS: re,
            isChrome: oe,
            isFirefox: ae,
            isSafari: le,
            isOpera: ce,
            isIE: ue,
            osVersion: he,
            osName: de,
            fullBrowserVersion: pe,
            browserVersion: fe,
            browserName: me,
            mobileVendor: ge,
            mobileModel: be,
            engineName: ye,
            engineVersion: ve,
            getUA: _e,
            isEdge: we,
            isYandex: Te,
            deviceType: ke,
            isIOS13: Ee,
            isIPad13: xe,
            isIPhone13: Ae,
            isIPod13: Ce,
            isElectron: Se,
            isEdgeChromium: Oe,
            isLegacyEdge: Pe,
            isWindows: Me,
            isMacOs: Le
         }
      }, function (e, exports, t) {
         var i;
         /*!
          * UAParser.js v0.7.18
          * Lightweight JavaScript-based User-Agent string parser
          * https://github.com/faisalman/ua-parser-js
          *
          * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
          * Dual licensed under GPLv2 or MIT
          */
         ! function (n, s) {
            var r = "function",
               o = "undefined",
               a = "object",
               l = "model",
               c = "name",
               u = "type",
               h = "vendor",
               d = "version",
               p = "architecture",
               f = "console",
               m = "mobile",
               g = "tablet",
               b = "smarttv",
               y = "wearable",
               v = {
                  extend: function (e, t) {
                     var i = {};
                     for (var n in e) t[n] && t[n].length % 2 == 0 ? i[n] = t[n].concat(e[n]) : i[n] = e[n];
                     return i
                  },
                  has: function (e, t) {
                     return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                  },
                  lowerize: function (e) {
                     return e.toLowerCase()
                  },
                  major: function (e) {
                     return "string" == typeof e ? e.replace(/[^\d\.]/g, "").split(".")[0] : s
                  },
                  trim: function (e) {
                     return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                  }
               },
               _ = {
                  rgx: function (e, t) {
                     for (var i, n, o, l, c, u, h = 0; h < t.length && !c;) {
                        var d = t[h],
                           p = t[h + 1];
                        for (i = n = 0; i < d.length && !c;)
                           if (c = d[i++].exec(e))
                              for (o = 0; o < p.length; o++) u = c[++n], typeof (l = p[o]) === a && l.length > 0 ? 2 == l.length ? typeof l[1] == r ? this[l[0]] = l[1].call(this, u) : this[l[0]] = l[1] : 3 == l.length ? typeof l[1] !== r || l[1].exec && l[1].test ? this[l[0]] = u ? u.replace(l[1], l[2]) : s : this[l[0]] = u ? l[1].call(this, u, l[2]) : s : 4 == l.length && (this[l[0]] = u ? l[3].call(this, u.replace(l[1], l[2])) : s) : this[l] = u || s;
                        h += 2
                     }
                  },
                  str: function (e, t) {
                     for (var i in t)
                        if (typeof t[i] === a && t[i].length > 0) {
                           for (var n = 0; n < t[i].length; n++)
                              if (v.has(t[i][n], e)) return "?" === i ? s : i
                        } else if (v.has(t[i], e)) return "?" === i ? s : i;
                     return e
                  }
               },
               w = {
                  browser: {
                     oldsafari: {
                        version: {
                           "1.0": "/8",
                           1.2: "/1",
                           1.3: "/3",
                           "2.0": "/412",
                           "2.0.2": "/416",
                           "2.0.3": "/417",
                           "2.0.4": "/419",
                           "?": "/"
                        }
                     }
                  },
                  device: {
                     amazon: {
                        model: {
                           "Fire Phone": ["SD", "KF"]
                        }
                     },
                     sprint: {
                        model: {
                           "Evo Shift 4G": "7373KT"
                        },
                        vendor: {
                           HTC: "APA",
                           Sprint: "Sprint"
                        }
                     }
                  },
                  os: {
                     windows: {
                        version: {
                           ME: "4.90",
                           "NT 3.11": "NT3.51",
                           "NT 4.0": "NT4.0",
                           2e3: "NT 5.0",
                           XP: ["NT 5.1", "NT 5.2"],
                           Vista: "NT 6.0",
                           7: "NT 6.1",
                           8: "NT 6.2",
                           8.1: "NT 6.3",
                           10: ["NT 6.4", "NT 10.0"],
                           RT: "ARM"
                        }
                     }
                  }
               },
               T = {
                  browser: [
                     [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                     [c, d],
                     [/(opios)[\/\s]+([\w\.]+)/i],
                     [
                        [c, "Opera Mini"], d
                     ],
                     [/\s(opr)\/([\w\.]+)/i],
                     [
                        [c, "Opera"], d
                     ],
                     [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],
                     [c, d],
                     [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                     [
                        [c, "IE"], d
                     ],
                     [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],
                     [
                        [c, "Edge"], d
                     ],
                     [/(yabrowser)\/([\w\.]+)/i],
                     [
                        [c, "Yandex"], d
                     ],
                     [/(puffin)\/([\w\.]+)/i],
                     [
                        [c, "Puffin"], d
                     ],
                     [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                     [
                        [c, "UCBrowser"], d
                     ],
                     [/(comodo_dragon)\/([\w\.]+)/i],
                     [
                        [c, /_/g, " "], d
                     ],
                     [/(micromessenger)\/([\w\.]+)/i],
                     [
                        [c, "WeChat"], d
                     ],
                     [/(qqbrowserlite)\/([\w\.]+)/i],
                     [c, d],
                     [/(QQ)\/([\d\.]+)/i],
                     [c, d],
                     [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                     [c, d],
                     [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
                     [c, d],
                     [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                     [c, d],
                     [/(MetaSr)[\/\s]?([\w\.]+)/i],
                     [c],
                     [/(LBBROWSER)/i],
                     [c],
                     [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                     [d, [c, "MIUI Browser"]],
                     [/;fbav\/([\w\.]+);/i],
                     [d, [c, "Facebook"]],
                     [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                     [d, [c, "Chrome Headless"]],
                     [/\swv\).+(chrome)\/([\w\.]+)/i],
                     [
                        [c, /(.+)/, "$1 WebView"], d
                     ],
                     [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                     [
                        [c, /(.+(?:g|us))(.+)/, "$1 $2"], d
                     ],
                     [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                     [d, [c, "Android Browser"]],
                     [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                     [c, d],
                     [/(dolfin)\/([\w\.]+)/i],
                     [
                        [c, "Dolphin"], d
                     ],
                     [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                     [
                        [c, "Chrome"], d
                     ],
                     [/(coast)\/([\w\.]+)/i],
                     [
                        [c, "Opera Coast"], d
                     ],
                     [/fxios\/([\w\.-]+)/i],
                     [d, [c, "Firefox"]],
                     [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                     [d, [c, "Mobile Safari"]],
                     [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                     [d, c],
                     [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                     [
                        [c, "GSA"], d
                     ],
                     [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                     [c, [d, _.str, w.browser.oldsafari.version]],
                     [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                     [c, d],
                     [/(navigator|netscape)\/([\w\.-]+)/i],
                     [
                        [c, "Netscape"], d
                     ],
                     [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                     [c, d]
                  ],
                  cpu: [
                     [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                     [
                        [p, "amd64"]
                     ],
                     [/(ia32(?=;))/i],
                     [
                        [p, v.lowerize]
                     ],
                     [/((?:i[346]|x)86)[;\)]/i],
                     [
                        [p, "ia32"]
                     ],
                     [/windows\s(ce|mobile);\sppc;/i],
                     [
                        [p, "arm"]
                     ],
                     [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                     [
                        [p, /ower/, "", v.lowerize]
                     ],
                     [/(sun4\w)[;\)]/i],
                     [
                        [p, "sparc"]
                     ],
                     [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                     [
                        [p, v.lowerize]
                     ]
                  ],
                  device: [
                     [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                     [l, h, [u, g]],
                     [/applecoremedia\/[\w\.]+ \((ipad)/],
                     [l, [h, "Apple"],
                        [u, g]
                     ],
                     [/(apple\s{0,1}tv)/i],
                     [
                        [l, "Apple TV"],
                        [h, "Apple"]
                     ],
                     [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                     [h, l, [u, g]],
                     [/(kf[A-z]+)\sbuild\/.+silk\//i],
                     [l, [h, "Amazon"],
                        [u, g]
                     ],
                     [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                     [
                        [l, _.str, w.device.amazon.model],
                        [h, "Amazon"],
                        [u, m]
                     ],
                     [/\((ip[honed|\s\w*]+);.+(apple)/i],
                     [l, h, [u, m]],
                     [/\((ip[honed|\s\w*]+);/i],
                     [l, [h, "Apple"],
                        [u, m]
                     ],
                     [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                     [h, l, [u, m]],
                     [/\(bb10;\s(\w+)/i],
                     [l, [h, "BlackBerry"],
                        [u, m]
                     ],
                     [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                     [l, [h, "Asus"],
                        [u, g]
                     ],
                     [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                     [
                        [h, "Sony"],
                        [l, "Xperia Tablet"],
                        [u, g]
                     ],
                     [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
                     [l, [h, "Sony"],
                        [u, m]
                     ],
                     [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                     [h, l, [u, f]],
                     [/android.+;\s(shield)\sbuild/i],
                     [l, [h, "Nvidia"],
                        [u, f]
                     ],
                     [/(playstation\s[34portablevi]+)/i],
                     [l, [h, "Sony"],
                        [u, f]
                     ],
                     [/(sprint\s(\w+))/i],
                     [
                        [h, _.str, w.device.sprint.vendor],
                        [l, _.str, w.device.sprint.model],
                        [u, m]
                     ],
                     [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                     [h, l, [u, g]],
                     [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                     [h, [l, /_/g, " "],
                        [u, m]
                     ],
                     [/(nexus\s9)/i],
                     [l, [h, "HTC"],
                        [u, g]
                     ],
                     [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
                     [l, [h, "Huawei"],
                        [u, m]
                     ],
                     [/(microsoft);\s(lumia[\s\w]+)/i],
                     [h, l, [u, m]],
                     [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                     [l, [h, "Microsoft"],
                        [u, f]
                     ],
                     [/(kin\.[onetw]{3})/i],
                     [
                        [l, /\./g, " "],
                        [h, "Microsoft"],
                        [u, m]
                     ],
                     [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                     [l, [h, "Motorola"],
                        [u, m]
                     ],
                     [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                     [l, [h, "Motorola"],
                        [u, g]
                     ],
                     [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                     [
                        [h, v.trim],
                        [l, v.trim],
                        [u, b]
                     ],
                     [/hbbtv.+maple;(\d+)/i],
                     [
                        [l, /^/, "SmartTV"],
                        [h, "Samsung"],
                        [u, b]
                     ],
                     [/\(dtv[\);].+(aquos)/i],
                     [l, [h, "Sharp"],
                        [u, b]
                     ],
                     [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                     [
                        [h, "Samsung"], l, [u, g]
                     ],
                     [/smart-tv.+(samsung)/i],
                     [h, [u, b], l],
                     [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
                     [
                        [h, "Samsung"], l, [u, m]
                     ],
                     [/sie-(\w*)/i],
                     [l, [h, "Siemens"],
                        [u, m]
                     ],
                     [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                     [
                        [h, "Nokia"], l, [u, m]
                     ],
                     [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                     [l, [h, "Acer"],
                        [u, g]
                     ],
                     [/android.+([vl]k\-?\d{3})\s+build/i],
                     [l, [h, "LG"],
                        [u, g]
                     ],
                     [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                     [
                        [h, "LG"], l, [u, g]
                     ],
                     [/(lg) netcast\.tv/i],
                     [h, l, [u, b]],
                     [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                     [l, [h, "LG"],
                        [u, m]
                     ],
                     [/android.+(ideatab[a-z0-9\-\s]+)/i],
                     [l, [h, "Lenovo"],
                        [u, g]
                     ],
                     [/linux;.+((jolla));/i],
                     [h, l, [u, m]],
                     [/((pebble))app\/[\d\.]+\s/i],
                     [h, l, [u, y]],
                     [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                     [h, l, [u, m]],
                     [/crkey/i],
                     [
                        [l, "Chromecast"],
                        [h, "Google"]
                     ],
                     [/android.+;\s(glass)\s\d/i],
                     [l, [h, "Google"],
                        [u, y]
                     ],
                     [/android.+;\s(pixel c)\s/i],
                     [l, [h, "Google"],
                        [u, g]
                     ],
                     [/android.+;\s(pixel xl|pixel)\s/i],
                     [l, [h, "Google"],
                        [u, m]
                     ],
                     [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],
                     [
                        [l, /_/g, " "],
                        [h, "Xiaomi"],
                        [u, m]
                     ],
                     [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
                     [
                        [l, /_/g, " "],
                        [h, "Xiaomi"],
                        [u, g]
                     ],
                     [/android.+;\s(m[1-5]\snote)\sbuild/i],
                     [l, [h, "Meizu"],
                        [u, g]
                     ],
                     [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
                     [l, [h, "OnePlus"],
                        [u, m]
                     ],
                     [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                     [l, [h, "RCA"],
                        [u, g]
                     ],
                     [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                     [l, [h, "Dell"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                     [l, [h, "Verizon"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                     [
                        [h, "Barnes & Noble"], l, [u, g]
                     ],
                     [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                     [l, [h, "NuVision"],
                        [u, g]
                     ],
                     [/android.+;\s(k88)\sbuild/i],
                     [l, [h, "ZTE"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                     [l, [h, "Swiss"],
                        [u, m]
                     ],
                     [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                     [l, [h, "Swiss"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                     [l, [h, "Zeki"],
                        [u, g]
                     ],
                     [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
                     [
                        [h, "Dragon Touch"], l, [u, g]
                     ],
                     [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                     [l, [h, "Insignia"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                     [l, [h, "NextBook"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                     [
                        [h, "Voice"], l, [u, m]
                     ],
                     [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                     [
                        [h, "LvTel"], l, [u, m]
                     ],
                     [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                     [l, [h, "Envizen"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                     [h, l, [u, g]],
                     [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                     [l, [h, "MachSpeed"],
                        [u, g]
                     ],
                     [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                     [h, l, [u, g]],
                     [/android.+[;\/]\s*TU_(1491)\s+build/i],
                     [l, [h, "Rotor"],
                        [u, g]
                     ],
                     [/android.+(KS(.+))\s+build/i],
                     [l, [h, "Amazon"],
                        [u, g]
                     ],
                     [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                     [h, l, [u, g]],
                     [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                     [
                        [u, v.lowerize], h, l
                     ],
                     [/(android[\w\.\s\-]{0,9});.+build/i],
                     [l, [h, "Generic"]]
                  ],
                  engine: [
                     [/windows.+\sedge\/([\w\.]+)/i],
                     [d, [c, "EdgeHTML"]],
                     [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                     [c, d],
                     [/rv\:([\w\.]{1,9}).+(gecko)/i],
                     [d, c]
                  ],
                  os: [
                     [/microsoft\s(windows)\s(vista|xp)/i],
                     [c, d],
                     [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                     [c, [d, _.str, w.os.windows.version]],
                     [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                     [
                        [c, "Windows"],
                        [d, _.str, w.os.windows.version]
                     ],
                     [/\((bb)(10);/i],
                     [
                        [c, "BlackBerry"], d
                     ],
                     [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i],
                     [c, d],
                     [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                     [
                        [c, "Symbian"], d
                     ],
                     [/\((series40);/i],
                     [c],
                     [/mozilla.+\(mobile;.+gecko.+firefox/i],
                     [
                        [c, "Firefox OS"], d
                     ],
                     [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i],
                     [c, d],
                     [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                     [
                        [c, "Chromium OS"], d
                     ],
                     [/(sunos)\s?([\w\.\d]*)/i],
                     [
                        [c, "Solaris"], d
                     ],
                     [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                     [c, d],
                     [/(haiku)\s(\w+)/i],
                     [c, d],
                     [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                     [
                        [d, /_/g, "."],
                        [c, "iOS"]
                     ],
                     [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                     [
                        [c, "Mac OS"],
                        [d, /_/g, "."]
                     ],
                     [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]*)/i],
                     [c, d]
                  ]
               },
               k = function (e, t) {
                  if ("object" == typeof e && (t = e, e = s), !(this instanceof k)) return new k(e, t).getResult();
                  var i = e || (n && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : ""),
                     r = t ? v.extend(T, t) : T;
                  return this.getBrowser = function () {
                     var e = {
                        name: s,
                        version: s
                     };
                     return _.rgx.call(e, i, r.browser), e.major = v.major(e.version), e
                  }, this.getCPU = function () {
                     var e = {
                        architecture: s
                     };
                     return _.rgx.call(e, i, r.cpu), e
                  }, this.getDevice = function () {
                     var e = {
                        vendor: s,
                        model: s,
                        type: s
                     };
                     return _.rgx.call(e, i, r.device), e
                  }, this.getEngine = function () {
                     var e = {
                        name: s,
                        version: s
                     };
                     return _.rgx.call(e, i, r.engine), e
                  }, this.getOS = function () {
                     var e = {
                        name: s,
                        version: s
                     };
                     return _.rgx.call(e, i, r.os), e
                  }, this.getResult = function () {
                     return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                     }
                  }, this.getUA = function () {
                     return i
                  }, this.setUA = function (e) {
                     return i = e, this
                  }, this
               };
            k.VERSION = "0.7.18", k.BROWSER = {
               NAME: c,
               MAJOR: "major",
               VERSION: d
            }, k.CPU = {
               ARCHITECTURE: p
            }, k.DEVICE = {
               MODEL: l,
               VENDOR: h,
               TYPE: u,
               CONSOLE: f,
               MOBILE: m,
               SMARTTV: b,
               TABLET: g,
               WEARABLE: y,
               EMBEDDED: "embedded"
            }, k.ENGINE = {
               NAME: c,
               VERSION: d
            }, k.OS = {
               NAME: c,
               VERSION: d
            }, typeof exports !== o ? (typeof e !== o && e.exports && (exports = e.exports = k), exports.UAParser = k) : t(3) ? (i = function () {
               return k
            }.call(exports, t, exports, e)) === s || (e.exports = i) : n && (n.UAParser = k);
            var $ = n && (n.jQuery || n.Zepto);
            if (typeof $ !== o) {
               var E = new k;
               $.ua = E.getResult(), $.ua.get = function () {
                  return E.getUA()
               }, $.ua.set = function (e) {
                  E.setUA(e);
                  var t = E.getResult();
                  for (var i in t) $.ua[i] = t[i]
               }
            }
         }("object" == typeof window ? window : this)
      }, function (e, exports) {
         (function (t) {
            e.exports = t
         }).call(exports, {})
      }, function (e, exports, t) {
         Object.defineProperty(exports, "__esModule", {
            value: !0
         });
         var i = Object.assign || function (e) {
               for (var t = 1; t < arguments.length; t++) {
                  var i = arguments[t];
                  for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
               }
               return e
            },
            n = t(0),
            s = n.DEVICE_TYPES,
            r = n.defaultData,
            o = exports.getNavigatorInstance = function () {
               return !("undefined" == typeof window || !window.navigator && !navigator) && (window.navigator || navigator)
            },
            a = exports.isIOS13Check = function (e) {
               var t = o();
               return t && t.platform && (-1 !== t.platform.indexOf(e) || "MacIntel" === t.platform && t.maxTouchPoints > 1 && !window.MSStream)
            };
         e.exports = {
            checkType: function (e) {
               switch (e) {
                  case s.MOBILE:
                     return {
                        isMobile: !0
                     };
                  case s.TABLET:
                     return {
                        isTablet: !0
                     };
                  case s.SMART_TV:
                     return {
                        isSmartTV: !0
                     };
                  case s.CONSOLE:
                     return {
                        isConsole: !0
                     };
                  case s.WEARABLE:
                     return {
                        isWearable: !0
                     };
                  case s.BROWSER:
                     return {
                        isBrowser: !0
                     };
                  default:
                     return r
               }
            },
            broPayload: function (e, t, i, n, s) {
               return {
                  isBrowser: e,
                  browserMajorVersion: t.major,
                  browserFullVersion: t.version,
                  browserName: t.name,
                  engineName: i.name || !1,
                  engineVersion: i.version,
                  osName: n.name,
                  osVersion: n.version,
                  userAgent: s
               }
            },
            mobilePayload: function (e, t, n, s) {
               return i({}, e, {
                  vendor: t.vendor,
                  model: t.model,
                  os: n.name,
                  osVersion: n.version,
                  ua: s
               })
            },
            stvPayload: function (e, t, i, n) {
               return {
                  isSmartTV: e,
                  engineName: t.name,
                  engineVersion: t.version,
                  osName: i.name,
                  osVersion: i.version,
                  userAgent: n
               }
            },
            consolePayload: function (e, t, i, n) {
               return {
                  isConsole: e,
                  engineName: t.name,
                  engineVersion: t.version,
                  osName: i.name,
                  osVersion: i.version,
                  userAgent: n
               }
            },
            wearPayload: function (e, t, i, n) {
               return {
                  isWearable: e,
                  engineName: t.name,
                  engineVersion: t.version,
                  osName: i.name,
                  osVersion: i.version,
                  userAgent: n
               }
            },
            getNavigatorInstance: o,
            isIOS13Check: a
         }
      }])
   }({
      exports: {}
   }), document.addEventListener("DOMContentLoaded", (() => {
      dl.registerPlugin(Tu, Fu), dl.ticker.lagSmoothing(0), dl.ticker.fps(60), dl.utils.toArray("[data-animation=reduce]").forEach((function (e, t) {
         dl.to(e, {
            clipPath: "inset(0 30% 40% 30%)",
            ease: "none",
            scrollTrigger: {
               trigger: e.dataset.trigger,
               scrub: .25
            }
         })
      })), dl.utils.toArray("[data-animation=snap]").forEach((function (e, t) {
         dl.set(e, {
            scrollTrigger: {
               trigger: e,
               scrub: !0,
               start: "+=0",
               end: "+=" + window.innerHeight / 3,
               pin: !0,
               snap: .1
            }
         })
      })), dl.utils.toArray("[data-animation=fadeIn]").forEach((function (e, t) {
         dl.fromTo(e, {
            opacity: 0,
            y: "150px"
         }, {
            opacity: 1,
            y: 0,
            duration: .5,
            delay: 0,
            ease: "power3.inOut",
            scrollTrigger: {
               trigger: e,
               start: "top center",
               end: "+=100",
               scrub: .1
            }
         })
      })), dl.utils.toArray("[data-animation=fadeInChildren]").forEach((function (e, t) {
         dl.set(e.dataset.container, {
            overflow: "hidden"
         }), dl.fromTo(e.children, {
            opacity: 0,
            y: 50,
            scale: .9
         }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: .5,
            ease: "power2.easeOut",
            stagger: .4,
            overwrite: !0,
            scrollTrigger: {
               trigger: e,
               start: "top bottom",
               end: "center center",
               scrub: .1
            }
         })
      }));
      let e = [];
      if (dl.utils.toArray("[data-animation=sectionScroller]").forEach((function (t, i) {
            let n = t.dataset.wrapper,
               s = t.dataset.container.split(",");
            e[n] = dl.timeline({
               defaults: {
                  duration: 600,
                  ease: "ease-in-out"
               },
               scrollTrigger: {
                  trigger: n,
                  scrub: !0,
                  start: "+=0",
                  end: "+=" + s.length * window.innerHeight,
                  pin: !0,
                  snap: .1
               }
            }), s.forEach((function (t, i) {
               0 == i ? e[n].to(n + " " + t + " .content--text", {
                  opacity: 0,
                  delay: 1e3
               }).to(n + " " + t + " .content--img", {
                  clipPath: "inset(0 100% 0 0)"
               }, "<").to(n + " " + t, {
                  zIndex: 1
               }) : i == s.length - 1 ? e[n].from(n + " " + t + " .content--text", {
                  opacity: 0,
                  y: 20
               }, "<").to(n + " " + t + " .content--text", {
                  opacity: 1,
                  y: 0,
                  delay: 600
               }) : e[n].from(n + " " + t + " .content--text", {
                  opacity: 0,
                  y: 20
               }, "<").to(n + " " + t + " .content--text", {
                  opacity: 1,
                  y: 0,
                  delay: 600
               }).to(n + " " + t + " .content--text", {
                  opacity: 0,
                  delay: 600
               }).to(n + " " + t + " .content--img", {
                  clipPath: "inset(0 100% 0 0)"
               }, "<").to(n + " " + t, {
                  zIndex: 1
               })
            }))
         })), document.querySelectorAll(".plyr-player").length && zu.setup(".plyr-player", {
            storage: {
               enabled: !1
            }
         }), document.querySelectorAll(".plyr-fullplayer").length) {
         zu.setup(".plyr-fullplayer", {
            autoplay: !0,
            muted: !0,
            controls: [],
            loop: {
               active: !0
            },
            storage: {
               enabled: !1
            }
         }).on("ready", (() => {
            (void 0).play()
         }))
      }
      let t = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(t).forEach((function (e) {
         e.addEventListener("submit", (function (t) {
            if (e.checkValidity()) {
               let i = new FormData(e),
                  n = e.querySelector("[type=submit]"),
                  s = new URLSearchParams(i),
                  r = document.createElement("p"),
                  o = document.createElement("span"),
                  a = document.createElement("button");
               r.classList.add("alert", "alert-dismissible"), a.classList.add("btn-close"), a.setAttribute("data-bs-dismiss", "alert"), n.setAttribute("disabled", "disabled"), t.preventDefault();
               let l = new XMLHttpRequest;
               l.onerror = t => {
                  r.classList.add("alert-danger", "mt-4"), o.innerHTML = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.", r.appendChild(o), r.appendChild(a), n.removeAttribute("disabled"), e.parentNode.insertBefore(r, e.nextSibling)
               }, l.onload = t => {
                  200 == l.status ? (r.appendChild(o), r.appendChild(a), r.classList.add("alert-success"), o.innerHTML = l.responseText, e.classList.add("d-none")) : (r.classList.add("alert-danger", "mt-4"), o.innerHTML = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.", n.removeAttribute("disabled")), e.parentNode.insertBefore(r, e.nextSibling)
               }, l.open("POST", "/app/ajax-mail.php"), l.send(s)
            } else t.preventDefault(), t.stopPropagation(), e.classList.add("was-validated")
         }), !1)
      }))
   })), window.onload = function (e) {
      let t = document.querySelector("#loader-wrapper"),
         i = document.querySelector("#loader .path"),
         n = document.querySelector("#loader-wrapper .logo"),
         s = document.querySelector("#loader-wrapper .text");
      new dl.timeline({
         onComplete: function () {
            t.remove()
         }
      }).to(i, .8, {
         attr: {
            d: "M 0 100 V 50 Q 50 100 100 50 V 100 z"
         },
         ease: "Power2.easeIn"
      }).to(i, .4, {
         attr: {
            d: "M 0 100 V 100 Q 50 100 100 100 V 100 z"
         },
         ease: "Power2.easeOut"
      }).to(n, .4, {
         opacity: 0,
         y: 75
      }, "-=.6").to(s, .4, {
         opacity: 0,
         y: 75
      }, "-=.6").play(0)
   }
}();