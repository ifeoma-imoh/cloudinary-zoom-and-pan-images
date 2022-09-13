const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  try {
    await cloudinary.uploader.upload(req.body.image, (error, result) => {
      const response = cloudinary.video(`${result.public_id}`, {
        effect: "zoompan:mode_ztl;maxzoom_2.4;du_8",
        resource_type: "image",
      });
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
