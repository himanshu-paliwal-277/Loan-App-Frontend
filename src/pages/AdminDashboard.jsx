import store from "../store/state";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import PulseLoader from "react-spinners/PulseLoader";

function AdminDashboard() {
  const { fetchAllUserLoansByAdmin } = store();
  const { approveLoan, rejectLoan } = store();

  async function fetchAllLoans() {
    try {
      const data = await fetchAllUserLoansByAdmin();
      console.log("fetchAllUserLoansByAdmin data: ", data);
      return data.loans;
    } catch (error) {
      console.error("Error fetching loans:", error);
      return error;
    }
  }

  const {
    data: loans,
    isLoading,
    isError,
    refetch: refetchAllLoans,
  } = useQuery("fetchAllLoans", fetchAllLoans, {
    cacheTime: 60 * 1000,
    staleTime: 60 * 1000,
    refetchInterval: 10000,
    onError: (error) => toast.error(error.message),
  });

  async function handleApprove(loanId) {
    const isApproved = await approveLoan(loanId);
    if (isApproved) {
      console.log("Approve loan id : ", loanId);
      refetchAllLoans();
    }
  }

  async function handleReject(loanId) {
    const isRejected = await rejectLoan(loanId);
    if (isRejected) {
      console.log("Rejected loan id : ", loanId);
      refetchAllLoans();
    }
  }

  return (
    <>
      <h1 className="my-5 text-3xl font-semibold text-center">Loan Requests</h1>
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
      {isError && <p className="text-5xl text-center">Error</p>}
      {loans?.length === 0 && <p>No Loans</p>}
      {loans?.length > 0 && (
        // Added a wrapper div with `overflow-x-auto` to make the table scrollable on the x-axis
        <div className="overflow-x-auto">
          <table className="sm:w-[90%] w-[100%] sm:mx-auto sm:text-lg shadow-lg sm:rounded-lg sm:overflow-hidden">
            <thead>
              <tr className="flex justify-between w-full py-4 text-white bg-green-500">
                {Object.keys(loans[0])
                  .filter((key) => key !== "loanId")
                  .map((key, index) => (
                    <th
                      className={`${
                        index === 0 || index === 1 ? "w-[20%]" : "w-[15%]"
                      } text-center overflow-hidden`}
                      key={key}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                <th className="w-[15%] text-center overflow-hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr
                  className={`flex justify-between items-center w-full py-3 border-b-2 border-gray-100`}
                  key={index}
                >
                  <td className="w-[20%] overflow-hidden text-center">
                    {loan.name}
                  </td>
                  <td className="w-[20%] text-center overflow-hidden">
                    {loan.email}
                  </td>
                  <td className="w-[15%] text-center overflow-hidden">
                    {loan.amount}$
                  </td>
                  <td className="w-[15%] text-center overflow-hidden">
                    {loan.term > 1 ? `${loan.term} weeks` : `${loan.term} week`}
                  </td>
                  <td
                    className={`w-[15%] text-center overflow-hidden font-semibold ${
                      loan.status === "pending"
                        ? "text-yellow-500"
                        : loan.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {loan.status}
                  </td>
                  <td className="w-[15%] text-center">
                    {loan.status === "pending" ? (
                      <div className="flex flex-col gap-1 sm:gap-0 sm:justify-evenly sm:flex-row">
                        <button
                          className={`px-2 text-white rounded font-semibold py-[2px] bg-green-500 hover:bg-green-600 active:bg-green-700 text-sm sm:text-base`}
                          onClick={() => handleApprove(loan.loanId)}
                        >
                          Approve
                        </button>
                        <button
                          className={`px-2 text-white rounded font-semibold py-[2px] bg-red-500 hover:bg-red-600 active:bg-red-700 text-sm sm:text-base`}
                          onClick={() => handleReject(loan.loanId)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={1500} />
    </>
  );
}

export default AdminDashboard;
