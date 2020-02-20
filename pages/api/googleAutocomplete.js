import fetch from "isomorphic-unfetch";


export default async (req, res) => {
  const { value } = JSON.parse(req.body);
  const key = process.env.GOOGLE_KEY;
  const url = `${process.env.GOOGLE_PLACES_URL}/json?input=${value}&types=(cities)&key=${key}`;

  try {
    const resp = await fetch(url);
    const categories = await resp.json();
    
    if (resp.status !== 200) {
      const { error } = categories;

      return res.status(resp.status).json({
        message: "unable to retrieve Google places",
        errType: error && error.code ? error.code : "UNK_GOOGLE_ERR"
      });
    }

    res.send(categories);
  } catch (error) {
    res.status(500).json({
      message: "unable to retrieve Google places",
      errType: "SERVER_ERR"
    });
  }
};
