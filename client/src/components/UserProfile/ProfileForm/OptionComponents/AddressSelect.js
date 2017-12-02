import React from 'react'
import {addressSelectBlock} from './OptionStyles'

const AddressSelect = (props) =>
  <div style={addressSelectBlock.blockStyle}>
    <input style={addressSelectBlock.selectBox} type='checkbox' onChange={() => props.showAddressOption()} />
    <p  style={addressSelectBlock.textBox}>Add/Edit Address</p>
  </div>


export {AddressSelect}
