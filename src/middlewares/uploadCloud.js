import upload from "@/services/cloudDinary";

export const uploadCloud = (type) => {
  return async (req, res, next) => {
    try {
      if (req.file) {
        const result = await upload(req.file.buffer, type);
        req.body[req.file.fieldname] = result.url;
        req.body.duration = result.duration;
      }
      next();
    } catch (error) {
      console.error("Error in middleware:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  };
};
