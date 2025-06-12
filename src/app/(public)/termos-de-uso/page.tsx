'use client';

const TermosDeUso = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl text-gray-800 leading-relaxed space-y-6">
      <section>
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Política de Privacidade</h1>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introdução</h2>
        <p>Sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Informações que Coletamos</h2>
        <p>Coletamos as seguintes informações quando você utiliza nossa plataforma:</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li><strong>Informações de Cadastro:</strong> Nome, data de início do relacionamento, mensagem personalizada, fotos do casal e endereço de email cadastrado.</li>
          <li><strong>Informações de Pagamento:</strong> Endereço de email cadastrado no Stripe para processamento do pagamento e envio do link da página personalizada.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Como Usamos Suas Informações</h2>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Processar o pagamento e enviar o link da página personalizada via email.</li>
          <li>Personalizar e criar a página do casal com as informações fornecidas.</li>
          <li>Melhorar nossos serviços e suporte ao cliente.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Compartilhamento de Informações</h2>
        <p>Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para processar pagamentos e conforme exigido por lei.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Segurança</h2>
        <p>Implementamos medidas de segurança para proteger suas informações pessoais contra acesso, uso ou divulgação não autorizados. No entanto, nenhuma transmissão de dados pela internet é completamente segura, e não podemos garantir a segurança absoluta.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Retenção de Dados</h2>
        <p>Reteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas ou conforme exigido por lei.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Seus Direitos</h2>
        <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco pelo email: <a href="mailto:openhelp2025@gmail.com.br" className="text-blue-600 hover:underline">openhelp2025@gmail.com.br</a>.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contato</h2>
        <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo email: <a href="mailto:openhelp2025@gmail.com.br" className="text-blue-600 hover:underline">openhelp2025@gmail.com.br</a>.</p>
      </section>

      <hr className="my-8 border-t-2 border-gray-200" />

      <section>
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Termos de Uso</h1>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Aceitação dos Termos</h2>
        <p>Ao utilizar nossa plataforma, você concorda com estes Termos de Uso. Se não concordar, por favor, não utilize nossos serviços.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Descrição do Serviço</h2>
        <p>Oferecemos um serviço de criação de páginas personalizadas para casais, que inclui informações como nome, data de relacionamento, mensagem personalizada, fotos e outros dados fornecidos pelos usuários.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Planos e Licença de Uso</h2>
        <p>O plano adquirido é de caráter vitalício, ou seja, a página permanecerá ativa por tempo indeterminado, enquanto nossa plataforma estiver operando.</p>
        <p>No entanto, o termo vitalício se refere à vida útil do serviço, e não garante sua existência eterna. Poderão ocorrer situações em que o serviço seja interrompido por motivos de força maior, tais como:</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Encerramento das atividades da empresa por motivos financeiros ou operacionais.</li>
          <li>Problemas técnicos irreparáveis, como quedas prolongadas de servidores.</li>
          <li>Falta de conexão à internet, catástrofes, falhas de infraestrutura ou qualquer outro evento fora do nosso controle.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Responsabilidades do Usuário</h2>
        <p>Você é responsável por fornecer informações corretas e manter seus dados atualizados. É proibido o uso do serviço para atividades ilícitas, ofensivas ou que violem direitos de terceiros.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitações de Responsabilidade</h2>
        <p>Não nos responsabilizamos por interrupções temporárias ou permanentes decorrentes de fatores externos, como falhas de internet, servidores, fornecedores de serviços ou qualquer evento fora do nosso controle razoável.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Alterações no Serviço</h2>
        <p>Reservamo-nos o direito de modificar, suspender ou encerrar, parcial ou totalmente, nossos serviços, mediante aviso prévio quando possível.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contato</h2>
        <p>Para dúvidas, sugestões ou solicitações, entre em contato conosco pelo email: <a href="mailto:openhelp2025@gmail.com" className="text-blue-600 hover:underline">openhelp2025@gmail.com</a>.</p>
      </section>
    </div>
  );
};

export default TermosDeUso;
