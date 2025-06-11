
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useClientManager } from '@/hooks/useClientManager';
import { Settings, Users, Database } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

const Admin = () => {
  const { currentClientId, setCurrentClientId, clients } = useClientManager();
  const { settings, updatePlatform } = useSettings();
  const platforms = Object.keys(settings.platforms) as Array<keyof typeof settings.platforms>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie clientes e configurações do sistema
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Gerenciamento de Clientes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cliente Ativo
                </label>
                <Select value={currentClientId} onValueChange={setCurrentClientId}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(clients).map(([clientId, clientData]) => (
                      <SelectItem key={clientId} value={clientId}>
                        <div className="flex items-center justify-between w-full">
                          <span>{clientData.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {clientData.sheetId.slice(0, 8)}...
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentClientId && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-100">
                      Configuração Ativa
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-blue-700 dark:text-blue-200">
                    <p><strong>Cliente:</strong> {clients[currentClientId].name}</p>
                    <p><strong>Sheet ID:</strong> {clients[currentClientId].sheetId}</p>
                    <p><strong>Status:</strong> 
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        Conectado
                      </Badge>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
		  
          {platforms.map(p => {
            const conf = settings.platforms[p];
            return (
              <Card key={p} className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span>Configuração {p}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Integração</label>
                    <Select value={conf.mode} onValueChange={val => updatePlatform(p, { mode: val as any })}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sheets">Sheets</SelectItem>
                        <SelectItem value="api">API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {conf.mode === 'api' && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Key</label>
                        <input
                          className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700"
                          value={conf.apiKey || ''}
                          onChange={e => updatePlatform(p, { apiKey: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Account ID</label>
                        <input
                          className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700"
                          value={conf.accountId || ''}
                          onChange={e => updatePlatform(p, { accountId: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Métricas (ordem)</label>
                    <input
                      className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-700"
                      value={conf.metrics.join(',')}
                      onChange={e => updatePlatform(p, { metrics: e.target.value.split(',').map(m => m.trim()).filter(Boolean) })}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Admin;
