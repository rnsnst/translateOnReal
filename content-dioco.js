! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 108)
}({
    108: function(e, t, n) {
        "use strict";
        n.r(t);
        n(29);
        let r = document.createElement("script");
        r.setAttribute("type", "text/javascript"), r.textContent = "window.__LANGUAGE_REACTOR_EXTENSION__ = true;", r.onload = () => {
            r.remove()
        }, (document.head || document.documentElement).append(r)
    },
    29: function(e, t, n) {
        "use strict";

        function r(e) {
            if (!e.topic) throw "No message topic!";
            try {
                chrome.runtime.sendMessage(e)
            } catch (e) {
                location.reload()
            }
        }
        n.d(t, "a", (function() {
            return u
        })), chrome.runtime.onMessage.addListener((e, t, n) => {
            if (e.topic) {
                if ("LR_PS_RPC_response" === e.topic) {
                    let t = e;
                    if (t.callIdentifier in o) return o[t.callIdentifier].resolve(t.result), void delete o[t.callIdentifier]
                }
                e.topic.startsWith("LR_PS_") && function(e) {
                    if (!e.topic) throw "No message topic!";
                    window.postMessage(e, "*")
                }(e)
            }
        }), window.addEventListener("message", e => {
            let t = e.data;
            t.topic && t.topic.startsWith("LR_BG_") && r(t)
        });
        let o = {},
            i = 0,
            c = Math.random().toString(36).substring(2, 15);
        async function u(e) {
            return new Promise((t, n) => {
                let u = JSON.parse(JSON.stringify(e));
                i += 1;
                let a = c + "_" + i.toString();
                o[a] = {
                    type: u.type,
                    fn: u.fn,
                    resolve: t,
                    sendTime: Date.now()
                }, r({
                    topic: "LR_BG_RPC_request",
                    functionData: u,
                    callIdentifier: a
                })
            })
        }
    }
});