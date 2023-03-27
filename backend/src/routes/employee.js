const router = require("express").Router();
const dbConnection = require("../db/dbConnect");

router.post("/add", async (req, res) => {
  try {
    let call;
    const { name, email, phoneNumber, salary } = req.body;

    call = await dbConnection.connect();

    const text = `INSERT INTO public.employees(name, email, phonenumber, salary) VALUES('${name}', '${email}', ${phoneNumber}, ${salary});`;
    console.log("TEXT : ", text);
    call = await dbConnection.query(text);

    console.log("RES : ", call.rows);
    res.status(200).json({ msg: "Employee Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }
});

module.exports = router;
