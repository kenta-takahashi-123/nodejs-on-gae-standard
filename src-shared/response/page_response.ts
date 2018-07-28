import { Status } from "./status";

export type PageResponse = {
  status: Status, 
  title: string,
  templateName: string,
  params?: object
}
