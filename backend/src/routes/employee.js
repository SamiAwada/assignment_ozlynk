const router = require("express").Router();
const dbConnection = require("../db/dbConnect");

// router.get("/getAll", async (req, res) => {
//   try {
//     let call;
//     const { pageSize = 10, pageNumber = 1 } = req.query;
//     call = await dbConnection.connect();
//     const query = `SELECT * FROM public.employees LIMIT ${pageSize} OFFSET ${
//       (pageNumber - 1) * pageSize
//     } `;
//     call = await dbConnection.query(query);
//     if (call.rows && call.rows.length !== 0) {
//       const { rows } = call;
//       res.status(200).send({ rows });
//     } else {
//       res.status(200).send({ msg: "No Employees Found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ msg: error });
//   }
// });

router.get("/getEmployees", async (req, res) => {
  let client;
  try {
    let call;
    let { search, pageNumber, pageSize } = req.query;
    client = await dbConnection.connect();
    const query = `SELECT * , count(*) OVER() AS full_count FROM public.employees WHERE "name" LIKE '%${search}%' LIMIT ${pageSize} OFFSET ${
      (pageNumber - 1) * pageSize
    } `;

    call = await dbConnection.query(query);
    
    if (call.rows && call.rows.length !== 0) {
      const { rows } = call;
      res.status(200).send({ rows });
    }else {
      res.status(200).send({ rows: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  } finally{
    client.release()
  }
});

router.post("/add", async (req, res) => {
  let client;
  try {
    let call;
    const { name, email, phoneNumber, salary } = req.body;

    client = await dbConnection.connect();
    const checkQuery = `SELECT * FROM public.employees WHERE "email" LIKE '${email}'`;
    const query = `INSERT INTO public.employees(name, email, phonenumber, salary) VALUES('${name}', '${email}', ${phoneNumber}, ${salary});`;
    call = await dbConnection.query(checkQuery);

    if (call.rowCount) {
      res.status(200).json({ msg: "! Email Must Be Unique", warning: true });
    } else {
      call = await dbConnection.query(query);
      console.log("RES : ", call.rows);
      res.status(200).json({ msg: "Employee Added Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Somthing went wrong!!!" });
  }finally{
    client.release(client);

  }
});

router.patch("/update", async (req, res) => {
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
    const { id } = req.query;
    console.log(req.query);

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
