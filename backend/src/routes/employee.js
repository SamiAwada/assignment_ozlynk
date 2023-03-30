const router = require("express").Router();
const dbConnection = require("../db/dbConnect");

router.get("/getEmployees", async (req, res) => {
  let call;
  let client;
  try {
    let { search, pageNumber, pageSize } = req.query;
    client = await dbConnection.connect();
    const query = `SELECT * , count(*) OVER() AS full_count FROM public.employees WHERE "name" LIKE '%${search}%' LIMIT ${pageSize} OFFSET ${
      (pageNumber - 1) * pageSize
    } `;

    call = await dbConnection.query(query);

    if (call.rows && call.rows.length !== 0) {
      const { rows } = call;
      res.status(200).send({ rows });
    } else {
      res.status(200).send({ rows: [] });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  } finally {
    client.release();
  }
});

router.post("/add", async (req, res) => {
  let call;
  let client;

  try {
    const { name, email, phoneNumber, salary } = req.body;
    const checkQuery = `SELECT * FROM public.employees WHERE "email" LIKE '${email}'`;
    const query = `INSERT INTO public.employees(name, email, phonenumber, salary) VALUES('${name}', '${email}', ${phoneNumber}, ${salary});`;

    client = await dbConnection.connect();
    call = await client.query(checkQuery);

    if (call.rowCount) {
      res.status(200).json({ msg: "! Email Must Be Unique", warning: true });
    } else {
      call = await client.query(query);
      res.status(200).json({ msg: "Employee Added Successfully" });
    }
  } catch (error) {
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  } finally {
    client.release();
  }
});

router.patch("/update", async (req, res) => {
  let call;
  let client;
  try {
    const { id, name, email, phoneNumber, salary } = req.body;
    const text = `UPDATE public.employees SET name = '${name}', email = '${email}', phonenumber = '${phoneNumber}', salary = '${salary}' WHERE "id" = ${id}`;
    
    client = await dbConnection.connect();
    call = await client.query(text);

    res.status(200).json({ msg: "Employee Updated Successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }finally{
    client.release();
  }
});

router.delete("/delete", async (req, res) => {
  let call;
  let client;
  try {
    const { id } = req.query;
    const text = `DELETE FROM public.employees WHERE id = $1`;

    client = await dbConnection.connect();


    call = await client.query(text, [id]);

    res
      .status(200)
      .json({ msg: `Employee with id: ${id} Deleted Successfully` });

  } catch (error) {
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }finally{
    client.release();

  }
});

module.exports = router;
