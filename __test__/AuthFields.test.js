import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

const title = 'Logga in';
let auth = {};
const setAuth = (newAuth) => {
  auth = newAuth;
};
const mockSubmit = jest.fn();
const navigation = () => false;

const authFields = (
  <AuthFields
    auth = {auth}
    setAuth={setAuth}
    submit={mockSubmit}
    title={title}
    navigation={navigation}
  />
);

test('Testing Authfields contain textinput for email and pw', async () => {
  const { getByTestId } = render(authFields);
  const emailField = await getByTestId('email-field');
  const pwField = await getByTestId('pw-field');
  
  expect(emailField).toBeDefined();
  expect(pwField).toBeDefined();
});

test('Testing auth field for login contains components using title', async () => {
  const { getAllByText, debug } = render(authFields);
  
  //debug('AuthFields');

  const titleElements = await getAllByText(title);

  expect(titleElements.length).toBe(2);
});

test('Testing authfields button is rendered', async () => {
  const { getByA11yLabel } = render(authFields);
  const a11yLabel = `${title} genom att klicka`;

  const submitButton = await getByA11yLabel(a11yLabel);

  expect(submitButton).toBeDefined();
});

test("Testing text fields changes text on input", async () => {
  const { getByTestId } = render(authFields);
  const emailField = await getByTestId('email-field');
  const pwField = await getByTestId('pw-field');
  const fakeEmail = '2asda@ks.se';
  const fakePw = 'Abc123.';

  fireEvent.changeText(emailField, fakeEmail);
  expect(auth?.email).toEqual(fakeEmail);

  fireEvent.changeText(pwField, fakePw);
  expect(auth?.password).toEqual(fakePw);
});

test('Submit button calls function', async () => {
  const { getByA11yLabel } = render(authFields);
  const a11yLabel = `${title} genom att klicka`;

  const submitButton = await getByA11yLabel(a11yLabel);

  fireEvent.press(submitButton);
  expect(mockSubmit).toHaveBeenCalled();
});