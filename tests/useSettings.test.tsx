import { renderHook, act, waitFor } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../src/hooks/useSettings';

describe('useSettings persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates and persists platform mode', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updatePlatform('meta', { mode: 'api' });
    });

    await waitFor(() => {
      expect(result.current.settings.platforms.meta.mode).toBe('api');
      const stored = JSON.parse(
        localStorage.getItem('dashboard-settings') || '{}'
      );
      expect(stored.platforms.meta.mode).toBe('api');
    });
  });
});