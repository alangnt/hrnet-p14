import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from './App.tsx';
import { useEmployeeStore } from './store/employees.ts';

describe('App', () => {
  beforeEach(() => {
    useEmployeeStore.setState({ employees: [] });
  });

  it('saves the employee and shows the confirmation modal', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App/></MemoryRouter>);

    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Smith');
    await user.type(screen.getByLabelText('Date of Birth'), '1985-04-12');
    await user.type(screen.getByLabelText('Start Date'), '2024-01-15');
    await user.type(screen.getByLabelText('Street'), '10 Elm St');
    await user.type(screen.getByLabelText('City'), 'Austin');
    await user.selectOptions(screen.getByLabelText('State'), 'TX');
    await user.type(screen.getByLabelText('Zip Code'), '73301');
    await user.selectOptions(screen.getByLabelText('Department'), 'Engineering');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('dialog', { name: 'Employee Created!' })).toBeInTheDocument();
    expect(useEmployeeStore.getState().employees[0]).toMatchObject({
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
    render(<MemoryRouter><App/></MemoryRouter>);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(useEmployeeStore.getState().employees).toHaveLength(0);
  });
});
