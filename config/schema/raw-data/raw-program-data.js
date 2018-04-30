const schema = {
  id: "/RawProgramData",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "array",
  items: {
    type: "object",
    properties: {
      "School_ID": "string",
      "Short_Name": "string",
      "Long_Name": "string",
      "School_Type": "string",
      "Primary_Category": "string",
      "Address": "string",
      "City": "string",
      "State": "string",
      "Zip": "string",
      "Phone": "string",
      "Fax": "string",
      "CPS_School_Profile": "string",
      "Website": "string",
      "Program_Type": "string",
      "Application_Requirements": "string",
      "Program_Selections": "string",
      "Deadline": "string",
      "School_Latitude": "string",
      "School_Longitude": "string",
    },
  }
};

module.exports = schema;
