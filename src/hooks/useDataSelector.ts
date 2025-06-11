import { useSettings } from './useSettings';
import { useMetaData } from './useMetaData';
import { useSheetData } from './useSheetData';
import { Platform } from './usePlatformNavigation';

export const useDataSelector = (
  platform: Platform,
  sheetId: string,
  range: string
) => {
  const { settings } = useSettings();
  const conf = settings.platforms[platform];
  return conf?.mode === 'api'
    ? useMetaData({
        token: conf.apiKey || '',
        accountId: conf.accountId || '',
        fields: conf.metrics,
      })
    : useSheetData(sheetId, range);
};