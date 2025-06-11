import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { SettingsProvider } from '../src/hooks/useSettings';
import { useDataSelector } from '../src/hooks/useDataSelector';
import * as meta from '../src/hooks/useMetaData';
import * as sheet from '../src/hooks/useSheetData';

vi.mock('../src/hooks/useMetaData');
vi.mock('../src/hooks/useSheetData');

describe('useDataSelector', () => {
  beforeEach(() => {
    (meta.useMetaData as unknown as vi.Mock).mockReturnValue({ data: [] });
    (sheet.useSheetData as unknown as vi.Mock).mockReturnValue({ data: [] });
    localStorage.clear();
  });

  it('uses Meta API when mode is api', () => {
    localStorage.setItem(
      'dashboard-settings',
      JSON.stringify({ platforms: { meta: { mode: 'api', apiKey: 'k', accountId: '1', metrics: [] } } })
    );
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    renderHook(() => useDataSelector('meta', 'id', 'range'), { wrapper });
    expect(meta.useMetaData).toHaveBeenCalled();
    expect(sheet.useSheetData).not.toHaveBeenCalled();
  });

  it('uses Sheets when mode is sheets', () => {
    localStorage.setItem(
      'dashboard-settings',
      JSON.stringify({ platforms: { meta: { mode: 'sheets', metrics: [] } } })
    );
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    renderHook(() => useDataSelector('meta', 'id', 'range'), { wrapper });
    expect(sheet.useSheetData).toHaveBeenCalled();
  });
});