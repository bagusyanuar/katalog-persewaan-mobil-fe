'use client'

import React from 'react'
import { OrderDetail, OrderCart, OrderRentDriver, Order } from '@/model/order';

interface IProps {
  data: OrderDetail
}
const OrderDetailSourcePage: React.FC<IProps> = ({ data }) => {
  return (
    <div>OrderDetailSourcePage</div>
  )
}

export default OrderDetailSourcePage