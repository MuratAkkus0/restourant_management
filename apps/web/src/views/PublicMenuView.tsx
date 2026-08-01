import { useParams } from 'react-router-dom';
import { MdRestaurantMenu } from 'react-icons/md';
import Title from '@/components/atoms/Title';
import Pharagrapf from '@/components/atoms/Pharagrapf';
import { useGetPublicMenuQuery } from '@/store/api/menuApi';

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function PublicMenuView() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const { data: menu, isLoading, isError } = useGetPublicMenuQuery(companySlug ?? '', { skip: !companySlug });

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-neutralLight">
        <Pharagrapf size="base" colorClassName="text-gray-500">
          Loading menu...
        </Pharagrapf>
      </div>
    );
  }

  if (isError || !menu) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-neutralLight gap-3 px-4 text-center">
        <MdRestaurantMenu size={48} className="text-gray-300" />
        <Title size="base">This menu isn't available right now</Title>
        <Pharagrapf size="base" colorClassName="text-gray-500">
          The restaurant may not have published its menu yet, or the link is incorrect.
        </Pharagrapf>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-neutralLight">
      <header className="bg-primary text-white py-10 px-4 text-center">
        {menu.company.logoUrl && (
          <img
            src={menu.company.logoUrl}
            alt={menu.company.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <Title size="large" className="text-white">
          {menu.company.name}
        </Title>
        {menu.company.description && (
          <Pharagrapf size="base" colorClassName="text-white" className="mt-2 max-w-xl mx-auto">
            {menu.company.description}
          </Pharagrapf>
        )}
        {menu.company.phone && (
          <Pharagrapf size="2xs" colorClassName="text-white" className="mt-1">
            {menu.company.phone}
          </Pharagrapf>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-10">
        {menu.categories.length === 0 && (
          <Pharagrapf size="base" colorClassName="text-gray-500" className="text-center">
            This menu doesn't have any published items yet - check back soon.
          </Pharagrapf>
        )}

        {menu.categories.map((category) => (
          <section key={category.id}>
            <Title size="xl" position="left" className="border-b-2 border-primary pb-2 mb-4">
              {category.name}
            </Title>
            <div className="flex flex-col gap-4">
              {category.products.map((product) => (
                <div key={product.id} className="flex gap-4 items-start bg-white rounded-lg shadow-sm p-4">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                      )}
                    </div>
                    <p className="font-semibold whitespace-nowrap">{formatPrice(product.priceCents)} €</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">Powered by Manegio</footer>
    </div>
  );
}

export default PublicMenuView;
