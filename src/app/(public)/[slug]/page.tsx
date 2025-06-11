import VisualizarPagina from "@/app/components/visualiza-pagina";

const RelationshipPage = async ({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) => {
  const { slug } = await params

  return (
    <VisualizarPagina slug={slug} />
  );
};

export default RelationshipPage;

