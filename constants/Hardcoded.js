export const Hardorders = [
    {
      id: 1,
      orderInfo: {
        City: "PRAYAGRAJ",
        Name: "RAJ GUPTA",
        Email: "raj6gupta111997@gmail.com",
        Phone: "7003297365",
        State: "Uttar_Pradesh",
        Country: "India",
        Pincode: "211003",
        PaymentMethod: "cashOnDelivery",
        StreetAddress: "222/104/1E MAHAVIRAN LANE, MUTTHIGANJ"
      },
      totalAmount: "348.00",
      paymentStatus: "failed",
      orderStatus: "placed",
      items: [
        {
          id: 1,
          productId: 2,
          name: "Aam Jindagi",
          size: "250g",
          price: "270.00",
          quantity: 1,
          totalPrice: "270.00"
        },
        {
            id: 3,
            productId: 2,
            name: "Aam Masti",
            size: "250g",
            price: "270.00",
            quantity: 1,
            totalPrice: "270.00"
          }
      ]
    },
    {
      id: 2,
      orderInfo: {
        City: "DELHI",
        Name: "SITA VERMA",
        Email: "sita.verma@example.com",
        Phone: "9876543210",
        State: "Delhi",
        Country: "India",
        Pincode: "110001",
        PaymentMethod: "creditCard",
        StreetAddress: "123, New Delhi"
      },
      totalAmount: "500.00",
      paymentStatus: "successful",
      orderStatus: "shipped",
      items: [
        {
          id: 2,
          productId: 3,
          name: "Mango Delight",
          size: "500g",
          price: "500.00",
          quantity: 1,
          totalPrice: "500.00"
        }
      ]
    },
    {
      id: 3,
      orderInfo: {
        City: "MUMBAI",
        Name: "KAVITA SHARMA",
        Email: "kavita.sharma@example.com",
        Phone: "9123456789",
        State: "Maharashtra",
        Country: "India",
        Pincode: "400001",
        PaymentMethod: "debitCard",
        StreetAddress: "456, Mumbai"
      },
      totalAmount: "750.00",
      paymentStatus: "pending",
      orderStatus: "processing",
      items: [
        {
          id: 3,
          productId: 4,
          name: "Tropical Mix",
          size: "1kg",
          price: "750.00",
          quantity: 1,
          totalPrice: "750.00"
        }
      ]
    }
  ];