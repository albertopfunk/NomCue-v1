export default async (req, res) => {
  const { id } = JSON.parse(req.body);
  const key = process.env.GOOGLE_KEY;
  const url = `${process.env.GOOGLE_GIO_URL}/json?placeid=${id}&fields=geometry&key=${key}`;

  try {
    const resp = await fetch(url);
    const locationGio = await resp.json();

    if (resp.status !== 200) {
      const { error } = locationGio;

      return res.status(resp.status).json({
        message: "unable to retrieve place GIO",
        errType: error && error.code ? error.code : "UNK_GOOGLE_ERR",
      });
    }

    res.send(locationGio.result.geometry.location);
  } catch (error) {
    res.status(500).json({
      message: "unable to retrieve place GIO",
      errType: "SERVER_ERR",
    });
  }
};
