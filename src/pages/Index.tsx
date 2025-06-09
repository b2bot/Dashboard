
import React, { useMemo } from 'react';
import PlatformNavigation from '@/components/navigation/PlatformNavigation';
import SectionTabs from '@/components/navigation/SectionTabs';
{/*import AdvancedFilters from '@/components/filters/AdvancedFilters';*/}
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import CampaignCharts from '@/components/dashboard/CampaignCharts';
import CampaignTable from '@/components/dashboard/CampaignTable';
import CampaignLevel from '@/components/dashboard/CampaignLevel';
import AdSetLevel from '@/components/dashboard/AdSetLevel';
import AdLevel from '@/components/dashboard/AdLevel';
import { useSheetData } from '@/hooks/useSheetData';
import { useClientManager } from '@/hooks/useClientManager';
import { usePlatformNavigation } from '@/hooks/usePlatformNavigation';
import { useFilters } from '@/hooks/useFilters';
import { useHierarchicalData } from '@/hooks/useHierarchicalData';
import { useHierarchicalNavigation } from '@/hooks/useHierarchicalNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, AlertCircle } from 'lucide-react';
import { isWithinInterval, parseISO } from 'date-fns';

const Index = () => {
  const { currentSheetId } = useClientManager();
  const { currentSheetRange, platformConfig, section } = usePlatformNavigation();
  const { filters } = useFilters();
  const { data, isLoading, error } = useSheetData(currentSheetId, currentSheetRange);
  
  const {
    viewLevel,
    selectedCampaign,
    selectedAdSet,
    handleCampaignClick,
    handleAdSetClick,
    handleBackToCampaigns,
    handleBackToAdSets,
    resetNavigation,
  } = useHierarchicalNavigation();

  // Reset navigation when section changes
  React.useEffect(() => {
    resetNavigation();
  }, [section, resetNavigation]);

  // Apply filters to data
  const filteredData = data?.filter(row => {
    // Account filter
    if (filters.selectedAccount !== 'all' && row.accountName !== filters.selectedAccount) return false;
    
    // Date range filter
    if (filters.dateRange?.from && filters.dateRange?.to && row.day) {
      try {
        const rowDate = parseISO(row.day);
        if (!isWithinInterval(rowDate, { start: filters.dateRange.from, end: filters.dateRange.to })) {
          return false;
        }
      } catch {
        // If date parsing fails, skip this filter
      }
    }
    
    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      let searchableText = '';
      
      // Buscar conforme a aba selecionada
      if (section === 'campanhas') {
        searchableText = row.campaignName?.toLowerCase() || '';
      } else if (section === 'grupos') {
        searchableText = row.adSetName?.toLowerCase() || '';
      } else if (section === 'anuncios') {
        searchableText = row.adName?.toLowerCase() || '';
      }
      
      if (!searchableText.includes(searchLower)) return false;
    }
    
    return true;
  }) || [];

  const { campaignGroups } = useHierarchicalData(filteredData);
  const uniqueAccounts = useMemo(
    () => [...new Set((data || []).map((r) => r.accountName))].filter(Boolean),
    [data]
  );

  // Dynamic grouping based on current section
  const getGroupKey = (section: string): keyof SheetRow => {
    switch (section) {
      case 'grupos':
        return 'adSetName';
      case 'anuncios':
        return 'adName';
      default:
        return 'campaignName';
    }
  };

  const groupKey = getGroupKey(section);

  const groupedData = useMemo(() => {
    const groups: Record<string, SheetRow[]> = {};
    filteredData.forEach((row) => {
      const key = (row[groupKey] as string) || 'Desconhecido';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return groups;
  }, [filteredData, groupKey]);


  const aggregatedData = useMemo(() => {
    return Object.entries(groupedData).map(([key, rows]) => {
      const base = { ...rows[0] } as SheetRow;
      const sum = (field: keyof SheetRow) =>
        rows.reduce((acc, r) => acc + (Number(r[field]) || 0), 0);

      base.impressions = sum('impressions');
      base.clicks = sum('clicks');
      base.amountSpent = sum('amountSpent');
      base.actionMessagingConversationsStarted = sum('actionMessagingConversationsStarted');
      base.costPerActionMessagingConversations = sum('costPerActionMessagingConversations');
      base.actionLinkClicks = sum('actionLinkClicks');
      base.reach = sum('reach');
      base.frequency = sum('frequency');
      base.cpm = rows.reduce((acc, r) => acc + (r.cpm || 0), 0) / rows.length;
      base[groupKey] = key;
      return base;
    });
  }, [groupedData, groupKey]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-0 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-16 mb-2" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
        <PlatformNavigation />
        <SectionTabs accounts={[]} data={[]} />
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
		{/*
          <div className="py-3">
            <AdvancedFilters data={[]} platformName={platformConfig?.name} />
          </div>
		*/}  
          <div className="space-y-4 pb-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="relative">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <div className="absolute -inset-2 bg-blue-600/20 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Carregando insights...</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Conectando com {platformConfig?.name || 'a plataforma'}</p>
                </div>
              </CardContent>
            </Card>
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 transition-colors duration-300">
        <PlatformNavigation />
        <SectionTabs accounts={[]} data={[]} />
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
          {/*<AdvancedFilters data={[]} platformName={platformConfig?.name} />*/}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-700 mt-4">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Erro ao carregar dados</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Não foi possível conectar com {platformConfig?.name}</p>
                <p className="text-sm text-red-600 dark:text-red-400">{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const renderContent = () => {
    if (section === 'campanhas') {
      if (viewLevel === 'campaigns') {
        return <CampaignLevel campaigns={campaignGroups} onCampaignClick={handleCampaignClick} />;
      } else if (viewLevel === 'adsets' && selectedCampaign) {
        return (
          <AdSetLevel
            adSets={selectedCampaign.adSets}
            campaignName={selectedCampaign.campaignName}
            onAdSetClick={handleAdSetClick}
            onBackClick={handleBackToCampaigns}
          />
        );
      } else if (viewLevel === 'ads' && selectedAdSet) {
        return (
          <AdLevel
            ads={selectedAdSet.ads}
            adSetName={selectedAdSet.adSetName}
            campaignName={selectedAdSet.campaignName}
            onBackClick={handleBackToAdSets}
          />
        );
      }
    } else if (section === 'grupos') {
      return <CampaignTable data={aggregatedData} />;
    } else if (section === 'anuncios') {
      return <CampaignTable data={aggregatedData} />;
    }

    return <CampaignTable data={filteredData} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      <PlatformNavigation />
      <SectionTabs accounts={uniqueAccounts} data={filteredData} />
      
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filters and Platform header */}
        <div className="py-3">
          <div className="flex flex-col lg:flex-row gap-3 items-start">
		    {/*
            <div className="flex-1">
              <AdvancedFilters data={data || []} platformName={platformConfig?.name} />
            </div>
			*/}
          </div>
        </div>

        <div className="space-y-4 pb-8">
          
          {/* Metrics Grid - Layout conforme imagem */}
          <MetricsGrid data={filteredData} />
          
          {/* Charts com altura reduzida */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CampaignCharts data={filteredData} />
            </div>
            <div className="lg:col-span-1">
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                <CardContent className="p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="text-sm">Espaço para gráficos adicionais</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Dynamic Content based on section and navigation level */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
