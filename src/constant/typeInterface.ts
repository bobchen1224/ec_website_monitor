export interface TotalDataResponse {
    totalSales: number,
    totalVisitors: number,
    totalAddToCarts: number,
    totalConversions: number,
    sitePerformance: number,
    siteSEO: number,
};

export type TrafficDataResponse = Array<
    {
        timeTicks: number,
        traffic: number,
        bounceRate: number,
    }
>;

export type SalesDataResponse = Array<
    {
        timeTicks: number,
        sales: number | null,
        perSale: number | null,
    }
>;

export type SourceDataResponse = Array<
    {
        y: number, 
        x: number, 
        name: string, 
        description: string | null, 
        color: string,
    }
>;

export interface AdsDataResponse {
    name: string,
    type: string,
    budget: number,
    clicks: number,
    impression: number,
    clickRate: number | null,
    costs: number | null,
    conversions: number,
    conversionsValue: number,
    roas: number | null,
};

export type TempAdsList = Array<AdsDataResponse>;

export interface SortParams {
    label: string,
    type: 'asc' | 'desc' | undefined,
};

export type TableHeaderParams = Array<
    {
        level: string,
        items: Array<
            {
                name: string,
                label: string,
                column: number,
            }
        >,
    }
>;

export interface DataRowsProps {
    openPop: (budget: number, name: string) => void,
    data: AdsDataResponse
};