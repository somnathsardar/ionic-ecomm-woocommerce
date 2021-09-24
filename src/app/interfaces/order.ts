export interface Order {
  payment_method: String,
  payment_method_title: String,
  set_paid: boolean,
  billing: {
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    postcode: String,
    country: String,
    email: String,
    phone: String
  },
  shipping: {
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    postcode: String,
    country: String
  },
  line_items: [
    {
      product_id: number,
      quantity: number
    }
  ],
  shipping_lines: [
    {
      method_id: String,
      method_title: String,
      total: String
    }
  ]
}
