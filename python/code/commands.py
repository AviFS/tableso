OUTPUT_SEP = ''

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
    for _ in range(value):
        print(stack.pop(), end=OUTPUT_SEP)
    return stack
