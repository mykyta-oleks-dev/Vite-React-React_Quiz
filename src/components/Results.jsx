import QUESTIONS from '../questions';
import quizComplete from '../assets/quiz-complete.png';

const Results = ({ userAnswers }) => {
	const total = QUESTIONS.length;

	const skipped = userAnswers.filter((a) => !a).length;
	const correct = QUESTIONS.filter((q, idx) => {
		const userAnswer = userAnswers[idx];
		return q.answers[0] === userAnswer;
	}).length;

	const skippedPercent = Math.round((skipped / total) * 100);
	const correctPercent = Math.round((correct / total) * 100);

	return (
		<div id="summary">
			<img src={quizComplete} alt="quiz-complete" />
			<h2>Quiz is complete!</h2>
			<div id="summary-stats">
				<p>
					<span className="number">{skippedPercent}%</span>
					<span className="text">skipped</span>
				</p>
				<p>
					<span className="number">{correctPercent}%</span>
					<span className="text">answered correctly</span>
				</p>
				<p>
					<span className="number">
						{100 - skippedPercent - correctPercent}%
					</span>
					<span className="text">answered inccorrectly</span>
				</p>
			</div>
			<ol>
				{QUESTIONS.map(({ id, text, answers }, idx) => {
					const userAnswer = userAnswers[idx];
					const actualAnswer = answers[0];

					const isCorrect = userAnswer === actualAnswer;
					const isSkipped = !userAnswer;

					return (
						<li key={id}>
							<h3>{idx + 1}</h3>
							<p className="question">{text}</p>
							{!isSkipped && (
								<p
									className={`user-answer ${
										isCorrect ? 'correct' : 'wrong'
									}`}
								>
									{userAnswer}
								</p>
							)}
							{!isCorrect && !isSkipped && (
								<p className="user-answer correct">
									{actualAnswer}
								</p>
							)}
							{isSkipped && (
								<p className="user-answer skipped">
									{actualAnswer}
								</p>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default Results;
