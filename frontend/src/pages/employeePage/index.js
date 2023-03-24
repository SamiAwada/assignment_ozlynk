import React from "react";
 import { Formik, Field, Form, ErrorMessage } from "formik";
 import * as Yup from "yup";
 import { Label, TextInput } from "flowbite-react";

 const addEmployeeSchema = Yup.object({
   firstName: Yup.string()
     .max(15, "Must be 15 characters or less")
     .required("Required"),
   lastName: Yup.string()
     .max(20, "Must be 20 characters or less")
     .required("Required"),
   email: Yup.string().email("Invalid email address").required("Required"),
   phoneNumber: Yup.number("").required("Required")
 });

 const index = () => {
   return (
     <div className="relative w-full h-full">
       <div className="p-4 sm:ml-64">
         <div className="p-4 border-2 text-black  rounded-lg bg-gray-900  mt-14">
           <Formik
             initialValues={{
               firstName: "",
               lastName: "",
               email: "",
               phoneNumber: ""
             }}
             validationSchema={addEmployeeSchema}
             validateOnChange={false}
             onSubmit={(values, { setSubmitting }) => {
               setTimeout(() => {
                 alert(JSON.stringify(values, null, 2));
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
                     <Label htmlFor="firstName" value="First Name" />
                     {formik.touched.firstName && formik.errors.firstName ? (
                       <span className="text-sm  font-bold text-red-400">
                         {" * " + formik.errors.firstName}
                       </span>
                     ) : (
                       ""
                     )}
                   </div>
                   <TextInput
                     id="firstName"
                     type="text"
                     placeholder="jack"
                     required={true}
                     {...formik.getFieldProps("firstName")}
                   />
                 </div>
                 <div>
                   <div className="mb-2 block">
                     <Label htmlFor="lastName" value="Last Name" />
                     {formik.touched.lastName && formik.errors.lastName ? (
                       <span className="text-sm  font-bold text-red-400">
                         {" * " + formik.errors.lastName}
                       </span>
                     ) : (
                       ""
                     )}
                   </div>
                   <TextInput
                     id="lastName"
                     type="text"
                     placeholder="jack"
                     required={true}
                     {...formik.getFieldProps("lastName")}
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
                     required={true}
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
                     type="email"
                     placeholder="jack100@gmail.com"
                     required={true}
                     {...formik.getFieldProps("email")}
                   />
                 </div>
                 <div className="text-gray-200 text-md my-4 w-fit bg-gray-600 p-2 px-4 rounded-xl">
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
