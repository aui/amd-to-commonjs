const vm = require('vm');
const beautify = require('js-beautify').js_beautify;

const define = (dependencies, factory) => {

    if (!Array.isArray(dependencies)) {
        throw new Error(`Only supported: define(dependencies, factory)`);
    }

    let variables = factory.toString()
        .match(/^function\s?[\w\W]*?\(([\w\W]*?)\)/)[1]
        .trim().split(/\s*,\s*/);

    let head = dependencies.map((name, index) => {
        if (name === `require`) {
            return ``;
        } else if (variables[index]) {
            return `var ${variables[index]} = require('${name}');`;
        } else {
            return `require('${name}');`;
        }
    }).join(`\n`);

    let body = factory.toString()
        .replace(/^function\s?[\w\W]*?\([\w\W]*?\)\s?\{([\w\W]*?)\}$/, `$1`)
        .replace(/return\s+([\w\W]*?)$/, `module.exports = $1`);

    let code = `${head}\n${body}`;

    return beautify(code, { indent_size: 4 });
};

const amdToCommonJS = (code, options) => {
    const script = new vm.Script(code, options);
    const context = new vm.createContext({ define });
    return script.runInContext(context);
};

module.exports = amdToCommonJS;
