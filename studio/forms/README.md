# Forms

Create A4-sized business documents at 794×1123px with React + Tailwind, then export them to PDF. Includes generic templates for invoices, quotations, and service agreements.

## Usage

```bash
# Preview. Switch groups with tabs.
pnpm run forms:dev

# Export all documents
pnpm run forms:export

# Export one document
pnpm run forms:export invoice
```

## Adding Documents

Add TSX files to `src/<document-name>/`. Pages are ordered by file name.

```
src/
  my-invoice/
    page-1.tsx
  my-contract/
    page-1.tsx
    page-2.tsx
```

### Using Templates

Templates for invoices, quotations, and service agreements live in `src/templates/`. Pass data through props.

```tsx
// src/my-invoice/page-1.tsx
import { Invoice } from '../templates/invoice'

export default function MyInvoice() {
  return (
    <Invoice
      company={{
        name: 'Acme Studio LLC',
        postalCode: '10001',
        address: '123 Market Street, New York, NY',
        tel: '+1-212-555-0100',
        email: 'info@example.com',
        taxId: 'US-12-3456789',
        logo: '/path/to/logo.svg',  // Optional
      }}
      bank={{
        name: 'Example Bank',
        branch: 'Main Branch',
        account: '123456789',
        holder: 'Acme Studio LLC',
      }}
      invoiceNumber="INV-2026-001"
      invoiceDate="April 1, 2026"
      dueDate="April 30, 2026"
      clientName="Client Company Inc."
      clientPostalCode="94105"
      clientAddress="456 Mission Street, San Francisco, CA"
      items={[
        { description: 'Website production', quantity: 1, unit: 'project', unitPrice: 5000 },
      ]}
      taxRate={0.08}
      notes="Please include the invoice number with your payment."
    />
  )
}
```

### Templates

| Template | File | Description |
|---|---|---|
| Invoice | `templates/invoice.tsx` | Line items, subtotal, tax, total, payment details, notes |
| Quotation | `templates/quotation.tsx` | Line items, subtotal, tax, total, subject, notes |
| Service agreement | `templates/contract.tsx` | Clauses and signature blocks. Two-page structure: `ContractPage1`, `ContractPage2` |

### Building Freely with the Page Component

```tsx
import { Page } from '../Page'

export default function CustomForm() {
  return (
    <Page className="p-16">
      <h1 className="text-3xl font-bold">Custom Document</h1>
    </Page>
  )
}
```
