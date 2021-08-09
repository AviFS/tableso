OUTPUT_SEP = ''
output = ''

### HELPERS ###
def binary_op(stack, value, op):
    value = int(value)
    for _ in range(value-1):
        stack.append(op(stack.pop(), stack.pop()))
    return stack

def unary_op(stack, value, op):
    value = int(value)
    for _ in range(value-1):
        stack.append(op(stack.pop(), stack.pop()))
    return stack

### COMMANDS ###
def add(stack, value):
    return binary_op(stack, value,
        lambda a,b: a+b)

def sub(stack, value):
    return binary_op(stack, value,
        lambda a,b: a-b)


def mult(stack, value):
    return binary_op(stack, value,
        lambda a,b: a*b)


def div(stack, value):
    return binary_op(stack, value,
        lambda a,b: a//b)


def mod(stack, value):
    return binary_op(stack, value,
        lambda a,b: a%b)

def negate(stack, value):
    return unary_op(stack, value,
    lambda a: not a)

def boolify(stack, value):
    return unary_op(stack, value,
    lambda a: not not a)

def flip_sign(stack, value):
    return unary_op(stack, value,
    lambda a: -a)

def inp(stack, value):
    value = int(value)
    stack.append(value)
    return stack

def out(stack, value):
    value = int(value)
    global output
    for _ in range(value):
        output += stack.pop() + OUTPUT_SEP
    return stack


ops = {
    '+': add,
    '-': sub,
    '*': mult,
    '/': div,
    '%': mod,
    '_': flip_sign,
    '~': negate,
    '!': boolify,
    ',': inp,
    '.': out,
}

def parser(code):
    lines = code.strip('\n').split('\n')
    header = lines[0]
    acc = []
    for line in lines[1:]:
        for i, char in enumerate(line):
            if char!=' ':
                if i>len(header):
                    raise ValueError(f"Header is only {len(header)} cols. Column {i} is undefined.")
                acc += [(char, header[i])]
    return acc

def interp(code):
    stack = []
    parsed = parser(code)
    for value, kind in parsed:
        stack = ops[kind](stack, value)
    if '\n' not in OUTPUT_SEP:
        print()
    return  output, stack