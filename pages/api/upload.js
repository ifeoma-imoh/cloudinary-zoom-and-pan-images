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
        effect: "zoompan:from_(zoom_1;x_300;y_100);to_(zoom_4;x_950;y_800)",
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
