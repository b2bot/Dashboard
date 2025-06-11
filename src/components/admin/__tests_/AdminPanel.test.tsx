import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminPanel from '../AdminPanel';
import { describe, it, expect } from 'vitest';

const queryClient = new QueryClient();

describe('AdminPanel', () => {
  it('renders platform sections', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AdminPanel />
      </QueryClientProvider>
    );

    expect(screen.getByText('Meta Ads')).toBeTruthy();
    expect(screen.getByText('Google Ads')).toBeTruthy();
    expect(screen.getByText('LinkedIn Ads')).toBeTruthy();
    expect(screen.getByText('Google Analytics')).toBeTruthy();
  });
});
