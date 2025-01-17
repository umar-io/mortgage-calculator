import "./App.css";
import { useState } from "react";
import FormField from "./FormField";
import articleLogo from "./assets/illustration-empty.svg";
import buttonImg from "./assets/icon-calculator.svg";

interface FormDataProps {
  mortgage_amount: number | string;
  mortgage_term: number | string;
  mortgage_interest: number | string;
  mortgage_type: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    mortgage_amount: "",
    mortgage_term: "",
    mortgage_interest: "",
    mortgage_type: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : parseFloat(value),
    }));
    setError((prevError) => ({
      ...prevError,
      [`${name}_error`]: "",
    }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [`${name}_error`]: "",
    }));
  };

  const clearAll = () => {
    setFormData({
      mortgage_amount: "",
      mortgage_term: "",
      mortgage_interest: "",
      mortgage_type: "Fixed",
    });
    setError({
      mortgage_amount_error: "",
      mortgage_term_error: "",
      mortgage_interest_error: "",
      mortgage_type_error: "",
    });
  };

  const [error, setError] = useState({
    mortgage_amount_error: "",
    mortgage_term_error: "",
    mortgage_interest_error: "",
    mortgage_type_error: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    const newError = {
      mortgage_amount_error: "",
      mortgage_term_error: "",
      mortgage_interest_error: "",
      mortgage_type_error: "",
    };

    if (!formData.mortgage_amount) {
      newError.mortgage_amount_error = "This field is required !";
      isValid = false;
    }

    if (!formData.mortgage_term) {
      newError.mortgage_term_error = "This field is required !";
      isValid = false;
    }

    if (!formData.mortgage_interest) {
      newError.mortgage_interest_error = "This field is required !";
      isValid = false;
    }

    if (!formData.mortgage_type) {
      newError.mortgage_type_error = "This field is required !";
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      console.log("calculation in progress");
    }
  };

  return (
    <section className="flex md:justify-center justify-center items-center md:items-center p-0 md:p-4 sm:p-2 lg:h-dvh md:h-dvh h-fit">
      <div className="lg:w-[80%] w-[100%] flex lg:flex-row md:flex-row flex-col justify-start bg-white !rounded-[20px]">
        <aside className="lg:w-[50%] w-full bg-white p-4">
          <div className="flex justify-between items-center mt-2">
            <h3 className="font-bold text-[25px]">Mortgage Calculator</h3>
            <a href="#" className="underline" onClick={clearAll}>
              Clear All
            </a>
          </div>
          <form
            method="POST"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <FormField
                id="mortgage_amount"
                label="Mortgage Amount"
                unit="£"
                type="number"
                value={formData.mortgage_amount}
                placeholder="Enter amount"
                divClassName={`absolute left-[2px] top-1/2 transform -translate-y-[25%] ${
                  error.mortgage_amount_error
                    ? "bg-red-500 !text-white"
                    : "bg-[#e3f3fd] text-gray-900"
                } z-10 p-2 rounded-tl-sm rounded-bl-sm`}
                inputClassName={`w-full border ${
                  error.mortgage_amount_error
                    ? "border-red-500"
                    : "border-gray-300"
                } py-2 pl-8 pr-4 rounded-md focus:outline-none focus:ring-1`}
                onChange={handleInputChange}
              />
              {error.mortgage_amount_error && (
                <p className="text-red-500 text-[14px] text-start">
                  {error.mortgage_amount_error}
                </p>
              )}
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-2 mt-2">
              <div className="lg:w-1/2 w-full">
                <FormField
                  id="mortgage_term"
                  label="Mortgage Term"
                  unit="Years"
                  type="number"
                  value={formData.mortgage_term}
                  placeholder="Enter term"
                  divClassName={`absolute right-[2px] top-1/2 transform -translate-y-[25%] ${
                    error.mortgage_term_error
                      ? "bg-red-500 !text-white"
                      : "bg-[#e3f3fd] text-gray-900"
                  } z-10 p-2 rounded-tr-sm rounded-br-sm`}
                  inputClassName={`w-full border ${
                    error.mortgage_term_error
                      ? "border-red-500"
                      : "border-gray-300"
                  } py-2 pl-2 pr-4 rounded-md focus:outline-none focus:ring-1`}
                  onChange={handleInputChange}
                />
                {error.mortgage_term_error && (
                  <p className="text-red-500 text-[14px] text-start">
                    {error.mortgage_term_error}
                  </p>
                )}
              </div>
              <div className="lg:w-1/2 w-full">
                <FormField
                  id="mortgage_interest"
                  label="Interest Rate"
                  unit="%"
                  type="number"
                  value={formData.mortgage_interest}
                  placeholder="Enter rate"
                  divClassName={`absolute right-[2px] top-1/2 transform -translate-y-[25%] ${
                    error.mortgage_interest_error
                      ? "bg-red-500 !text-white"
                      : "bg-[#e3f3fd] text-gray-900"
                  } z-10 p-2 rounded-tr-sm rounded-br-sm`}
                  inputClassName={`w-full border ${
                    error.mortgage_interest_error
                      ? "border-red-500"
                      : "border-gray-300"
                  } py-2 pl-2 pr-4 rounded-md focus:outline-none focus:ring-1`}
                  onChange={handleInputChange}
                />
                {error.mortgage_interest_error && (
                  <p className="text-red-500 text-[14px] text-start">
                    {error.mortgage_interest_error}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h3>Mortgage Type</h3>
              <FormField
                id="mortgage_type"
                options={["Repayment", "Interest Only"]}
                value={formData.mortgage_type}
                onChange={handleRadioChange}
                type="radio"
              />
              {error.mortgage_type_error && (
                <p className="text-red-500 text-[14px] text-start">
                  {error.mortgage_type_error}
                </p>
              )}
            </div>
            <button
              className="btn w-[fit-content] flex justify-center items-center gap-2 bg-[#d7da2f] px-4 py-2 rounded-[30px] font-bold "
              type="submit"
            >
              <img src={buttonImg} className="w-[20px]" alt="" />
              Calculate Repayment
            </button>
          </form>
        </aside>
        <article className="lg:w-[50%] bg-[#122f3f] lg:rounded-bl-[20%] md:rounded-bl-[20%] flex flex-col justify-center items-center gap-3 lg:px-0 px-3">
          <img src={articleLogo} alt="" width={200} />
          <h4 className="text-white">Results Shown Here</h4>
          <p className="text-[16px] text-wrap text-center text-[#4e6e7e]">
            Complete the form and click "Calculate Repayment" to see what your
            monthly repayment would be.
          </p>
        </article>
      </div>
    </section>
  );
};

export default App;
