export interface IEvent {
  id?: number;
  name?: string;
  start_date?: string;
  end_date?: string;
}

interface IEventStat {
  [key: string]: number
}

export interface IEventStats {
  [key: string]: IEventStat
}