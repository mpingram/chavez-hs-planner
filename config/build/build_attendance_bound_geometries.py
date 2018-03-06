from os import path
import json
import sys

def make_school_geometry_table(cps_attend_bound_geojson_file, output_file):
    output = {}
    geojson = json.load(cps_attend_bound_geojson_file) 
    # each elem in "features" array is one school
    schools = geojson["features"]
    for school in schools:
        # we want the school ID and the array of points in the school's
        # attend bound, nothing else
        school_id = school["properties"]["school_id"]
        school_geo = school["geometry"]["coordinates"][0][0]

        output[school_id] = school_geo

    json.dump(output, output_file)

if __name__ == "__main__":
    path_to_attend_bound_geojson = sys.argv[1]
    path_to_output = path.abspath(path.join(__file__, "../..", "data", "school_geometry_table.json"))

    with open(path_to_attend_bound_geojson, "r") as f:
        with open(path_to_output, "w") as outf:
            make_school_geometry_table(f, outf)

