export type SiteStatus = 'planned' | 'foundation' | 'blocked'

export interface SiteSummary {
  slug: string
  name: string
  category: string
  freeValue: string
  upgrade: string
  status: SiteStatus
}

export const siteCatalog: SiteSummary[] = [
  {
    slug: 'netprobe-atlas',
    name: 'NetProbe Atlas',
    category: 'Network diagnostics',
    freeValue: 'IP, DNS, RDAP and SSL checks',
    upgrade: 'Monitoring, alerts, history and API',
    status: 'foundation',
  },
  {
    slug: 'calcharbor',
    name: 'CalcHarbor',
    category: 'Calculators',
    freeValue: 'Complete calculations with formulas',
    upgrade: 'Saved scenarios, exports, widgets and API',
    status: 'planned',
  },
  {
    slug: 'devutility-lab',
    name: 'DevUtility Lab',
    category: 'Developer utilities',
    freeValue: 'JSON, YAML, CSV, Base64, JWT, regex and diff tools',
    upgrade: 'Private history, workspaces, batches and API',
    status: 'planned',
  },
  {
    slug: 'timenexus',
    name: 'TimeNexus',
    category: 'Time and dates',
    freeValue: 'Time zones, dates, business days and units',
    upgrade: 'Widgets, API, presets and history',
    status: 'planned',
  },
  {
    slug: 'qrroute',
    name: 'QRRoute',
    category: 'QR and links',
    freeValue: 'Static QR, barcode, UTM, vCard and Wi-Fi codes',
    upgrade: 'Dynamic QR, short links, analytics and teams',
    status: 'planned',
  },
  {
    slug: 'invoicecraft',
    name: 'InvoiceCraft',
    category: 'Documents',
    freeValue: 'Create and download invoices, quotes and receipts',
    upgrade: 'Clients, products, recurrence, branding and payments',
    status: 'planned',
  },
  {
    slug: 'mailhealth',
    name: 'MailHealth',
    category: 'Email deliverability',
    freeValue: 'SPF, DKIM, DMARC, MX, blacklist and SMTP checks',
    upgrade: 'Monitoring, alerts, DMARC reports and API',
    status: 'planned',
  },
  {
    slug: 'sitepulse-lab',
    name: 'SitePulse Lab',
    category: 'Website monitoring',
    freeValue: 'Status, redirects, headers, robots, sitemap and TTFB',
    upgrade: 'Uptime, incidents, status pages and multi-region history',
    status: 'planned',
  },
  {
    slug: 'pixelbatch',
    name: 'PixelBatch',
    category: 'Images',
    freeValue: 'Resize, crop, compress, convert and strip metadata',
    upgrade: 'Batch processing, presets, larger files and API',
    status: 'planned',
  },
  {
    slug: 'docshift',
    name: 'DocShift',
    category: 'PDF and documents',
    freeValue: 'Merge, split, rotate, compress and watermark PDFs',
    upgrade: 'Batch jobs, larger files, OCR, teams and API',
    status: 'planned',
  },
]
