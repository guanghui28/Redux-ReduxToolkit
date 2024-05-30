import { useSelector, useDispatch } from "react-redux";
import {
	increment,
	decrement,
	reset,
	incrementByAmount,
	decrementByAmount,
} from "./counter/counterSlice";
import { useState } from "react";

export default function Counter() {
	const count = useSelector((state) => state.counter.count);
	const [amount, setAmount] = useState(0);
	const dispatch = useDispatch();

	const resetAll = () => {
		setAmount(0);
		dispatch(reset());
	};

	return (
		<section>
			<p>{count}</p>
			<div>
				<p>Amount: {amount}</p>
				<div>Set amount to increment or decrement</div>
				<button onClick={() => setAmount((amount) => amount + 1)}>+</button>
				<button onClick={() => setAmount((amount) => amount - 1)}>-</button>
			</div>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>
			<button onClick={resetAll}>Reset</button>
			<button onClick={() => dispatch(decrementByAmount(amount))}>
				Decre by {amount}
			</button>
			<button onClick={() => dispatch(incrementByAmount(amount))}>
				Incre by {amount}
			</button>
		</section>
	);
}
