import BeemerTest from './BeemerTest';

enum QuestionType {
    YesNo,              // Yes or No
    Scale,              // 1-10
    AgreeDisagree,      // Strongly Disagree - Neutral - Strongly Agree
    SelectAllThatApply, // A,B,and C
    RankOrder,          // A=1,B=2
    MultipleChoice,     // ABCD
};

const test: BeemerTest = new BeemerTest();