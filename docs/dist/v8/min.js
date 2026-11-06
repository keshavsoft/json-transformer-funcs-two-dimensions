// node_modules/json-transformer-funcs-primitive/src/v10/forAttributes/index.js
var e = (e) => typeof e == "object" && !!e && !Array.isArray(e), t = (t, n) => {
	if (!e(t)) return;
	let r = {};
	for (let [e, i] of Object.entries(t)) r[e] = c(n, i);
	return r;
}, n = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => c(t, e));
}, r = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, i = (e, t) => r(e, t), a = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, o = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, s = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: o,
		applyTemplate: e
	});
}, c = (e, o, s) => {
	let c = e, l = o;
	a(c, l, s);
	let u = structuredClone(l);
	return typeof u == "string" ? r(u, c) : (typeof u != "object" || !u || ("textContent" in u && (u.textContent = i(u?.textContent, c)), "attributes" in u && (u.attributes = t(u?.attributes, c)), "children" in u && (u.children = n(u?.children, c))), u);
};
s(c);
// ../json-transformer-funcs-one-dimension/node_modules/json-transformer-funcs-primitive/src/v9/forAttributes/index.js
var l = (e) => typeof e == "object" && !!e && !Array.isArray(e), u = (e, t) => {
	if (!l(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = _(t, i);
	return n;
}, d = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => _(t, e));
}, f = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, p = (e, t) => f(e, t), m = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, h = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, g = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: h,
		applyTemplate: e
	});
}, _ = (e, t, n) => {
	let r = e, i = t;
	m(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? f(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = p(a?.textContent, r)), "attributes" in a && (a.attributes = u(a?.attributes, r)), "children" in a && (a.children = d(a?.children, r))), a);
};
g(_);
// ../json-transformer-funcs-one-dimension/src/v9/guard/index.js
var v = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, y = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, b = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: y,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, x = (e, t) => {
	let n = e, r = t;
	return v(n, r), n.map((e) => _(e, r));
};
b((e, t) => {
	let n = e;
	return v(n, t), n.map((e) => _(e, e[t]));
}, x);
// src/v8/addRowData.js
var S = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), C = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, w = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => {
	C(e, t);
	let i = e;
	return t.map((e) => {
		let t = c(e, r);
		return t.children = x(S(i, e), n), t;
	});
};
export { w as default };
