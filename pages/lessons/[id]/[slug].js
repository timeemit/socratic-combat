// @flow
import type { Context } from '../../../types/context';
import type { LessonType } from '../../../components/LessonView';
import type { QuestionType } from '../../../components/QuestionView';
import type { Props as Params } from '../../../components/ChallengeView';

import React from 'react';
import Page from '../../../components/Page';
import { ChoiceIndices } from '../../../components/ChoiceButton';
import { LessonFetch } from '../../../models/Lesson';
import { QuestionFetch } from '../../../models/Question';
import ChallengeView from '../../../components/ChallengeView';

export async function getServerSideProps(context: Context): Promise<{|props: Params|}> {
  const { id } = context.params;  // Ignore title param
  const lesson = LessonFetch(+id);
  const question = QuestionFetch(+id);
  return { props: {lesson, question} }
}

export default (params: Params) => {
  return (
    <Page title={params.lesson.title}>
      <div className="pure-u-1 centered-text">
        <ChallengeView lesson={params.lesson} question={params.question} />
      </div>
    </Page>
  );
}
