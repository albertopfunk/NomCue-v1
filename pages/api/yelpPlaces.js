import fetch from "isomorphic-unfetch";
import validParams from "../../data/validParams";

export default async (req, res) => {
  const { location, id } = JSON.parse(req.body);

  if (!validParams[id]) {
    return res
      .status(400)
      .json({ message: `${id} is not a valid param`, errType: "USER_ERROR" });
  }

  const url = `${process.env.YELP_URL}?location=${location}&radius=40000&categories=${id}&limit=50`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`
    }
  };

  try {
    const resp = await fetch(url, options);
    const categories = await resp.json();

    if (resp.status !== 200) {
      const { error } = categories;

      return res.status(resp.status).json({
        message: "unable to retrieve Yelp places",
        errType: error && error.code ? error.code : "UNK_YELP_ERR"
      });
    }

    res.send(categories);
  } catch (error) {
    res.status(500).json({
      message: "unable to retrieve Yelp places",
      errType: "SERVER_ERR"
    });
  }
};
