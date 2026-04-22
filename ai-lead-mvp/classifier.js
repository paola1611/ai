/**
 * Classify a message into Sales, Support, or Other using keyword matching
 * Free alternative to OpenAI API
 */
export async function classifyMessage(message) {
  try {
    const text = message.toLowerCase();

    // Sales keywords
    const salesKeywords = [
      'precio', 'presupuesto', 'costo', 'compra', 'pago', 'plan', 'suscripción',
      'licencia', 'descuento', 'oferta', 'promoción', 'venta', 'interesado',
      'cuanto cuesta', 'cuanto vale', 'quote', 'pricing', 'purchase', 'buy',
      'payment', 'subscription', 'cost', 'price', 'deal', 'contract', 'upgrade',
      'premium', 'enterprise', 'paquete', 'propuesta', 'negocio', 'inversión',
      'comercial', 'factura', 'presupesto', 'cotización', 'modalidades'
    ];

    // Support keywords
    const supportKeywords = [
      'error', 'no funciona', 'problema', 'falla', 'crash', 'bug', 'issue',
      'ayuda', 'soporte', 'help', 'support', 'no puedo', 'no logro', 'no sé',
      'como', 'tutorial', 'guía', 'manual', 'instrucciones', 'configurar',
      'setup', 'instalación', 'cuenta', 'login', 'contraseña', 'password',
      'acceso', 'recuperar', 'reset', 'verificar', 'confirmar', 'pendiente',
      'no recibí', 'duda', 'pregunta', 'consulta', 'lentitud', 'lento', 'demora',
      'timeout', 'conexión', 'conexion', 'internet', 'servidor', 'down', 'caído',
      'inactivo', 'bloqueado', 'suspendido', 'cancelado'
    ];

    // Count keyword matches
    let salesScore = 0;
    let supportScore = 0;

    for (const keyword of salesKeywords) {
      if (text.includes(keyword)) {
        salesScore += text.split(keyword).length - 1;
      }
    }

    for (const keyword of supportKeywords) {
      if (text.includes(keyword)) {
        supportScore += text.split(keyword).length - 1;
      }
    }

    // Determine classification
    if (salesScore > supportScore && salesScore > 0) {
      return 'Sales';
    } else if (supportScore > 0) {
      return 'Support';
    } else {
      return 'Other';
    }
  } catch (error) {
    console.error('Error classifying message:', error);
    return 'Other';
  }
}
