export const filterValidColumns = (items: any, columns: any) =>
  items.map((item: any) =>
    Object.keys(item)
      .filter((key) => columns.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = item[key]
        return obj
      }, {}),
  )
