import { useState } from "react";
import store from "../../store/state";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import RepaymentForm from "./RepaymentForm";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import PulseLoader from "react-spinners/PulseLoader";

function RepaymentList() {
  const { getRepayments } = store();
  const { loanId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [repayment_id, setRepayment_id] = useState("");

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    setRepayment_id(id);
  };

  async function getAllRepayments() {
    try {
      const data = await getRepayments(loanId);
      const repayments_data = data.repayments.map((repayment, index) => ({
        s_no: index + 1,
        amount: repayment.amount,
        deadline: formatDateToShort(repayment.dueDate),
        status: repayment.status,
        repaymentId: repayment._id,
      }));
      return repayments_data;
    } catch (error) {
      console.error("Error fetching repayments:", error);
      throw new Error("Failed to fetch repayments. Please try again later.");
    }
  }

  function formatDateToShort(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return `${day}/${month}/${year}`;
  }

  const {
    data: repayments,
    isLoading,
    isError,
    error,
    refetch: refetchRepayments,
  } = useQuery("repayments", getAllRepayments, {
    // cacheTime: 60 * 1000,
    // staleTime: 60 * 1000,
    // refetchInterval: 10000,
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full pt-10">
          <PulseLoader
            color={"#39d9b9"}
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {isError && (
        <p className="text-5xl text-center text-red-500">
          Error: {error?.message || "An unexpected error occurred"}
        </p>
      )}

      {!isLoading && repayments?.length === 0 && (
        <p className="text-3xl text-center">No Repayments Found</p>
      )}

      {repayments?.length > 0 && (
        <table className="sm:w-[60%] w-[100%] mx-auto sm:text-lg shadow-lg sm:rounded-lg overflow-hidden">
          <thead>
            <tr className="flex justify-between w-full py-4 text-white bg-green-500">
              {Object?.keys(repayments[0])
                .filter((key) => key !== "loanId" && key !== "repaymentId")
                .map((key) => (
                  <th className={`${key === "s_no" ? "w-[13%] " : " w-[20%] "} text-center overflow-hidden`} key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              <th className="w-[20%] text-center overflow-hidden">Action</th>
            </tr>
          </thead>
          <tbody>
            {repayments.map((repayment) => (
              <tr
                className="flex items-center justify-between w-full py-3 border-b-2 border-gray-100"
                key={repayment.s_no}
              >
                <td className="sm:w-[20%] w-[13%] overflow-hidden text-center">
                  {repayment.s_no}.
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {repayment.amount}$
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {repayment.deadline}
                </td>
                <td
                  className={`w-[20%] text-center overflow-hidden font-semibold ${
                    repayment.status === "pending"
                      ? "text-yellow-500"
                      : repayment.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {repayment.status}
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {repayment.status === "pending" && (
                    <button
                      className="px-3 text-white rounded font-semibold py-[3px] bg-green-500 hover:scale-105 active:scale-95 duration-100"
                      onClick={() => togglePopup(repayment.repaymentId)}
                    >
                      Pay <span className="hidden sm:block">Now</span>
                    </button>
                  )}
                  {repayment.status === "paid" && "Paid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right center"
        closeOnDocumentClick
        overlayStyle={{ background: "#00000000" }}
        contentStyle={{ transitionDuration: "20s" }}
      >
        <RepaymentForm
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          setIsOpen={setIsOpen}
          amount={repayments?.[0]?.amount}
          repayment_id={repayment_id}
          refetchRepayments={refetchRepayments}
        />
      </Popup>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

export default RepaymentList;
