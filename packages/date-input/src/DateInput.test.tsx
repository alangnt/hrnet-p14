/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DateInput from './DateInput';
import { toDateValue } from './toDateValue';

describe('DateInput', () => {
  it('renders a labelled native date input', () => {
    render(<DateInput id="start" label="Start Date"/>);
    expect(screen.getByLabelText('Start Date')).toHaveAttribute('type', 'date');
  });

  it('accepts Date objects for min and max', () => {
    render(<DateInput id="start" label="Start Date" min={new Date(2020, 0, 5)} max="2030-12-31"/>);

    const input = screen.getByLabelText('Start Date');
    expect(input).toHaveAttribute('min', '2020-01-05');
    expect(input).toHaveAttribute('max', '2030-12-31');
  });

  it('calls onChange with the YYYY-MM-DD value', () => {
    const onChange = vi.fn();
    render(<DateInput id="start" label="Start Date" onChange={(e) => onChange(e.target.value)}/>);

    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2024-03-15' } });
    expect(onChange).toHaveBeenCalledWith('2024-03-15');
  });

  it('links the hint with aria-describedby', () => {
    render(<DateInput id="start" label="Start Date" hint="First day at work"/>);
    expect(screen.getByLabelText('Start Date')).toHaveAccessibleDescription('First day at work');
  });

  it('formats dates in local time', () => {
    expect(toDateValue(new Date(1999, 11, 31))).toBe('1999-12-31');
    expect(toDateValue('2024-01-01')).toBe('2024-01-01');
    expect(toDateValue(undefined)).toBeUndefined();
  });
});
