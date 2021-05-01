const fetch = require("cross-fetch");
const { response } = require("express");
const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q=";

const getArtworks = async (req, res = response) => {
  const { keyword } = req.params;

  try {
    const resp = await fetch(
      `${AIC_URL}${keyword}&limit=15&fields=id,title,image_id,date_display,artist_display,place_of_origin,medium_display`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    const { data = [] } = await resp.json();
    const dataWithUrls = data.map((image) => ({
      ...image,
      image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
    }));

    res.json(dataWithUrls);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getArtworks,
};
