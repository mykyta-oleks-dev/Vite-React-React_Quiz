import { useEffect, useState } from 'react';

const DELAY = 10;

const QuestionTimer = ({ time, onTimeOut }) => {
	const [timeLeft, setTimeLeft] = useState(time);

	useEffect(() => {
		console.log('set interval');
		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - DELAY);
		}, DELAY);

		console.log('set timeout');
		let timer = setTimeout(onTimeOut, time);

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	}, [time, onTimeOut]);

	useEffect(() => {}, []);

	return <progress id="question-timer" max={time} value={timeLeft} />;
};

export default QuestionTimer;
