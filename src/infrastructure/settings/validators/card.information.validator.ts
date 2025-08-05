import z from "zod"

export const CreditCardFormSchema = z
  .object({
    cardholderName: z
      .string()
      .min(2, 'Cardholder name must be at least 2 characters')
      .max(50, 'Cardholder name must be less than 50 characters'),

    cardNumber: z
      .string()
      .min(1, 'Card number is required')
      .refine((value) => {
        const cleanNumber = value.replace(/\s/g, '')
        return /^\d{13,19}$/.test(cleanNumber)
      }, 'Invalid card number format'),

    expiryMonth: z
      .string()
      .min(1, 'Expiry month is required')
      .refine((value) => {
        const month = parseInt(value)
        return month >= 1 && month <= 12
      }, 'Invalid month'),

    expiryYear: z
      .string()
      .min(1, 'Expiry year is required')
      .refine((value) => {
        const year = parseInt(value)
        const currentYear = new Date().getFullYear()
        return year >= currentYear && year <= currentYear + 20
      }, 'Invalid year'),

    cvv: z
      .string()
      .min(3, 'CVV must be at least 3 digits')
      .max(4, 'CVV must be at most 4 digits')
      .refine((value) => /^\d+$/.test(value), 'CVV must contain only digits'),
  })

  // Add expiry date validation
  .refine(
    (data) => {
      if (!data.expiryMonth || !data.expiryYear) return true // Let individual field validation handle this

      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1
      const expiryYear = parseInt(data.expiryYear)
      const expiryMonth = parseInt(data.expiryMonth)

      return (
        expiryYear > currentYear ||
        (expiryYear === currentYear && expiryMonth >= currentMonth)
      )
    },
    {
      message: 'Card has expired',
      path: ['expiryYear'], // Show error on year field
    },
  )

export type CreditCardFormData = z.infer<typeof CreditCardFormSchema>
