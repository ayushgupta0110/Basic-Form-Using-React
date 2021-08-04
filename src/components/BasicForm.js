import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredFName,
    isValid: fNameIsValid,
    hasError: fNameHasError,
    valueChangedHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: fNameReset,
  } = useInput((value) => (value.trim() !== "" ? value.trim() : null));

  const {
    value: enteredLName,
    isValid: lNameIsValid,
    hasError: lNameHasError,
    valueChangedHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: lNameReset,
  } = useInput((value) => (value.trim() !== "" ? value.trim() : null));

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (fNameIsValid && lNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted");
    console.log(enteredFName, enteredLName, enteredEmail);
    fNameReset();
    lNameReset();
    emailReset();
  };

  const fnameInputClass = fNameHasError
    ? "form-control invalid"
    : "form-control";
  const lnameInputClass = lNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClass = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={fnameInputClass}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            onChange={fNameChangeHandler}
            onBlur={fNameBlurHandler}
            value={enteredFName}
          />
          {fNameHasError && (
            <p className="error-text">Name field cannot be empty</p>
          )}
        </div>
        <div className={lnameInputClass}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            onChange={lNameChangeHandler}
            onBlur={lNameBlurHandler}
            value={enteredLName}
          />
          {lNameHasError && (
            <p className="error-text">Name field cannot be empty</p>
          )}
        </div>
      </div>
      <div className={emailInputClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailHasError && (
        <p className="error-text">Please enter a valid email</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
