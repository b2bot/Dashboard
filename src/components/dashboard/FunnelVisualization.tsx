import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetRow } from '@/hooks/useSheetData';

interface FunnelVisualizationProps {
  data: SheetRow[];
}

const metricOptions = [
  { value: 'clicks', label: 'Cliques' },
  { value: 'actionLinkClicks', label: 'Link Clicks' },
  { value: 'actionMessagingConversationsStarted', label: 'Conversas' },
  { value: 'messagingConversations', label: 'Mensagens' },
];

const formatNumber = (num: number) =>
  num ? new Intl.NumberFormat('pt-BR').format(num) : '0';
const formatCurrency = (num: number) =>
  num
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
    : 'R$ 0,00';

const FunnelVisualization = ({ data }: FunnelVisualizationProps) => {
  const [middleMetric, setMiddleMetric] = useState('clicks');
  const [bottomMetric, setBottomMetric] = useState('actionMessagingConversationsStarted');

  const totals = useMemo(() => {
    const sum = (field: keyof SheetRow) =>
      data.reduce((acc, row) => acc + (Number(row[field]) || 0), 0);

    return {
      impressions: sum('impressions'),
      clicks: sum('clicks'),
      actionLinkClicks: sum('actionLinkClicks'),
      actionMessagingConversationsStarted: sum('actionMessagingConversationsStarted'),
      messagingConversations: sum('messagingConversations'),
      amountSpent: sum('amountSpent'),
    };
  }, [data]);

  const middleValue = totals[middleMetric as keyof typeof totals] || 0;
  const bottomValue = totals[bottomMetric as keyof typeof totals] || 0;
  const maxValue = Math.max(totals.impressions, middleValue, bottomValue);

  const computeWidth = (value: number) => {
    if (!maxValue) return '100%';
    const percent = (value / maxValue) * 100;
    const minWidth = 30;
    return `${percent < minWidth ? minWidth : percent}%`;
  };

  const conversionRate = (current: number, previous: number) =>
    previous > 0 ? ((current / previous) * 100).toFixed(1) : '0';

  const Block = ({
    label,
    value,
    color,
    width,
    children,
  }: {
    label: string;
    value: number;
    color: string;
    width: string;
    children?: React.ReactNode;
  }) => (
    <div className="flex flex-col items-center -mb-4 last:mb-0" style={{ width }}>
      <div
        className={`relative h-24 flex flex-col items-center justify-center text-white ${color}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
      >
        {children}
        <span className="text-sm font-medium">{label}</span>
        <span className="text-lg font-bold">{formatNumber(value)}</span>
        <span className="text-xs">{formatCurrency(totals.amountSpent / (value || 1))}</span>
      </div>
    </div>
  );

  return (
    <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Funil de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Block label="Impressões" value={totals.impressions} color="bg-blue-600" width={computeWidth(totals.impressions)} />
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            {conversionRate(middleValue, totals.impressions)}% Conversão
          </div>
          <Block label={metricOptions.find(o => o.value === middleMetric)?.label || middleMetric}
            value={middleValue}
            color="bg-green-600"
            width={computeWidth(middleValue)}
          >
            <div className="absolute top-1 right-1 text-black">
              <Select value={middleMetric} onValueChange={setMiddleMetric}>
                <SelectTrigger className="h-6 w-24 text-xs bg-white/70">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metricOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Block>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            {conversionRate(bottomValue, middleValue)}% Conversão
          </div>
          <Block label={metricOptions.find(o => o.value === bottomMetric)?.label || bottomMetric}
            value={bottomValue}
            color="bg-purple-600"
            width={computeWidth(bottomValue)}
          >
            <div className="absolute top-1 right-1 text-black">
              <Select value={bottomMetric} onValueChange={setBottomMetric}>
                <SelectTrigger className="h-6 w-24 text-xs bg-white/70">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metricOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Block>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelVisualization;
