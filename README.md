<<<<<<< HEAD
Partner Dashboard - Mídia Performance Analytics

Este é um dashboard inteligente desenvolvido para centralizar a análise de performance de campanhas de mídia em diferentes plataformas, com dados conectados diretamente via Google Sheets.

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

Feito com ❤️ na Lovable.dev
=======
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/67f10c00-fd6e-4c9a-bfe4-08e76e40521c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/67f10c00-fd6e-4c9a-bfe4-08e76e40521c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/67f10c00-fd6e-4c9a-bfe4-08e76e40521c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
>>>>>>> 9f075bd (Commit inicial)
