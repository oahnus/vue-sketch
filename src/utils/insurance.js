import dayjs from 'dayjs'

export default {
  getBatchNums(insuranceConfig, startYm, endYm) {
    let start = dayjs(startYm)
    let end = dayjs(endYm)

    let cur = start
    let nodeSet = new Set()

    let {insuranceChangeMonth, foundChangeMonth} = insuranceConfig

    while (!cur.isAfter(end)) {
      let month = cur.toDate().getMonth() + 1;
      let node

      if (insuranceChangeMonth === foundChangeMonth) {
        if (month < insuranceChangeMonth) {
          node = (cur.toDate().getFullYear() - 1) + '07'
        } else {
          node = cur.toDate().getFullYear() + '07'
        }
      } else {
        if (month < insuranceChangeMonth) {
          node = (cur.toDate().getFullYear() - 1) + '07'
        } else if (month < foundChangeMonth) {
          node = cur.toDate().getFullYear() + '04'
        } else {
          node = cur.toDate().getFullYear() + '07'
        }
      }

      nodeSet.add(node)
      cur = cur.add(1, 'M')
    }
    return [...nodeSet]
  }
}
