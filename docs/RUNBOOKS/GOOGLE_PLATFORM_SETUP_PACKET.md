# Google Platform Setup Packet

Data-base: 2026-07-03

## Objetivo

Gerar um pacote local para orientar a criacao humana de GA4, GTM, Search Console e AdSense sem executar nenhuma acao em provedor externo.

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
2. Conferir se a pessoa autorizada pode aceitar termos Google/AdSense.
3. Criar manualmente a estrutura indicada pelo pacote, se aprovada.
4. Verificar dominio ou URL-prefix apenas quando houver dominio/root mapping aprovado.
5. Guardar IDs/tokens apenas em cofre/ambiente, nunca em docs versionados.
6. Voltar ao repo e rodar `pnpm measure:google-ready` e `pnpm validate:adsense-safe-public`.

## Bloqueios

Nao usar este pacote para:

- aceitar termos por conta propria;
- criar AdSense antes de beneficiario legal/fiscal/banco/PIN;
- publicar `ads.txt`;
- inserir snippet GA4/GTM/AdSense;
- importar Search Console, GA4, AdSense ou PageSpeed API;
- enviar PII, input de ferramenta, IP completo, query string ou conteudo de arquivo ao Google.

## Referencias oficiais

- GA4 setup: https://support.google.com/analytics/answer/9304153
- GTM account/container: https://support.google.com/tagmanager/answer/14842164
- Search Console property: https://support.google.com/webmasters/answer/34592
- AdSense account: https://support.google.com/adsense/answer/7402253
- AdSense site connection: https://support.google.com/adsense/answer/7584263
- AdSense URL rules: https://support.google.com/adsense/answer/2784438
