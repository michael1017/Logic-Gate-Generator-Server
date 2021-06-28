import sys
import time
import os
import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument("--input", help="input verilog file")
parser.add_argument("--top", default="top", help="top module")
args = parser.parse_args()

assert(args.input.endswith('.v'))
output_file = args.input[:-2]
print(output_file, args.top)
output_v    = output_file + '.v'
output_json = output_file + '.json'
output_svg  = output_file + '.svg'
identifier =  re.compile('[a-zA-Z_]+[a-zA-Z0-9_]*')
assert(identifier.match(args.top))

# yosys -p "prep -top top_module_name; write_json output.json" sample.v
prep_command = '"prep -top ' + args.top.strip() + '; write_json ' + output_json + '"'
yosys_command = ['yosys', '-p', prep_command, output_v]
# netlistsvg test1.json -o out.svg
netlistsvg_command = ['netlistsvg', output_json, '-o', output_svg, "--skin", "default.svg"]

os.system(' '.join(yosys_command))
os.system(' '.join(netlistsvg_command))
print("successfully generate your svg: " + output_svg)