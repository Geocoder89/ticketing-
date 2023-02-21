import {useEffect,useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'                                                                                                          
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const orderDetails = ({order})=>{

  const [timeLeft, setTimeLeft] = useState(0)

  const {doRequest,errors} = useRequest({
      url: '/api/payments',
      method: 'post',
      body: {
        orderId: order.id,
      },
      onSuccess: (payment)=> {
        console.log(payment)
        Router.push('/orders')
      }
  })
 
  useEffect(()=>{
      const calcTimeLeft = ()=>{
        const timeLeftInMilliSeconds = new Date(order.expiresAt) - new Date()
        

        setTimeLeft(Math.round(timeLeftInMilliSeconds/1000))
      }

    calcTimeLeft()
    const timerId =setInterval(calcTimeLeft,1000)
  
    return ()=>{
      clearInterval(timerId)
    }
  },[order])

  if(timeLeft < 0) {
    return <div>Order expired</div>
  }

  return (
    <div>
      you have {timeLeft} seconds left to pay before the order expires.
      <StripeCheckout
      token={({id})=> doRequest({token:id})
    }
      stripeKey="pk_test_51MZWZvHChvrDjlZ3g1T77CyteBPxLCSR99XzKPlEmXO91lN23nvmx3ccEirgQRsvmIQUg6PZyR0SNj256QO7SMZB00XHFPCQcO"
      amount={order.ticket.price * 100}
      email={currentUser.email}
      />
    </div>
  )
}



orderDetails.getInitialProps = async(context,client)=>{
  const {orderId} = context.query
  const {data} = await client.get(`/api/orders/${orderId}`)

  return {order: data}
}

export default orderDetails