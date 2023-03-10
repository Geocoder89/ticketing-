import Router  from "next/router"
import useRequest from "../../hooks/use-request"

const TicketDetail = ({ticket})=>{

  const {doRequest,errors} = useRequest({

    url: '/api/orders',
    method: 'post',
    body: {
      ticketId : ticket.id
    },

    onSuccess: (order)=>{
      console.log('this is the order',order)
      Router.push('/orders/[orderId]',`/orders/${order.id}`)
    
    }

  })
  return (
    <>
    <h1>
{ticket.title}</h1>
<h4>{ticket.price}</h4>

{errors}
<button onClick={()=>doRequest()} className="btn btn-primary">Purchase</button>
 </>
  )
}

TicketDetail.getInitialProps = async(context,client)=>{

  const {ticketId} = context.query
  const {data} = await client.get(`/api/tickets/${ticketId}`)

  return {ticket: data}

}

export default TicketDetail
