import sys
import time
import os

prefix = '/home/michael1017/env_test/data/'
sample_file = prefix + 'sample.v'
output_file = prefix + sys.argv[1]
output_v    = output_file + '.v'
output_json = output_file + '.json'
output_svg  = output_file + '.svg'

command = ['cp', sample_file, output_v]
# yosys -p "prep -top top_module_name; write_json output.json" sample.v
prep_command = '"prep -top test; write_json ' + output_json + '"'
yosys_command = ['yosys', '-p', prep_command, output_v]
# netlistsvg test1.json -o out.svg
netlistsvg_command = ['netlistsvg', output_json, '-o', output_svg]

time.sleep(5)
os.system(' '.join(command))
os.system(' '.join(yosys_command))
os.system(' '.join(netlistsvg_command))
print("successfully generate your svg: " + output_svg)