import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../mail/sendMail";
import { changeToPaid, getPage } from "../../firebase/repositories/pages-repository";

// O Mercado Pago envia notificações via POST

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const { searchParams } = new URL(req.url);
    const idFromQuery = searchParams.get("id");
    const topicFromQuery = searchParams.get("topic");

    const id = idFromQuery || body?.data?.id;
    const topic = topicFromQuery || body?.type;

    console.log("Webhook recebido do Mercado Pago:");
    console.log("Query:", { idFromQuery, topicFromQuery });
    console.log("Body:", body);
    console.log("Usado:", { id, topic });

    if (!id || !topic) {
      return NextResponse.json({ error: "ID ou tipo não informados." }, { status: 400 });
    }

   const payment = await getPayment(id);

  if (!payment || !payment.status || payment.status !== "approved") {
    console.log("Pagamento ainda não aprovado ou inválido:");
    console.log(payment);
    return NextResponse.json({ ignored: true });
  }

  const externalReference = payment.external_reference;

  if (!externalReference) {
    console.warn("Pagamento sem external_reference, aguardando novo webhook:");
    console.log(payment);
    return NextResponse.json({ error: "Pagamento sem referência externa" }, { status: 202 });
  }

  // Aqui o external_reference já deve ser confiável
  await changeToPaid(externalReference); // <--- Use ele aqui

  const page = await getPage(externalReference);

  await sendMail({
    to: page.data()["email"],
    id: page.data()["id"],
  });

    return NextResponse.json({ received: true, message: id });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro ao processar webhook. " + error }, { status: 500 });
  }
}

async function getPayment(id: string) {
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar pagamento no Mercado Pago");
  }

  return await res.json();
}