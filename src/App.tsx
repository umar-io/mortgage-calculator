import "./App.css";
import { useState } from "react";
import FormField from "./FormField";
import articleLogo from "./assets/illustration-empty.svg";
import buttonImg from "./assets/icon-calculator.svg";

interface FormDataProps {
  mortgage_amount: number;
  mortgage_term: number;
  mortgage_interest: number;
  mortgage_type: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    mortgage_amount: 0,
    mortgage_term: 0,
    mortgage_interest: 0,
    mortgage_type: "",
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    // Handle the case when the input field is 'mortgage_amount' (which needs formatting)
    if (name === "mortgage_amount") {
      // Remove commas and parse the numeric value
      const rawValue = value.replace(/,/g, "");
      const numericValue = rawValue ? parseFloat(rawValue) : 0;
  
      // If it's a valid number, update the state
      if (!isNaN(numericValue)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: numericValue,
        }));
      }
  
      // Optionally update the input display value with commas
      event.target.value = numericValue.toLocaleString("en-US");
    } else {
      // For other fields, you can handle numeric values as well
      setFormData((prevState) => ({
        ...prevState,
        [name]: value === "" ? "" : parseFloat(value), // Handle empty value case
      }));
    }
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
      mortgage_amount: 0,
      mortgage_term: 0,
      mortgage_interest: 0,
      mortgage_type: "Repayment",
    });
    setError({
      mortgage_amount_error: "",
      mortgage_term_error: "",
      mortgage_interest_error: "",
      mortgage_type_error: "",
    });
    setMonthlyPayment(0);
    setTotalPayment(0);
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
      if (formData.mortgage_type === "Repayment") {
        const mortgageAmount = formData.mortgage_amount;
        const mortgageInterest = formData.mortgage_interest;
        const mortgageTermYear = formData.mortgage_term;

        const mortgageTermMonth = mortgageTermYear * 12;
        const monthlyMortgageInterest = mortgageInterest / 100 / 12;

        const monthlyPayment =
          (mortgageAmount *
            (monthlyMortgageInterest *
              Math.pow(1 + monthlyMortgageInterest, mortgageTermMonth))) /
          (Math.pow(1 + monthlyMortgageInterest, mortgageTermMonth) - 1);

        setMonthlyPayment(parseFloat(monthlyPayment.toFixed(2)));

        const totalPayment = monthlyPayment * mortgageTermMonth;

        setTotalPayment(parseFloat(totalPayment.toFixed(2)));
      }
      if (formData.mortgage_type === "Interest Only") {
        console.log("coming");
      }
    }
  };

  return (
    <section className="flex md:justify-center justify-center items-center md:items-center p-0 md:p-4 sm:p-2 lg:h-dvh md:h-dvh h-fit">
      <div className="lg:w-[80%] w-[100%] flex lg:flex-row md:flex-row flex-col justify-start bg-white lg:!rounded-[20px]">
        <aside className="lg:w-[50%] w-full p-4">
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
                type="text"
                value={
                  formData.mortgage_amount === 0
                    ? ""
                    : formData.mortgage_amount.toLocaleString()
                }
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
                } py-2 pl-8 pr-4 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d7da2f] hover:cursor-pointer hover:border-[#d7da2f]`}
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
                  value={
                    formData.mortgage_term === 0 ? "" : formData.mortgage_term
                  }
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
                  } py-2 pl-2 pr-4 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d7da2f] hover:cursor-pointer hover:border-[#d7da2f]`}
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
                  value={
                    formData.mortgage_interest === 0
                      ? ""
                      : formData.mortgage_interest
                  }
                  placeholder="Enter rate"
                  divClassName={`absolute right-[2px] top-1/2 transform -translate-y-[25%] ${
                    error.mortgage_interest_error
                      ? "bg-red-500 !text-white"
                      : "bg-[#e3f3fd] text-gray-900"
                  } z-10 p-2 rounded-tr-sm rounded-br-sm hover:outline-[#d7da2f]`}
                  inputClassName={`w-full border ${
                    error.mortgage_interest_error
                      ? "border-red-500"
                      : "border-gray-300"
                  } py-2 pl-2 pr-4 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d7da2f] hover:cursor-pointer hover:border-[#d7da2f]`}
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
              className="btn lg:w-[fit-content] md:w-[fit-content] w-full flex justify-center items-center gap-2 bg-[#d7da2f] px-4 py-2 rounded-[30px] font-bold "
              type="submit"
            >
              <img src={buttonImg} className="w-[20px]" alt="" />
              Calculate Repayment
            </button>
          </form>
        </aside>
        <article
          className={`lg:w-[50%] bg-slate-900 lg:rounded-bl-[20%] md:rounded-bl-[20%] flex flex-col ${
            monthlyPayment && totalPayment
              ? "justify-start items-start lg:p-6 p-3"
              : "justify-center items-center lg:px-0 px-3"
          } gap-3 lg:rounded-tr-[20px] lg:rounded-br-[20px]`}
        >
          {monthlyPayment !== 0 && totalPayment !== 0 ? (
            <>
              <h3 className="text-white text-[19px] font-bold">Your Results</h3>
              <p className="text-slate-100 text-wrap text-[15px] font-light text-left">
                Your Result are shown below based on the information you
                provided. To adjust the results, edit the form and click
                &apos;Calculate Repayments&apos; again.
              </p>
              <div
                className="flex flex-col px-5 py-3 w-[100%] bg-[#122f3f] rounded-lg"
                style={{
                  borderTop: "4px solid #d7da2f",
                }}
              >
                <div className="mb-5 flex flex-col gap-3">
                  <p className="text-slate-50">Your monthly repayments</p>
                  <h1 className="text-[#d7da2f] text-[45px]">
                    £ {monthlyPayment.toLocaleString()}
                  </h1>
                </div>
                <hr className="text-slate-400" />
                <div className="mt-6 flex flex-col gap-3 mb-3">
                  <p className="text-slate-50 text-[14px] font-thin">
                    Total you'll repay over the term
                  </p>
                  <h3 className="text-white text-[18px] font-normal">
                    £ {totalPayment.toLocaleString()}
                  </h3>
                </div>
              </div>
            </>
          ) : (
            <>
              <img src={articleLogo} alt="" width={200} />
              <h4 className="text-white">Results Shown Here</h4>
              <p className="text-[16px] text-wrap text-center text-[#4e6e7e]">
                Complete the form and click "Calculate Repayment" to see what
                your monthly repayment would be.
              </p>
            </>
          )}
        </article>
      </div>
    </section>
  );
};

export default App;
