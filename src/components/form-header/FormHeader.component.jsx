import "./FormHeader.style.scss";

export const FormHeader = ({ title, subtitle }) => {
  return (
    <>
      <h2 className="header__title">{title}</h2>
      <p className="header__subtitle">{subtitle}</p>
    </>
  );
};

export default FormHeader;
