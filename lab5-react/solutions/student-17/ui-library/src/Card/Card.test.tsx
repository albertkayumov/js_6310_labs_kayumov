import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card Component', () => {
  test('renders children content', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card className="custom-class">Test Content</Card>);
    
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('card');
    expect(cardElement).toHaveClass('custom-class');
  });

  test('handles click event', async () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    
    const cardElement = screen.getByTestId('card');
    await userEvent.click(cardElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('uses custom test id when provided', () => {
    render(<Card data-testid="custom-card">Test Content</Card>);
    
    const cardElement = screen.getByTestId('custom-card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('card');
  });
});