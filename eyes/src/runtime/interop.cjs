exports.getDefaultExport = value => value && (value.__esModule || value[Symbol.toStringTag] === 'Module') ? () => value.default : () => value;
exports.nodeModule = module => { module.paths = []; module.children ||= []; return module; };
