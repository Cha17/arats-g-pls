// import Image from "next/image";
// import Link from "next/link";
// import { AuthButtons } from "../components/auth/auth-buttons";
// import Background from "@/components/ui/background";
// import Header from "@/components/ui/header";

// export default function Home() {
//   return (
//     <>
//       <div className="min-h-screen bg-white dark:bg-gray-900">
//         {/* Hero Section */}
//         <Header />
//         <div className="relative isolate px-6 pt-14 lg:px-8">
//           <Background />
//           <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
//                 ARATS-G: Advanced Research Analysis & Tracking System
//               </h1>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 <AuthButtons />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div id="features" className="py-24 sm:py-32">
//           <div className="mx-auto max-w-7xl px-6 lg:px-8">
//             <div className="mx-auto max-w-2xl lg:text-center">
//               <h2 className="text-base font-semibold leading-7 text-blue-600">
//                 Research Made Simple
//               </h2>
//               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//                 Everything you need to manage your research
//               </p>
//               <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
//                 From data collection to analysis, ARATS-G provides all the tools
//                 you need to conduct and manage your research effectively.
//               </p>
//             </div>
//             <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
//               <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
//                 {/* Feature 1 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/file.svg"
//                       alt="Document"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Document Management
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Organize and manage your research documents with our
//                       intuitive file system.
//                     </p>
//                   </dd>
//                 </div>
//                 {/* Feature 2 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/globe.svg"
//                       alt="Collaboration"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Real-time Collaboration
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Work together with your team in real-time, share insights,
//                       and track changes.
//                     </p>
//                   </dd>
//                 </div>
//                 {/* Feature 3 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/window.svg"
//                       alt="Analytics"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Advanced Analytics
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Gain valuable insights with our powerful analytics and
//                       visualization tools.
//                     </p>
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-blue-600">
//           <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
//             <div className="mx-auto max-w-2xl text-center">
//               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                 Ready to transform your research workflow?
//               </h2>
//               <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
//                 Join thousands of researchers who are already using ARATS-G to
//                 streamline their research process.
//               </p>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 {/* <WhiteAuthButton /> */}
//                 <Link
//                   href="#features"
//                   className="text-sm font-semibold leading-6 text-white"
//                 >
//                   Learn more <span aria-hidden="true">→</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { AuthButtons } from "../components/auth/auth-buttons";
// import Background from "@/components/ui/background";
// import Header from "@/components/ui/header";

// export default function Home() {
//   return (
//     <>
//       <div className="min-h-screen bg-white dark:bg-gray-900">
//         {/* Hero Section */}
//         <Header />
//         <div className="relative isolate px-6 pt-14 lg:px-8">
//           <Background />
//           <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
//                 ARATS-G: Advanced Research Analysis & Tracking System
//               </h1>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 <AuthButtons />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div id="features" className="py-24 sm:py-32">
//           <div className="mx-auto max-w-7xl px-6 lg:px-8">
//             <div className="mx-auto max-w-2xl lg:text-center">
//               <h2 className="text-base font-semibold leading-7 text-blue-600">
//                 Research Made Simple
//               </h2>
//               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//                 Everything you need to manage your research
//               </p>
//               <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
//                 From data collection to analysis, ARATS-G provides all the tools
//                 you need to conduct and manage your research effectively.
//               </p>
//             </div>
//             <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
//               <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
//                 {/* Feature 1 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/file.svg"
//                       alt="Document"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Document Management
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Organize and manage your research documents with our
//                       intuitive file system.
//                     </p>
//                   </dd>
//                 </div>
//                 {/* Feature 2 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/globe.svg"
//                       alt="Collaboration"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Real-time Collaboration
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Work together with your team in real-time, share insights,
//                       and track changes.
//                     </p>
//                   </dd>
//                 </div>
//                 {/* Feature 3 */}
//                 <div className="flex flex-col">
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
//                     <Image
//                       src="/window.svg"
//                       alt="Analytics"
//                       width={24}
//                       height={24}
//                       className="h-5 w-5 flex-none text-blue-600"
//                     />
//                     Advanced Analytics
//                   </dt>
//                   <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
//                     <p className="flex-auto">
//                       Gain valuable insights with our powerful analytics and
//                       visualization tools.
//                     </p>
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-blue-600">
//           <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
//             <div className="mx-auto max-w-2xl text-center">
//               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                 Ready to transform your research workflow?
//               </h2>
//               <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
//                 Join thousands of researchers who are already using ARATS-G to
//                 streamline their research process.
//               </p>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 {/* <WhiteAuthButton /> */}
//                 <Link
//                   href="#features"
//                   className="text-sm font-semibold leading-6 text-white"
//                 >
//                   Learn more <span aria-hidden="true">→</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { AuthButtons } from "@/components/auth/auth-buttons";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";

export default function HomePage() {
  const { user, isAuthenticated, isLoading, redirectBasedOnRole } = useAuth();

  useEffect(() => {
    // Auto-redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      redirectBasedOnRole();
    }
  }, [isAuthenticated, user, redirectBasedOnRole]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
  //             <p className="text-gray-600">Loading...</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Background />
      <Header />
    </>
  );
}
