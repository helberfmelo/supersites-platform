# Google Platform Setup Packet

Data-base: 2026-07-03

## Objetivo

Gerar um pacote local para orientar a criacao de GA4, GTM, Search Console e AdSense sem que o comando execute acao em provedor externo.

## Quando usar

- Antes de uma sessao humana de setup Google.
- Depois de registrar a credencial Google no inventario local ignorado.
- Antes de copiar qualquer Measurement ID, GTM Container ID, Search Console token ou publisher ID para cofre/ambiente.

## Comando

```powershell
pnpm ops:google-platform-setup-packet
```

Para gravar em diretorio fixo:

```powershell
pnpm ops:google-platform-setup-packet -- --output-dir artifacts/google-platform-setup/manual-review
```

## Saidas

- `google-platform-setup.json`
- `google-platform-setup.md`

Os artefatos ficam em `artifacts/`, que e ignorado pelo Git.

## Estados obrigatorios

- `sideEffects=none`
- GA4 ativo: `false`
- GTM ativo: `false`
- Search Console verificado: `false`
- AdSense ativo: `false`
- PageSpeed API ativa: `false`

## Uso humano do pacote

1. Entrar na conta Google registrada localmente em `docs/credentials/credentials.local.md`.
2. Conferir a autorizacao vigente do owner para aceitar termos Google/Analytics/GTM/Search Console/AdSense.
3. Criar a estrutura indicada pelo pacote, se aprovada.
4. Verificar dominio ou URL-prefix apenas quando houver dominio/root mapping aprovado.
5. Guardar IDs/tokens apenas em cofre/ambiente, nunca em docs versionados.
6. Voltar ao repo e rodar `pnpm measure:google-ready` e `pnpm validate:adsense-safe-public`.

## Bloqueios

Nao usar este pacote para:

- aceitar termos sem autorizacao humana registrada;
- criar conta paga, teste pago, Google Cloud billing, forma de pagamento ou qualquer fluxo de cobranca;
- cadastrar banco, impostos, PIN postal ou payout AdSense;
- publicar `ads.txt`;
- inserir snippet GA4/GTM/AdSense;
- importar Search Console, GA4, AdSense ou PageSpeed API;
- enviar PII, input de ferramenta, IP completo, query string ou conteudo de arquivo ao Google.

## Autorizacao vigente

Em 2026-07-03 o owner autorizou o setup assistido e os aceites Google/Analytics/GTM/Search Console/AdSense para a SuperSites, com `mywebtools.top` como dominio de go-live. Qualquer pedido de 2FA, telefone, billing, cartao, teste pago, Google Cloud billing, banco, impostos, PIN postal ou pagamento continua sendo pausa obrigatoria.

## Referencias oficiais

- GA4 setup: https://support.google.com/analytics/answer/9304153
- GTM account/container: https://support.google.com/tagmanager/answer/14842164
- Search Console property: https://support.google.com/webmasters/answer/34592
- AdSense account: https://support.google.com/adsense/answer/7402253
- AdSense site connection: https://support.google.com/adsense/answer/7584263
- AdSense URL rules: https://support.google.com/adsense/answer/2784438
