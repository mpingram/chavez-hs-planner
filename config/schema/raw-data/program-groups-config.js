const schema = {
  id: "/ProgramGroupsConfig",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "array",
  items: {
    type: "object",
    properties: {
      "groupName": "string",
      "groupDesc": "string",
      "programIDs": {
        type: "array",
        items: {
          type: "string"
        }
      }
    }
  }
};

module.exports = schema;
