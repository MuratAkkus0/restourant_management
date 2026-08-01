import { toast } from 'sonner';
import { MdCheckCircle, MdContentCopy, MdDownload, MdQrCode2 } from 'react-icons/md';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import Button from '@/components/atoms/Button';
import { useGetAdminMenuQuery } from '@/store/api/menuApi';
import { useGetCompanyProfileQuery } from '@/store/api/companiesApi';
import { useSetMenuPublishedMutation } from '@/store/api/menuApi';
import { useGetQrCodeImageUrlQuery, useGetQrMenuUrlQuery } from '@/store/api/qrApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

function AdminMenuPublishView() {
  const { data: company } = useGetCompanyProfileQuery();
  const { data: menu } = useGetAdminMenuQuery();
  const [setMenuPublished, { isLoading: isToggling }] = useSetMenuPublishedMutation();
  const { data: qrImageUrl, isLoading: isQrLoading } = useGetQrCodeImageUrlQuery();
  const { data: menuUrl } = useGetQrMenuUrlQuery();

  const productCount = (menu?.categories.flatMap((c) => c.products).length ?? 0) + (menu?.uncategorizedProducts.length ?? 0);
  const publishedCount =
    (menu?.categories.flatMap((c) => c.products).filter((p) => p.isPublished).length ?? 0) +
    (menu?.uncategorizedProducts.filter((p) => p.isPublished).length ?? 0);

  const handleTogglePublish = async () => {
    if (!company) return;
    try {
      await setMenuPublished(!company.isMenuPublished).unwrap();
      toast.success(!company.isMenuPublished ? 'Your menu is now public.' : 'Your menu is now hidden.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update the publish status.'));
    }
  };

  const handleCopyLink = async () => {
    if (!menuUrl) return;
    await navigator.clipboard.writeText(menuUrl);
    toast.success('Menu link copied to clipboard.');
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <TitleCardWithIcon text="Publish & QR Code" Icon={MdQrCode2} iconSize={25} textSize="base" />

      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
        <p className="text-sm text-gray-600">
          {publishedCount} of {productCount} product{productCount === 1 ? '' : 's'} are published.
          Publishing the menu makes all published products visible on your public QR page; unpublished
          products always stay hidden even while the menu is published.
        </p>
        <div className="flex items-center gap-3">
          <MdCheckCircle className={company?.isMenuPublished ? 'text-green-600' : 'text-gray-300'} size={22} />
          <span className="font-medium">
            {company?.isMenuPublished ? 'Menu is published' : 'Menu is not published'}
          </span>
          <Button
            text={company?.isMenuPublished ? 'Unpublish menu' : 'Publish menu'}
            size="2xs"
            onBtnClick={handleTogglePublish}
            isSubmitInProgress={isToggling}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-4">
        <h3 className="font-medium self-start">Your public menu QR code</h3>
        {isQrLoading && <p className="text-gray-400">Generating QR code...</p>}
        {qrImageUrl && <img src={qrImageUrl} alt="QR code linking to your public menu" className="w-48 h-48" />}
        {menuUrl && (
          <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
            <span>{menuUrl}</span>
            <button onClick={handleCopyLink} aria-label="Copy menu link" type="button">
              <MdContentCopy />
            </button>
          </div>
        )}
        {qrImageUrl && (
          <a href={qrImageUrl} download="menu-qr-code.png">
            <Button text="Download QR code" size="2xs" className="flex items-center gap-2" />
          </a>
        )}
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <MdDownload /> Print this code on your tables, menus or storefront.
        </p>
      </div>
    </div>
  );
}

export default AdminMenuPublishView;
