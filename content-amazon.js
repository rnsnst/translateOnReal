! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
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
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(o, r, function(t) {
                return e[t]
            }.bind(null, r));
        return o
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 114)
}({
    114: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(29);
        !async function() {
            if (window == top) {
                let e = document.createElement("script");
                if (e.setAttribute("type", "text/javascript"), e.textContent = `window.__CHROME_UI_LANG__ = "${chrome.i18n.getUILanguage()}";`, e.onload = () => {
                        e.remove()
                    }, (document.head || document.documentElement).append(e), false) {
                    console.log("EBS: DEV MODE");
                    let e = document.createElement("script");
                    e.setAttribute("type", "text/javascript"), e.textContent = decodeURIComponent("CONTENT_DEV_PAGESCRIPT_INJECT"), e.onload = () => {
                        e.remove()
                    }, (document.head || document.documentElement).append(e)
                } else {
                    let e = localStorage.getItem("earlyBird_code_amazon");
                    if (e) {
                        let t = document.createElement("script");
                        t.setAttribute("type", "text/javascript"), t.textContent = e, t.onload = () => {
                            t.remove()
                        }, (document.head || document.documentElement).appendChild(t)
                    }
                    let t = {
                            https: !0,
                            subdomain: "extension",
                            path: "500/pageScript_lla.min.js",
                            params: {},
                            parseAs: "text"
                        },
                        n = await Object(o.a)({
                            type: "BG",
                            fn: "dioco_domain_fetch",
                            data: t
                        });
                    if ("success" !== n.status) return;
                    localStorage.setItem("earlyBird_code_amazon", n.data), e ? e && e.length !== n.data.length && location.reload() : location.reload()
                }
            }
        }()
    },
    29: function(e, t, n) {
        "use strict";

        function o(e) {
            if (!e.topic) throw "No message topic!";
            try {
                chrome.runtime.sendMessage(e)
            } catch (e) {
                location.reload()
            }
        }
        n.d(t, "a", (function() {
            return c
        })), chrome.runtime.onMessage.addListener((e, t, n) => {
            if (e.topic) {
                if ("LR_PS_RPC_response" === e.topic) {
                    let t = e;
                    if (t.callIdentifier in r) return r[t.callIdentifier].resolve(t.result), void delete r[t.callIdentifier]
                }
                e.topic.startsWith("LR_PS_") && function(e) {
                    if (!e.topic) throw "No message topic!";
                    window.postMessage(e, "*")
                }(e)
            }
        }), window.addEventListener("message", e => {
            let t = e.data;
            t.topic && t.topic.startsWith("LR_BG_") && o(t)
        });
        let r = {},
            i = 0,
            a = Math.random().toString(36).substring(2, 15);
        async function c(e) {
            return new Promise((t, n) => {
                let c = JSON.parse(JSON.stringify(e));
                i += 1;
                let l = a + "_" + i.toString();
                r[l] = {
                    type: c.type,
                    fn: c.fn,
                    resolve: t,
                    sendTime: Date.now()
                }, o({
                    topic: "LR_BG_RPC_request",
                    functionData: c,
                    callIdentifier: l
                })
            })
        }
    }
});