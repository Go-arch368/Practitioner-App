"use client";

const Footer = () => {
  return (
    <footer
      className="w-full fixed bottom-0 left-0 text-center bg-white py-2 shadow-md"
    >
      <p>
        Claritev &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
