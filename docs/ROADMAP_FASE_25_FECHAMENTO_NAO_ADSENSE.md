# ROADMAP FASE 25 - Fechamento das pendencias independentes de AdSense

Status: concluida e publicada em 2026-07-19.

## Objetivo

Concluir o backlog tecnico e reversivel que nao depende da analise do Google AdSense nem de nova decisao juridica, comercial, bancaria ou de provedor.

## Etapa 25.1 - Servicos personalizados sem checkout

- publicar uma pagina localizada com categorias de atendimento e contato por e-mail;
- manter as ferramentas gratuitas utilizaveis sem cadastro;
- nao publicar preco, SLA, link de pagamento ou promessa de aceite;
- registrar pedidos no Control Plane sem armazenar o e-mail do solicitante.

## Etapa 25.2 - Operacao de monetizacao

- exibir no Control Plane um resumo das Checkout Sessions de doacao ja existentes;
- permitir que owner e operator registrem e atualizem o ciclo manual de um servico;
- manter checkout de servico, planos, assinaturas, invoices, refunds e entitlements desligados.

## Etapa 25.3 - Prontidao da caixa publica

- adicionar diagnostico repetivel de MX e portas seguras IMAP/SMTP;
- documentar o limite do diagnostico: ele nao autentica, envia mensagem nem confirma triagem;
- preservar a confirmacao de entrega, responsavel, retencao e tratamento de anexos como `HUMAN_ACTION_REQUIRED`.

## Etapa 25.4 - Fechamento

- validar Hub, Control Plane, diagnostico e ausencia de segredos;
- atualizar somente status, metricas e gates afetados;
- publicar releases reversiveis dos alvos alterados.

## Criterios de aceite

1. A pagina de servicos existe nos cinco idiomas e usa somente `mailto:`.
2. Nenhum checkout ou entitlement de servico e ativado.
3. O painel registra pedidos sem PII de contato e audita mutacoes.
4. A conciliacao de doacoes pode ser consultada no painel.
5. O diagnostico da caixa publica produz resultado objetivo sem usar credenciais.
6. Os gates humanos e de AdSense permanecem inalterados.

## Fechamento

- commit tecnico: `b99a1cd`;
- deploy Control Plane HostGator: run `29675971885`, aprovado com migracao e smoke;
- deploy Hub legado: run `29675972767`, aprovado;
- deploy Hub principal `mywebtools.top`: release `b99a1cdec59b-20260719062149`, aprovado com smoke Hub-only;
- validacao final: cinco rotas localizadas `/services` responderam HTTP 200 com conteudo e `mailto:`.
