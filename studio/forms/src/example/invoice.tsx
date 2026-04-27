import { Invoice } from '../templates/invoice'

export default function ExampleInvoice() {
  return (
    <Invoice
      company={{
        name: 'Acme Studio LLC',
        postalCode: '10001',
        address: '123 Market Street, New York, NY',
        tel: '+1-212-555-0100',
        email: 'info@example.com',
        taxId: 'US-12-3456789',
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
        { description: 'Logo design', quantity: 1, unit: 'project', unitPrice: 1500 },
        { description: 'Monthly maintenance - April', quantity: 1, unit: 'month', unitPrice: 500 },
      ]}
      taxRate={0.08}
      notes="Please include the invoice number with your payment."
    />
  )
}
