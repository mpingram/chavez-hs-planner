from os import path
import json
import sys

def reduce_precision(geojson_obj, precision):

    def set_precision(coords, precision):
        result = []
        # coords are nested four levels deep
        coords = coords[0][0]
        for coord_pair in coords:
            new_coord_pair = [ 
                    round(coord_pair[0], int(precision)),
                    round(coord_pair[1], int(precision))
                ]
            # if the new coordinate pair is the same as the
            # previous coord pair, don't include the new pair
            # in the result. 
            # This has  the effect of avoiding repeated coordinates.
            if len(result) == 0 or  result[-1] != new_coord_pair:
                result.append(new_coord_pair)

        return result

    def process_features(features, precision):
        for feature in features:
            coords = set_precision(feature['geometry']['coordinates'], precision)
            feature['geometry']['coordinates'] = coords
            yield feature

    geojson_features = geojson_obj["features"]
    return {
                'type': 'FeatureCollection',
                'features': list(process_features(geojson_features, precision))
            }

# takes geojson and returns a simplified json file, with attendance bound geometries keyed
# on school id.
def make_school_geometry_table(hs_geojson_file, es_geojson_file, output_file):
    COORDINATE_DECIMAL_PRECISION = 3

    output = {}

    hs_geojson = reduce_precision(json.load(hs_geojson_file), COORDINATE_DECIMAL_PRECISION) 
    es_geojson = reduce_precision(json.load(es_geojson_file), COORDINATE_DECIMAL_PRECISION) 

    # each elem in "features" array is one school.
    # combine the features in hs_geojson and es_geojson to get all schools.
    schools = hs_geojson["features"] + es_geojson["features"]
    for school in schools:
        # we want the school ID and the array of points in the school's
        # attend bound, nothing else
        school_id = school["properties"]["school_id"]
        school_geo = school["geometry"]["coordinates"]

        # write the geo to the output json file, keyed on school id
        output[school_id] = school_geo

    json.dump(output, output_file, separators=(",", ":"))


if __name__ == "__main__":

    hs_geojson_path = sys.argv[1]
    es_geojson_path = sys.argv[2]
    output_path = sys.argv[3]

    with open(hs_geojson_path, "r") as hs_geojson_file:
        with open(es_geojson_path, "r") as es_geojson_file:
            with open(output_path, "w") as output_file:

                make_school_geometry_table(
                        hs_geojson_file, 
                        es_geojson_file, 
                        output_file)

