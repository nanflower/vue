/* @flow */

// no：返回false noop：无操作 identity：返回传入参数
import {
  no,
  noop,
  identity
} from 'shared/util'

// 生命周期钩子名
import { LIFECYCLE_HOOKS } from 'shared/constants'

export type Config = {
  // user
  optionMergeStrategies: { [key: string]: Function };
  silent: boolean;
  productionTip: boolean;
  performance: boolean;
  devtools: boolean;
  errorHandler: ?(err: Error, vm: Component, info: string) => void;
  warnHandler: ?(msg: string, vm: Component, trace: string) => void;
  ignoredElements: Array<string | RegExp>;
  keyCodes: { [key: string]: number | Array<number> };

  // platform
  isReservedTag: (x?: string) => boolean;
  isReservedAttr: (x?: string) => boolean;
  parsePlatformTagName: (x: string) => string;
  isUnknownElement: (x?: string) => boolean;
  getTagNamespace: (x?: string) => string | void;
  mustUseProp: (tag: string, type: ?string, name: string) => boolean;

  // legacy
  _lifecycleHooks: Array<string>;
};

export default ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  // 是否展示warnings
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  // production标示
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  // 是否启用devtools
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  // 是否记录performance
  performance: false,

  /**
   * Error handler for watcher errors
   */
  // 监视error
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  // 监视warn
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  // 忽视传统元素列表
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  // 传统v-on的user key别名
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  // 检查一个tag是预留的tag，无法被注册为component
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  // 检查一个attribute是预留的，无法被使用作为组件prop
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  // 检查一个tag是一个未知元素
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  // 获取一个元素的命名空间
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  // 为特殊平台解析真实的tag名
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  // 检查一个attribute必须被限定
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  // 暴露属性
  _lifecycleHooks: LIFECYCLE_HOOKS
}: Config)
