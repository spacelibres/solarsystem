/** @eyes-analysis
 * 文件职责：兼容 CommonJS/ESModule 默认导出访问器
 * 依据：当前源码声明、导入关系及工程调用链
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
exports.getDefaultExport = value => value && (value.__esModule || value[Symbol.toStringTag] === 'Module') ? () => value.default : () => value;
exports.nodeModule = module => { module.paths = []; module.children ||= []; return module; };
