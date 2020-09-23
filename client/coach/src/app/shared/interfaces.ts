export interface User {
    email: string
    password: string
}

export interface Message {
  message: string
}

export interface MusclesGroup {
  name: string,
  user?: string,
  _id?: string,
  children?: Muscle[]
}

export interface Workout {
  name: string,
  user?: string,
  _id?: string
}


export interface Muscle {
  name: string,
  description: string,
  imageSrc?: string,
  user?: string,
  category: string,
  _id?: string,
  sets?: any[]
}

export  interface Order {
  date?: Date,
  order?: number,
  user?: string,
  list: OrderPosition[],
  _id?: string
}

export interface OrderPosition {
  name: string,
  cost: number,
  quantity: number,
  _id?: string
}

export interface Filter {
  start?: Date,
  end?: Date,
  order?: number
}

export interface OverviewPage {
  orders?: OverviewPageItem,
  gain?: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number,
  compare: number,
  yesterday: number,
  isHigher: boolean
}

export interface AnalyticsPage {
  averageCheck: number,
  chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
  gain: number,
  order: number,
  label: string
}
