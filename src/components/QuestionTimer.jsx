import { useEffect, useState } from 'react';

const DELAY = 10;

const QuestionTimer = ({ time, onTimeOut, answered }) => {
	const [timeLeft, setTimeLeft] = useState(time);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - DELAY);
		}, DELAY);

		let timer = setTimeout(onTimeOut, time);

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	}, [time, onTimeOut]);

	return (
		<progress
			id="question-timer"
			max={time}
			value={timeLeft}
			className={answered ? 'answered' : ''}
		/>
	);
};

export default QuestionTimer;
