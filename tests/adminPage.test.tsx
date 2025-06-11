import { render } from '@testing-library/react';
import { SettingsProvider } from '../src/hooks/useSettings';
import Admin from '../src/pages/Admin';
import { BrowserRouter } from 'react-router-dom';

const renderPage = () =>
  render(
    <BrowserRouter>
      <SettingsProvider>
        <Admin />
      </SettingsProvider>
    </BrowserRouter>
  );

describe('Admin page interactions', () => {
  it('renders dashboard title', () => {
    const { getByText } = renderPage();
    expect(getByText('Admin Dashboard')).toBeInTheDocument();
  });
});