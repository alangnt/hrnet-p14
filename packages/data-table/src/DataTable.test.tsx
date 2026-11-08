/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable, { type Column } from './DataTable';

type Row = { id: string; name: string; city: string };

const columns: Column<Row>[] = [
  { title: 'Name', data: 'name' },
  { title: 'City', data: 'city' },
];

const data: Row[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  name: `Person ${String(i + 1).padStart(2, '0')}`,
  city: i % 2 === 0 ? 'Paris' : 'Lyon',
}));

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]).getAllByRole('row');

describe('DataTable', () => {
  it('paginates rows', async () => {
    render(<DataTable columns={columns} data={data}/>);

    expect(bodyRows()).toHaveLength(10);
    expect(screen.getByText('Showing 1 to 10 of 12 entries')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(bodyRows()).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('filters rows with the search input', async () => {
    render(<DataTable columns={columns} data={data}/>);

    await userEvent.type(screen.getByRole('searchbox'), 'lyon');
    expect(bodyRows()).toHaveLength(6);
    expect(screen.getByText(/filtered from 12 total entries/)).toBeInTheDocument();

    await userEvent.clear(screen.getByRole('searchbox'));
    await userEvent.type(screen.getByRole('searchbox'), 'nobody');
    expect(screen.getByText('No matching records found')).toBeInTheDocument();
  });

  it('sorts rows when clicking a column header', async () => {
    render(<DataTable columns={columns} data={data}/>);
    const nameHeader = screen.getByRole('columnheader', { name: /Name/ });

    await userEvent.click(within(nameHeader).getByRole('button'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(bodyRows()[0]).toHaveTextContent('Person 01');

    await userEvent.click(within(nameHeader).getByRole('button'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    expect(bodyRows()[0]).toHaveTextContent('Person 12');
  });

  it('shows an empty message without data', () => {
    render(<DataTable columns={columns} data={[]}/>);
    expect(screen.getByText('No data available in table')).toBeInTheDocument();
  });

  it('uses custom cell renderers and messages', () => {
    render(
      <DataTable
        columns={[{ title: 'Name', data: 'name', render: (row: Row) => <strong>{row.name.toUpperCase()}</strong> }]}
        data={data.slice(0, 1)}
      />
    );
    expect(screen.getByText('PERSON 01').tagName).toBe('STRONG');
  });

  it('does not render a sort button on non sortable columns', () => {
    render(<DataTable columns={[{ title: 'Name', data: 'name', sortable: false }]} data={data}/>);
    const header = screen.getByRole('columnheader', { name: 'Name' });
    expect(within(header).queryByRole('button')).not.toBeInTheDocument();
  });

  it('changes the page size', async () => {
    render(<DataTable columns={columns} data={data} pageSizes={[5, 10]}/>);
    expect(bodyRows()).toHaveLength(5);

    await userEvent.selectOptions(screen.getByLabelText(/Show/), '10');
    expect(bodyRows()).toHaveLength(10);
  });

  it('adds custom class names', () => {
    render(<DataTable columns={columns} data={data} classNames={{ root: 'my-table', button: 'my-button' }} searchable={false}/>);
    expect(document.querySelector('.hrnet-table')).toHaveClass('my-table');
    expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('hrnet-table__button', 'my-button');
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });
});
