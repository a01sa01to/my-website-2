// Spec: https://relay.dev/graphql/connections.htm

/**
 * 指定されたデータからCursorを返す。
 * @param data - Cursorを作るデータ
 * @returns Cursor
 */
const generateCursor = <DataType>(data: DataType) =>
  Buffer.from(JSON.stringify(data)).toString('base64')

/**
 * Cursorからデータを復元する。
 * generateCursorの逆関数。
 * @param cursor - データのCursor
 * @returns 復元されたデータ
 */
const restoreCursor = <DataType>(cursor: string) =>
  JSON.parse(Buffer.from(cursor, 'base64').toString()) as DataType

/**
 * 与えられたデータに対し、Cursorを適用する。
 * @param allData - 全データ
 * @param before - それよりも前のデータを取得するためのCursor
 * @param after - それよりも後のデータを取得するためのCursor
 * @returns Cursor適用後のデータ
 * @see {@link https://relay.dev/graphql/connections.htm#ApplyCursorsToEdges()}
 */
const applyCursorsToData = <DataType>(
  allData: DataType[],
  before?: string,
  after?: string
) => {
  const data = allData.concat()
  if (after) {
    const afterData = restoreCursor<DataType>(after)
    const afterIndex = allData.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(afterData)
    )
    if (afterIndex >= 0) {
      data.splice(0, afterIndex + 1)
    }
  }
  if (before) {
    const beforeData = restoreCursor<DataType>(before)
    const beforeIndex = allData.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(beforeData)
    )
    if (beforeIndex >= 0) {
      data.splice(beforeIndex)
    }
  }
  return data
}

/**
 * 返すべきデータを抽出する。
 * @param allData - 全データ
 * @param before - それよりも前のデータを取得するためのCursor
 * @param after - それよりも後のデータを取得するためのCursor
 * @param first - 先頭のデータ数
 * @param last - 末尾のデータ数
 * @returns 抽出されたデータ
 * @see {@link https://relay.dev/graphql/connections.htm#EdgesToReturn()}
 */
const dataToReturn = <DataType>(
  allData: DataType[],
  before?: string,
  after?: string,
  first?: number,
  last?: number
) => {
  const data = applyCursorsToData(allData, before, after)
  if (first) {
    if (first < 0) {
      throw new Error('first must be greater than 0')
    }
    if (data.length < first) {
      // do nothing
    } else {
      data.splice(first)
    }
  }
  if (last) {
    if (last < 0) {
      throw new Error('last must be greater than 0')
    }
    if (data.length < last) {
      // do nothing
    } else {
      data.splice(0, data.length - last)
    }
  }
  return data
}

/**
 * 前のページが存在するかどうかを返す。
 * @param allData - 全データ
 * @param before - それよりも前のデータを取得するためのCursor
 * @param after - それよりも後のデータを取得するためのCursor
 * @param last - 末尾のデータ数
 * @returns 前のページが存在するかどうか
 * @see {@link https://relay.dev/graphql/connections.htm#HasPreviousPage()}
 */
const hasPreviousPage = <DataType>(
  allData: DataType[],
  before?: string,
  after?: string,
  last?: number
) => {
  if (last) {
    const data = applyCursorsToData(allData, before, after)
    if (data.length > last) {
      return true
    } else {
      return false
    }
  }
  if (after) {
    return true
  }
  return false
}

/**
 * 次のページが存在するかどうかを返す。
 * @param allData - 全データ
 * @param before - それよりも前のデータを取得するためのCursor
 * @param after - それよりも後のデータを取得するためのCursor
 * @param first - 先頭のデータ数
 * @returns - 次のページが存在するかどうか
 * @see {@link https://relay.dev/graphql/connections.htm#HasNextPage()}
 */
const hasNextPage = <DataType>(
  allData: DataType[],
  before?: string,
  after?: string,
  first?: number
) => {
  if (first) {
    const data = applyCursorsToData(allData, before, after)
    if (data.length > first) {
      return true
    } else {
      return false
    }
  }
  if (before) {
    return true
  }
  return false
}

/**
 * Paginationを処理する。
 * @param allData - 全データ
 * @param lastUpdate - 最終更新日時
 * @param before - それよりも前のデータを取得するためのCursor
 * @param after - それよりも後のデータを取得するためのCursor
 * @param first - 先頭のデータ数
 * @param last - 末尾のデータ数
 * @returns Paginationの実行結果
 */
const PaginationFn = <DataType>(
  allData: DataType[],
  lastUpdate: string | null,
  before?: string,
  after?: string,
  first?: number,
  last?: number
) => {
  const data = dataToReturn(allData, before, after, first, last)
  const hasPrevious = hasPreviousPage(allData, before, after, last)
  const hasNext = hasNextPage(allData, before, after, first)
  const startCursor = generateCursor(data[0])
  const endCursor = generateCursor(data[data.length - 1])
  return {
    dataset: data,
    last_update: lastUpdate,
    pageinfo: {
      startCursor,
      endCursor,
      hasPreviousPage: hasPrevious,
      hasNextPage: hasNext,
    },
  }
}

export { PaginationFn }
