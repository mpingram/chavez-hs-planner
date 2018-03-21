from os import path
import json
import sys


# config json structure
# [
#   {
#       groupName: string
#       groupDesc: string
#       includes: {
#           programTypes: string[],
#       }
#   } 
# ]

# output json structure
# [
#   {
#       groupName: string
#       groupDesc: string
#       programIDs: string[]
#   } 
# ]

def get_ids_of(ptype, **kwargs):
    programs = kwargs['programs']
    output = []
    for program in programs:
        if program['Program_Type'] == ptype:
            output.append(program['ID'])

def make_hs_program_groups(config_f, cps_programs_f, output_f):
    hs_group_config = json.load(input_f)
    cps_programs = json.load(cps_programs_f)

    output = []

    for group_spec in hs_group_config:
        groupName = group_spec['groupName']
        groupDesc = group_spec['groupDesc']
        programTypes = group_spec['includes']['programTypes']

        programIDs = [] 
        for programType in programTypes:
            ids = get_ids_of(programType, programs=cps_programs)
            programIDs.extend(ids)

        output.append({
            'groupName': groupName,
            'groupDesc': groupDesc,
            'programIDs': programIDs
            })

    return json.dump(output, output_f)

if __name__ == "__main__":
    path_to_config = sys.argv[1]
    path_to_cps_program = sys.argv[2]
    path_to_output = sys.argv[3]

    with open(path_to_conf, 'r') as conf_f:
        with open(path_to_cps_program, 'r') as cps_programs_f:
            with open(path_to_output, 'w') as out_f:
                make_hs_program_groups(conf_f, cps_programs_f,  outf)

