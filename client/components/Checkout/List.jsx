import { css } from '@emotion/css';
import { Image, Text } from '@nextui-org/react';
import { useMediaQueryBetween } from 'hooks/useMediaQuery';
import toIDR from 'shared/currency/toIDR';
import { dFlex } from 'styles/globals';
import { styCheckout } from './style';

export default function CheckoutList(props) {
  const { data: cart } = props;
  const { product_detail, product_variant } = cart || {};

  const isBetweenSMAndMD = useMediaQueryBetween({ min: 320, max: 425 });

  return (
    <div className={styCheckout({ sm: isBetweenSMAndMD })}>
      <div className={dFlex}>
        <Image
          width={64}
          height={64}
          src={process.env.IMAGE_URL + product_detail.public_image_url}
          className={css({ margin: '0' })}
        />
        <div className={css({ marginLeft: isBetweenSMAndMD ? 5 : 10 })}>
          <Text weight="bold" h6>
            {product_detail.name}
          </Text>
          <Text>{product_variant?.product_variant_name}</Text>
          <Text>Rp.{toIDR(Number(product_detail.price))}</Text>
        </div>
      </div>
    </div>
  );
}
