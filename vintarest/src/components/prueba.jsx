import { useDispatch, useSelector } from "react-redux";
import {
	decrement,
	increment,
	incrementByAmount,
} from "../../src/store/amount/counter";

export default function Prueba() {
	const { count } = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	return (
		<div className="App">
			<h1> The count is: {count}</h1>
			<button onClick={() => dispatch(increment())}>increment</button>
			<button onClick={() => dispatch(decrement())}>decrement</button>
			<button onClick={() => dispatch(incrementByAmount(10))}>
				Increment by 33
			</button>
		</div>
	);
}
