// @flow
import styles from '../styles/ChoiceButton.module.scss';
import type { Choice, ChoiceIndex } from './ChoiceButton';
import React from 'react';

type Props = {|
  total: number,
  choice: Choice,
  index: ChoiceIndex,
  chosen: boolean,
|};

export default class ChosenButton extends React.Component<Props> {
  render() {
    const choice_class = `${styles.button} pure-button pure-button-disabled pure-u-1 pure-u-md-1-${this.props.total}`;
    return (
      <button className={choice_class}>
        {this.props.choice.text}
      </button>
    );
  }
}

