! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : e.jQuery)
}(this, function($) {
    "use strict";
    console.log('help');

    function e(e) {
        var t = {},
            o, i, r, n, s, a, p;
        for (s = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), p = 0, a = s.length; a > p && (i = s[p], -1 === i.search(/^(http|https|ftp):\/\//) && -1 !== i.search(":")); p++) o = i.indexOf(":"), r = i.substring(0, o), n = i.substring(o + 1), n || (n = void 0), "string" == typeof n && (n = "true" === n || ("false" === n ? !1 : n)), "string" == typeof n && (n = isNaN(n) ? n : +n), t[r] = n;
        return null == r && null == n ? e : t
    }

    function t(e) {
        e = "" + e;
        var t = e.split(/\s+/),
            o = "50%",
            i = "50%",
            r, n, s;
        for (s = 0, r = t.length; r > s; s++) n = t[s], "left" === n ? o = "0%" : "right" === n ? o = "100%" : "top" === n ? i = "0%" : "bottom" === n ? i = "100%" : "center" === n ? 0 === s ? o = "50%" : i = "50%" : 0 === s ? o = n : i = n;
        return {
            x: o,
            y: i
        }
    }

    function o(e) {
        var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        e = e.replace(t, function(e, t, o, i) {
            return t + t + o + o + i + i
        });
        var o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return o ? {
            r: parseInt(o[1], 16),
            g: parseInt(o[2], 16),
            b: parseInt(o[3], 16)
        } : null
    }

    function i(t, o, i) {
        this.$element = $(t), "string" == typeof o && (o = e(o)), i ? "string" == typeof i && (i = e(i)) : i = {}, this.settings = $.extend({}, n, i), this.path = o;
        try {
            this.init()
        } catch (r) {
            if (r.message !== s) throw r
        }
    }
    var r = "vidbg",
        n = {
            volume: 1,
            playbackRate: 1,
            muted: !0,
            loop: !0,
            autoplay: !0,
            position: "50% 50%",
            overlay: !1,
            overlayColor: "#000",
            overlayAlpha: .3,
            resizing: !0
        },
        s = "Not implemented";
    i.prototype.init = function() {
        var e = this,
            i = e.path,
            n = i,
            a = "",
            p = e.$element,
            d = e.settings,
            c = t(d.position),
            u, l;
        l = e.$wrapper = $('<div class="vidbg-container">').css({
            position: "absolute",
            "z-index": -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": c.x + " " + c.y
        }), "object" == typeof i && (i.poster ? n = i.poster : i.mp4 ? n = i.mp4 : i.webm && (n = i.webm)), l.css("background-image", "url(" + n + ")"), "static" === p.css("position") && p.css("position", "relative"), p.css("z-index", "1"), p.is("body") && l.css({
            position: "fixed"
        }), p.prepend(l), "object" == typeof i ? (i.mp4 && (a += '<source src="' + i.mp4 + '" type="video/mp4">'), i.webm && (a += '<source src="' + i.webm + '" type="video/webm">'), u = e.$video = $("<video>" + a + "</video>")) : u = e.$video = $('<video><source src="' + i + '" type="video/mp4"><source src="' + i + '" type="video/webm"></video>');
        try {
            u.prop({
                autoplay: d.autoplay,
                loop: d.loop,
                volume: d.volume,
                muted: d.muted,
                defaultMuted: d.muted,
                playbackRate: d.playbackRate,
                defaultPlaybackRate: d.playbackRate
            })
        } catch (f) {
            throw new Error(s)
        }
        u.css({
            margin: "auto",
            position: "absolute",
            "z-index": -1,
            top: c.y,
            left: c.x,
            "-webkit-transform": "translate(-" + c.x + ", -" + c.y + ")",
            "-ms-transform": "translate(-" + c.x + ", -" + c.y + ")",
            "-moz-transform": "translate(-" + c.x + ", -" + c.y + ")",
            transform: "translate(-" + c.x + ", -" + c.y + ")",
            visibility: "hidden",
            opacity: 0
        }).one("canplaythrough." + r, function() {
            e.resize()
        }).one("playing." + r, function() {
            u.css({
                visibility: "visible",
                opacity: 1
            }), l.css("background-image", "none")
        }), p.on("resize." + r, function() {
            d.resizing && e.resize()
        }), l.append(u), d.overlay && $("<div class='vidbg-overlay' style='position:absolute;top:0;right:0;left:0;bottom:0;background: rgba(" + o(d.overlayColor).r + ", " + o(d.overlayColor).g + ", " + o(d.overlayColor).b + ", " + d.overlayAlpha + ")'></div>").insertAfter($(".vidbg-container > video"))
    }, i.prototype.getVideoObject = function() {
        return this.$video[0]
    }, i.prototype.resize = function() {
        if (this.$video) {
            var e = this.$wrapper,
                t = this.$video,
                o = t[0],
                i = o.videoHeight,
                r = o.videoWidth,
                n = e.height(),
                s = e.width();
            s / r > n / i ? t.css({
                width: s + 2,
                height: "auto"
            }) : t.css({
                width: "auto",
                height: n + 2
            })
        }
    }, i.prototype.destroy = function() {
        delete $[r].lookup[this.index], this.$video && this.$video.off(r), this.$element.off(r).removeData(r), this.$wrapper.remove()
    }, $[r] = {
        lookup: []
    }, $.fn[r] = function(e, t) {
        var o;
        return this.each(function() {
            o = $.data(this, r), o && o.destroy(), o = new i(this, e, t), o.index = $[r].lookup.push(o) - 1, $.data(this, r, o)
        }), this
    }, $(document).ready(function() {
        var e = $(window);
        e.on("resize." + r, function() {
            for (var e = $[r].lookup.length, t = 0, o; e > t; t++) o = $[r].lookup[t], o && o.settings.resizing && o.resize()
        }), e.on("unload." + r, function() {
            return !1
        }), $(document).find("[data-" + r + "-bg]").each(function(e, t) {
            var o = $(t),
                i = o.data(r + "-options"),
                n = o.data(r + "-bg");
            o[r](n, i)
        })
    })
});