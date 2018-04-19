declare const require: any;
const schoolGeometryTable = require("../../../src/shared/data/school-geometry-table.json");

const getSchoolAttendBound = (schoolID: string) => {
  return schoolGeometryTable[schoolID];
};

export default getSchoolAttendBound;
