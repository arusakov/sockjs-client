// SockJS client, version 0.0.1, MIT License
//     https://github.com/majek/sockjs-client

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()

SockJS = function() {
    var b = document, c = window, d = function() {
        this._listeners = {};
    };
    d.prototype.addEventListener = function(a, b) {
        a in this._listeners || (this._listeners[a] = []), this._listeners[a].push(b);
        return !0;
    }, d.prototype.removeEventListener = function(b, c) {
        if (b in this._listeners) {
            var d = this._listeners[b], e = d.indexOf(c);
            if (e !== -1) {
                d.length > 1 ? this._listeners[b] = d.slice(0, e).concat(a.slice(e + 1)) : delete this._listeners[b];
                return !0;
            }
            return !1;
        }
        return !1;
    }, d.prototype.dispatchEvent = function(a) {
        var b = a.type, c = Array.prototype.slice.call(arguments, 0);
        typeof this["on" + b] != "undefined" && this["on" + b].apply(this, c);
        if (b in this._listeners) for (var d = 0; d < this._listeners[b].length; d++) this._listeners[b][d].apply(this, c);
    };
    var e = function(a, b) {
        this.type = a;
        if (typeof b != "undefined") for (var c in b) {
            if (!b.hasOwnProperty(c)) continue;
            this[c] = b[c];
        }
    };
    e.prototype.toString = function() {
        var a = [];
        for (var b in this) {
            if (!this.hasOwnProperty(b)) continue;
            var c = this[b];
            typeof c == "function" && (c = "[function]"), a.push(b + "=" + c);
        }
        return "SimpleEvent(" + a.join(", ") + ")";
    };
    var f = {}, g = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_" ];
    f.random_string = function(a, b) {
        b = b || g.length;
        var c, d = [];
        for (c = 0; c < a; c++) d.push(g[Math.floor(Math.random() * b)]);
        return d.join("");
    }, f.random_number = function(a) {
        return Math.floor(Math.random() * a);
    }, f.random_number_string = function(a) {
        var b = "" + f.random_number(a), c = ("" + (a - 1)).length;
        while (b.length < c) b = "0" + b;
        return b;
    }, f.attachMessage = function(a) {
        f.attachEvent("message", a);
    }, f.attachEvent = function(a, d) {
        typeof c.addEventListener != "undefined" ? c.addEventListener(a, d, !1) : (b.attachEvent("on" + a, d), c.attachEvent("on" + a, d));
    }, f.detachMessage = function(a) {
        f.detachEvent("message", a);
    }, f.detachEvent = function(a, d) {
        typeof c.addEventListener != "undefined" ? c.removeEventListener(a, d, !1) : (b.detachEvent("on" + a, d), c.detachEvent("on" + a, d));
    }, f.getOrigin = function(a) {
        a += "/";
        var b = a.split("/").slice(0, 3);
        return b.join("/");
    }, f.objectExtend = function(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a;
    };
    var h = {
        "User-Agent": "",
        Accept: "",
        "Accept-Language": "",
        "Content-Type": "T"
    };
    navigator && (navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Safari") != -1) && delete h["User-Agent"], f.createXDR = function(a, b, c, d) {
        var e = {
            status: null,
            responseText: "",
            readyState: 1
        }, g = new XDomainRequest;
        b += (b.indexOf("?") === -1 ? "?" : "&") + "t=" + f.random_string(8);
        var h = function() {
            if (g) {
                i = g.onerror = g.ontimeout = g.onprogress = g.onload = null;
                try {
                    g.abort();
                } catch (a) {}
                g = d = null;
            }
        }, i = g.ontimeout = g.onerror = function() {
            e.status = 500, e.readyState = 4, d(e), h();
        };
        g.onload = function() {
            e.status = 200, e.readyState = 4, e.responseText = g.responseText, d(e), h();
        }, g.onprogress = function() {
            e.status = 200, e.readyState = 3, e.responseText = g.responseText, d(e);
        };
        try {
            g.open(a, b), g.send(c);
        } catch (j) {
            i();
        }
        return function(a) {
            d && (d(e, null, a), h());
        };
    }, f.createXHR = function(a, b, d, e) {
        var f;
        if (c.ActiveXObject) {
            b += (b.indexOf("?") === -1 ? "?" : "&") + "t=" + +(new Date);
            try {
                f = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (g) {}
        }
        f || (f = new XMLHttpRequest), f.open(a, b, !0);
        for (var i in h) try {
            f.setRequestHeader(i, h[i]);
        } catch (g) {
            delete h[i];
        }
        var j = function() {
            try {
                f.onreadystatechange = null;
            } catch (a) {
                f.onreadystatechange = function() {};
            }
            try {
                f.abort();
            } catch (b) {}
            e = f = null;
        };
        f.onreadystatechange = function(a) {
            f && e && (e(f, a), f && f.readyState === 4 && j());
        }, f.send(d);
        return function(a) {
            e && (e(f, null, a), j());
        };
    };
    var i = "_jp";
    f.polluteGlobalNamespace = function() {
        i in c || (c[i] = {});
    }, f.createIframe = function(a, c) {
        var d = b.createElement("iframe"), e, f = function() {
            clearTimeout(e);
            try {
                d.onload = null;
            } catch (a) {}
            d.onerror = null;
        }, g = function() {
            d && (f(), d.parentNode.removeChild(d), d.src = "about:blank", d = null);
        }, h = function(a) {
            d && (g(), c(a));
        };
        d.src = a, d.style.display = "none", d.style.position = "absolute", d.onerror = function() {
            h("onerror");
        }, d.onload = function() {
            clearTimeout(e), e = setTimeout(function() {
                h("onload timeout");
            }, 2e3);
        }, b.body.appendChild(d), e = setTimeout(function() {
            h("timeout");
        }, 5e3);
        return {
            iframe: d,
            cleanup: g,
            loaded: f
        };
    }, f.closeFrame = function(a, b) {
        return "c" + JSON.stringify([ a, b ]);
    }, f.userSetStatus = function(a) {
        return a === 1e3 || a >= 3e3 && a <= 4999;
    }, f.log = function() {
        c.console && console.log && console.log.apply && console.log.apply(console, arguments);
    }, f.bind = function(a, b) {
        return a.bind ? a.bind(b) : function() {
            return a.apply(b, arguments);
        };
    };
    var j = function(a, b, c) {
        var d = this;
        d._options = {
            devel: !1,
            debug: !1
        }, c && f.objectExtend(d._options, c), d._base_url = a, d._server = d._options.server || f.random_number_string(1e3), d._connid = f.random_string(8), d._trans_url = d._base_url + "/" + d._server + "/" + d._connid, d._protocols = [ "websocket", "iframe-eventsource", "xhr-polling", "iframe-xhr-polling", "jsonp-polling" ];
        switch (typeof b) {
          case "undefined":
            break;
          case "string":
            d._protocols = [ b ];
            break;
          default:
            d._protocols = b;
        }
        d.protocol = null, d.readyState = j.CONNECTING, d._didClose();
    };
    j.prototype = new d, j.version = "0.0.1", j.CONNECTING = 0, j.OPEN = 1, j.CLOSING = 2, j.CLOSED = 3, j.prototype._debug = function() {
        this._options.debug && f.log.apply(f, arguments);
    }, j.prototype._dispatchOpen = function() {
        var a = this;
        a.readyState === j.CONNECTING ? (a._transport_tref && (clearTimeout(a._transport_tref), a._transport_tref = null), a.readyState = j.OPEN, a.dispatchEvent(new e("open"))) : a._didClose(1006, "Server lost session");
    }, j.prototype._dispatchMessage = function(a) {
        var b = this;
        b.readyState === j.OPEN && b.dispatchEvent(new e("message", {
            data: a
        }));
    }, j.prototype._didClose = function(a, b) {
        var c = this;
        if (c.readyState !== j.CONNECTING && c.readyState !== j.OPEN && c.readyState !== j.CLOSING) throw new Error("INVALID_STATE_ERR");
        c._transport && c._transport.doCleanup(), c._transport = null, c._transport_tref && (clearTimeout(c._transport_tref), c._transport_tref = null);
        var d = new e("close", {
            status: a,
            reason: b
        });
        if (!f.userSetStatus(a) && c.readyState === j.CONNECTING) {
            if (c._try_next_protocol(d)) {
                c._transport_tref = setTimeout(function() {
                    c.readyState === j.CONNECTING && c._didClose(2007, "Transport timeouted");
                }, 5001);
                return;
            }
            d = new e("close", {
                status: 2e3,
                reason: "All transports failed",
                last_event: d
            });
        }
        c.readyState = j.CLOSED, setTimeout(function() {
            c.dispatchEvent(d);
        }, 0);
    }, j.prototype._didMessage = function(a) {
        var b = this, c = a.slice(0, 1);
        switch (c) {
          case "o":
            b._dispatchOpen();
            break;
          case "a":
            var d = JSON.parse(a.slice(1) || "[]");
            for (var e = 0; e < d.length; e++) b._dispatchMessage(d[e]);
            break;
          case "m":
            var d = JSON.parse(a.slice(1) || "null");
            b._dispatchMessage(d);
            break;
          case "c":
            var d = JSON.parse(a.slice(1) || "[]");
            b._didClose(d[0], d[1]);
            break;
          case "h":
        }
    }, j.prototype._try_next_protocol = function(a) {
        var b = this;
        b.protocol && b._debug("Closed transport:", b.protocol, "" + a);
        for (;;) {
            b.protocol = b._protocols.shift();
            if (!b.protocol) return !1;
            if (!j[b.protocol] || !j[b.protocol].enabled()) b._debug("Skipping transport:", b.protocol); else {
                b._debug("Opening transport:", b.protocol), b._transport = new j[b.protocol](b, b._trans_url, b._base_url);
                return !0;
            }
        }
    }, j.prototype.close = function(a, b) {
        var c = this;
        if (a && !f.userSetStatus(a)) throw new Error("INVALID_ACCESS_ERR");
        if (c.readyState !== j.CONNECTING && c.readyState !== j.OPEN) return !1;
        c.readyState = j.CLOSING, c._didClose(a || 1e3, b || "Normal closure");
        return !0;
    }, j.prototype.send = function(a) {
        var b = this;
        if (b.readyState === j.CONNECTING) throw new Error("INVALID_STATE_ERR");
        b.readyState === j.OPEN && b._transport.doSend(JSON.stringify(a));
        return !0;
    };
    var k = j.websocket = function(a, b) {
        var c = this, d = b + "/websocket";
        d.slice(0, 5) === "https" ? d = "wss" + d.slice(5) : d = "ws" + d.slice(4), c.ri = a, c.url = d;
        var e = window.WebSocket || window.MozWebSocket;
        c.ws = new e(c.url), c.ws.onmessage = function(a) {
            c.ri._didMessage(a.data);
        }, c.ws.onclose = function() {
            c.ri._didMessage(f.closeFrame(1006, "WebSocket connection broken"));
        };
    };
    k.prototype.doSend = function(a) {
        this.ws.send(a);
    }, k.prototype.doCleanup = function() {
        var a = this, b = a.ws;
        b && (b.onmessage = b.onclose = null, b.close(), a.ri = a.ws = null);
    }, k.enabled = function() {
        return window.WebSocket || window.MozWebSocket;
    };
    var l = function() {};
    l.prototype.send_constructor = function(a) {
        var b = this;
        b.send_buffer = [], b.sender = a;
    }, l.prototype.doSend = function(a) {
        var b = this;
        b.send_buffer.push(a), typeof b.send_stop == "undefined" && b.send_schedule();
    }, l.prototype.send_schedule = function() {
        var a = this;
        if (a.send_buffer.length > 0) {
            var b = "[" + a.send_buffer.join(",") + "]";
            a.send_stop = a.sender(a.trans_url, b, function() {
                a.send_stop = undefined, a.send_schedule();
            }), a.send_buffer = [];
        }
    }, l.prototype.send_destructor = function() {
        var a = this;
        a._send_stop && a._send_stop(), a._send_stop = null;
    };
    var m = function(a, c, d) {
        var e = this;
        if (!("_send_form" in e)) {
            var g = e._send_form = b.createElement("form"), h = e._send_area = b.createElement("textarea");
            h.name = "d", g.style.display = "none", g.style.position = "absolute", g.method = "POST", g.enctype = "application/x-www-form-urlencoded", g.acceptCharset = "UTF-8", g.appendChild(h), b.body.appendChild(g);
        }
        var g = e._send_form, h = e._send_area, i = "a" + f.random_string(8);
        g.target = i, g.action = a + "/jsonp_send?i=" + i;
        var j;
        try {
            j = b.createElement('<iframe name="' + i + '">');
        } catch (k) {
            j = b.createElement("iframe"), j.name = i;
        }
        j.id = i, g.appendChild(j), j.style.display = "none", h.value = c, g.submit();
        var l = function(a) {
            !j.onerror || (j.onreadystatechange = j.onerror = j.onload = null, setTimeout(function() {
                j.parentNode.removeChild(j), j = null;
            }, 500), h.value = null, d());
        };
        j.onerror = j.onload = l, j.onreadystatechange = function(a) {
            j.readyState == "complete" && l();
        };
        return l;
    }, n = function(a, b, c) {
        var d = function(a, b, d) {
            (a.readyState === 4 || d) && c(a.status, d);
        };
        return f.createXHR("POST", a + "/xhr_send", b, d);
    }, o = function(a, b, c) {
        var d = function(a, b, d) {
            (a.readyState === 4 || d) && c(a.status, d);
        }, e = window.XDomainRequest ? f.createXDR : f.createXHR;
        return e("POST", a + "/xhr_send", b, d);
    }, p = function(a, c) {
        var d, e = b.createElement("script"), g, h = function(a) {
            g && (g.parentNode.removeChild(g), g = null), e && (clearTimeout(d), e.parentNode.removeChild(e), e.onreadystatechange = e.onerror = e.onload = e.onclick = null, e = null, c(a), c = null);
        };
        e.id = "a" + f.random_string(8), e.src = a, e.type = "text/javascript", e.charset = "UTF-8", e.onerror = function() {
            h(f.closeFrame(1006, "JSONP script loaded abnormally (onerror)"));
        }, e.onload = function(a) {
            h(f.closeFrame(1006, "JSONP script loaded abnormally (onload)"));
        }, e.onreadystatechange = function(a) {
            if (/loaded|closed/.test(e.readyState)) {
                if (e && e.htmlFor && e.onclick) try {
                    e.onclick();
                } catch (b) {}
                e && h(f.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"));
            }
        };
        if (typeof e.async == "undefined") if (typeof b.attachEvent == "object") {
            try {
                e.htmlFor = e.id, e.event = "onclick";
            } catch (i) {}
            e.async = !0;
        } else typeof b.attachEvent == "function" && (g = b.createElement("script"), g.text = "try{var a = document.getElementById('" + e.id + "'); if(a)a.onerror();}catch(x){};", e.async = g.async = !1); else e.async = !0;
        d = setTimeout(function() {
            h(f.closeFrame(1006, "JSONP script loaded abnormally (timeout)"));
        }, 35e3);
        var j = b.getElementsByTagName("head")[0];
        j.insertBefore(e, j.firstChild), g && j.insertBefore(g, j.firstChild);
        return h;
    }, q = j["jsonp-polling"] = function(a, b) {
        f.polluteGlobalNamespace();
        var c = this;
        c.ri = a, c.trans_url = b, c.send_constructor(m), c._schedule_recv();
    };
    q.prototype = new l, q.prototype._schedule_recv = function() {
        var a = this, b = function(b) {
            a._recv_stop = null, b && (a._is_closing || a.ri._didMessage(b)), a._is_closing || a._schedule_recv();
        };
        a._recv_stop = r(a.trans_url + "/jsonp", p, b);
    }, q.enabled = function() {
        return !0;
    }, q.prototype.doCleanup = function() {
        var a = this;
        a._is_closing = !0, a._recv_stop && a._recv_stop(), a.ri = a._recv_stop = null, a.send_destructor();
    };
    var r = function(a, b, d) {
        var e = "a" + f.random_string(6), g = a + "?c=" + escape(i + "." + e), h = function(a) {
            delete c[i][e], d(a);
        }, j = b(g, h);
        c[i][e] = j;
        var k = function() {
            c[i][e] && c[i][e](f.closeFrame(1e3, "JSONP user aborted read"));
        };
        return k;
    }, s = j["xhr-polling"] = function(a, b) {
        var c = this;
        c.ri = a, c.trans_url = b, c.send_constructor(o), c._schedule_recv();
    };
    s.prototype = new l, s.prototype._schedule_recv = function() {
        var a = this, b = function(b, c) {
            if (b.status === 200) {
                for (var d = 0; d < c.length; d++) a.ri._didMessage(c[d]);
                c.length === 1 && c[0] === "o" && (a._streaming = !0, f.log('Upgrading from "xhr-polling" to "xhr-streaming"'));
            }
        }, c = function(b, c) {
            a._recv_stop = null;
            c || (b.status === 200 ? a._is_closing || a._schedule_recv() : a.ri._didClose(1006, "XHR error (" + b.status + ")"));
        }, d = a._streaming ? "/xhr_streaming" : "/xhr";
        a._recv_stop = t(a.trans_url + d, b, c);
    }, s.prototype.doCleanup = function() {
        var a = this;
        a._is_closing = !0, a._recv_stop && a._recv_stop(), a.ri = a._recv_stop = null, a.send_destructor();
    };
    var t = function(a, b, c) {
        var d = 0, e = function(a, e, f) {
            if ((a.readyState === 3 || a.readyState === 4) && a.responseText) {
                var g = [];
                for (;;) {
                    var h = a.responseText.slice(d), i = h.indexOf("\n");
                    if (i === -1) break;
                    d += i + 1, g.push(h.slice(0, i));
                }
                g.length && b(a, g);
            }
            (a.readyState === 4 || f) && c(a, f);
        }, g = window.XDomainRequest ? f.createXDR : f.createXHR;
        return g("POST", a, null, e);
    };
    s.enabled = function() {
        return window.XDomainRequest ? !0 : window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? !0 : !1;
    };
    var u = function() {};
    u.prototype.i_constructor = function(a, b, c) {
        var d = this;
        d.ri = a, d.origin = f.getOrigin(c), d.trans_url = b;
        var e = c + "/iframe.html";
        d.ri._options.devel && (e += "?t=" + +(new Date)), d.iframeObj = f.createIframe(e, function(a) {
            d.ri._didClose(1006, "Unable to load an iframe (" + a + ")");
        }), d.onmessage_cb = f.bind(d.onmessage, d), f.attachMessage(d.onmessage_cb);
    }, u.prototype.doCleanup = function() {
        var a = this;
        if (a.iframeObj) {
            f.detachMessage(a.onmessage_cb);
            try {
                a.iframeObj.iframe.contentWindow && a.postMessage("c");
            } catch (b) {}
            var c = a.iframeObj;
            setTimeout(function() {
                c.cleanup(), c = null;
            }, 100), a.onmessage_cb = a.iframeObj = null;
        }
    }, u.prototype.onmessage = function(a) {
        var b = this;
        if (a.origin === b.origin) {
            var c = a.data.slice(0, 1), d = a.data.slice(1);
            switch (c) {
              case "s":
                b.iframeObj.loaded(), b.postMessage("s", JSON.stringify([ j.version, b.protocol, b.trans_url ]));
                break;
              case "t":
                b.ri._didMessage(d);
            }
        }
    }, u.prototype.postMessage = function(a, b) {
        var c = this;
        c.iframeObj.iframe.contentWindow.postMessage(a + (b || ""), c.origin);
    }, u.prototype.doSend = function(a) {
        this.postMessage("m", a);
    }, u.enabled = function() {
        var a = navigator && navigator.userAgent && navigator.userAgent.indexOf("Konqueror") !== -1;
        return (typeof c.postMessage == "function" || typeof c.postMessage == "object") && !a;
    };
    var v = function(a, b) {
        parent !== c ? parent.postMessage(a + (b || ""), "*") : f.log("Can't postMessage, no parent window.", a, b);
    }, w = function() {};
    w.prototype._didClose = function(a, b) {
        v("t", f.closeFrame(a, b));
    }, w.prototype._didMessage = function(a) {
        v("t", a);
    }, w.prototype._doSend = function(a) {
        this._transport.doSend(a);
    }, w.prototype._doCleanup = function() {
        this._transport.doCleanup();
    }, j.bootstrap_iframe = function() {
        var a, b = function(b) {
            if (b.source === parent) {
                var c = b.data.slice(0, 1), d = b.data.slice(1);
                switch (c) {
                  case "s":
                    var e = JSON.parse(d), g = e[0], h = e[1], i = e[2];
                    g !== j.version && f.log('Incompatibile SockJS! Main site uses: "' + g + '", the iframe:' + ' "' + j.version + '".'), a = new w, a._transport = new w[h](a, i);
                    break;
                  case "m":
                    a._doSend(d);
                    break;
                  case "c":
                    a._doCleanup(), a = null;
                }
            }
        };
        f.attachMessage(b), v("s");
    };
    var x = j["iframe-eventsource"] = function() {
        var a = this;
        a.protocol = "w-iframe-eventsource", a.i_constructor.apply(a, arguments);
    };
    x.prototype = new u, x.enabled = function() {
        return typeof EventSource == "function" && u.enabled();
    };
    var y = w["w-iframe-eventsource"] = function(a, b) {
        var c = this;
        c.ri = a, c.trans_url = b;
        var d = b + "/eventsource", e = c.es = new EventSource(d);
        e.onmessage = function(a) {
            c.ri._didMessage(unescape(a.data));
        }, e.onerror = function(a) {
            e.close(), c.ri._didClose(1001, "Socket closed.");
        }, c.send_constructor(n);
    };
    y.prototype = new l, y.prototype.doCleanup = function() {
        var a = this, b = a.es;
        b.onmessage = b.onerror = null, b.close(), a.send_destructor(), a.es = a.ri = null;
    };
    var z = j["iframe-xhr-polling"] = function() {
        var a = this;
        a.protocol = "w-iframe-xhr-polling", a.i_constructor.apply(a, arguments);
    };
    z.prototype = new u, z.enabled = function() {
        return window.XMLHttpRequest && u.enabled();
    };
    var A = w["w-iframe-xhr-polling"] = function() {
        s.apply(this, arguments);
    };
    A.prototype = new l, A.prototype._schedule_recv = s.prototype._schedule_recv, A.prototype.doCleanup = s.prototype.doCleanup;
    return j;
}(), "_sockjs_onload" in window && setTimeout(_sockjs_onload, 1);
// [*] End of lib/all.js
