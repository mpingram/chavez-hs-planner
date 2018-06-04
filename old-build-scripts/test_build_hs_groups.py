import unittest
import json

# system under test
from build_hs_groups import make_hs_program_groups

class Test_make_hs_program_groups(unittest.TestCase):
    

    def test_singleGroup(self):
        # should return json with single group with group's hs programs
        test_config = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'includes': {
                    'programTypes': [
                        'Type A',
                        'Type B'
                     ] 
                 }
            },
        ]

        test_programs = [
            {
                'ID': 'prog_1',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_2',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_3',
                'Program_Type': 'Type B',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'elem_school_program',
                'Program_Type': 'Type A',
                'Primary_Category': 'ES'
            }
        ]

        expected = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'programIDs': [
                    'prog_1',
                    'prog_2',
                    'prog_3'
                ]
            },
        ]

        actual = make_hs_program_groups(test_config, test_programs)
        self.assertEqual(expected, actual)

    def test_manyNonOverlappingGroups(self):
        test_config = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'includes': {
                    'programTypes': [
                        'Type A',
                     ] 
                 }
            },
            {
                'groupName': 'B',
                'groupDesc': 'b',
                'includes': {
                    'programTypes': [
                        'Type B',
                     ] 
                 }
            },
        ]

        test_programs = [
            {
                'ID': 'prog_1',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_2',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_3',
                'Program_Type': 'Type B',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'elem_school_program',
                'Program_Type': 'Type A',
                'Primary_Category': 'ES'
            }
        ]

        expected = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'programIDs': [
                    'prog_1',
                    'prog_2'
                ]
            },
            {
                'groupName': 'B',
                'groupDesc': 'b',
                'programIDs': [
                    'prog_3',
                ]
            },
        ]
        # should return json with many groups with group's programs

        actual = make_hs_program_groups(test_config, test_programs)
        self.assertEqual(expected, actual)

    def test_manyOverlappingGroups(self):
        # shoud log warning to console
        # should return json with many groups with overlapping programs
        test_config = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'includes': {
                    'programTypes': [
                        'Type A',
                        'Type B'
                     ] 
                 }
            },
            {
                'groupName': 'B',
                'groupDesc': 'b',
                'includes': {
                    'programTypes': [
                        'Type B',
                     ] 
                 }
            },
        ]

        test_programs = [
            {
                'ID': 'prog_1',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_2',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_3',
                'Program_Type': 'Type B',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'elem_school_program',
                'Program_Type': 'Type A',
                'Primary_Category': 'ES'
            }
        ]

        expected = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'programIDs': [
                    'prog_1',
                    'prog_2',
                    'prog_3'
                ]
            },
            {
                'groupName': 'B',
                'groupDesc': 'b',
                'programIDs': [
                    'prog_3',
                ]
            },
        ]

        actual = make_hs_program_groups(test_config, test_programs)
        self.assertEqual(expected, actual)
    
    def test_singleGroupMissingHSPrograms(self):
        # shoud log warning to console
        # should return json with single group with group's programs
        test_config = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'includes': {
                    'programTypes': [
                        'Type A',
                     ] 
                 }
            },
        ]

        test_programs = [
            {
                'ID': 'prog_1',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_2',
                'Program_Type': 'Type A',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'prog_3',
                'Program_Type': 'Type B',
                'Primary_Category': 'HS'
            },
            {
                'ID': 'elem_school_program',
                'Program_Type': 'Type A',
                'Primary_Category': 'ES'
            }
        ]

        expected = [
            {
                'groupName': 'A',
                'groupDesc': 'a',
                'programIDs': [
                    'prog_1',
                    'prog_2',
                ]
            },
        ]

        actual = make_hs_program_groups(test_config, test_programs)
        self.assertEqual(expected, actual)

if __name__ == '__main__':
    unittest.main()

