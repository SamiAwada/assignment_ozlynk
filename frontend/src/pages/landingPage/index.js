import React from "react";
import { Breadcrumb, Pagination } from "flowbite-react";
import { DataTable } from "../../components/index";

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="p-4 sm:ml-64">
        <div className="p-4  mt-14">
          <Breadcrumb
            aria-label="   example"
            className="mb-9 dark:bg-gray-900 rounded-lg  py-3 px-5 "
          >
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-900">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
