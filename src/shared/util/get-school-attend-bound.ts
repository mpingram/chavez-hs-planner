declare const require: any;
const schoolGeometryTable = require("../../../src/shared/data/school_geometry_table_small.json");

const getSchoolAttendBound = (schoolID: string) => {
  return schoolGeometryTable[schoolID];
};

export default getSchoolAttendBound;
