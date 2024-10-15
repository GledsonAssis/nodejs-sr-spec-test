export const requestInputSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    payload: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
      required: ["name", "email"],
    },
  },
  required: ["id"],
  additionalProperties: false,
};
