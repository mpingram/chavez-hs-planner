const schema = {
  id: "/TractTierTable",
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  required: true,
  patternProperties: {
    /* This regex matches census tracts. */
    "^\d+\.?\d*$": {
      type: "string",
      required: true
  }
};

module.exports = schema;
