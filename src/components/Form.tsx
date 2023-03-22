import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import categories from "../categories"

const schema = z.object({
	description: z.string().nonempty({ message: "Description is required" }),
	amount: z
		.number({ invalid_type_error: "Amount is required" })
		.gt(0, { message: "Invalid amount" }),
	category: z.enum([...categories], {
		errorMap: () => ({ message: "Category is required" }),
	}),
})

interface Props {
	onAddNew: (expense: FormData) => void
}

export type FormData = z.infer<typeof schema>

const Form = ({ onAddNew }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({ resolver: zodResolver(schema) })

	const submit = (data: FormData) => {
		onAddNew(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className="mb-3">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					{...register("description")}
					id="description"
					type="text"
					className="form-control"
				/>
				{errors.description && (
					<small className="text-danger">{errors.description.message}</small>
				)}
			</div>

			<div className="mb-3">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					{...register("amount", { valueAsNumber: true })}
					id="amount"
					type="number"
					className="form-control"
				/>
				{errors.amount && <small className="text-danger">{errors.amount.message}</small>}
			</div>

			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select {...register("category")} id="category" className="form-control">
					<option value=""></option>
					{categories.map((category) => (
						<option key={category}>{category}</option>
					))}
				</select>
				{errors.category && (
					<small className="text-danger">{errors.category.message}</small>
				)}
			</div>
			<button className="btn btn-primary">Submit</button>
		</form>
	)
}

export default Form
