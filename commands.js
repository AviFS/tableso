/* Do not edit, autogenerated by pscript */

var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
};
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
};
var _pyfunc_op_mult = function (a, b) { // nargs: 2
    if ((typeof a === 'number') + (typeof b === 'number') === 1) {
        if (a.constructor === String) return _pymeth_repeat.call(a, b);
        if (b.constructor === String) return _pymeth_repeat.call(b, a);
        if (Array.isArray(b)) {var t=a; a=b; b=t;}
        if (Array.isArray(a)) {
            var res = []; for (var i=0; i<b; i++) res = res.concat(a);
            return res;
        }
    } return a * b;
};
var _pyfunc_truthy = function (v) {
    if (v === null || typeof v !== "object") {return v;}
    else if (v.length !== undefined) {return v.length ? v : false;}
    else if (v.byteLength !== undefined) {return v.byteLength ? v : false;}
    else if (v.constructor !== Object) {return true;}
    else {return Object.getOwnPropertyNames(v).length ? v : false;}
};
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
};
var _pymeth_repeat = function(count) { // nargs: 0
    if (this.repeat) return this.repeat(count);
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
};
var OUTPUT_SEP, add, binary_op, boolify, div, flip_sign, inp, mod, mult, negate, out, sub, unary_op;
OUTPUT_SEP = "";
binary_op = function flx_binary_op (stack, value, op) {
    var _;
    value = _pyfunc_int(value);
    for (_ = 0; _ < value - 1; _ += 1) {
        _pymeth_append.call(stack, (op(stack.pop(), stack.pop())));
    }
    return stack;
};

unary_op = function flx_unary_op (stack, value, op) {
    var _;
    value = _pyfunc_int(value);
    for (_ = 0; _ < value - 1; _ += 1) {
        _pymeth_append.call(stack, (op(stack.pop(), stack.pop())));
    }
    return stack;
};

add = function flx_add (stack, value) {
    return binary_op(stack, value, (function (a, b) {return _pyfunc_op_add(a, b);}).bind(this));
};

sub = function flx_sub (stack, value) {
    return binary_op(stack, value, (function (a, b) {return a - b;}).bind(this));
};

mult = function flx_mult (stack, value) {
    return binary_op(stack, value, (function (a, b) {return _pyfunc_op_mult(a, b);}).bind(this));
};

div = function flx_div (stack, value) {
    return binary_op(stack, value, (function (a, b) {return Math.floor(a/b);}).bind(this));
};

mod = function flx_mod (stack, value) {
    return binary_op(stack, value, (function (a, b) {return a % b;}).bind(this));
};

negate = function flx_negate (stack, value) {
    return unary_op(stack, value, (function (a) {return !_pyfunc_truthy(a);}).bind(this));
};

boolify = function flx_boolify (stack, value) {
    return unary_op(stack, value, (function (a) {return !(!_pyfunc_truthy(a));}).bind(this));
};

flip_sign = function flx_flip_sign (stack, value) {
    return unary_op(stack, value, (function (a) {return -a;}).bind(this));
};

inp = function flx_inp (stack, value) {
    value = _pyfunc_int(value);
    _pymeth_append.call(stack, value);
    return stack;
};

out = function flx_out (stack, value) {
    var _;
    value = _pyfunc_int(value);
    for (_ = 0; _ < value; _ += 1) {
        console.log(stack.pop() + OUTPUT_SEP);
    }
    return stack;
};
