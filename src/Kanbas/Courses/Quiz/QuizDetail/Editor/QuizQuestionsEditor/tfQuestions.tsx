function TFQuestions() {
  return (
    <>
      Enter your question text, then select if True or False is the correct answer.<br/>
      <b><h4>Question:</h4></b>
      <textarea value={"2 + 2 = 4"}/>
      <b><h4>Answer:</h4></b>
      <label><input type="radio" value="COMEDY" name="option"/>True</label><br/>
      <label><input type="radio" value="COMEDY" name="option"/>False</label><br/>
    </>
  )
}

export default TFQuestions;