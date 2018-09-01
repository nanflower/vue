/* @flow */

// can we use __proto__?
export const hasProto = '__proto__' in {}

// Browser environment sniffing
// 浏览器环境嗅探

// 是否浏览器环境
export const inBrowser = typeof window !== 'undefined'
// 是否weex环境
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
// 获取platform（weex环境时）
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
// 获取userAgent（浏览器环境时）
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
// 是否ie环境（浏览器环境时）
export const isIE = UA && /msie|trident/.test(UA)
// 是否ie9环境（浏览器环境时）
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
// 是否edge环境（浏览器环境时）
export const isEdge = UA && UA.indexOf('edge/') > 0
// 是否android环境（浏览器环境时或weexplatform==='android'）
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
// 是否ios环境（浏览器环境时或weexplatform==='ios'）
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
// 是否chrome环境（浏览器环境时）
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

// Firefox has a "watch" function on Object.prototype...
// 原生watch方法储存，firefox在对象原型上有watch方法
export const nativeWatch = ({}).watch

// 检测passive值
export let supportsPassive = false
if (inBrowser) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', ({
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      }
    }: Object)) // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts)
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    // 非浏览器非weex环境时，判断VUE_ENV===‘server‘
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      // 检测vue-server-renderer是否存在，并避免webpack影响
      _isServer = global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

// detect devtools
// 检测devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

/* istanbul ignore next */
// 判断参数是否未native function
export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

let _Set
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  // 默认使用native方法
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  // Set polyfill，继承接口实现class
  _Set = class Set implements SimpleSet {
    set: Object;
    constructor () {
      this.set = Object.create(null)
    }
    has (key: string | number) {
      return this.set[key] === true
    }
    add (key: string | number) {
      this.set[key] = true
    }
    clear () {
      this.set = Object.create(null)
    }
  }
}

interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): mixed;
  clear(): void;
}

export { _Set }
export type { SimpleSet }
