export interface ITask {
  id?: string;
  _id?: string;
  list?: string;
  title: string;
  date?: Date;
  done?: boolean;
  description?: string;
}
