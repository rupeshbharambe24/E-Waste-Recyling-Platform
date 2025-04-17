// pages/api/infer.ts

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { InferenceHTTPClient } from "@roboflow/inference";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CLIENT = new InferenceHTTPClient({
  apiUrl: "https://serverless.roboflow.com",
  apiKey: "LeVJV7g8An9WV2evAE5g",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "Image upload failed." });
    }

    const file = files.file as formidable.File;

    try {
      const result = await CLIENT.infer(file.filepath, "e-waste-c8eii/3");
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ error: "Model inference failed", details: e });
    }
  });
}
