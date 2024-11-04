import { TextField } from "@mui/material";
import store from "../../store/state";

function RepaymentForm({
  paymentAmount,
  setPaymentAmount,
  setIsOpen,
  amount,
  repayment_id,
  refetchRepayments,
}) {
  const { makeRepayment } = store();

  async function makePayment() {
    console.log("Amount: ", paymentAmount, "repayment id: ", repayment_id);
    const isPaymentMade = await makeRepayment(paymentAmount, repayment_id);
    if (isPaymentMade) {
      console.log("payment made successfully");
      refetchRepayments();
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPaymentAmount("");
    makePayment();
    console.log("Payement amount: ", paymentAmount);
  }

  return (
    <>
      <form
        className="flex flex-col items-center sm:px-12 px-6 py-6 sm:py-10 bg-white shadow-lg border-gray-400 sm:border-[3px] border-[1px] rounded-xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="mb-10 text-xl font-semibold sm:text-3xl">
          Make Payment of {amount}$
        </h1>
        <div className="w-full sm:px-4">
          {/* <h2 className="mb-3 text-lg">Payment Amount</h2> */}
          <TextField
            className=""
            value={paymentAmount}
            label="Amount"
            variant="outlined"
            fullWidth
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
            autoComplete="true"
            type="Number"
          />
        </div>
        <div className="flex flex-col gap-2 w-[50%] mt-12 ">
          <button
            className="px-4 py-2 font-semibold text-white bg-green-500 rounded sm:text-lg hover:bg-green-600 active:bg-green-700"
            type="submit"
          >
            Pay
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold rounded hover:bg-gray-100 active:bg-gray-200 sm:text-lg"
            onClick={() => setIsOpen(false)}
          >
            Cencel
          </button>
        </div>
      </form>
    </>
  );
}

export default RepaymentForm;
