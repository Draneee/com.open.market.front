import { Console } from 'console';
import { API_URL } from './const';
import customFetchClient from './custom-fetch-client';

export const uploadPictureCloudinary = async (picture: any) => {
  const isUrl = typeof picture === 'string';
  if (isUrl) return { pictureUrl: picture, cloudinaryId: '' };

  const formData = new FormData();

  formData.append('file', picture[0]);
  formData.append('upload_preset', 'ml_default');

  const resCld = await fetch(
    `https://api.cloudinary.com/v1_1/dynscts1t/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  if (!resCld.ok) throw Error;
  const { asset_id: cloudinaryId, secure_url: pictureUrl } =
    await resCld.json();

  return { cloudinaryId, pictureUrl };
};
export const uploadProductToInventory = async (values: any) => {
  const { productName, SKU, quantity, picture, price } = values;

  const isUrl = typeof picture === 'string';
  const itemHasId = values?.id;
  const { cloudinaryId, pictureUrl } = await uploadPictureCloudinary(picture);

  const body = {
    SKU,
    pictureUrl,
    productName,
    cloudinaryId: cloudinaryId ? cloudinaryId : values?.cloudinaryId,
    price,
    quantity: Number(quantity),
  };
  const res = await customFetchClient(
    `${API_URL}/inventory${itemHasId ? `/${values?.id}` : ''}`,
    {
      method: itemHasId ? 'PUT' : 'POST',
      body: JSON.stringify(body),
    }
  );

  const json = res.json();
  return json;
};
