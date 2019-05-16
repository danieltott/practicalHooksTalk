import React from 'react';
import App from './App';
import {
  render,
  act,
  waitForElement,
  wait,
  fireEvent
} from 'react-testing-library';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    fetch.resetMocks();
  });

  it('Renders a filter form with "Completed" pre-selected', async () => {
    fetch.mockResponses([
      `[{"id": 1,"name": "Leanne Graham"}]`,
      { status: 200 }
    ]);

    const { debug, container, getByLabelText, getByTestId, getByText } = render(
      <App />
    );

    const form = getByTestId('filtersform');
    expect(form).toHaveFormValues({ showCompleted: 'All' });

    fireEvent.click(getByLabelText('Completed'));

    expect(form).toHaveFormValues({ showCompleted: 'Completed' });

    // wait for promise to clear.
    await waitForElement(() => getByText('Leanne Graham'), {
      container
    });
  }, 20000);

  it('Renders a select with user options', async () => {
    fetch.mockResponses([
      `[{"id": 1,"name": "Leanne Graham"}]`,
      { status: 200 }
    ]);

    const { debug, container, getByText, getByTestId } = render(<App />);

    const userOption = await waitForElement(() => getByText('Leanne Graham'), {
      container
    });

    expect(userOption).toBeInTheDocument();

    const form = getByTestId('filtersform');

    expect(form).toHaveFormValues({ user: '' });
  }, 20000);

  it('Loads todos for a user once one is selected', async () => {
    fetch.mockResponses(
      [`[{"id": 1,"name": "Leanne Graham"}]`, { status: 200 }],
      [
        `[{"userId":1,"id":1,"title":"delectus aut autem","completed":false},{"userId":1,"id":2,"title":"quis ut nam facilis et officia qui","completed":false}]`,
        { status: 200 }
      ]
    );

    const { debug, container, getByText, getByTestId } = render(<App />);

    const form = getByTestId('filtersform');

    const userOption = await waitForElement(() => getByText('Leanne Graham'), {
      container
    });

    fireEvent.change(userOption.parentElement, { target: { value: '1' } });

    fireEvent.submit(form);

    const title = await waitForElement(
      () => getByText('Todos for Leanne Graham'),
      { container }
    );

    expect(title).toBeVisible();

    const oneToDo = getByText('(User ID: 1) delectus aut autem');

    expect(oneToDo).toBeVisible();
  }, 20000);
});
