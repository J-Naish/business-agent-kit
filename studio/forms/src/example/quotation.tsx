import { Quotation } from '../templates/quotation'

export default function ExampleQuotation() {
  return (
    <Quotation
      company={{
        name: 'Acme Studio LLC',
        postalCode: '10001',
        address: '123 Market Street, New York, NY',
        tel: '+1-212-555-0100',
        email: 'info@example.com',
        taxId: 'US-12-3456789',
      }}
      quoteNumber="QT-2026-001"
      quoteDate="April 1, 2026"
      validUntil="April 30, 2026"
      clientName="Client Company Inc."
      clientPostalCode="94105"
      clientAddress="456 Mission Street, San Francisco, CA"
      subject="Corporate website redesign"
      items={[
        { description: 'Design production', quantity: 1, unit: 'project', unitPrice: 3000 },
        { description: 'Frontend implementation', quantity: 1, unit: 'project', unitPrice: 4000 },
        { description: 'CMS setup', quantity: 1, unit: 'project', unitPrice: 2000 },
        { description: 'QA and adjustments', quantity: 1, unit: 'project', unitPrice: 1000 },
      ]}
      taxRate={0.08}
      notes="This quotation is valid for 30 days from the issue date.\nScope changes may require a revised quotation."
    />
  )
}
