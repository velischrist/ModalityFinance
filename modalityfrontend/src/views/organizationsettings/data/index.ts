export type Funds = {
    id: number
    fund_name: string
    fund_size: string
    fund_type: string
    fund_status: string
    started_at: string
    investments: number
}

export const data10: Funds[] = [
    {
        id: 1,
        fund_name: 'AVC Equities',
        fund_size: '$20,000,000',
        fund_type: 'Equity',
        fund_status: 'Open',
        started_at: '02 May 2024',
        investments: 3,
    },
    {
        id: 2,
        fund_name: 'XYZ Capital',
        fund_size: '$50,000,000',
        fund_type: 'Credit',
        fund_status: 'Closed',
        started_at: '02 May 2024',
        investments: 15,
    },
    {
        id: 3,
        fund_name: 'ABC Ventures',
        fund_size: '$150,000,000',
        fund_type: 'Credit',
        fund_status: 'Open',
        started_at: '02 May 2024',
        investments: 45,
    },
    {
        id: 4,
        fund_name: 'DEF Investments',
        fund_size: '$75,000,000',
        fund_type: 'Credit',
        fund_status: 'Open',
        started_at: '02 May 2024',
        investments: 28,
    },
    {
        id: 5,
        fund_name: 'GHI Capital',
        fund_size: '$200,000,000',
        fund_type: 'Equity',
        fund_status: 'Open',
        started_at: '02 May 2024',
        investments: 60,
    },
]
