import { Checkbox, Table } from "flowbite-react";
import { Fragment } from "react";

const tableColumns = ["Name", "Email", "Phone Number", "Salary"];
const tableData = [
  {
    name: "hadi",
    email: "hadi@gmail.com",
    phoneNumber: "81392493",
    salary: "1200"
  },
  {
    name: "jack",
    email: "jack@gmail.com",
    phoneNumber: "81392493",
    salary: "1200"
  },
  {
    name: "ali",
    email: "hadi@gmail.com",
    phoneNumber: "81392493",
    salary: "1200"
  }
];

const index = () => {
  return (
    <Fragment>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className="!p-4">
            <Checkbox />
          </Table.HeadCell>
          {tableColumns.map((col, i) => {
            return <Table.HeadCell key={"" + col + i}>{col}</Table.HeadCell>;
          })}
          <Table.HeadCell>
            <span className="sr-only ml-3">Edit</span>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.map(({ name, email, phoneNumber, salary }, i) => {
            return (
              <Table.Row
                key={phoneNumber + i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {name}
                </Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{phoneNumber}</Table.Cell>
                <Table.Cell>${salary}</Table.Cell>
                <Table.Cell>
                  <button className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3">
                    Edit
                  </button>
                  <button className="font-medium text-blue-600 hover:underline dark:text-red-500">
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default index;
