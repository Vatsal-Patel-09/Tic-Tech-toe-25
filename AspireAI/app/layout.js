// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "sonner";
// import Header from "@/components/header";
// import { ThemeProvider } from "@/components/theme-provider";
// import { dark } from "@clerk/themes";
// import ChatBot from "@/components/chatbot";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "AI Career Coach",
//   description: "",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//       }}
//     >
//       <html lang="en" suppressHydrationWarning>
//         <head>
//           <link rel="icon" href="/logo-white.png" sizes="any" />
//         </head>
//         <body className={`${inter.className}`}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="light"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <Header />
//             <main className="min-h-screen">{children}</main>
//             <Toaster richColors />
//             <ChatBot /> {/* The chat widget appears on every page */}


//             <footer className="bg-muted/50 py-12">
//               <div className="container mx-auto px-4 text-center">
//                 {/* Title and Team Members */}
//                 <div className="mb-6">
//                   <h3 className="text-2xl font-bold text-gray-800">Made by The Overfitters:</h3>
//                   <p className="mt-2 text-gray-600 text-lg">
//                     vatsal <span className="mx-2">|</span>
//                     prince <span className="mx-2">|</span>
//                     arya <span className="mx-2">|</span>
//                     janavi <span className="mx-2">|</span>
//                     jay
//                   </p>
//                 </div>

//                 {/* Social Media Icons */}
//                 <div className="flex justify-center space-x-6 mb-6">
//                   {/* Twitter */}
//                   <a
//                     href="https://twitter.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-500 hover:text-gray-600"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.73 1.04 4.27 4.27 0 0 0-7.27 3.9 12.13 12.13 0 0 1-8.8-4.47 4.27 4.27 0 0 0 1.32 5.7 4.26 4.26 0 0 1-1.93-.54v.06a4.28 4.28 0 0 0 3.43 4.18 4.3 4.3 0 0 1-1.92.07 4.28 4.28 0 0 0 4 2.98A8.56 8.56 0 0 1 2 18.57a12.07 12.07 0 0 0 6.54 1.92c7.85 0 12.14-6.5 12.14-12.14 0-.18-.01-.35-.02-.53A8.66 8.66 0 0 0 24 4.56a8.46 8.46 0 0 1-2.54.7z" />
//                     </svg>
//                   </a>

//                   {/* GitHub */}
//                   <a
//                     href="https://github.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-500 hover:text-gray-600"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.84 10.95c.57.1.78-.25.78-.55 0-.27-.01-1.02-.02-2-3.19.69-3.87-1.38-3.87-1.38-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.06 11.06 0 0 1 2.89-.39 11.06 11.06 0 0 1 2.89.39c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.09 0 4.44-2.69 5.41-5.26 5.69.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .31.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
//                     </svg>
//                   </a>

//                   {/* LinkedIn */}
//                   <a
//                     href="https://linkedin.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-500 hover:text-gray-600"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.77 0 5-2.24 5-5v-14c0-2.76-2.23-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.31-.03-3-1.82-3-1.82 0-2.1 1.42-2.1 2.89v5.61h-3v-10h2.88v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.59z" />
//                     </svg>
//                   </a>
//                 </div>

//                 {/* Copyright */}
//                 <p className="text-sm text-gray-500">
//                   &copy; {new Date().getFullYear()} The Overfitters. All rights reserved.
//                 </p>
//               </div>
//             </footer>

//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


///

// layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import ChatBot from "@/components/ChatBot"; // Import the ChatBot component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: light,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo-white.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <ChatBot /> {/* The chat widget appears on every page */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center">
                {/* Title and Team Members */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Made with 💗</h3>
                  {/*<p className="mt-2 text-gray-600 text-lg">
                    Vatsal <span className="mx-2">|</span>
                    Prince <span className="mx-2">|</span>
                    Arya <span className="mx-2">|</span>
                    Janavi <span className="mx-2">|</span>
                    Jay
                  </p>*/}
                </div>
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-6">
                  {/* Social media icons go here */}
                </div>
                {/* Copyright */}
                {/*<p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} The Overfitters. All rights reserved.
                </p>*/}
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()}All rights reserved.
                </p>
              </div>
            </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
