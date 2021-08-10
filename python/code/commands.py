OUTPUT_SEP = ''

### HELPERS ###
def binary_op(stack, value, op, id=0):
    if value==0:
        return stack+[id]
    if value==1:
        popped = stack.pop()
        return stack + [op(popped, popped)]
    value = int(value)
    for _ in range(value-1):
        stack.append(int(op(stack.pop(), stack.pop())))
    return stack

def unary_op(stack, value, op, id=0):
    if value==0:
        return stack+[id]
    value = int(value)
    for _ in range(value):
        stack.append(int(op(stack.pop(), stack.pop())))
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
        lambda a,b: a*b, 1)


def div(stack, value):
    return binary_op(stack, value,
        lambda a,b: a//b, 1)


def mod(stack, value):
    return binary_op(stack, value,
        lambda a,b: a%b)

def negate(stack, value):
    return unary_op(stack, value,
    lambda a: not a)

def boolify(stack, value):
    return unary_op(stack, value,
    lambda a: not not a, 1)

def flip_sign(stack, value):
    return unary_op(stack, value,
    lambda a: -a)

def equals(stack, value):
    return binary_op(stack, value,
    lambda a,b: a==b)

def less_than(stack, value):
    return binary_op(stack, value,
    lambda a,b: a<b)

def greater_than(stack, value):
    return binary_op(stack, value,
    lambda a,b: a>b)

def inp(stack, value):
    value = int(value)
    stack.append(value)
    return stack

def out(stack, value):
    value = int(value)
    for _ in range(value):
        print(stack.pop(), end=OUTPUT_SEP)
    return stack
