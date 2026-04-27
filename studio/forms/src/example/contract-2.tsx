import { ContractPage2 } from '../templates/contract'

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

export default function ExampleContract2() {
  return (
    <ContractPage2
      company={{ name: partyB.name }}
      contractDate="April 15, 2026"
      partyA={partyA}
      partyB={partyB}
      articles={[
        { title: 'Services', content: '' },
        { title: 'Term', content: '' },
        { title: 'Fees', content: '' },
        { title: 'Payment Terms', content: '' },
        { title: 'Delivery', content: '' },
      ]}
      additionalArticles={[
        { title: 'Confidentiality', content: 'Each party will protect confidential information received from the other party and will not disclose it to third parties except as required to perform this agreement.' },
        { title: 'Ownership', content: 'Ownership of final work product transfers to Client after full payment, except for pre-existing materials and third-party assets.' },
        { title: 'Termination', content: 'Either party may terminate this agreement if the other party materially breaches it and fails to cure the breach after written notice.' },
        { title: 'Good Faith Resolution', content: 'If a matter is not covered by this agreement or an interpretation issue arises, the parties will discuss it in good faith.' },
      ]}
    />
  )
}
