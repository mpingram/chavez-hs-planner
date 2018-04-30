const schema = {
  id: "/SchoolAttendanceBoundaryTable",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  required: true,
  patternProperties: {
    /* This regex matches school IDs. */
    "^\d+$": {
      type: "array",
      required: true,
      items: {
        type: "array",
        required: true,
        length: 2,
        items: {
          type: "number",
          required: true
        }
      }
    }
  }

};

module.exports = schema;
