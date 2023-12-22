import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <>
      <li className="balance list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          className="logo"
          alt="balance"
        />
        <div>
          <p className="text">Your Balance</p>
          <p className="rupees" data-testid="delete">
            Rs {balanceAmount}
          </p>
        </div>
      </li>
      <li className="income list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          className="logo"
          alt="income"
        />
        <div>
          <p className="text">Your Income</p>
          <p className="rupees" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </li>
      <li className="expenses list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          className="logo"
          alt="expenses"
        />
        <div>
          <p className="text">Your Expenses</p>
          <p className="rupees" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </li>
    </>
  )
}

export default MoneyDetails
