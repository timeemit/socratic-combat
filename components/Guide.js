// @flow
import type { Choice, ChoiceIndex } from './ChoiceButton';
import type { Question } from './QuestionView';
import type { AnsweredQuestion } from './AnsweredQuestionView';
import React from 'react';
import ChoiceButton, { ChoiceIndices } from './ChoiceButton';
import QuestionView from './QuestionView';
import AnsweredQuestionView from './AnsweredQuestionView';

type State = {
  question: Question,
  answered: Array<AnsweredQuestion>,
}

export default class Guide extends React.Component<{}, State> {
  state: State = {
    question: {
      text: "What is Socratic Combat?",
      choices: {
        [ChoiceIndices.first]: {text: "A pizza delivery company"},
        [ChoiceIndices.second]: {text: "An online consultancy"},
        [ChoiceIndices.third]: {text: "A free learning platform"},
      },
      correct_choice: ChoiceIndices.third,
    },
    answered: [],
  }

  onChoice = (choice: ChoiceIndex): void => {
    let { answered } = this.state;
    const answer = { ...this.state.question, chosen_choice: choice};
    answered.push(answer);
    this.setState({ answered });
    return;
  }

  render() {
    const resources = [
      {text: "A useful webpage", url: "#link"},
      {text: "Another cool page", url: "#link"},
    ];
    const resources_list = resources.map(resource =>
      <li key={resource.url}>
        <a href={resource.url}>{resource.text}</a>
      </li>
    );
    console.log(this.state.answered);
    const answered_list = this.state.answered.map((answered_question, index) =>
      <AnsweredQuestionView
        key={index}
        question={answered_question}
      />
    );
    return (
      <main>
        {answered_list}
        <QuestionView
          key={-1}
          question={this.state.question}
          onChoice={this.onChoice}
        />
      </main>
    );
  }
}
