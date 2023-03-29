import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Pagination } from "flowbite-react";
import { DataTable } from "../../components/index";

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Breadcrumb aria-label="   example" className="py-3 px-5 ">
            <Breadcrumb.Item href="#" className="text-blue-400">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-blue-400">
              Employees
            </Breadcrumb.Item>
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
