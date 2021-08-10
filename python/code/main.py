from commands import *
from jsbuilder import js
from pscript import py2js
import sys

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
    return stack

code = """
,-.
2
4
3
 21
"""

if __name__ == "__main__":
    f = open("demos/"+sys.argv[1], "r")
    interp(f.read())
