import { useState } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import Results from './Results';

const Quiz = () => {
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestion = userAnswers.length;

	const question = QUESTIONS[activeQuestion];

	if (!question) return <Results userAnswers={userAnswers} />;

	const handleAddUserAnswer = (answer) => {
		setUserAnswers((answers) => [...answers, answer]);
	};

	return (
		<Question
			key={activeQuestion}
			question={question}
			onSelectAnswer={handleAddUserAnswer}
		/>
	);
};

export default Quiz;
