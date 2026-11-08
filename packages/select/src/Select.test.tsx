/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

describe('Select', () => {
  it('renders a labelled select with string and object options', () => {
    render(<Select id="dept" label="Department" options={['Sales', { value: 'eng', label: 'Engineering' }]}/>);

    const select = screen.getByLabelText('Department');
    expect(select.tagName).toBe('SELECT');
    expect(screen.getByRole('option', { name: 'Sales' })).toHaveValue('Sales');
    expect(screen.getByRole('option', { name: 'Engineering' })).toHaveValue('eng');
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<Select id="dept" label="Department" options={['Sales', 'Legal']} onChange={(e) => onChange(e.target.value)}/>);

    await userEvent.selectOptions(screen.getByLabelText('Department'), 'Legal');
    expect(onChange).toHaveBeenCalledWith('Legal');
  });

  it('shows a placeholder selected by default', () => {
    render(<Select id="dept" label="Department" options={['Sales']} placeholder="Choose…" required/>);

    expect(screen.getByLabelText('Department')).toHaveValue('');
    expect(screen.getByRole('option', { name: 'Choose…' })).toBeDisabled();
  });

  it('links the hint with aria-describedby', () => {
    render(<Select id="dept" label="Department" options={['Sales']} hint="Where the employee works"/>);
    expect(screen.getByLabelText('Department')).toHaveAccessibleDescription('Where the employee works');
  });

  it('adds custom class names', () => {
    render(<Select id="dept" label="Department" options={['Sales']} className="field" selectClassName="input"/>);
    expect(screen.getByLabelText('Department')).toHaveClass('hrnet-select__control', 'input');
    expect(screen.getByLabelText('Department').parentElement).toHaveClass('hrnet-select', 'field');
  });
});
