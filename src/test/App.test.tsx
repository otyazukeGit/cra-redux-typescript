import { render, screen, getDefaultNormalizer } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

test('first render', () => {
  // const { getByText } = render(
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('-')).toBeInTheDocument()
  expect(screen.getByRole('button', {name: 'Decrement value'})).toBeInTheDocument()

  const minusButton = screen.getByRole('button', {name: 'Decrement value'})
  expect(minusButton.nextElementSibling?.textContent).toBe("0")

  expect(screen.getByText('+')).toBeInTheDocument()
  expect(screen.getByRole('button', {name: 'Increment value'})).toBeInTheDocument()

  const input = screen.getByRole('textbox', {name: 'Set increment amount'})
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue("2")

  expect(screen.getByRole('button', {name: 'Add Amount'})).toBeInTheDocument()

  expect(screen.getByRole('button', {name: 'Add Async'})).toBeInTheDocument()

  expect(screen.getByRole('button', {name: 'Add If Odd'})).toBeInTheDocument()

  // test Text in App.tsx
  expect(screen.getByText(/Edit/)).toBeInTheDocument();
  expect(screen.getByText(/src\/App.tsx/, {normalizer: getDefaultNormalizer({ trim: false })}  )).toBeInTheDocument();
  expect(screen.getByText(/and save to reload./, {normalizer: getDefaultNormalizer({ trim: false })}  )).toBeInTheDocument();
  /* OR */
  // const Element = screen.getByText(( _content: string, node: Element | null ): boolean => {
  //   return node ? /^Edit src\/App\.tsx and save to reload\.$/.test(node.textContent || '') : false
  // });
  // expect(Element).toBeInTheDocument()
  expect(_getByNestedText('Edit src\/App\.tsx and save to reload\.')).toBeInTheDocument();
  
  expect(_getByNestedText('Learn React, Redux, Redux Toolkit, and React Redux')).toBeInTheDocument();

  expect(screen.getByText('React').closest('a')).toHaveAttribute('href', 'https://reactjs.org/')
  expect(screen.getByText('Redux').closest('a')).toHaveAttribute('href', 'https://redux.js.org/')
  expect(screen.getByText('Redux Toolkit').closest('a')).toHaveAttribute('href', 'https://redux-toolkit.js.org/')
  expect(screen.getByText('React Redux').closest('a')).toHaveAttribute('href', 'https://react-redux.js.org/')

});

/** 
 * A custom query of getByText.
 * It gets a element has full text in nested tags.
 * 
 * parameter
 *  text: should be escaped for Regex
 */ 
const _getByNestedText = (text: string): HTMLElement => {
  const regex = new RegExp("^" + text + "$")
  return screen.getByText(( _content: string, node: Element | null ): boolean => {
    return node ? regex.test(node.textContent || '') : false
  })
}


test('user action', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  /* <span> 0 </span> */
  // click minus button
  const minusButton = screen.getByRole('button', {name: 'Decrement value'})
  for (let i=0; i<3; i++){
    userEvent.click(minusButton)
  }
  expect(minusButton.nextElementSibling?.textContent).toBe("-3")

  /* <span> -3 </span> */
  // click plus button
  const plusButton = screen.getByRole('button', {name: 'Increment value'})
  for (let i=0; i<6; i++){
    userEvent.click(plusButton)
  }
  expect(plusButton.previousElementSibling?.textContent).toBe("3")

  /* <span> 3 </span> */
  /* <input value="2" /> */
  // change the value of text box 
  const input = screen.getByRole('textbox', {name: 'Set increment amount'})
  userEvent.type(input, "5")
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue("5")

  /* <span> 3 </span> */
  /* <input value="5" /> */
  // click [Add Amount] button
  const addAmountButton = screen.getByRole('button', {name: 'Add Amount'})
  userEvent.click(addAmountButton)
  expect(plusButton.previousElementSibling?.textContent).toBe("8")

  /* <span> 8 </span> */
  /* <input value="5" /> */
  // click [Add Async] button
  const addAsyncButton = screen.getByRole('button', {name: 'Add Async'})
  userEvent.click(addAsyncButton)
  // counterAPI will take 0.5 seconds and change the state.
  await new Promise(resolve => setTimeout(resolve, 1000))
  expect(plusButton.previousElementSibling?.textContent).toBe("13")

  /* <span> 13 </span> */
  /* <input value="5" /> */
  // click [Add If Odd] button
  const addIfOddButton = screen.getByRole('button', {name: 'Add If Odd'})
  userEvent.click(addIfOddButton)
  expect(plusButton.previousElementSibling?.textContent).toBe("18")  //from 13
  // click [Add If Odd] button
  userEvent.click(addIfOddButton)
  expect(plusButton.previousElementSibling?.textContent).toBe("18")  //from 18 (no change)

})
