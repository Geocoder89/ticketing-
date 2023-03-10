const OrderIndex = ({orders})=>{

  const renderedOrders = orders.map((order)=>{
    return <li key={order.id}>
      {order.ticket.title} - {order.status}   </li>
  })
  return <ul>
    {}
  </ul>
}

OrderIndex.getInitialProps = async(context,client)=>{
    const {data} = await client.get('/api/orders')
    return {orders: data}
}


export default OrderIndex