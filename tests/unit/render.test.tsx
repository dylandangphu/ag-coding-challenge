import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Home from "../../pages/index";

describe('Home page rendering test', () => {

  render(<Home />)
  
  test('main content is rendered', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});