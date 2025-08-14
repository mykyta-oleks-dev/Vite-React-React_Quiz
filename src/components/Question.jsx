import { useCallback } from 'react';
import QuestionTimer from './QuestionTimer';

const Question = ({ question, questionIdx, onSelectAnswer }) => {
	const shuffledAnswers = question ? [...question.answers] : [];

	const handleTimeOut = useCallback(() => {
		onSelectAnswer(null);
	}, [onSelectAnswer]);

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer
					key={questionIdx}
					time={10000}
					onTimeOut={handleTimeOut}
				/>
				<h2>{question.text}</h2>
				<ul id="answers">
					{shuffledAnswers.map((a) => (
						<li key={a} className="answer">
							<button
								type="button"
								onClick={() => onSelectAnswer(a)}
							>
								{a}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Question;
