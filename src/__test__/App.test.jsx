import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { describe } from 'vitest';

describe('App', () => {
  it('renders initial state', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('enter task');
    const button = screen.getByText('Create');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('creates a task', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('enter task');
    const button = screen.getByText('Create');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(button);

    const taskItem = screen.getByText('Buy milk');

    expect(taskItem).toBeInTheDocument();
  });

  it('deletes a task', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('enter task');
    const button = screen.getByText('Create');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(button);

    const taskItem = screen.getByText('Buy milk');
    const deleteButton = screen.getByText('Delete');

    fireEvent.click(deleteButton);

    expect(taskItem).not.toBeInTheDocument();
  });

  it('edits a task', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('enter task');
    const button = screen.getByText('Create');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(button);

    const editButton = screen.getByText('Edit');

    fireEvent.click(editButton);

    expect(screen.getByDisplayValue('Buy milk')).toBeInTheDocument(); // Check for pre-filled value

    fireEvent.change(input, { target: { value: 'Buy eggs' } });
    fireEvent.click(button); // Now the button should trigger editTask

    expect(screen.getByText('Buy eggs')).toBeInTheDocument();
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument(); // Check for updated task
  });

  it('toggles task completion', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('enter task');
    const button = screen.getByText('Create');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(button);

    const taskItem = screen.getByText('Buy milk');
    const checkbox = screen.getByLabelText('Mark as complete');

    expect(taskItem).not.toHaveClass('completed');

    fireEvent.click(checkbox);

    expect(taskItem).toHaveClass('completed');
  });
});
