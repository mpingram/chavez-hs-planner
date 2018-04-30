const jsonschema = require("jsonschema");

const rawProgramDataSchema = require("../schema/raw-data/raw-program-data");
const rawAttendanceBoundariesSchema = require("../schema/raw-data/raw-attendance-boundaries");
const tractTierTableConfigSchema = require("../schema/raw-data/tract-tier-table-config");
const programGroupsConfigSchema = require("../schema/raw-data/program-groups-config");

function validateRawProgramData(rawProgramData) {
  return jsonschema.validate(rawProgramData, rawProgramDataSchema);
}

function validateRawAttendanceBoundaries(rawAttendanceBoundaries) {
  return jsonschema.validate(rawAttendanceBoundaries, rawAttendanceBoundariesSchema);
}

function validateTractTierTable(tractTierTableConfig) {
  return jsonschema.validate(tractTierTableConfig, tractTierTableConfigSchema);
}

function validateProgramGroupsConfig(programGroupsConfig) {
  return jsonschema.validate(programGroupsConfig, programGroupsConfigSchema);
}

module.exports = {
  validateRawProgramData,
  validateRawAttendanceBoundaries,
  validateTractTierTable,
  validateProgramGroupsConfig
};
