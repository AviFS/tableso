var _pyfunc_create_dict = function () {
    var d = {};
    for (var i=0; i<arguments.length; i+=2) { d[arguments[i]] = arguments[i+1]; }
    return d;
};
var _pyfunc_enumerate = function (iter) { // nargs: 1
    var i, res=[];
    if ((typeof iter==="object") && (!Array.isArray(iter))) {iter = Object.keys(iter);}
    for (i=0; i<iter.length; i++) {res.push([i, iter[i]]);}
    return res;
};
var _pyfunc_format = function (v, fmt) {  // nargs: 2
    fmt = fmt.toLowerCase();
    var s = String(v);
    if (fmt.indexOf('!r') >= 0) {
        try { s = JSON.stringify(v); } catch (e) { s = undefined; }
        if (typeof s === 'undefined') { s = v._IS_COMPONENT ? v.id : String(v); }
    }
    var fmt_type = '';
    if (fmt.slice(-1) == 'i' || fmt.slice(-1) == 'f' ||
        fmt.slice(-1) == 'e' || fmt.slice(-1) == 'g') {
            fmt_type = fmt[fmt.length-1]; fmt = fmt.slice(0, fmt.length-1);
    }
    var i0 = fmt.indexOf(':');
    var i1 = fmt.indexOf('.');
    var spec1 = '', spec2 = '';  // before and after dot
    if (i0 >= 0) {
        if (i1 > i0) { spec1 = fmt.slice(i0+1, i1); spec2 = fmt.slice(i1+1); }
        else { spec1 = fmt.slice(i0+1); }
    }
    // Format numbers
    if (fmt_type == '') {
    } else if (fmt_type == 'i') { // integer formatting, for %i
        s = parseInt(v).toFixed(0);
    } else if (fmt_type == 'f') {  // float formatting
        v = parseFloat(v);
        var decimals = spec2 ? Number(spec2) : 6;
        s = v.toFixed(decimals);
    } else if (fmt_type == 'e') {  // exp formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        s = v.toExponential(precision);
    } else if (fmt_type == 'g') {  // "general" formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        // Exp or decimal?
        s = v.toExponential(precision-1);
        var s1 = s.slice(0, s.indexOf('e')), s2 = s.slice(s.indexOf('e'));
        if (s2.length == 3) { s2 = 'e' + s2[1] + '0' + s2[2]; }
        var exp = Number(s2.slice(1));
        if (exp >= -4 && exp < precision) { s1=v.toPrecision(precision); s2=''; }
        // Skip trailing zeros and dot
        var j = s1.length-1;
        while (j>0 && s1[j] == '0') { j-=1; }
        s1 = s1.slice(0, j+1);
        if (s1.slice(-1) == '.') { s1 = s1.slice(0, s1.length-1); }
        s = s1 + s2;
    }
    // prefix/padding
    var prefix = '';
    if (spec1) {
        if (spec1[0] == '+' && v > 0) { prefix = '+'; spec1 = spec1.slice(1); }
        else if (spec1[0] == ' ' && v > 0) { prefix = ' '; spec1 = spec1.slice(1); }
    }
    if (spec1 && spec1[0] == '0') {
        var padding = Number(spec1.slice(1)) - (s.length + prefix.length);
        s = '0'.repeat(Math.max(0, padding)) + s;
    }
    return prefix + s;
};
var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
};
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
};
var _pyfunc_op_contains = function op_contains (a, b) { // nargs: 2
    if (b == null) {
    } else if (Array.isArray(b)) {
        for (var i=0; i<b.length; i++) {if (_pyfunc_op_equals(a, b[i]))
                                           return true;}
        return false;
    } else if (b.constructor === Object) {
        for (var k in b) {if (a == k) return true;}
        return false;
    } else if (b.constructor == String) {
        return b.indexOf(a) >= 0;
    } var e = Error('Not a container: ' + b); e.name='TypeError'; throw e;
};
var _pyfunc_op_equals = function op_equals (a, b) { // nargs: 2
    var a_type = typeof a;
    // If a (or b actually) is of type string, number or boolean, we don't need
    // to do all the other type checking below.
    if (a_type === "string" || a_type === "boolean" || a_type === "number") {
        return a == b;
    }

    if (a == null || b == null) {
    } else if (Array.isArray(a) && Array.isArray(b)) {
        var i = 0, iseq = a.length == b.length;
        while (iseq && i < a.length) {iseq = op_equals(a[i], b[i]); i+=1;}
        return iseq;
    } else if (a.constructor === Object && b.constructor === Object) {
        var akeys = Object.keys(a), bkeys = Object.keys(b);
        akeys.sort(); bkeys.sort();
        var i=0, k, iseq = op_equals(akeys, bkeys);
        while (iseq && i < akeys.length)
            {k=akeys[i]; iseq = op_equals(a[k], b[k]); i+=1;}
        return iseq;
    } return a == b;
};
var _pyfunc_op_error = function (etype, msg) { // nargs: 2
    var e = new Error(etype + ': ' + msg);
    e.name = etype
    return e;
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
var _pymeth_format = function () {
    if (this.constructor !== String) return this.format.apply(this, arguments);
    var parts = [], i = 0, i1, i2;
    var itemnr = -1;
    while (i < this.length) {
        // find opening
        i1 = this.indexOf('{', i);
        if (i1 < 0 || i1 == this.length-1) { break; }
        if (this[i1+1] == '{') {parts.push(this.slice(i, i1+1)); i = i1 + 2; continue;}
        // find closing
        i2 = this.indexOf('}', i1);
        if (i2 < 0) { break; }
        // parse
        itemnr += 1;
        var fmt = this.slice(i1+1, i2);
        var index = fmt.split(':')[0].split('!')[0];
        index = index? Number(index) : itemnr
        var s = _pyfunc_format(arguments[index], fmt);
        parts.push(this.slice(i, i1), s);
        i = i2 + 1;
    }
    parts.push(this.slice(i));
    return parts.join('');
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
var _pymeth_split = function (sep, count) { // nargs: 0, 1 2
    if (this.constructor !== String) return this.split.apply(this, arguments);
    if (sep === '') {var e = Error('empty sep'); e.name='ValueError'; throw e;}
    sep = (sep === undefined) ? /\s/ : sep;
    if (count === undefined) { return this.split(sep); }
    var res = [], i = 0, index1 = 0, index2 = 0;
    while (i < count && index1 < this.length) {
        index2 = this.indexOf(sep, index1);
        if (index2 < 0) { break; }
        res.push(this.slice(index1, index2));
        index1 = index2 + sep.length || 1;
        i += 1;
    }
    res.push(this.slice(index1));
    return res;
};
var _pymeth_strip = function (chars) { // nargs: 0 1
    if (this.constructor !== String) return this.strip.apply(this, arguments);
    chars = (chars === undefined) ? ' \t\r\n' : chars;
    var i, s1 = this, s2 = '', s3 = '';
    for (i=0; i<s1.length; i++) {
        if (chars.indexOf(s1[i]) < 0) {s2 = s1.slice(i); break;}
    } for (i=s2.length-1; i>=0; i--) {
        if (chars.indexOf(s2[i]) < 0) {s3 = s2.slice(0, i+1); break;}
    } return s3;
};
var OUTPUT_SEP, add, binary_op, boolify, div, flip_sign, inp, interp, mod, mult, negate, ops, out, output, parser, sub, unary_op;
OUTPUT_SEP = "";
output = "";
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
        output = _pyfunc_op_add(output, _pyfunc_op_add(stack.pop(), OUTPUT_SEP));
    }
    return stack;
};

ops = _pyfunc_create_dict("+", add, "-", sub, "*", mult, "/", div, "%", mod, "_", flip_sign, "~", negate, "!", boolify, ",", inp, ".", out);
parser = function flx_parser (code) {
    var acc, char, err_5, header, i, line, lines, stub1_seq, stub2_itr, stub3_tgt, stub4_seq, stub5_itr;
    lines = _pymeth_split.call(_pymeth_strip.call(code, "\n"), "\n");
    header = lines[0];
    acc = [];
    stub4_seq = lines.slice(1);
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        line = stub4_seq[stub5_itr];
        stub1_seq = _pyfunc_enumerate(line);
        if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
        for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
            stub3_tgt = stub1_seq[stub2_itr];
            i = stub3_tgt[0]; char = stub3_tgt[1];
            if ((!_pyfunc_op_equals(char, " "))) {
                if ((i > header.length)) {
                    throw _pyfunc_op_error('ValueError', _pymeth_format.call("Header is only {} cols. Column {} is undefined.", header.length, i));
                }
                acc = _pyfunc_op_add(acc, [[char, header[i]]]);
            }
        }
    }
    return acc;
};

interp = function flx_interp (code) {
    var kind, parsed, stack, stub6_seq, stub7_itr, stub8_tgt, value;
    stack = [];
    parsed = parser(code);
    stub6_seq = parsed;
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        stub8_tgt = stub6_seq[stub7_itr];
        value = stub8_tgt[0]; kind = stub8_tgt[1];
        stack = ops[kind](stack, value);
    }
    if ((!_pyfunc_op_contains("\n", OUTPUT_SEP))) {
        console.log("");
    }
    return [output, stack];
};

