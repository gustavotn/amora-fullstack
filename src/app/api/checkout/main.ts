
// SDK do Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Adicione credenciais
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7904086990453799-060520-980915c2e0612c660abca501bfa46b2f-352725852' });

// crie uma funcao para chamar o preference
// e criar uma preferência de pagamento
export const Main = async () => {
    const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        id: '1',
        title: 'Plano 1 foto',
        quantity: 1,
        unit_price: 999, // Preço em centavos
      },
      {
          id: '2',
        title: 'Plano 5 foto',
        quantity: 1,
        unit_price: 2999, // Preço em centavos
      }
    ],
    back_urls: {
      success: 'https://amora-pi.vercel.app/',
      failure: 'https://amora-pi.vercel.app/',
      pending: 'https://amora-pi.vercel.app/'
    },
  }
})
.then(console.log)
.catch(console.log);


}

