const parser = new DOMParser();

const htmlToText = (text) => {
  const dom = parser.parseFromString(
  '<!doctype html><body>' + text,
  'text/html');
  return  dom.body.textContent;
}

const filterSortMap = (data, field=false) => data.filter(item => item.similarity > 0)
                                  .sort((itemA, itemB) => itemA.similarity > itemB.similarity ? -1 : itemA.similarity < itemB.similarity ? 1 : 0)
                                  .map((item, index) => {
                                    item.body =  htmlToText(item.body)
                                    item.showAnalytics = false
                                    item.index = index
                                    return (field) ? item[field] : item
                                  })

const relevancyRank = (similarity) => {
  if(similarity > 0.8){
      return '1'
  }
  else if(similarity > 0.7){
    return '2'
  }
  else if (similarity > 0.6) {
      return '3'
  }
  else if (similarity > 0.5) {
    return '4'
  }
  else if (similarity > 0.4) {
    return '5'
  }
  else if (similarity > 0.3) {
    return '6'
  }
  else if (similarity > 0.2) {
    return '7'
  }
  else{
    return '8'
  }

}

const calcFrequency = (data) => {
  const freq = {}
  let numItems = 0
  data.forEach(item => {
    freq[relevancyRank(item)] = freq[relevancyRank(item)] || 0
    freq[relevancyRank(item)] += 1
    numItems += 1
  })



  const keys = Object.keys(freq)

  keys.forEach((key) => freq[key] = Number((freq[key]/numItems).toFixed(2)))

  return freq
}


export {htmlToText, filterSortMap, calcFrequency, relevancyRank}
