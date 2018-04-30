const schema = {
  id: "/ProgramData",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "array",
  items: {
    type: "object",
    properties: {
      "id": "string",
      "programName": "string",
      "programType": "string",

      "schoolNameShort": "string",
      "schoolNameLong": "string",
      "schoolID": "string",
      "schoolLocation": {
        type: "object",
        properties: {
          "latitude": "number",
          "longitude": "number"
        }
      },

      "category": "string",
      "cpsPageURL": "string",
      "hsBoundURL": "string",
      "schoolPageURL": "string",

      "applicationReqDescription": "string",
      "selectionReqDescription": "string",

      "applicationReqFnID": "string",
      "selectionReqFnID": "string",
    }
  }
};

module.exports = schema;
