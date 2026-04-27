import { Page } from '../Page'

type Item = {
  description: string
  quantity: number
  unit: string
  unitPrice: number
}

type Company = {
  name: string
  postalCode: string
  address: string
  tel: string
  email: string
  taxId: string
  logo?: string
}

type Bank = {
  name: string
  branch: string
  account: string
  holder: string
}

export type InvoiceProps = {
  company: Company
  bank: Bank
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  clientName: string
  clientPostalCode: string
  clientAddress: string
  items: Item[]
  taxRate: number
  notes?: string
}

export function Invoice({
  company,
  bank,
  invoiceNumber,
  invoiceDate,
  dueDate,
  clientName,
  clientPostalCode,
  clientAddress,
  items,
  taxRate,
  notes,
}: InvoiceProps) {
  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  const tax = Math.floor(subtotal * taxRate)
  const total = subtotal + tax
  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <Page>
      <div className="px-14 py-10 text-slate-700 text-[13px] leading-relaxed flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-3">
            {company.logo && <img src={company.logo} alt="" className="h-9 w-9" />}
            <div>
              <div className="font-bold text-[15px] text-slate-900">{company.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{company.postalCode} {company.address}</div>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-[26px] font-bold tracking-[0.18em] text-slate-900">INVOICE</h1>
          </div>
        </div>

        {/* Recipient and metadata */}
        <div className="flex justify-between mb-8">
          <div className="w-[50%]">
            <div className="bg-slate-50 rounded-2xl px-6 py-5">
              <div className="text-[10px] text-slate-400 mb-2 font-medium tracking-wider">BILL TO</div>
              <div className="text-[17px] font-bold text-slate-900 mb-1">
                {clientName}
              </div>
              <div className="text-[11px] text-slate-500">
                {clientPostalCode} {clientAddress}
              </div>
            </div>
          </div>
          <div className="w-[40%] space-y-2 text-[12px]">
            {[
              { label: 'Invoice No.', value: invoiceNumber },
              { label: 'Issue Date', value: invoiceDate },
              { label: 'Payment Due', value: dueDate },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-400 text-[11px]">{row.label}</span>
                <span className="font-medium text-slate-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total amount */}
        <div className="mb-8 flex items-end justify-between border-b-2 border-slate-900 pb-4">
          <span className="text-slate-400 text-[12px] tracking-wider">AMOUNT DUE</span>
          <span className="text-[32px] font-bold text-slate-900 leading-none tracking-tight">{fmt(total)}</span>
        </div>

        {/* Line items */}
        <table className="w-full mb-5" style={{ borderSpacing: '0 4px', borderCollapse: 'separate' }}>
          <thead>
            <tr className="text-[10px] text-slate-400 tracking-wider">
              <th className="pb-2 px-4 text-left font-medium w-[5%]">NO.</th>
              <th className="pb-2 px-4 text-left font-medium">DESCRIPTION</th>
              <th className="pb-2 px-4 text-right font-medium w-[10%]">QTY</th>
              <th className="pb-2 px-4 text-center font-medium w-[8%]">UNIT</th>
              <th className="pb-2 px-4 text-right font-medium w-[18%]">UNIT PRICE</th>
              <th className="pb-2 px-4 text-right font-medium w-[18%]">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="bg-slate-50 text-[12px]">
                <td className="py-3 px-4 rounded-l-xl text-slate-400">{i + 1}</td>
                <td className="py-3 px-4 text-slate-800">{item.description}</td>
                <td className="py-3 px-4 text-right text-slate-700">{item.quantity}</td>
                <td className="py-3 px-4 text-center text-slate-500">{item.unit}</td>
                <td className="py-3 px-4 text-right text-slate-700">{fmt(item.unitPrice)}</td>
                <td className="py-3 px-4 text-right font-medium text-slate-800 rounded-r-xl">{fmt(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-6">
          <div className="w-[260px]">
            <div className="flex justify-between py-2 text-[12px] border-b border-slate-100">
              <span className="text-slate-400">Subtotal</span><span className="text-slate-700">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-[12px] border-b border-slate-100">
              <span className="text-slate-400">Tax ({(taxRate * 100).toFixed(0)}%)</span><span className="text-slate-700">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-[15px] font-bold">
              <span className="text-slate-900">Total</span><span className="text-slate-900">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment details */}
        <div className="bg-slate-50 rounded-2xl px-6 py-4 mb-4 text-[11px]">
          <div className="font-bold text-[11px] text-slate-500 mb-2 tracking-wider">PAYMENT DETAILS</div>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-slate-500">
            <span>Bank</span><span className="text-slate-800">{bank.name}</span>
            <span>Branch</span><span className="text-slate-800">{bank.branch}</span>
            <span>Account No.</span><span className="text-slate-800">{bank.account}</span>
            <span>Account Holder</span><span className="text-slate-800">{bank.holder}</span>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="text-[11px] text-slate-400 mb-2">
            <div className="font-medium text-slate-500 mb-1">Notes</div>
            <div className="whitespace-pre-line">{notes}</div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 flex justify-between items-center text-[9px] text-slate-300">
          <div>{company.name} | {company.email}</div>
          <div>TEL: {company.tel} | Tax ID: {company.taxId}</div>
        </div>
      </div>
    </Page>
  )
}
