// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import logo from './logo.svg';
import './css/App.css';
// import { EnhancedUser } from './HOCAddDispatch';
import { OPERAND_KEYS, OPERATOR_KEYS } from './keys';
import OperandKey from './components/OperandKey';
import OperatorKey from './components/OperatorKey';
import Results from './components/Results';
import type { State, OperatorCalcKey, OperandCalcKey } from './types';

type Props = {
  userInput: string,
  sendOperatorToStack: typeof actions.sendOperatorToStack,
  addInputToStack: typeof actions.addInputToStack,
  removeFromStack: typeof actions.removeFromStack,
  sendOperandToStack: typeof actions.sendOperandToStack,
};

class App extends Component<*, Props, *> {
  sendOperator = (calcKey: OperatorCalcKey) => {
    const { userInput } = this.props;
    if (calcKey.keyValue === 'Enter') {
      this.props.addInputToStack(userInput);
    } else if (calcKey.keyValue === 'Backspace') {
      this.props.removeFromStack(userInput);
    } else {
      this.props.sendOperatorToStack(calcKey, userInput);
    }
    this.scrollToBottom();
  };

  sendOperand = (calcKey: OperandCalcKey) => {
    this.props.sendOperandToStack(calcKey);
    this.scrollToBottom();
  };
  scrollToBottom() {
    const resultPanel = document.getElementsByClassName('Result-panel')[0];
    resultPanel.scrollTop = resultPanel.scrollHeight;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>RPN Calc</h2>
        </div>
        <p className="App-intro">
          This calcuator functions like an RPN calculator.
        </p>
        <Results />
        {/* <EnhancedUser name="Mark" status="active" /> */}
        <div
          style={{
            display: 'grid',
            'grid-template-columns': '2fr 1fr',
          }}
        >
          <div
            style={{
              display: 'grid',
              'grid-template-columns': 'repeat(4, 1fr)',
            }}
          >
            {Object.keys(OPERATOR_KEYS).map(key => (
              <OperatorKey
                key={key}
                calcKey={OPERATOR_KEYS[key]}
                sendOperatorKey={this.sendOperator}
              />
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              'grid-template-columns': 'repeat(3, 1fr)',
            }}
          >
            {Object.keys(OPERAND_KEYS).map(key => (
              <OperandKey
                key={key}
                calcKey={OPERAND_KEYS[key]}
                sendOperandKey={this.sendOperand}
              />
            ))}
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  userInput: state.input,
});

export default connect(mapStateToProps, actions)(App);
