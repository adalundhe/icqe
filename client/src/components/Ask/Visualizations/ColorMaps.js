const selectColorByEQ = (similarity) => {
  if(similarity === "1"){
      return '#2C3E50'
  }
  else if(similarity === "2"){
    return '#34495E'
  }
  else if (similarity === "3") {
      return '#336E7B'
  }
  else if (similarity === "4") {
    return '#3498DB'
  }
  else if (similarity === "5") {
    return '#59ABE3'
  }
  else if (similarity === "6") {
    return '#89C4F4'
  }
  else if (similarity === "7") {
    return '#ADC6F1'
  }
  else if (similarity === "8"){
    return '#A3CAF8'
  }

}

const selectColorByGT = (similarity) => {
  if(similarity > 0.8){
      return '#2C3E50'
  }
  else if(similarity > 0.7){
    return '#34495E'
  }
  else if (similarity > 0.6) {
      return '#336E7B'
  }
  else if (similarity > 0.5) {
    return '#3498DB'
  }
  else if (similarity > 0.4) {
    return '#59ABE3'
  }
  else if (similarity > 0.3) {
    return '#89C4F4'
  }
  else if (similarity > 0.2) {
    return '#ADC6F1'
  }
  else{
    return '#A3CAF8'
  }

}

export {selectColorByEQ, selectColorByGT}
