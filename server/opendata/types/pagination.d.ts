export type PaginationArg = {
  before?: string
  after?: string
  first?: number
  last?: number
}

export type Pagination<DataType> = ({
  before,
  after,
  first,
  last,
}: PaginationArg) => {
  dataset: DataType[]
  last_update: string | null
  pageinfo: {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
}
