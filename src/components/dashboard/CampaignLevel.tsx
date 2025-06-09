
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Eye, Users, MousePointer, DollarSign } from 'lucide-react';
import { CampaignGroup } from '@/hooks/useHierarchicalData';

interface CampaignLevelProps {
  campaigns: CampaignGroup[];
  onCampaignClick: (campaign: CampaignGroup) => void;
}

const CampaignLevel = ({ campaigns, onCampaignClick }: CampaignLevelProps) => {
  const formatNumber = (num: number) => num ? new Intl.NumberFormat('pt-BR').format(num) : '0';
  const formatCurrency = (num: number) => num ? new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(num) : 'R$ 0,00';

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.campaignName} className="hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.campaignName}</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {campaign.adSets.length} grupos
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Impressões</p>
                      <p className="font-semibold">{formatNumber(campaign.totalImpressions)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Cliques</p>
                      <p className="font-semibold">{formatNumber(campaign.totalClicks)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Gasto</p>
                      <p className="font-semibold">{formatCurrency(campaign.totalSpent)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Conversões</p>
                      <p className="font-semibold">{formatNumber(campaign.totalConversions)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCampaignClick(campaign)}
                className="ml-4 hover:bg-gray-100"
              >
                Ver grupos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignLevel;
