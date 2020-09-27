export interface IUser {
    email: string
    password: string
}

export interface IClient {
  name: string
  _id?: string
  price?: string
}

export interface IMessage {
  message: string
}

export interface IMusclesGroup {
  name: string
  user?: string
  _id?: string
  children?: IMuscle[]
}

export interface IMuscle {
  name: string
  description: string
  imageSrc?: string
  user?: string
  category: string
  _id?: string
  sets?: any[]
}

export interface IWorkout {
  name: string
  user?: string
  _id?: string
  exercises?: IExercise[]
  clients?: String[]
  date?: Date
}

export interface IExercise {
  _id: string
  sets: number[]
  weights: number[]
  name: String
  date?: Date
  client?: String
}









export  interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface OverviewPage {
  orders?: OverviewPageItem
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
