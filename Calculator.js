export const initialState = {
  currentValue: "0",  //44
  operator: null,     //+
  previousValue: null,
};

export const handleNumber = (value, state) => {
  if (state.currentValue === "0") {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`
  };
};

export const handleEqual = state => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null
  };

  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState
    };
  }

  return state;
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0"
      };
    case "equal":
      return handleEqual(state);
    case "allclear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`
      };
    // case "clear":
    //   let string = displayValue.toString();
    //     let deletestring = string.substring(0, string.length - 1);
    //     let length = string.length;
    //     this.setState({
    //       displayValue: length == 1 ? '' : deletestring,
    //       firstValue: length == 1 ? '' : deletestring,
    //     });
    //     break;
    default:
      return state;
  }
};

export default calculator;