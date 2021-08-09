OUTPUT_SEP = ''

comms = {
    '+': add,
    ',': inp,
    '.': out,
}

def add(stack, value):
    value = int(value)
    for _ in range(value-1):
        stack.append(stack.pop() + stack.pop())
    return stack

def inp(stack, value):
    value = int(value)
    stack.append(value)
    return stack

def out(stack, value):
    value = int(value)
    for _ in range(value):
        print(stack.pop(), end=OUTPUT_SEP)
    return stack
