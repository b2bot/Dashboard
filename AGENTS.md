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
* **Orçamentos x Faturamento:** Substitui "Impressão vs Cliques". Gráfico com Orçamentos vs Faturado.  
* **Funil de Conversão:** Contato \> Agendado \> Vendas.  
* **Tabela Final:** "Dados enviados diariamente" com colunas: Data, Contato, Agendado, Atendimento, Orçamento, Vendas, Faturado.

### **Filtros e Abas**

* Filtro de **data** e **conta** continuam funcionando na página de relatório.  
* Filtro de **campanha** deve ser **desativado (todo o conteiner/componente)** nessa página.  
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




📘 Supabase Schema + Policies – Descrição para Codex GPT
✅ Autenticação
A autenticação é feita com Supabase Auth (email e senha).
Os usuários autenticados têm suas informações adicionais registradas na tabela usuarios, com o mesmo id do auth.users.


🧱 Estrutura de Banco de Dados
Tabelas principais:
usuarios
id (UUID): referência para auth.users.id
nome (text)
tipo (text): 'admin' ou 'cliente'
criado_em (timestamp)


clientes
id (UUID, PK)
nome (text)
id_usuario (UUID): referência para usuarios.id
ativo (boolean)
tipo_acesso (text): 'sheet' ou 'api'
criado_em (timestamp)


contas
id (UUID, PK)
cliente_id (UUID): referência para clientes.id
tipo (text): 'meta' ou 'google'
identificador (text)
criado_em (timestamp)


chamados
id (UUID, PK)
cliente_id (UUID): referência para clientes.id
titulo, mensagem, resposta (text)
status (text): 'aberto', 'andamento', 'resolvido'
criado_em (timestamp)


criativos
id (UUID, PK)
cliente_id (UUID): referência para clientes.id
titulo, arquivo_url, resposta (text
status (text): 'pendente', 'aprovado', 'reprovado'
criado_em (timestamp)



🔐 Row-Level Security (RLS)
RLS está ativado em todas as tabelas.
Políticas de SELECT:
usuarios: só pode ver a si mesmo

clientes: só vê o cliente vinculado ao seu id_usuario
contas, chamados, criativos: só vê se o cliente_id pertence a um cliente que ele controla (id_usuario = auth.uid())


Exemplo de SELECT para segurança:
cliente_id IN (
  SELECT id FROM clientes WHERE id_usuario = auth.uid()
)


🧠 Lógica de Acesso (frontend)
admin:
Pode acessar /admin
Ver e gerenciar todos os clientes, contas, chamados e criativos

cliente:
Pode acessar /
Vê apenas suas próprias métricas e dados vinculados via Supabase




