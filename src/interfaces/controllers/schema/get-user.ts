export const requestInputSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
  required: ["id"],
  additionalProperties: false,
};
