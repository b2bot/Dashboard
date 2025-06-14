# **Estrutura do Projeto e Regras do Painel \- AGENTS.md**

## **Visão Geral**

Sempre que for iniciar qualquer tarefa, é obrigatório se atualizar com os arquivos e pastas atuais do github para este ambiente.

Este projeto é um painel de métricas para campanhas de anúncio em plataformas como Meta, Google, YouTube, LinkedIn e TikTok. Ele consome dados em tempo real de uma planilha do Google Sheets integrada via API hospedada na Vercel.

## **Estrutura da Pasta**

\+---public  
|       favicon.ico  
|       placeholder.svg  
|       robots.txt  
|  
\+---src  
|   |   App.css  
|   |   App.tsx  
|   |   index.css  
|   |   main.tsx  
|   |   vite-env.d.ts  
|   |  
|   \+---components  
|   |   |   ProtectedRoute.tsx  
|   |   |  
|   |   \+---admin  
|   |   |   |   AdminPanel.tsx  
|   |   |   |  
|   |   |   \\---\_\_tests\_  
|   |   |           AdminPanel.test.tsx  
|   |   |  
|   |   \+---dashboard  
|   |   |       AdLevel.tsx  
|   |   |       AdSetLevel.tsx  
|   |   |       CampaignCharts.tsx  
|   |   |       CampaignLevel.tsx  
|   |   |       CampaignTable.tsx  
|   |   |       DashboardFilters.tsx  
|   |   |       DashboardHeader.tsx  
|   |   |       FunnelVisualization.tsx  
|   |   |       MetricsGrid.tsx  
|   |   |       MetricsOverview.tsx  
|   |   |  
|   |   \+---filters  
|   |   |       AdvancedFilters.tsx  
|   |   |       DateRangePicker.tsx  
|   |   |       ItemLevelFilter.tsx  
|   |   |  
|   |   \+---navigation  
|   |   |       PlatformNavigation.tsx  
|   |   |       SectionTabs.tsx  
|   |   |  
|   |   \\---ui  
|   |           accordion.tsx  
|   |           alert-dialog.tsx  
|   |           alert.tsx  
|   |           aspect-ratio.tsx  
|   |           avatar.tsx  
|   |           badge.tsx  
|   |           breadcrumb.tsx  
|   |           button.tsx  
|   |           calendar.tsx  
|   |           card.tsx  
|   |           carousel.tsx  
|   |           chart.tsx  
|   |           checkbox.tsx  
|   |           collapsible.tsx  
|   |           command.tsx  
|   |           context-menu.tsx  
|   |           dialog.tsx  
|   |           drawer.tsx  
|   |           dropdown-menu.tsx  
|   |           form.tsx  
|   |           hover-card.tsx  
|   |           input-otp.tsx  
|   |           input.tsx  
|   |           label.tsx  
|   |           menubar.tsx  
|   |           navigation-menu.tsx  
|   |           pagination.tsx  
|   |           popover.tsx  
|   |           progress.tsx  
|   |           radio-group.tsx  
|   |           resizable.tsx  
|   |           scroll-area.tsx  
|   |           select.tsx  
|   |           separator.tsx  
|   |           sheet.tsx  
|   |           sidebar.tsx  
|   |           skeleton.tsx  
|   |           slider.tsx  
|   |           sonner.tsx  
|   |           switch.tsx  
|   |           table.tsx  
|   |           tabs.tsx  
|   |           textarea.tsx  
|   |           theme-toggle.tsx  
|   |           toast.tsx  
|   |           toaster.tsx  
|   |           toggle-group.tsx  
|   |           toggle.tsx  
|   |           tooltip.tsx  
|   |           use-toast.ts  
|   |  
|   \+---hooks  
|   |       use-mobile.tsx  
|   |       use-toast.ts  
|   |       useAnalyticsData.ts  
|   |       useAuth.tsx  
|   |       useClientManager.ts  
|   |       useDataSelector.ts  
|   |       useFilters.tsx  
|   |       useHierarchicalData.ts  
|   |       useHierarchicalNavigation.ts  
|   |       useMetaData.ts  
|   |       usePlatformNavigation.ts  
|   |       useSettings.tsx  
|   |       useSheetData.ts  
|   |       useTheme.tsx  
|   |  
|   \+---lib  
|   |       analyticsApi.ts  
|   |       clients.ts  
|   |       integrations.ts  
|   |       metaApi.ts  
|   |       supabase.ts  
|   |       utils.ts  
|   |  
|   \\---pages  
|           Admin.tsx  
|           Index.tsx  
|           Login.tsx  
|           NotFound.tsx  
|           Register.tsx  
|  
\\---tests  
        adminPage.test.tsx  
        dataSelector.test.tsx  
        useSettings.test.tsx  
,

## **Regras Específicas por Página**

### **Páginas Meta, Google, YouTube, LinkedIn, TikTok**

* Compartilham o mesmo layout.  
* Mas com mérticas específicas nos Cards principais  
* Gráficos: Performance por Data, Impressões vs Cliques.  
* Funil de Conversão: Topo (Impressões), Meio (Cliques), Fundo (Link Clicks).  
* Tabela Detalhada: "Dados Detalhados das Campanhas, dos Grupos de Anúncio e dos anúncios em suas respectivas abas".

### **Página de Relatórios**

* Não segue o layout das demais.  
* **Cards iniciais:** Contatos, Agendado, Atendimento, Orçamentos, Vendas, Faturado.  
* **Performance por Data:** Contato, Agendado, Atendimento.  
* **Faturamento:** Substitui "Impressão vs Cliques". Gráfico com Orçamentos vs Faturado.  
* **Funil de Conversão:** Contato \> Agendado \> Vendas.  
* **Tabela Final:** "Dados enviados diariamente" com colunas: Data, Contato, Agendado, Atendimento, Orçamento, Vendas, Faturado.

### **Filtros e Abas**

* Filtro de **data** e **conta** continuam funcionando na página de relatório.  
* Filtro de **campanha** deve ser **ocultado** nessa página.  
* Abas devem ser renomeadas:  
  * "Campanha" → **Relatórios**  
  * "Grupo de Anúncio" → **Observações** (conteúdo ainda será criado)  
  * "Anúncio" → **Outros Relatórios** (conteúdo ainda será criado)

## **Regras para Codex ou IA**

* Seguir layout e comportamento definidos acima.  
* Ao trabalhar na página relatórios desabilitar o filtro de campanha e renomear as abas conforme descrito.  
* Buscar dados da aba **relatórios** na planilha para todos os componentes desta página.  
* Manter consistência de estilo com Tailwind e padrões visuais dos outros componentes.  
* Nas demais páginas não devem haver alterações até que a página relatórios esteja exatamente conforme o usuário solicitar.

  Ao final você deve sempre listar o que de fato foi aplicado de acordo com uma liguagem clara para o usuário entender.

