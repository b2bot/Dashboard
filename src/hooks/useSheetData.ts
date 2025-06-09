
import { useQuery } from '@tanstack/react-query';

export interface SheetRow {
  accountName: string;
  campaignName: string;
  adSetName: string;
  adName: string;
  impressions: number;
  clicks: number;
  amountSpent: number;
  actionMessagingConversationsStarted: number;
  costPerActionMessagingConversations: number;
  actionLinkClicks: number;
  reach: number;
  frequency: number;
  cpm: number;
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
          
          // Mapear colunas específicas
          switch (header.toLowerCase()) {
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
              mappedRow.impressions = parseFloat(value) || 0;
              break;
            case 'clicks':
              mappedRow.clicks = parseFloat(value) || 0;
              break;
            case 'amount spent':
              mappedRow.amountSpent = parseFloat(value) || 0;
              break;
            case 'action messaging conversations started (onsite conversion)':
              mappedRow.actionMessagingConversationsStarted = parseFloat(value) || 0;
              break;
            case 'cost per action messaging conversations started (onsite conversion)':
              mappedRow.costPerActionMessagingConversations = parseFloat(value) || 0;
              break;
            case 'action link clicks':
              mappedRow.actionLinkClicks = parseFloat(value) || 0;
              break;
            case 'reach':
              mappedRow.reach = parseFloat(value) || 0;
              break;
            case 'frequency':
              mappedRow.frequency = parseFloat(value) || 0;
              break;
            case 'cpm':
              mappedRow.cpm = parseFloat(value) || 0;
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
