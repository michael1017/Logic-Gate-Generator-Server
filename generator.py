import sys
import time
import os
import argparse

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


# yosys -p "prep -top top_module_name; write_json output.json" sample.v
prep_command = '"prep -top ' + args.top + '; write_json ' + output_json + '"'
yosys_command = ['yosys', '-p', prep_command, output_v]
# netlistsvg test1.json -o out.svg
netlistsvg_command = ['netlistsvg', output_json, '-o', output_svg]

os.system(' '.join(yosys_command))
os.system(' '.join(netlistsvg_command))
print("successfully generate your svg: " + output_svg)