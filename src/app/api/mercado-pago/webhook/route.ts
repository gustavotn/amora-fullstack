import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../mail/sendMail";
import { changeToPaid, getPage } from "../../firebase/repositories/pages-repository";

// O Mercado Pago envia notificações via POST
// export async function POST(req: NextRequest) {
//   try {
//     // Recebe o corpo da notificação (pode ser JSON ou urlencoded)
//     const body = await req.json().catch(() => null);

//     // O Mercado Pago envia informações importantes na query string também
//     // Exemplo: ?id=123456&topic=payment
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     const topic = searchParams.get("topic");

//     // Faça o tratamento que desejar aqui (salvar no banco, logar, etc)
//     console.log("Webhook recebido do Mercado Pago:");
//     console.log("Query:", { id, topic });
//     console.log("Body:", body);

//     // Chama o sendMail sem await, usando callback
//     // sendMail({
//     //   to: `estevaobresolin@gmail.com`,
//     // });

//     await changeToPaid(id!)
//     const page = await getPage(id!)

//     await sendMail({
//       to: page.data()["email"],
//     });

//     // Sempre responda 200 OK para o Mercado Pago saber que recebeu
//     return NextResponse.json({ received: true, message: id });
//   } catch (error) {
//     console.error("Erro no webhook:", error);
//     return NextResponse.json({ error: "Erro ao processar webhook. " + error }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const { searchParams } = new URL(req.url);
    const idFromQuery = searchParams.get("id");
    const topicFromQuery = searchParams.get("topic");

    // Fallback: pega do body se não veio na query
    const id = idFromQuery || body?.data?.id;
    const topic = topicFromQuery || body?.type;

    console.log("Webhook recebido do Mercado Pago:");
    console.log("Query:", { idFromQuery, topicFromQuery });
    console.log("Body:", body);
    console.log("Usado:", { id, topic });

    if (!id || !topic) {
      return NextResponse.json({ error: "ID ou tipo não informados." }, { status: 400 });
    }
 
    await changeToPaid(id);
    const page = await getPage(id);

    await sendMail({
      to: page.data()["email"],
    });

    return NextResponse.json({ received: true, message: id });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro ao processar webhook. " + error }, { status: 500 });
  }
}
