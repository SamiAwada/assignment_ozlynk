const router = require("express").Router();
const dbConnection = require("../db/dbConnect");

router.get("/getAll", async (req, res) => {
  try {
    let call;
    call = await dbConnection.connect();
    const query = `SELECT * FROM public.employees;`;
    call = await dbConnection.query(query);

    // await dbConnection.release();
    res.status(200).json({ msg: call });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
});

router.get("/getByName/:search", async (req, res) => {
  try {
    let call;
    let { search } = req.params;
    call = await dbConnection.connect();
    console.log(search);
    const query = `SELECT * FROM public.employees WHERE "name" LIKE '%${search}%' `;

    call = await dbConnection.query(query);

    console.log(call.rows);
    // await dbConnection.end();
    console.log(call);
    res.status(200).json({ msg: call.rows });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
});

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

router.put("/update", async (req, res) => {
  try {
    let call;
    const { id, name, email, phoneNumber, salary } = req.body;
    console.log(req.body);

    call = await dbConnection.connect();

    const text = `UPDATE public.employees SET name = '${name}', email = '${email}', phonenumber = '${phoneNumber}', salary = '${salary}' WHERE "id" = ${id}`;
    // console.log("TEXT : ", text);

    call = await dbConnection.query(text);

    console.log("RES : ", call);
    res.status(200).json({ msg: "Employee Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let call;
    const { id } = req.body;
    console.log(req.body);

    call = await dbConnection.connect();

    const text = `DELETE FROM public.employees WHERE id = $1`;
    // console.log("TEXT : ", text);

    call = await dbConnection.query(text, [id]);

    console.log("RES : ", call);
    res
      .status(200)
      .json({ msg: `Employee with id: ${id} Deleted Successfully` });

    // await dbConnection.end();
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }
});

module.exports = router;
