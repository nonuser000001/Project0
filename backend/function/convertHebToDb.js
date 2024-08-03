const convertHebToDb = function convertHebToDb(req) {
  if (req.body.kshirot === "כשיר") {
    req.body.kshirot = "1";
  } else if (req.body.kshirot === "לא כשיר") {
    req.body.kshirot = "0";
  } else {
    res.sendStatus(415);
  }
  return req;
};

module.exports = convertHebToDb;
