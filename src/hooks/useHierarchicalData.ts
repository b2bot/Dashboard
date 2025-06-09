
import { useMemo } from 'react';
import { SheetRow } from './useSheetData';

export interface CampaignGroup {
  campaignName: string;
  adSets: AdSetGroup[];
  totalImpressions: number;
  totalClicks: number;
  totalSpent: number;
  totalConversions: number;
}

export interface AdSetGroup {
  adSetName: string;
  campaignName: string;
  ads: AdGroup[];
  totalImpressions: number;
  totalClicks: number;
  totalSpent: number;
  totalConversions: number;
}

export interface AdGroup {
  id: string;
  name: string;
  adSetName: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  spent: number;
  conversions: number;
}

export const useHierarchicalData = (data: SheetRow[]) => {
  const campaignGroups = useMemo(() => {
    const groups: Record<string, CampaignGroup> = {};

    data.forEach(row => {
      if (!row.campaignName) return;
      
      if (!groups[row.campaignName]) {
        groups[row.campaignName] = {
          campaignName: row.campaignName,
          adSets: [],
          totalImpressions: 0,
          totalClicks: 0,
          totalSpent: 0,
          totalConversions: 0,
        };
      }

      const campaign = groups[row.campaignName];
      campaign.totalImpressions += row.impressions || 0;
      campaign.totalClicks += row.clicks || 0;
      campaign.totalSpent += row.amountSpent || 0;
      campaign.totalConversions += row.actionMessagingConversationsStarted || 0;

      // Find or create ad set
      let adSet = campaign.adSets.find(as => as.adSetName === row.adSetName);
      if (!adSet && row.adSetName) {
        adSet = {
          adSetName: row.adSetName,
          campaignName: row.campaignName,
          ads: [],
          totalImpressions: 0,
          totalClicks: 0,
          totalSpent: 0,
          totalConversions: 0,
        };
        campaign.adSets.push(adSet);
      }

      if (adSet) {
        adSet.totalImpressions += row.impressions || 0;
        adSet.totalClicks += row.clicks || 0;
        adSet.totalSpent += row.amountSpent || 0;
        adSet.totalConversions += row.actionMessagingConversationsStarted || 0;

        // Create ad entry if adName exists
        if (row.adName) {
          const existingAd = adSet.ads.find(ad => ad.name === row.adName);
          if (!existingAd) {
            adSet.ads.push({
              id: `${row.adSetName}-${row.adName}`,
              name: row.adName,
              adSetName: row.adSetName,
              campaignName: row.campaignName,
              impressions: row.impressions || 0,
              clicks: row.clicks || 0,
              spent: row.amountSpent || 0,
              conversions: row.actionMessagingConversationsStarted || 0,
            });
          }
        }
      }
    });

    return Object.values(groups);
  }, [data]);

  return { campaignGroups };
};
