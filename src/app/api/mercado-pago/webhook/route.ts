import { NextRequest, NextResponse } from "next/server";

// O Mercado Pago envia notificações via POST
export async function POST(req: NextRequest) {
  try {
    // Recebe o corpo da notificação (pode ser JSON ou urlencoded)
    const body = await req.json().catch(() => null);

    // O Mercado Pago envia informações importantes na query string também
    // Exemplo: ?id=123456&topic=payment
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const topic = searchParams.get("topic");

    // Faça o tratamento que desejar aqui (salvar no banco, logar, etc)
    console.log("Webhook recebido do Mercado Pago:");
    console.log("Query:", { id, topic });
    console.log("Body:", body);

    // Sempre responda 200 OK para o Mercado Pago saber que recebeu
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro ao processar webhook" }, { status: 500 });
  }
}