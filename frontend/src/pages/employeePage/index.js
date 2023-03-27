import React from "react";
 import { Formik } from "formik";
 import * as Yup from "yup";
 import { Label, TextInput } from "flowbite-react";
 import axiosInstance from "../../axios-instance";

 const addEmployeeSchema = Yup.object({
   name: Yup.string()
     .max(15, "Must be 15 characters or less")
     .required("Required"),
   email: Yup.string().email("Invalid email address").required("Required"),
   phoneNumber: Yup.number("").required("Required"),
   salary: Yup.number("").required("Required")
 });

 const index = () => {
   return (
     <div className="relative w-full h-full">
       <div className="p-4 sm:ml-64">
         <div className="p-4 border-2 text-black  rounded-lg bg-gray-900  mt-14">
           <Formik
             initialValues={{
               name: "",
               email: "",
               phoneNumber: "",
               salary: ""
             }}
             validationSchema={addEmployeeSchema}
             validateOnChange={false}
             validateOnBlur={false}
             onSubmit={(values, { setSubmitting }) => {
               console.log("values : ", values);
               setTimeout(() => {
                 axiosInstance
                   .post("/employee/add", values)
                   .then((res) => {
                     console.log("RES : ", res);
                   })
                   .catch((err) => {
                     console.log("ERROR : ", err.name);
                   });
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
                     {...formik.getFieldProps("salary")}
                   />
                 </div>
                 <div className="text-gray-200 text-md my-4 w-fit bg-gray-700 hover:bg-gray-600 transition p-2 px-4 rounded-xl">
                   <button type="submit  self-start dark:bg-gray-300">
                     Submit
                   </button>
                 </div>
               </form>
             )}
           </Formik>
         </div>
       </div>
     </div>
   );
 };

export default index;
