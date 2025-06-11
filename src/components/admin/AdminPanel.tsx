import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSettings } from '@/hooks/useSettings';
import { platforms } from '@/lib/integrations';
import { useClientManager } from '@/hooks/useClientManager';

interface FormValues {
  [key: string]: unknown;
}

const AdminPanel: React.FC = () => {
  const { currentClientId } = useClientManager();
  const { settings, saveSettings } = useSettings();
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: settings,
  });

  const onSubmit = handleSubmit(async (data) => {
    await saveSettings(data);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {Object.entries(platforms).map(([key, platform]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="text-left">
                  {platform.label}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Modo</label>
                    <Select defaultValue={watch(`${key}.mode`) || 'sheets'} {...register(`${key}.mode`)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sheets">Sheets</SelectItem>
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="disabled">Desativado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {platform.fields.map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm mb-1">{f.label}</label>
                      <Input type="password" placeholder={f.label} {...register(`${key}.${f.name}`)} />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-4 flex justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AdminPanel;
