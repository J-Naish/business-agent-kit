import { ContractPage1 } from '../templates/contract'

const partyA = {
  name: 'Client Company Inc.',
  postalCode: '94105',
  address: '456 Mission Street, San Francisco, CA',
  representative: 'Alex Morgan, CEO',
}

const partyB = {
  name: 'Acme Studio LLC',
  postalCode: '10001',
  address: '123 Market Street, New York, NY',
  representative: 'Taylor Lee, Managing Partner',
}

export default function ExampleContract1() {
  return (
    <ContractPage1
      company={{ name: partyB.name }}
      partyA={partyA}
      partyB={partyB}
      articles={[
        { title: 'Services', content: 'Client engages Contractor to plan, design, and develop a website as described in the approved scope of work.' },
        { title: 'Term', content: 'The service period runs from May 1, 2026 through July 31, 2026.' },
        { title: 'Fees', content: 'Client will pay Contractor USD 10,000, excluding applicable taxes, for the services.' },
        { title: 'Payment Terms', content: 'Client will pay Contractor within 30 days after completion and receipt of an invoice. Bank or payment processing fees are the responsibility of Client.' },
        { title: 'Delivery', content: 'Contractor will deliver the work product by the end of the service period. Client will review deliverables within 14 days after delivery.' },
      ]}
    />
  )
}
