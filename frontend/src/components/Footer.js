import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 items-center h-24 max-w-[1240px] mx-auto px-4 text-[#00df9a] border-t-[3px]">
      <div>
        <ul className="flex items-center start">
          <li className="px-2">
            <Link to="home" smooth={true} duration={400}>
              Link 1
            </Link>
          </li>
          <li className="px-2">
            <Link to="about" smooth={true} duration={400}>
              Link 2
            </Link>
          </li>
          <li className="px-2">
            <Link to="skills" smooth={true} duration={400}>
              Link 3
            </Link>
          </li>
          <li className="px-2">
            <Link to="work" smooth={true} duration={400}>
              Link 4
            </Link>
          </li>
        </ul>
      </div>
      <span className="flex justify-end mt-5 text-xs text-white ">
        © 2022 Toolman. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
