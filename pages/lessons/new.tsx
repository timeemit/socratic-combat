// @format
import styles from '../../styles/NewLesson.module.scss';
import { EditorState } from 'draft-js';
import { ChoiceIndex, ChoiceIndices } from '../../types/ChoiceTypes';

import React from 'react';
import EditableText from '../../components/EditableText';
import LessonEditor from '../../components/LessonEditor';
import { QuestionEditor, QuestionState } from '../../components/QuestionEditor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import createEditorStateWithText from '../../utils/createEditorStateWithText';

interface State {
  title: EditorState,
  questions: Array<QuestionState>,
}

export default class MyEditor extends React.Component<{}, State> {
  state: State = {
    title: createEditorStateWithText("Your Next Lesson"),
    questions: [{
      text: createEditorStateWithText("Whose quote is this?"),
      choices: {
        [ChoiceIndices.first]: {
          text: createEditorStateWithText("Heroditus"),
          response: createEditorStateWithText("No, but Heroditus is well-known for his medical oath"),
        },
        [ChoiceIndices.second]: {
          text: createEditorStateWithText("Socrates"),
          response: createEditorStateWithText("Yes! And Socrates loved learning through inquiry"),
        },
        [ChoiceIndices.third]: {
          text: createEditorStateWithText("Euclid"),
          response: createEditorStateWithText("No, but Euclid wrote the foundational treatise for Geometry"),
        }
      },
      correct: ChoiceIndices.second,
    }],
  }

  onChangeTitle = (title: EditorState) => {
    this.setState({title});
  }

  onQuestionChange = (index: number, text: EditorState, correct: ChoiceIndex) => {
    this.setState((state) => {
      const {questions} = this.state;
      questions[index].text = text;
      return {...state, questions};
    });
  }

  onChoiceChange = (questionIndex: number, choiceIndex: ChoiceIndex, text: EditorState, response: EditorState) => {
    this.setState((state) => {
      const {questions} = this.state;
      questions[questionIndex].choices[choiceIndex] = {text, response};
      return {...state, questions};
    });
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-8 marginal">
          <strong>Lesson Title</strong>
        </div>
        <h1 className={`pure-u-7-8 header`}>
          <EditableText editorState={this.state.title} onChange={this.onChangeTitle} />
        </h1>
        <hr className="pure-u-1" />
        <div className="pure-u-1-8 marginal"><strong>Lesson Content</strong></div>
        <div className="pure-u-7-8"><LessonEditor /></div>
        <hr className="pure-u-1" />
        {this.renderQuestions()}
        <hr className="pure-u-1" />
        <div className={`pure-u-1 pure-button-group ${styles.buttonGroup}`} role="group" aria-label="Controls">
          <button className="pure-button"><FontAwesomeIcon icon="plus" transform="left-2" /> Add Question</button>
          <button className="pure-button pure-button-primary">Preview</button>
        </div>
        <br />
        <div className={`pure-u-1 pure-button-group ${styles.buttonGroup}`} role="group" aria-label="Exit">
          <button className={`pure-button ${styles.cancel}`}>Discard Lesson</button>
          <button className="pure-button">Save For Later</button>
        </div>
      </div>
    );
  }

  renderQuestions() {
    return this.state.questions.map((question, i) => {
      const {text, choices, correct} = question;
      return <QuestionEditor
        key={i}
        index={i}
        text={text}
        choices={choices}
        correct={correct}
        onQuestionChange={this.onQuestionChange}
        onChoiceChange={this.onChoiceChange} />
    });
  }
}
