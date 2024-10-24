export default defineNuxtPlugin((context) => {
  !(function () {
    "use strict";
    !(function (e, t) {
      var n = e.amplitude || { _q: [], _iq: {} };
      if (n.invoked)
        e.console &&
          console.error &&
          console.error("Amplitude snippet has been loaded.");
      else {
        var r = function (e, t) {
            e.prototype[t] = function () {
              return (
                this._q.push({
                  name: t,
                  args: Array.prototype.slice.call(arguments, 0),
                }),
                this
              );
            };
          },
          s = function (e, t, n) {
            return function (r) {
              e._q.push({
                name: t,
                args: Array.prototype.slice.call(n, 0),
                resolve: r,
              });
            };
          },
          o = function (e, t, n) {
            e._q.push({ name: t, args: Array.prototype.slice.call(n, 0) });
          },
          i = function (e, t, n) {
            e[t] = function () {
              if (n)
                return {
                  promise: new Promise(
                    s(e, t, Array.prototype.slice.call(arguments))
                  ),
                };
              o(e, t, Array.prototype.slice.call(arguments));
            };
          },
          a = function (e) {
            for (var t = 0; t < g.length; t++) i(e, g[t], !1);
            for (var n = 0; n < m.length; n++) i(e, m[n], !0);
          };
        n.invoked = !0;
        var u = t.createElement("script");
        (u.type = "text/javascript"),
          (u.integrity =
            "sha384-Gzu/3zjG7uZ1G0TIW6BIGIzZHB61u7328yVnZUz4t1dNE/n/dSnABKbOJ+jw6Bnu"),
          (u.crossOrigin = "anonymous"),
          (u.async = !0),
          (u.src =
            "https://cdn.amplitude.com/libs/analytics-browser-2.5.2-min.js.gz"),
          (u.onload = function () {
            e.amplitude.runQueuedFunctions ||
              console.log("[Amplitude] Error: could not load SDK");
          });
        var c = t.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(u, c);
        for (
          var l = function () {
              return (this._q = []), this;
            },
            p = [
              "add",
              "append",
              "clearAll",
              "prepend",
              "set",
              "setOnce",
              "unset",
              "preInsert",
              "postInsert",
              "remove",
              "getUserProperties",
            ],
            d = 0;
          d < p.length;
          d++
        )
          r(l, p[d]);
        n.Identify = l;
        for (
          var f = function () {
              return (this._q = []), this;
            },
            v = [
              "getEventProperties",
              "setProductId",
              "setQuantity",
              "setPrice",
              "setRevenue",
              "setRevenueType",
              "setEventProperties",
            ],
            y = 0;
          y < v.length;
          y++
        )
          r(f, v[y]);
        n.Revenue = f;
        var g = [
            "getDeviceId",
            "setDeviceId",
            "getSessionId",
            "setSessionId",
            "getUserId",
            "setUserId",
            "setOptOut",
            "setTransport",
            "reset",
            "extendSession",
          ],
          m = [
            "init",
            "add",
            "remove",
            "track",
            "logEvent",
            "identify",
            "groupIdentify",
            "setGroup",
            "revenue",
            "flush",
          ];
        a(n),
          (n.createInstance = function (e) {
            return (n._iq[e] = { _q: [] }), a(n._iq[e]), n._iq[e];
          }),
          (e.amplitude = n);
      }
    })(window, document);
  })();

  amplitude.init("662bcea7400aa949c2cbbd4e0a9fa5c9", { defaultTracking: true });
});
