import { useState } from "react"
import ExpenseFilter from "./components/ExpenseFilter"
import ExpenseList from "./components/ExpenseList"
import Form from "./components/Form"
import { FormData } from "./components/Form"

function App() {
	const [selectedCategory, setSelectedCategory] = useState("")
	const [expenses, setExpenses] = useState([
		{ id: 1, description: "Sweet", amount: 500, category: "Groceries" },
	])

	const visibleExpenses = selectedCategory
		? expenses.filter((e) => e.category === selectedCategory)
		: expenses

	const handleDelete = (id: number) => {
		setExpenses(expenses.filter((item) => item.id !== id))
	}

	const handleAddNew = (expense: FormData) => {
		setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
	}

	return (
		<div className="App">
			<div className="mb-5">
				<Form onAddNew={handleAddNew} />
			</div>
			<div className="mb-3">
				<ExpenseFilter onFilter={(category) => setSelectedCategory(category)} />
			</div>
			<div className="mb-3">
				<ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
			</div>
		</div>
	)
}

export default App
