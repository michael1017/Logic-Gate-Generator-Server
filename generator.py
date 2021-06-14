import sys
import time
import os

output_file = sys.argv[1] - '.v'
output_v    = output_file + '.v'
output_json = output_file + '.json'
output_svg  = output_file + '.svg'

# yosys -p "prep -top top_module_name; write_json output.json" sample.v
prep_command = '"prep -top top; write_json ' + output_json + '"'
yosys_command = ['yosys', '-p', prep_command, output_v]
# netlistsvg test1.json -o out.svg
netlistsvg_command = ['netlistsvg', output_json, '-o', output_svg]

time.sleep(2)
os.system(' '.join(yosys_command))
os.system(' '.join(netlistsvg_command))
print("successfully generate your svg: " + output_svg)