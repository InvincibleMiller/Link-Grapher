import React from "react";

const LandingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <body className="m-0 bg-gray-50 min-h-[100vh] flex flex-col">
      {children}
    </body>
  );
};

export default LandingLayout;
