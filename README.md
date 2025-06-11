Partner Dashboard - Mídia Performance Analytics

Este é um dashboard inteligente desenvolvido para centralizar a análise de performance de campanhas de mídia em diferentes plataformas, com dados conectados diretamente via Google Sheets.

## Getting Started

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz com as variáveis de ambiente necessárias, por exemplo:

   ```
   VITE_SUPABASE_URL=https://onnvpakhibftxpqeraur.supabase.co
   VITE_SUPABASE_ANON_KEY=<sua-chave>
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Para gerar uma build de produção:

   ```bash
   npm run build
   ```

🤖 Tecnologias Utilizadas

React + TypeScript

Tailwind CSS + shadcn-ui

Vite (build tool)

Google Sheets como fonte de dados

📂 Origem dos Dados

Cada plataforma possui uma aba própria em uma planilha do Google. Os dados são lidos através de uma API personalizada (https://gsheets-api.vercel.app). A estrutura e a ordem das colunas variam por aba:

💪 META (Facebook/Instagram Ads)

[ "Date", "Account Name", "Campaign Name", "Adset Name", "Ad Name", "Spend (Cost, Amount Spent)", "Impressions", "Clicks", "CPM (Cost per 1000 Impressions)", "CPC (Cost per Click)", "Adcreative Name", "Thumbnail URL", "Frequency", "Reach (Estimated)", "Action Link Clicks", "CTR (Clickthrough Rate)", "Action Messaging Conversations Started (Onsite Conversion)", "Cost Per Action Messaging Conversations Started (Onsite Conversion)" ]

📈 GOOGLE Ads

[ "Date (Segment)", "Account Name", "Campaign Name", "Ad Group Name", "Ad Name", "Cost (Spend, Amount Spent)", "Impressions", "Clicks", "Average CPM", "Average CPC", "CTR", "Conversions", "Call Ad Conversion Action", "Cost per Conversion", "Ad Status", "Ad Group Status", "Campaign Status", "Conversions from Interactions Rate" ]

📉 LINKEDIN Ads

[ "Account Name", "Account Reference Info Organization Localized Name", "Account Reference Info Organization Vanity Name", "Ad Analytics Action Clicks", "Ad Analytics Clicks", "Ad Analytics Cost", "Ad Analytics Cost (USD)", "Ad Analytics Company Page Clicks", "Ad Analytics Download Clicks", "CPC", "CTR", "CPM", "Ad Analytics Impressions", "Ad Analytics Reactions", "Campaign Daily Budget Amount", "Campaign Group Name", "Campaign Name", "Campaign Format", "Campaign Locale Country", "Campaign Status", "Campaign Total Budget Amount", "Ad Analytics Landing Page Clicks", "Ad Analytics Text URL Clicks", "Ad Analytics Job Applications", "Creative Name (Adhoc)", "Date" ]

📄 RELATÓRIOS Internos

[ "Data de Envio", "ID", "Responsável", "Data", "Contatos", "Agendado", "Atendimento", "Orçamentos", "Vendas", "Faturado", "Observações", "E-mail de acesso p" ]

🗓️ Interface e Navegação

▶️ Barra superior

Permite alternar entre as plataformas (aba da planilha):

["meta", "google", "youtube", "linkedin", "tiktok", "analytics", "instagram", "b2bot", "relatorios", "rd"]

🔺 Abas internas (section tabs)

Define a visualização por nível:

Campanhas = campaignName

Grupos de Anúncio = adSetName

Anúncios = adName

📅 Filtros:

Período (Date)

Conta (Account Name)

Busca livre (qualquer termo relacionado a campanhas, grupos ou anúncios)

📊 KPIs principais

Cada visualização mostra os 6 principais indicadores, baseados nos campos existentes por plataforma:

Métrica

Fonte

Impressões

Soma de impressions

Cliques

Soma de clicks

Investimento

Soma de amountSpent

Conversões

Soma de messagingConversations ou similar

Custo/Conversão

Média de costPerMessagingConversation

Taxa de Conversão (%)

(messagingConversations / actionLinkClicks) * 100

📊 Tabelas Detalhadas

As tabelas se adaptam conforme a aba selecionada, mas seguem um modelo:

Coluna

Dados do campo original

Nome

campaignName / adSetName / adName

Data

Date

Plataforma

Inferido ou mapeado diretamente

Impressões

impressions

Cliques

clicks

CTR

Calculado manualmente

Gasto (R$)

amountSpent

CPM

cpm ou equivalente

Conversas

messagingConversations

Ações

botão "Ver grupos" ou mais

🚀 Lógica de Agrupamento Dinâmico

O agrupamento dinâmico é feito com base na aba atual:

const groupingKey = section === 'campanhas' ? 'campaignName'
                  : section === 'grupos' ? 'adSetName'
                  : 'adName';

Isso permite reaproveitar o mesmo SheetRow[] e apenas ajustar a forma de exibição.

✅ Funcionalidades obrigatórias

A plataforma selecionada carrega os dados da aba correta do Google Sheets

Os filtros de data, conta e busca são aplicados corretamente ao data[]

As abas internas definem o agrupamento

O layout das tabelas muda mas os dados são consistentes

Nenhuma tela branca deve ocorrer mesmo com dados incompletos

💡 Dicas para desenvolvimento

O mapeamento dos dados é feito no hook useSheetData.ts

A navegação entre plataformas e seções é controlada via usePlatformNavigation

O componente CampaignTable, AdSetLevel ou AdLevel renderiza os dados dependendo da aba

Os campos não existentes devem ser tratados com || "N/A"














🧱 Estrutura Geral do Projeto
ruby
Copiar
Editar
src/
├── components/
│   ├── dashboard/         → Gráficos e componentes analíticos (charts, headers, tables)
│   └── filters/           → Filtros por datas, níveis, etc.
├── hooks/                 → Hooks customizados para estado, dados e navegação
├── lib/                   → Funções utilitárias (ex: `utils.ts`)
├── navigation/            → Lógica de navegação da UI
├── pages/                 → Páginas principais: `Index`, `Admin`, `NotFound`
├── ui/                    → Provavelmente componentes de design (não expandido)
public/                    → Arquivos estáticos
⚙️ Tecnologias e Ferramentas
Linguagem: TypeScript

Framework: Provavelmente Vite + React (indícios no vite.config.ts, tsx, e estrutura de páginas)

Estilo: Tailwind CSS (tailwind.config.ts, postcss.config.js)

Gerenciador de Pacotes: bun.lockb indica uso de Bun ao invés de npm/yarn

ESLint: Configuração presente para padronização de código

🧩 Componentes Importantes
components/dashboard/
Foco em visualização de métricas: CampaignCharts, CampaignTable, FunnelVisualization, etc.

Modularização por níveis: AdLevel, AdSetLevel, CampaignLevel

components/filters/
Permite seleção dinâmica por período e granularidade: AdvancedFilters, DateRangePicker

hooks/
useFilters.ts, useClientManager.ts → Gerenciamento de estado de dados

usePlatformNavigation.ts, useHierarchicalNavigation.ts → Suporte à navegação por plataforma e hierarquia

useTheme.ts → Suporte a temas/UI

pages/
Index.tsx: dashboard principal

Admin.tsx: possivelmente área administrativa

NotFound.tsx: página de erro padrão

🖼️ Interface e Funcionalidades
A UI sugere:

Dashboard analítico de performance de campanhas (ads).

Filtros por data, campanha, grupo de anúncio, plataforma.

Visualizações como:

Impressões vs Cliques

Funil de Conversão

Tabelas detalhadas por anúncio e grupo

Exibe métricas como: CTR, CPC, Conversões, Custo/Conversão

🔁 Padrões Usados
Hooks customizados para abstração de lógica reutilizável

Separação por domínio funcional (filters, dashboard, navigation)

Arquitetura modular e baseada em componentes funcionais

Estilo utilitário com Tailwind CSS

Provável uso de React Router (com base na estrutura de páginas)

