import { useState } from 'react';
import questions from '../questions';

const Quiz = () => {
	const [userAnswers, setAnswers] = useState([]);
	const activeQuestion = userAnswers.length;

	const answers = questions[activeQuestion].answers;

	const handleSelectAnswer = (answer) => {
		if (answer === questions[activeQuestion].answers[0]) alert('yes!');
		else alert('no!');
		setAnswers((answers) => [...answers, answer]);
	};

	return (
		<div id="question">
			<h2>{questions[activeQuestion].text}</h2>
			<ul id="answers">
				{answers.map((a) => (
					<li key={a} className="answer">
						<button
							type="button"
							onClick={() => handleSelectAnswer(a)}
						>
							{a}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Quiz;
