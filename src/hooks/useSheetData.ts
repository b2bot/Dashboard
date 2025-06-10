
import { useQuery } from '@tanstack/react-query';

const parseNumber = (value: string): number => {
  if (!value) return 0;
  const normalized = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized) || 0;
};

export interface SheetRow {
  accountName: string;
  campaignName: string;
  adSetName: string;
  adName: string;
  impressions: number;
  clicks: number;
  amountSpent: number;
  cpm: number;
  cpc: number;
  ctr: number;
  actionMessagingConversationsStarted: number;
  costPerActionMessagingConversations: number;
  actionLinkClicks: number;
  reach: number;
  frequency: number;
  messagingConversations: number;
  devicePlatform: string;
  conversionDevice: string;
  adCreativeName: string;


  thumbnailUrl: string;
  day: string;
  [key: string]: unknown; // Para outras colunas que possam existir
}

export const useSheetData = (sheetId: string, range: string = 'Meta!A1:Z') => {
  return useQuery({
    queryKey: ['sheetData', sheetId, range],
    queryFn: async (): Promise<SheetRow[]> => {
      const response = await fetch(
        `https://gsheets-api-1bdv.vercel.app/api/sheets?sheetId=${sheetId}&range=${range}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch sheet data');
      }

      const json = await response.json();
      const rawData: string[][] = Array.isArray(json?.data) ? json.data : [];

      if (rawData.length === 0) return [];

      const headers = rawData[0];
      const rows = rawData.slice(1);

      return rows.map((row: string[]) => {
        const mappedRow: Record<string, unknown> = {};
        
        headers.forEach((header: string, index: number) => {
          const value = row[index] || '';
          const headerKey = header.toLowerCase();

          // Mapear colunas específicas utilizando o nome exato do cabeçalho
          switch (headerKey) {
            case 'account name':
              mappedRow.accountName = value;
              break;
            case 'campaign name':
              mappedRow.campaignName = value;
              break;
            case 'adset name':
              mappedRow.adSetName = value;
              break;
            case 'ad name':
              mappedRow.adName = value;
              break;
            case 'impressions':
              mappedRow.impressions = parseNumber(value);
              break;
            case 'clicks':
              mappedRow.clicks = parseNumber(value);
              break;
            case 'spend (cost, amount spent)':
            case 'amount spent':
              mappedRow.amountSpent = parseNumber(value);
              break;
            case 'cpm (cost per 1000 impressions)':
            case 'cpm':
              mappedRow.cpm = parseNumber(value);
              break;
            case 'cpc (cost per click)':
            case 'cpc':
              mappedRow.cpc = parseNumber(value);
              break;
            case 'ctr (clickthrough rate)':
            case 'ctr':
              mappedRow.ctr = parseNumber(value);
              break;
            case 'action messaging conversations started (onsite conversion)':
              mappedRow.actionMessagingConversationsStarted = parseNumber(value);
              mappedRow.messagingConversations = parseNumber(value);
              break;
            case 'cost per action messaging conversations started (onsite conversion)':
              mappedRow.costPerActionMessagingConversations = parseNumber(value);
              break;
            case 'action link clicks':
              mappedRow.actionLinkClicks = parseNumber(value);
              break;
            case 'messaging conversations':
              mappedRow.messagingConversations = parseNumber(value);
              break;
            case 'device platform':
              mappedRow.devicePlatform = value;
              break;
            case 'conversion device':
              mappedRow.conversionDevice = value;
              break;
            case 'reach':
              mappedRow.reach = parseNumber(value);
              break;
            case 'frequency':
              mappedRow.frequency = parseNumber(value);
              break;
            case 'ad creative name':
              mappedRow.adCreativeName = value;
              break;
            case 'thumbnail url':
              mappedRow.thumbnailUrl = value;
              break;
            case 'day':
            case 'date':
              mappedRow.day = value;
              break;
            default:
              // Manter outras colunas como estão
              mappedRow[header] = value;
          }
        });

        return mappedRow as SheetRow;
      });
    },
    enabled: !!sheetId,
  });
};
