function ViewInstallments({ Installments }) {

  return (
    <div className="flex flex-col items-center sm:w-[40%] w-[100%] sm:px-10 sm:py-10 px-3 py-4 bg-gray-100  mt-8 rounded-lg duration-1000 sm:h-[400px] sm:overflow-y-auto
    ">
      <h1 className="mb-6 text-3xl font-semibold">View Installments</h1>
      <ul className="flex flex-col w-full gap-4 text-sm sm:text-base">
        {Installments.map((installment) => (
          <li className="flex justify-between w-full" key={installment.week}>
            <span>Week {installment.week}</span>
            <span>{installment.date}</span>
            <span>Amount: {installment.amount}$</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInstallments;
