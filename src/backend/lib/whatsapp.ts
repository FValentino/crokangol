export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "")
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encoded}`
}

export function buildOrderMessage(
  storeName: string,
  clientName: string,
  items: { productName: string; quantity: number; subtotal: number }[],
  total: number
): string {
  const lines = [
    `🛒 *Pedido - ${storeName}*`,
    `👤 Cliente: ${clientName}`,
    "",
    "*Detalle:*",
    ...items.map(
      (i) => `  ${i.productName} x${i.quantity} = $${i.subtotal.toFixed(2)}`
    ),
    "",
    `💰 *Total: $${total.toFixed(2)}*`,
  ]

  return lines.join("\n")
}
