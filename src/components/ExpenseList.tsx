interface ExpenseItem {
	id: number
	description: string
	amount: number
	category: string
}

interface Props {
	expenses: ExpenseItem[]
	onDelete: (id: number) => void
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
	if (expenses.length == 0) return <p>No expenses</p>
	return (
		<table className="table table-bordered">
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Category</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{expenses.map((item) => (
					<tr>
						<td>{item.description}</td>
						<td>{item.amount}</td>
						<td>{item.category}</td>
						<td>
							<button
								className="btn btn-outline-danger"
								onClick={() => onDelete(item.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td>Total</td>
					<td colSpan={3}>${expenses.reduce((acc, item) => acc + item.amount, 0)}</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default ExpenseList
