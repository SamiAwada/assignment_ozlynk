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
            <div className="flex items-center justify-between my-4 ml-3">
              <label for="table-search" className="sr-only">
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
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <DataTable />
            <div className="flex items-center justify-end text-center p-4">
              <Pagination
                currentPage={1}
                layout="pagination"
                // onPageChange={onPageChange}
                showIcons={true}
                totalPages={1000}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
