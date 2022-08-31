//react-redux imports
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux/reducers/reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

//components
import App from "./App";
import QuotesContainer from "./components/Quotes/QuotesContainer/QuotesContainer";
import SelectedQuotesContainer from "./components/Quotes/SelectedQuotes/SelectedQuotes";

const store = createStore(rootReducer, applyMiddleware(thunk));

test('Content at Header of QuotesContainer check', () => {
  render(
    <Provider store={store}>
      <QuotesContainer />
    </Provider>
  )
  const linkElement = screen.getByText(/All quote/i);
  expect(linkElement).toBeInTheDocument();
});

test('The button text color check', () => {
  render(
    <Provider store={store}>
      <SelectedQuotesContainer />
    </Provider>
  )
  const btn = screen.getByText(/add ticker/i);
  expect(btn).toHaveStyle({color: '#2e7d32'});
});

test('Should check whether the card is added to the watching group', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  fireEvent.change(screen.getByTestId("content-input"), {
    target: {value: /AAPL/i}
  });
  fireEvent.click(screen.getByTestId("addTickerBtn"));
  expect(screen.getByTestId("selectedTickersGrid")).toContain(/AAPL/i);
});
