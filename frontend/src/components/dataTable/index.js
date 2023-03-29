import {
  Button,
  Label,
  Modal,
  Pagination,
  Spinner,
  Table,
  TextInput
} from "flowbite-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axios-instance";
import { handleAlert } from "../../store/reducers/alert";
import { Formik } from "formik";
import * as Yup from "yup";

const tableColumns = ["Id", "Name", "Email", "Phone Number", "Salary"];
const updateEmployeeSchema = Yup.object({
  salary: Yup.number("must be number").required("Required"),
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phoneNumber: Yup.number("").required("Required"),
  salary: Yup.number("").required("Required")
});

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  const failureAlert = (error) =>
    dispatch(handleAlert({ type: "failure", msg: error.msg || error.name }));

  const getAllEmployees = (pageNumber, pageSize) => {
    axiosInstance
      .get("/employee/getAll")
      .then((res) => {
        const { data } = res;
        if (data) {
          const { rows } = data;
          setTableData(rows);
          setLoaded(true);
        } else {
          setLoaded(false);
        }
      })
      .catch((err) => {
        failureAlert(err);
      });
  };

  const deleteEmployee = (id) => {
    axiosInstance
      .delete(`employee/delete?id=${id}`)
      .then(({ data }) => {
        dispatch(handleAlert({ type: "success", msg: data.msg }));
        searchForEmployee(search, pageNumber);
      })
      .catch((error) => {
        failureAlert(error);
      });
  };

  const updateEmployee = (selectedRow) => {
    axiosInstance
      .patch("/employee/update", selectedRow)
      .then((res) => {
        dispatch(handleAlert({ type: "success", msg: res.data.msg }));
        searchForEmployee(search, pageNumber);
      })
      .catch((error) => {
        console.log(error);
        failureAlert(error);
      });
  };

  const searchForEmployee = (search = "", pageNumber = 1, pageSize = 10) => {
    setLoaded(false);
    axiosInstance
      .get(
        `/employee/getEmployees?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then(({ data }) => {
        const { rows = [] } = data;
        if (data) {
          if (data.rows.length !== 0) {
            console.log("fullCount : ", +rows[0].full_count);
            setTotalPages(Math.ceil(+rows[0].full_count / pageSize));
          } else {
            setTotalPages(2);
          }
          setTableData(rows);
          setLoaded(true);
        } else {
          setTotalPages(1);
          setTableData(rows);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
        setLoaded(true);
        failureAlert(err);
      });
  };
  useEffect(() => {
    searchForEmployee(search, pageNumber);
    return () => {};
  }, [search, pageNumber]);

  return (
    <Fragment>
      <div className="flex items-center justify-between my-4 ml-3">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="relative h-[400px] overflow-y-scroll">
        <Table
          hoverable={true}
          style={{ height: "400px !important" }}
          className=" overflow-y-scroll"
        >
          <Table.Head>
            {tableColumns.map((col, i) => {
              return (
                <Table.HeadCell
                  key={"" + col + i}
                  className={i === 0 ? "!p-4 !pr-1" : ""}
                >
                  {col}
                </Table.HeadCell>
              );
            })}
            <Table.HeadCell>
              <span className="sr-only ml-3">Edit</span>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className=" relative divide-y w-full  overflow-y-scroll">
            {loaded ? (
              tableData.length !== 0 ? (
                tableData.map(({ id, name, email, phonenumber, salary }, i) => {
                  return (
                    <Table.Row
                      key={phonenumber + i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 "
                    >
                      <Table.Cell className="!p-4 !pr-1">{id}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white capitalize">
                        {name}
                      </Table.Cell>
                      <Table.Cell>{email}</Table.Cell>
                      <Table.Cell>{phonenumber}</Table.Cell>
                      <Table.Cell>${salary}</Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => {
                            setSelectedRow({
                              id,
                              name,
                              email,
                              phonenumber,
                              salary
                            });
                            setShowModal(true);
                          }}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          className="font-medium text-blue-600 hover:underline dark:text-red-500"
                          onClick={() => deleteEmployee(id)}
                        >
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell className="!p-4 !pr-1">
                    <p className="font-sm">*</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap   ">
                    <p className="font-sm">No data founded</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="font-sm">No data founded</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="font-sm">No data founded</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="font-sm">No data founded</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="font-sm">No data founded</p>
                  </Table.Cell>
                </Table.Row>
              )
            ) : (
              <Fragment>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="animate-pulse bg-white  dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="!p-4 !pr-1 invisible">1</Table.Cell>
                  <Table.Cell className="invisible whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    Name
                  </Table.Cell>
                  <Table.Cell className="invisible">Name@gmail.com</Table.Cell>
                  <Table.Cell className="invisible">00000000</Table.Cell>
                  <Table.Cell className="invisible">0000</Table.Cell>
                  <Table.Cell className="invisible">
                    <button
                      onClick={() => {}}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-red-500"
                      onClick={() => {}}
                      disabled
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Fragment>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex items-center justify-end text-center p-4">
        <Pagination
          currentPage={pageNumber}
          layout="pagination"
          onPageChange={(number) => {
            setPageNumber(number);
          }}
          showIcons={false}
          totalPages={+totalPages}
        />
      </div>
      <Modal
        show={showModal}
        dismissible={true}
        onClose={() => setShowModal(false)}
        className="bg-gray-900"
        size={"sm"}
      >
        <Modal.Header className="bg-gray-900 capitalize">
          Edit Employee {selectedRow.name || ""} Info
        </Modal.Header>
        <Modal.Body className="bg-gray-900">
          <div className=" text-black  rounded-lg bg-gray-900  ">
            <Formik
              initialValues={{
                id: selectedRow.id || "",
                name: selectedRow.name || "",
                email: selectedRow.email || "",
                phoneNumber: selectedRow.phonenumber || "",
                salary: selectedRow.salary || ""
              }}
              enableReinitialize
              validationSchema={updateEmployeeSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values : ", values);
                for (const [key, value] of Object.entries(values)) {
                  console.log(`${key}: ${value}`);
                }

                setTimeout(() => {
                  setShowModal(false);
                  updateEmployee(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col items-stretch"
                >
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Full Name" />
                      {formik.touched.name && formik.errors.name ? (
                        <span className="text-sm  font-bold text-red-400">
                          {" * " + formik.errors.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <TextInput
                      id="name"
                      type="text"
                      placeholder="jack jony"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("name")}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phoneNumber" value="Phone Number" />
                      {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        <span className="text-sm  font-bold text-red-400">
                          {" * " + formik.errors.phoneNumber}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <TextInput
                      id="phoneNumber"
                      type="number"
                      placeholder="71283827"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                      {formik.touched.email && formik.errors.email ? (
                        <span className="text-sm  font-bold text-red-400">
                          {" * " + formik.errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <TextInput
                      id="email"
                      type="text"
                      formNoValidate={true}
                      placeholder="jack100@gmail.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="salary" value="Salary" />
                      {formik.touched.salary && formik.errors.salary ? (
                        <span className="text-sm  font-bold text-red-400">
                          {" * " + formik.errors.salary}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <TextInput
                      id="salary"
                      type="number"
                      formNoValidate={true}
                      placeholder="900"
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("salary")}
                    />
                  </div>
                  <div className="flex gap-4 text-gray-200 text-md my-4 w-fit  py-2  rounded-xl">
                    <Button type={"submit"}>Submit</Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      Decline
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Index;
