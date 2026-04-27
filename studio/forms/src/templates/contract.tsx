import { Page } from '../Page'

type Party = {
  name: string
  postalCode: string
  address: string
  representative: string
}

type Article = {
  title: string
  content: string
}

type Company = {
  name: string
  logo?: string
}

export type ContractProps = {
  company: Company
  contractDate: string
  partyA: Party
  partyB: Party
  articles: Article[]
  additionalArticles: Article[]
}

export function ContractPage1({
  company,
  partyA,
  partyB,
  articles,
}: Pick<ContractProps, 'company' | 'partyA' | 'partyB' | 'articles'>) {
  return (
    <Page>
      <div className="px-14 py-12 text-gray-800 text-[12px] leading-relaxed flex flex-col h-full">
        <div className="text-center mb-6">
          <h1 className="text-[24px] font-bold tracking-[0.12em] text-gray-900">SERVICE AGREEMENT</h1>
        </div>

        <div className="mb-5 text-[11.5px] leading-[1.9]">
          <p>
            {partyA.name} ("Client") and {partyB.name} ("Contractor") enter into this agreement
            for the services described below.
          </p>
        </div>

        <div className="space-y-4 text-[11.5px] leading-[1.9]">
          {articles.map((article, i) => (
            <div key={i}>
              <div className="font-bold text-gray-900 mb-0.5">Section {i + 1}: {article.title}</div>
              <div className="whitespace-pre-line pl-1">{article.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5">
            {company.logo && <img src={company.logo} alt="" className="h-4 w-4" />}
            <span>{company.name}</span>
          </div>
          <div>1 / 2</div>
        </div>
      </div>
    </Page>
  )
}

export function ContractPage2({
  company,
  contractDate,
  partyA,
  partyB,
  articles,
  additionalArticles,
}: ContractProps) {
  const startIndex = articles.length

  return (
    <Page>
      <div className="px-14 py-12 text-gray-800 text-[12px] leading-relaxed flex flex-col h-full">
        <div className="space-y-4 text-[11.5px] leading-[1.9] mb-8">
          {additionalArticles.map((article, i) => (
            <div key={i}>
              <div className="font-bold text-gray-900 mb-0.5">Section {startIndex + i + 1}: {article.title}</div>
              <div className="whitespace-pre-line pl-1">{article.content}</div>
            </div>
          ))}
        </div>

        <div className="text-[11.5px] leading-[1.9] mb-8">
          <p>This agreement is executed by the authorized representatives of both parties.</p>
          <p className="mt-3 text-right">{contractDate}</p>
        </div>

        <div className="flex justify-between gap-8">
          {[
            { label: 'Client', party: partyA },
            { label: 'Contractor', party: partyB },
          ].map(({ label, party }) => (
            <div key={label} className="w-[45%] text-[11px] leading-loose">
              <div className="font-bold text-[12px] text-gray-900 border-b border-gray-300 pb-1 mb-3">{label}</div>
              <div className="space-y-0.5">
                <div>Address: {party.postalCode}</div>
                <div className="pl-[3em]">{party.address}</div>
                <div>Name: {party.name}</div>
                <div>Representative: {party.representative}</div>
              </div>
              <div className="mt-6 border-b border-gray-300 pb-1 text-gray-400 text-[10px]">Signature</div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5">
            {company.logo && <img src={company.logo} alt="" className="h-4 w-4" />}
            <span>{company.name}</span>
          </div>
          <div>2 / 2</div>
        </div>
      </div>
    </Page>
  )
}
