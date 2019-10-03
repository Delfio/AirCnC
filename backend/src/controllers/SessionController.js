const User = require("../models/User");

//Index, Show, Store, Update, Destroy
module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    } else {
      console.log("Ta repetido parsa"); // net ta ruin
    }

    return res.json(user);
  }
};
