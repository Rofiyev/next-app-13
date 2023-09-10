import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="text-gray-600 bg body-font flex align-center sticky top-0 z-10 bg-white h-[10vh] font-medium">
      <div className="container mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center">
        <Link href={"/"}>
          <Image src={logo} width={100} height={100} alt="Logo" />
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">
            Home page
          </Link>
          <Link
            href={"/products"}
            className="mr-5 hover:text-gray-900 cursor-pointer"
          >
            All products
          </Link>
          <Link
            href={"/contact"}
            className="mr-5 hover:text-gray-900 cursor-pointer"
          >
            Contact
          </Link>
        </nav>
        <Link href={"/shopping-cart"}>
          <button className=" bg-blue-600 hover:bg-transparent text-white hover:text-black border-[0.5px] hover:border-[1.7px] hover:border-blue-600 transition duration-200 ease-out py-1 px-5 md:px-8 rounded text-base">
            My bag
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
