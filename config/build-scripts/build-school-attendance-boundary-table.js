const fs = require("fs");

/**
 * buildSchoolAttendanceBoundTable takes as input a geoJSON object which
 * describes the attendance boundaries of CPS programs.
 *
 * The function takes a second optional paramter, coordinatePrecision,
 * which is an integer specifying the number of decimal places that the 
 * geocoordinates of the output should be precise to. If no argument is
 * passed to coordinatePrecision, the precision of the coordinates is not
 * adjusted from the original geoJSON file.
 *
 * The function outputs a javascript object of the shape:
 * {
 *    [schoolID: string]: [number, number][] 
 * }
 * The array of number pairs represents the geometry of the school's attendance
 * boundary.
 * */
function buildSchoolAttendanceBoundTable(attendBoundGeojson, coordinatePrecision) {
  // if coordinate precision is specified, reduce precision of coordinates
  // of each geojson object
  if (coordinatePrecision !== undefined) {
    reduceGeojsonPrecision(attendBoundGeojson, coordinatePrecision);
  }
  
  let output = {};
  // Each feature in the geoJSON object's 'features' property describes
  // one school.
  const schools = attendBoundGeojson.features;
  // Add the school's geometry to the output object keyed by school ID.
  schools.forEach( school => {
    output[school.properties.school_id] = school.geometry.coordinates;
  });

  return output;
}

/*
 * Reduces precision of the coordinates in a geojson object.
 * NOTE: mutates the original geojson object.
 * */
function reduceGeojsonPrecision(geojson, decimalPrecision) {

  function setPrecision(coords, precision) {
    // coords are nested 4 levels deep
    coords = coords[0][0];
    coords = coords.map( coordPair => [
        Math.round(coordPair[0], precision), 
        Math.round(coordPair[1], precision)
      ] 
    );
    // remove any repeated coordinates that may have been
    // created by reducing precision
    coords = coords.filter( (coordPair, i, arr) => {
      if (i > 0) {
        const prevCoordPair = arr[i - 1];
        if (prevCoordPair[0] === coordPair[0] && prevCoordPair[1] === coordPair[1]) {
          return false;
        } else {
          return true;
        }
      }
    } );
    return coords;
  }

  // iterate through the geojson coordinates and reduce their precision
  const features = geojson["features"];
  geojson["features"] = features.map( feature => {
    const coords = feature["geometry"]["coordinates"];
    feature["geometry"]["coordinates"] = setPrecision(coords, decimalPrecision);
    return feature;
  });
}

module.exports = buildSchoolAttendanceBoundTable;
