import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  updateTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  updateAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  updateOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    if (titleInput !== '' && amountInput !== '') {
      const typeOption = transactionTypeOptions.find(
        eachOption => eachOption.optionId === optionId,
      )
      const {displayText} = typeOption
      const newTransaction = {
        id: uuidv4(),
        title: titleInput,
        amount: parseInt(amountInput),
        type: displayText,
      }
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransaction],
        titleInput: '',
        amountInput: '',
        optionId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let expensesAmount = 0
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="paragraph">
            Welcome back to your{' '}
            <span className="add-color">Money Manager</span>
          </p>
        </div>
        <ul className="details-container">
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </ul>
        <div className="input-container">
          <form className="form-container" onSubmit={this.onAddTransaction}>
            <h1 className="heading-text">Add Transaction</h1>
            <label className="label-text" htmlFor="title">
              TITLE
            </label>
            <input
              type="text"
              className="user-input"
              id="title"
              value={titleInput}
              onChange={this.updateTitleInput}
              placeholder="TITLE"
            />
            <label className="label-text" htmlFor="amount">
              AMOUNT
            </label>
            <input
              type="text"
              className="user-input"
              id="amount"
              value={amountInput}
              onChange={this.updateAmountInput}
              placeholder="AMOUNT"
            />
            <label className="label-text" htmlFor="type">
              TYPE
            </label>
            <select
              className="user-input"
              id="type"
              value={optionId}
              onChange={this.updateOptionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option value={eachOption.optionId} key={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <div className="transaction-container">
            <h1 className="heading-text">History</h1>
            <ul>
              <li className="list-container">
                <p className="list-header">Title</p>
                <p className="list-header">Amount</p>
                <p className="list-header">Type</p>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
