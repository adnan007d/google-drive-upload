import { Stream } from "stream";
import { driveService } from "../util/gdrive";
import { config } from "dotenv";
import { Handler } from "express";

config();

const uploadFile = async (file: Express.Multer.File) => {
  const fileMetaData = {
    name: "file",
    parents: [process.env.GD_FOLDER_ID!], // ID of the folder
  };

  const bufferStream = new Stream.PassThrough();
  bufferStream.end(file?.buffer);

  const media = {
    mimeType: file?.mimetype,
    body: bufferStream,
  };

  try {
    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: "*",
    });
    return response.data.webContentLink;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const addResponse: Handler = async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;

  if (!file) return res.json({ message: "No file uploaded" });

  const fileLink = await uploadFile(file);

  if (!fileLink) return res.json({ message: "Error uploading file" });

  // Do something with the fileLink
  res.json({ name, email, message, fileLink });
};

export { addResponse };
