import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { compose } from 'redux';

import { ProductCart, State } from 'src/common/types';
import { formatPrice } from 'src/helpers';
import { PATH_PUBLIC } from 'src/routes/paths';

import useLocalStorage from '../../hooks/useLocalStorage';
import { getProductCartAction } from '../../pages/App/actions';
import store from '../../store';
import ModalDelete from '../ModalDelete';
import styles from './styles';

type Cart = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  thumbnail: string;
  slug: string;
};

type Props = {
  productCart: ProductCart;
  productList: ProductCart[];
  onDeleteProduct: (id: string) => void;
};

const CartProductListItem: React.FC<Props> = ({ productList, productCart, onDeleteProduct }) => {
  const [storedValue, setStoredValue] = useLocalStorage<Cart[]>('listCart', []);
  const [quantity, setQuantity] = useState(productCart.quantity);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);

  const handleDelete = () => onDeleteProduct(productCart.productId);

  useEffect(() => {
    setQuantity(productCart.quantity);
  }, [productCart.quantity]);

  const handleIncrease = () => {
    if (quantity === 10) return;
    setQuantity(quantity + 1);

    const storeCart = productList.map(item => {
      const result = item;

      if (item.productId === productCart.productId) {
        return { ...result, quantity: result.quantity + 1 };
      }
      return result;
    });

    setStoredValue(storeCart);

    store.dispatch(getProductCartAction(storeCart));
  };

  const handleReduce = () => {
    if (quantity === 1) {
      setModalDeleteProduct(true);
      return;
    }

    setQuantity(quantity - 1);

    const storeCart = productList.map(item => {
      const result = item;
      if (item.productId === productCart.productId) {
        return { ...result, quantity: result.quantity - 1 };
      }
      return result;
    });

    setStoredValue(storeCart);

    store.dispatch(getProductCartAction(storeCart));
  };

  return (
    <Paper sx={styles.paper}>
      <Box padding="16px">
        <Link to={PATH_PUBLIC.product.slug(productCart?.slug, productCart?.productId)}>
          <Box
            sx={styles.avatar}
            width="110px"
            height="110px"
            component="img"
            src={productCart.thumbnail}
            alt={productCart.name}
          />
        </Link>
      </Box>
      <Box sx={styles.informationProduct}>
        <Box sx={styles.inforNameProduct}>
          <Link to={PATH_PUBLIC.product.slug(productCart?.slug, productCart?.productId)}>
            <Box component="span" sx={styles.nameProduct}>
              {productCart.name}
            </Box>
          </Link>
        </Box>
        <Box sx={styles.wrapperPrice}>
          <Box component="span" sx={styles.priceXQuantity}>
            {formatPrice.format(productCart.priceInitial)} x {quantity}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Button variant="outlined" sx={styles.btnReduce} onClick={handleReduce}>
            <RemoveIcon fontSize="small" />
          </Button>
          <Box sx={styles.boxQuantity}>{quantity}</Box>
          <Button variant="outlined" sx={styles.btnIncrease} onClick={handleIncrease}>
            <AddIcon fontSize="small" />
          </Button>
        </Box>
        <Box component="span" sx={styles.totalPrice}>
          {formatPrice.format(productCart.price * quantity)}
        </Box>
        <Button variant="contained" sx={styles.btnDelete} onClick={() => setModalDeleteProduct(true)}>
          <DeleteIcon fontSize="small" />
        </Button>
      </Box>
      <ModalDelete
        content="Delete this product"
        openModal={modalDeleteProduct}
        handleCloseModal={() => setModalDeleteProduct(false)}
        onDelete={() => handleDelete()}
      />
    </Paper>
  );
};

const mapStateToProps = ({
  global: {
    product: {
      cart: { list },
    },
  },
}: State) => ({
  productList: list,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(CartProductListItem);
