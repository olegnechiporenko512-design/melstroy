import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { d as toE164, r as PACKS, u as isValidUaPhone } from "./phone-NNQxr2de.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-lead-BMfDZ2bu.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function normalizeLead(input) {
	const name = input.name.trim().replace(/\s+/g, " ");
	if (name.length < 2 || name.length > 80) throw new Error("Вкажіть імʼя");
	if (!isValidUaPhone(input.phone)) throw new Error("Вкажіть номер у форматі +380 XX XXX XX XX");
	const pack = input.pack === "one" ? "one" : "promo";
	return {
		name,
		phone: toE164(input.phone),
		pack,
		price: PACKS[pack].price,
		jars: PACKS[pack].jars,
		source: (input.source ?? "").slice(0, 500)
	};
}
var submitLead_createServerFn_handler = createServerRpc({
	id: "29b8cab67d2eb6de95ec29ee4457dbc6f42911c0e50f778cac9a3e3299c1d780",
	name: "submitLead",
	filename: "src/lib/submit-lead.ts"
}, (opts) => submitLead.__executeServer(opts));
var submitLead = createServerFn({ method: "POST" }).validator((input) => normalizeLead(input)).handler(submitLead_createServerFn_handler, async ({ data }) => {
	({ ...data }), (/* @__PURE__ */ new Date()).toISOString();
	return {
		ok: true,
		pack: data.pack,
		price: data.price
	};
});
//#endregion
export { submitLead_createServerFn_handler };
