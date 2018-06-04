from os import path
import logging
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
        is_hs_program = program['Primary_Category'] == 'HS'
        matches_program_type = program['Program_Type'] == ptype

        if is_hs_program and matches_program_type:
            output.append(program['ID'])

    return output

def make_hs_program_groups(config, cps_programs):

    output = []

    prev_used_program_types = []

    for group_spec in config:
        groupName = group_spec['groupName']
        groupDesc = group_spec['groupDesc']
        programTypes = group_spec['includes']['programTypes']

        programIDs = [] 
        for programType in programTypes:
            ids = get_ids_of(programType, programs=cps_programs)

            # warn user if no ids found
            if len(ids) == 0:
                logging.warning('Group {0}: Program Type {1} failed to match any programs'.format(groupName, programType))

            # warn user if they try to use the same program type twice
            if programType in prev_used_program_types:
                logging.warning('Group {0}: Program Type {1} was listed multiple times'.format(groupName, programType))

            prev_used_program_types.append(programType)

            programIDs.extend(ids)

        output.append({
            'groupName': groupName,
            'groupDesc': groupDesc,
            'programIDs': programIDs
            })

    return output

if __name__ == "__main__":
    path_to_config = sys.argv[1]
    path_to_cps_program = sys.argv[2]
    path_to_output = sys.argv[3]

    with open(path_to_config, 'r') as conf_f:
        with open(path_to_cps_program, 'r') as cps_programs_f:

            hs_group_config = json.load(conf_f)
            cps_programs = json.load(cps_programs_f)
            groups = make_hs_program_groups(hs_group_config, cps_programs)

            with open(path_to_output, 'w') as out_f:
                json.dump(groups, out_f)

