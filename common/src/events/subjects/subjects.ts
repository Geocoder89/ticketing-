// subjects is a name of a channel


export enum Subjects {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',

  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',
  ExpirationComplete='expiration:complete',
  PaymentCreated = 'payment:created'
}
