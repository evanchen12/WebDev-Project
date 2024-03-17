import ClickEvent from "./clickEvent";
import PassingDataOnEvent from "./passingDataOnEvent";
import PassingFunctions from "./passingFunctions";
import EventObject from "./eventObject";
import Counter from "./counter";
import BooleanStateVariables from "./booleanStateVariables";
import StringStateVariables from "./stringStateVariables";
import DateStateVariable from "./dateStateVariable";
import ObjectStateVariable from "./objectStateVariable";
import ArrayStateVariable from "./arrayStateVariable";
import ParentStateComponent from "./parentStateComponent";
import ReduxExamples from "./ReduxExamples";

function Assignment4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div className="container">
      <h1>Assignment 4</h1>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello}/>
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
    </div>
  );
}

export default Assignment4;