var f = Object.defineProperty;
var g = (e, t, n) => t in e ? f(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var l = (e, t, n) => (g(e, typeof t != "symbol" ? t + "" : t, n), n);
import { TurboModuleRegistry as d, NativeModules as m, NativeEventEmitter as p } from "react-native";
import { useState as v, useEffect as P } from "react";
class M {
  constructor() {
    l(this, "handlers");
    this.handlers = /* @__PURE__ */ new Map();
  }
  getQueue(t) {
    const n = this.handlers.get(t);
    return n || (this.handlers.set(t, []), []);
  }
  listen(t, n) {
    const r = this.getQueue(t);
    this.handlers.set(t, r.concat(n));
  }
  once(t, n) {
    this.handlers.set(t, [n]);
  }
  clear(t) {
    this.handlers.set(t, []);
  }
  dispatch(t, ...n) {
    this.getQueue(t).forEach((a) => a(...n)), this.clear(t);
  }
}
const o = (e) => (...t) => new Promise((n, r) => {
  e(...t, (a, i) => {
    a ? r(i) : n(i);
  });
}), { Wechat: W } = m, s = d.get("Wechat") || W, E = () => {
  const [e, t] = v(!1);
  return P(() => {
    b().then(() => t(!0)).catch(() => t(!1));
  }, []), e;
}, u = new M();
let h = !1;
const y = (e) => new Error(`[Native Wechat]: (${e.errorCode}) ${e.errorStr}`), c = (e) => {
  if (!h)
    throw new Error(`Please register SDK before invoking ${e}`);
}, N = () => o(
  s.checkUniversalLinkReady
)(), I = (e) => {
  h || (s.registerApp(e), h = !0);
  const n = new p(s).addListener(
    "NativeWechat_Response",
    (r) => {
      const a = r.errorCode ? y(r) : null;
      u.dispatch(r.type, a, r);
    }
  );
  return () => n.remove();
}, b = () => o(s.isWechatInstalled)(), C = (e = {
  scope: "snsapi_userinfo",
  state: ""
}) => {
  c("sendAuthRequest");
  const t = o(
    s.sendAuthRequest
  );
  return new Promise((n, r) => {
    t(e).catch(r), u.once("SendAuthResp", (a, i) => a ? r(a) : n(i));
  });
}, k = (e) => (c("shareText"), o(s.shareText)(e)), A = (e) => (c("shareImage"), o(s.shareImage)(e)), T = (e) => (c("shareVideo"), o(s.shareVideo)(e)), q = (e) => (c("shareWebpage"), o(
  s.shareWebpage
)(e)), x = (e) => (c("shareMiniProgram"), o(
  s.shareMiniProgram
)(e)), L = (e) => {
  c("requestPayment");
  const t = o(
    s.requestPayment
  );
  return new Promise(async (n, r) => {
    t(e).catch(r), u.once("PayResp", (a, i) => a ? r(a) : n(i));
  });
}, Q = (e) => {
  c("requestSubscribeMessage");
  const t = o(
    s.requestSubscribeMessage
  );
  return e.scene = +e.scene, t(e);
}, V = (e) => (c("openCustomerService"), o(
  s.openCustomerService
)(e)), $ = (e) => {
  c("launchMiniProgram"), e.miniprogramType = +e.miniprogramType;
  const t = o(
    s.launchMiniProgram
  );
  return u.once("WXLaunchMiniProgramResp", (n, r) => {
    var a;
    if (!n)
      return (a = e.onNavBack) == null ? void 0 : a.call(e, r);
  }), t(e);
}, U = s.getConstants();
export {
  U as NativeWechatConstants,
  N as checkUniversalLinkReady,
  b as isWechatInstalled,
  $ as launchMiniProgram,
  V as openCustomerService,
  I as registerApp,
  L as requestPayment,
  Q as requestSubscribeMessage,
  C as sendAuthRequest,
  A as shareImage,
  x as shareMiniProgram,
  k as shareText,
  T as shareVideo,
  q as shareWebpage,
  E as useWechatInstalled
};
