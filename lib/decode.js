// 解码 豆瓣
exports.decodeDouban = function(metaData) {
	function t(t) {
		this._key = [];
		this._tbl = {};
		for (var i = 0; i < 64; ++i) this._key[i] = e.charAt(t[i]),
			this._tbl[this._key[i]] = i;
		this._pad = e.charAt(64)
	}
	var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_~";
	t.prototype.dec = function(e) {
			var i, n, o, r, s = [],
				a = 0,
				l = 0;
			for (e = e.replace(/[^0-9A-Za-z$_~]/g, ""); a < e.length;) i = this._tbl[e.charAt(a++)],
				n = this._tbl[e.charAt(a++)],
				o = this._tbl[e.charAt(a++)],
				r = this._tbl[e.charAt(a++)],
				s[l++] = i << 2 | n >> 4,
				s[l++] = (15 & n) << 4 | o >> 2,
				s[l++] = (3 & o) << 6 | r;
			var h = e.slice(-2);
			return h.charAt(0) === this._pad ? s.length = s.length - 2 : h.charAt(1) === this._pad && (s.length = s.length - 1),
				t._1to2(s)
		},
		t._1to2 = function(t) {
			for (var e = "",
					i = 0; i < t.length; ++i) {
				var n = t[i];
				e += String.fromCharCode(256 * n + t[++i])
			}
			return e
		};
	var i = [37, 20, 41, 59, 53, 8, 24, 5, 62, 31, 4, 32, 6, 50, 36, 63, 47, 42, 30, 39, 12, 3, 9, 45, 29, 23, 56, 2, 16, 61, 52, 44, 25, 35, 51, 0, 13, 43, 46, 40, 15, 27, 17, 57, 28, 54, 1, 60, 21, 22, 14, 49, 34, 33, 10, 58, 55, 19, 26, 11, 18, 48, 38, 7];
	let n = new t(i);

	return JSON.parse(n.dec(metaData));
}
