import red_warning from "../../assets/icons/red-warning.png"

const FormInput = ({field, handleChange, name = field, placeholder = null, errorMessage = null, showError}) => {
  return (
    <div className="inputBox">
        <label>{name}</label>
        <input
        name={name.replace(" ", "_")}
        type={field}
        placeholder={placeholder === null ? `Enter your ${field}` : `${placeholder}`}
        onChange={handleChange}
        required
        />
        {showError ? (
            <div className="error"><img src={red_warning} alt="warning"/><>{errorMessage}</></div>
        ) : ""}
    </div>
  );
};

export default FormInput;
