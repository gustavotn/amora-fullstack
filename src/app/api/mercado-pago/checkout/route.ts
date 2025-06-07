import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";
import { Items } from "mercadopago/dist/clients/commonTypes";

const plans : Items[] = [
  {
    id: '1',
    title: 'Plano 1 foto',
    quantity: 1,
    unit_price: 9.99,
  },
  {
    id: '2',
    title: 'Plano 2 fotos e música',
    quantity: 1,
    unit_price: 29.99,
  },
] as const

export async function POST(req: NextRequest) {
  const { id, userEmail, planId } = await req.json();

  if (planId !== '1' && planId !== '2') {
    throw new Error('Plan does not exist')
  }

  const items = plans.filter(p => p.id == planId)

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          id, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
          // userEmail: userEmail,
          // plan: '123'
          //etc
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),
        items,
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          //   excluded_payment_methods: [
          //     {
          //       id: "bolbradesco",
          //     },
          //     {
          //       id: "pec",
          //     },
          //   ],
          //   excluded_payment_types: [
          //     {
          //       id: "debit_card",
          //     },
          //     {
          //       id: "credit_card",
          //     },
          //   ],
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        back_urls: {
          success: 'https://amora-pi.vercel.app/',
          failure: 'https://amora-pi.vercel.app/',
          pending: 'https://amora-pi.vercel.app/'
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
