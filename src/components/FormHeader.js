import { Link } from "react-router-dom";

function FormHeader({ heading, link, text }) {
  return (
    <div className="my-4 text-center">
      <h1 className="text-4xl font-medium mb-2">{heading}</h1>
      <Link to={link}>
        <p className="text-sm text-indigo-400 cursor-pointer">{text}</p>
      </Link>
    </div>
  );
}
export default FormHeader;
