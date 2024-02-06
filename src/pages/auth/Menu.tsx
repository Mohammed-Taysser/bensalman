import { Col, Empty, Row, message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import columnBG from '../../assets/images/background/bg-column.png';
import SuspenseLoading from '../../components/SuspenseLoading';
import MenuItem from '../../components/menu/MenuItem';
import ProductModal from '../../components/menu/ProductModal';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';
import { useAppDispatch } from '../../hooks/useRedux';
import Base from '../../layouts/Base';
import { setUserStatus } from '../../redux/slices/status.slice';

function Menu() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedCategoryName, setSelectedCategoryName] = useState<
    null | string
  >(null);
  const [selectedProductName, setSelectedProductName] = useState<null | string>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (selectedProductName) {
      setIsPopupOpen(true);
    }
  }, [selectedProductName]);

  useEffect(() => {
    getNeededData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductsByCategory = async (id: string) => {
    setIsSearching(true);

    API.getProducts({ item_group: id })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: getErrorMessage(error),
        });
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const getProducts = async () => {
    setIsSearching(true);

    API.getProducts()
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: getErrorMessage(error),
        });
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const getNeededData = async () => {
    setIsLoading(true);

    try {
      const productsResponse = await API.getProducts();
      const categoryResponse = await API.getCategories();

      setProducts(productsResponse.data.data);
      setCategories(categoryResponse.data.data);

      dispatch(setUserStatus(productsResponse.data.extra));
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCategoryBtnClick = (id: string) => {
    setSelectedCategoryName(id);

    getProductsByCategory(id);
  };

  const onProductClick = (id: string) => {
    setSelectedProductName(id);
  };

  const onClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProductName(null);

    if (selectedCategoryName) {
      getProductsByCategory(selectedCategoryName);
    } else {
      getProducts();
    }
  };

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === selectedProductName),
    [selectedProductName, products]
  );

  const Products = useCallback(() => {
    if (isLoading || isSearching) {
      return (
        <Col xs={24}>
          <SuspenseLoading />
        </Col>
      );
    }

    if (products.length > 0) {
      return products.map((product) => (
        <Col xs={24} md={12} key={product.name}>
          <MenuItem product={product} onProductClick={onProductClick} />
        </Col>
      ));
    }

    return (
      <Col xs={24}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Col>
    );
  }, [isLoading, isSearching, products]);

  return (
    <Base>
      {contextHolder}

      {selectedProduct && (
        <ProductModal
          isOpen={isPopupOpen}
          onClose={onClosePopup}
          id={selectedProduct.item_name}
        />
      )}

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={24} sm={22} md={18}>
          {!isLoading && (
            <div>
              <Swiper
                spaceBetween={20}
                slidesPerView='auto'
                navigation
                modules={[Navigation]}
                className='category-slider'
              >
                <SwiperSlide style={{ width: 'auto' }}>
                  <button
                    className={`single-menu-category ${
                      !selectedCategoryName ? 'selected' : ''
                    } `}
                    onClick={() => onCategoryBtnClick('')}
                  >
                    {t('all')}
                  </button>
                </SwiperSlide>

                {categories.map((cty) => (
                  <SwiperSlide key={cty.names} style={{ width: 'auto' }}>
                    <button
                      className={`single-menu-category ${
                        selectedCategoryName === cty.names ? 'selected' : ''
                      } `}
                      onClick={() => onCategoryBtnClick(cty.names)}
                    >
                      {cty.names}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <Row
            gutter={[
              { xs: 10, md: 10 },
              { xs: 20, md: 20 },
            ]}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            <Products />
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Menu;
