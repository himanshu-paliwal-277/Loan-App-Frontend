import { TextField } from "@mui/material";
import { useState } from "react";
import ViewInstallments from "../Common/ViewInstallments";
import store from "../../store/state";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoanForm() {
  const [amount, setAmount] = useState("");
  const [terms, setTerms] = useState("");
  const [Installments, setInstallments] = useState([]);
  const applyForLoan = store(state => state.applyForLoan);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    console.log("Apply for loan with amount", amount, "terms", terms);
    // Call the function to calculate installments on form submission
    calculateInstallments();
    const isApplied = await applyForLoan(amount, terms);
    if(isApplied) {
      console.log("Successfully applied for loan");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }

  function termsChangeHandler(event) {
    const value = event.target.value;
    setTerms(value < 0 ? 1 : value);
    setInstallments([]); 
  }

  function amountChangeHandler(event) {
    const value = event.target.value;
    setAmount(value < 0 ? 1 : value); 
    setInstallments([]); 
  }

  const calculateInstallments = () => {
    const weeklyInstallment = (amount / terms).toFixed(2);
    const newInstallments = [];

    for (let i = 1; i <= terms; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + i * 7);
      const date = formatDate(dueDate);
      newInstallments.push({ week: i, date: date, amount: weeklyInstallment });
    }

    setInstallments(newInstallments); 
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div className="flex w-full duration-500 justify-evenly">
        <div className="sm:w-[40%] w-[60%] mt-8 py-8 px-12 border-2 shadow-lg border-gray-200 rounded-lg">
          <h1 className="mb-4 text-3xl font-semibold text-center">Loan Form</h1>
          <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
            <TextField
              value={amount}
              label="Amount"
              variant="outlined"
              fullWidth
              onChange={amountChangeHandler}
              required
              type="number"
              inputProps={{
                min: 1, // Set the minimum value here
                step: 1, // Optional: Set step value to prevent non-integer values
              }}
            />
            <TextField
              value={terms}
              label="Terms"
              variant="outlined"
              fullWidth
              onChange={termsChangeHandler}
              required
              type="number"
              inputProps={{
                min: 1, // Set the minimum value here
                step: 1, // Optional: Set step value to prevent non-integer values
              }}
            />
            <button
              type="button"
              className="px-4 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={calculateInstallments}
            >
              View Installments
            </button>
            <button
              type="submit"
              className="px-4 py-3 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
            >
              Apply
            </button>
          </form>
        </div>
        {Installments.length > 0 && (
            <ViewInstallments Installments={Installments} />
        )}
      </div>
      <ToastContainer  position="bottom-right" autoClose={2000} />
    </>
  );
}

export default LoanForm;
