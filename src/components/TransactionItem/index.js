import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDelete = () => {
    onDeleteTransaction(id)
  }

  return (
    <li className="list-item">
      <p className="text">{title}</p>
      <p className="text">Rs {amount}</p>
      <p className="text">{type}</p>
      <button
        className="delete-button"
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
