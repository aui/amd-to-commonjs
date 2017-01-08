# amd-to-commonjs

将 AMD 风格转换成 CommonJS 的 JavaScript 小工具。

## 安装

```
npm install -g amd-to-commonjs
```

## 使用

```
a2c <...path>
```

## 不足

由于目前实现比较简单，没有进行语法分析，所以代码的 `return` 语句必须在函数末尾才能正确转换。

**支持**

```javascript
define(['jquery'], function($) {
    // [more code..]
    return {};
});
```

**不支持**

```javascript
define(['jquery'], function($) {
    // [more code..]
    if (true) {
        return {};
    } else {
        return {};
    }
});
```