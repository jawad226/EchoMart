// "use client";

// import React, { FC } from "react";
// import { MdHome } from "react-icons/md";

// interface LoginProps {
//   showNewPassword?: boolean;
//   handleRegister: () => void;
//   handleLogin: () => void;
// }

// const Login: FC<LoginProps> = ({
//   showNewPassword = false,
//   handleRegister,
//   handleLogin,
// }) => {
//   if (showNewPassword) {
//     return <showNewPassword />;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
//         {/* Logo */}
//         <div className="flex items-center justify-start mb-8 relative">
//           <span className="border-2 border-gray-700 p-3 bg-gray-200 rounded-full text-3xl text-gray-800">
//             <MdHome />
//           </span>
//           <span className="absolute left-1/9 font-bold bg-gray-900 px-6 py-2 rounded-full text-white">
//             Looks Shop
//           </span>
//         </div>

//         {/* Heading */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-1">
//             Welcome Back
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Log in to continue shopping
//           </p>
//         </div>

//         {/* Form */}
//         <form className="flex flex-col space-y-4">
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
//           />

//           <button
//             type="submit"
//             className="bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-900 transition"
//           >
//             Log In
//           </button>

//           {/* Terms & Forget */}
//           <div className="flex justify-between items-center text-sm text-gray-500">
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="accent-red-500" />
//               <span>Remember me</span>
//             </label>
//             <span className="text-blue-800 cursor-pointer hover:underline">
//               Forget Password?
//             </span>
//           </div>

//           {/* Register link */}
//           <div className="text-center text-gray-500 text-sm">
//             Don't have an account?{" "}
//             <span
//               className="text-blue-800 font-medium cursor-pointer hover:underline"
//               onClick={handleRegister}
//             >
//               Register
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";
import React, { FC, useState } from "react";
import { MdHome } from "react-icons/md";
import Register from "../register/page";
import ForgetPassword from "../forgetpassword/page";
import ResetPassword from "../restpassword/page";


interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | "forget" | "reset">("login");

  const handleRegister = () => setActiveForm("register");
  const handleLogin = () => setActiveForm("login");
  const handleForget = () => setActiveForm("forget");
  const handleReset = () => setActiveForm("reset");

  if (activeForm === "register") return <Register handleLogin={handleLogin} />;
  if (activeForm === "forget") return <ForgetPassword handleLogin={handleLogin} handleReset={handleReset} />;
  if (activeForm === "reset") return <ResetPassword handleLogin={handleLogin} />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-start mb-8 relative">
          <span className="border-2 border-gray-700 p-3 bg-gray-200 rounded-full text-3xl text-gray-800">
            <MdHome />
          </span>
          <span className="absolute left-1/9 font-bold bg-gray-900 px-6 py-2 rounded-full text-white">
            Looks Shop
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Log in to continue shopping</p>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
          />

          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-900 transition"
          >
            Log In
          </button>

          {/* Terms & Forget */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-500" />
              <span>Remember me</span>
            </label>
            <span className="text-blue-800 cursor-pointer hover:underline" onClick={handleForget}>
              Forget Password?
            </span>
          </div>

          {/* Register link */}
          <div className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <span className="text-blue-800 font-medium cursor-pointer hover:underline" onClick={handleRegister}>
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
