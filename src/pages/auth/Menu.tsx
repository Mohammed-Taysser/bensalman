import { Col, Row, message } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import columnBG from '../../assets/images/background/bg-column.png';
import welcomeBG from '../../assets/images/background/welcome.jpeg';
import SuspenseLoading from '../../components/SuspenseLoading';
import ProductModal from '../../components/menu/ProductModal';
import SingleMenuItem from '../../components/menu/SingleMenuItem';
import { API } from '../../core/api';
import { getErrorMessage } from '../../helper';
import Base from '../../layouts/Base';

function Menu() {
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

  const getNeededData = async () => {
    setIsLoading(true);

    try {
      const productsResponse = await API.getProducts();
      const categoryResponse = await API.getCategories();

      setProducts(productsResponse.data.data);
      setCategories(categoryResponse.data.data);
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

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
  };

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === selectedProductName),
    [selectedProductName, products]
  );

  return (
    <Base bg={welcomeBG}>
      {contextHolder}

      {selectedProduct && (
        <ProductModal
          isOpen={isPopupOpen}
          onClose={onClosePopup}
          product={selectedProduct}
        />
      )}

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
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
                    All
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
            gutter={{ xs: 0, md: 20 }}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            {isLoading || isSearching ? (
              <Col xs={24}>
                <SuspenseLoading />
              </Col>
            ) : (
              products.map((product) => (
                <Col xs={24} md={12} key={product.name}>
                  <SingleMenuItem
                    product={product}
                    onProductClick={onProductClick}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Menu;
