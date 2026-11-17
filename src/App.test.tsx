import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { setupStore, type AppStore } from './store/store.ts';
import { selectEmployees } from './store/employees.ts';

async function fillForm(user: UserEvent, overrides: { firstName?: string; lastName?: string; city?: string } = {}) {
  await user.type(screen.getByLabelText('First Name'), overrides.firstName ?? 'Jane');
  await user.type(screen.getByLabelText('Last Name'), overrides.lastName ?? 'Smith');
  await user.type(screen.getByLabelText('Date of Birth'), '1985-04-12');
  await user.type(screen.getByLabelText('Start Date'), '2024-01-15');
  await user.type(screen.getByLabelText('Street'), '10 Elm St');
  await user.type(screen.getByLabelText('City'), overrides.city ?? 'Austin');
  await user.selectOptions(screen.getByLabelText('State'), 'TX');
  await user.type(screen.getByLabelText('Zip Code'), '73301');
  await user.selectOptions(screen.getByLabelText('Department'), 'Engineering');
}

describe('App', () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore({ employees: { employees: [] } });
    render(<Provider store={store}><MemoryRouter><App/></MemoryRouter></Provider>);
  });

  it('saves the employee and shows the confirmation modal', async () => {
    const user = userEvent.setup();

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('dialog', { name: 'Employee Created!' })).toBeInTheDocument();
    expect(selectEmployees(store.getState())[0]).toMatchObject({
      firstName: 'Jane',
      lastName: 'Smith',
      state: 'TX',
      department: 'Engineering',
      zipCode: '73301',
    });

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not save an incomplete form', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(selectEmployees(store.getState())).toHaveLength(0);
  });

  it.each([
    ['First Name', { firstName: 'Jane2' }],
    ['Last Name', { lastName: 'Sm1th' }],
    ['City', { city: 'Austin 9' }],
  ])('rejects numbers in the %s field', async (label, overrides) => {
    const user = userEvent.setup();

    await fillForm(user, overrides);
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByLabelText(label)).toBeInvalid();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(selectEmployees(store.getState())).toHaveLength(0);
  });
});
