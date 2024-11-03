import { useEffect, useState } from "react";
import store from "../../store/state";
import { ToastContainer } from "react-toastify";
// import Popup from "reactjs-popup";

function LoanList() {
  const { fetchUserLoans } = store();
  const [loans, setLoans] = useState([]);
  const { user } = store();
  // const [isOpen, setIsOpen] = useState(false);

  // const togglePopup = () => {
  //   setIsOpen(!isOpen);
  // };

  async function fetchLoans() {
    try {
      const data = await fetchUserLoans();
      console.log(data);
      const loans = data.loans.map(({ amount, term, status }, index) => ({
        s_no: index + 1,
        amount,
        term,
        status,
      }));
      console.log(loans);
      setLoans(loans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  }

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="my-5 text-3xl font-semibold text-center">
        {user.name} Loans
      </h1>
      {loans.length === 0 && <p>No Loans</p>}
      {loans.length > 0 && (
        <table className="w-[60%] mx-auto text-lg shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="flex justify-between w-full py-4 text-white bg-green-500">
              {Object?.keys(loans[0]).map((key) => (
                <th className="w-[20%]  text-center overflow-hidden " key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th className="w-[20%]  text-center overflow-hidden ">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr
                className={`flex justify-between items-center w-full py-3 border-b-2 border-gray-100`}
                key={loan.s_no}
              >
                <td className="w-[20%] overflow-hidden text-center">
                  {loan.s_no}.
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {loan.amount}$
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {loan.term > 1 ? `${loan.term} weeks` : `${loan.term} week`}
                </td>
                <td
                  className={`w-[20%] text-center overflow-hidden font-semibold ${
                    loan.status === "pending"
                      ? "text-yellow-500"
                      : loan.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {loan.status}
                </td>
                <td className="w-[20%] text-center overflow-hidden">
                  {loan.status === "approved" && (
                    <button
                      className={`px-3 text-white rounded font-semibold py-[3px] bg-green-500 hover:scale-105 active:scale-95 duration-100`}
                    >
                      pay
                    </button>
                  )}
                  {loan.status === "pending" && "wait"}
                  {loan.status === "paid" && "paid"}
                  {loan.status === "rejected" && "rejected"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />
      {/* <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right center"
        closeOnDocumentClick
        overlayStyle={{ background: "#00000000" }}
        contentStyle={{
          transitionDuration: "20s",
        }}
      >
        <div className="flex flex-col items-center px-12 py-10 text-white bg-black shadow-xl rounded-xl">
          done
        </div>
      </Popup> */}
    </>
  );
}

export default LoanList;
