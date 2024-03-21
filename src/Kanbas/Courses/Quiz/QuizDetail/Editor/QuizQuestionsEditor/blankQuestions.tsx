function BlankQuestions() {
  return (
    <>
      Enter your question text, then define all possible correct answers for the blank.
      Students will see the question followed by a small text box to type their answer.<br/>
      <b><h4>Question:</h4></b>
      <textarea value={"2 + 2 = ____"}/>
      <b><h4>Answers:</h4></b>
      <button>Add another Answer</button>
    </>
  )
}

export default BlankQuestions;