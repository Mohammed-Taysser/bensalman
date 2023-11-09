import { Col, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import columnBG from '../assets/images/background/bg-column.png';
import welcomeBG from '../assets/images/background/welcome.jpeg';
import SingleMenuItem from '../components/menu/SingleMenuItem';
import ProductModal from '../components/menu/ProductModal';
import Base from '../layouts/Base';

const CATEGORY = [
  {
    title: 'Leaves any text',
    id: '9fa467b7-852b-4e1f-9981-c8292b254a4b',
  },
  {
    title: 'Bread',
    id: '339e5f55-1ad8-454c-bce9-1a25f3b4ac02',
  },
  {
    title: 'Garlic',
    id: '3bcd43f1-e447-4e78-9afe-b856176bce8d',
  },
  {
    title: 'Safflower',
    id: 'de36bb41-cb1f-4862-b652-8b8f7f4a381c',
  },
  {
    title: 'Wine',
    id: '670f0513-dada-4085-9640-31b53a104731',
  },
];

const PRODUCTS = [
  {
    title: 'Table Cloth 62x120 White',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    price: 19.5,
    id: 'e81bf5d2-af50-4433-b5d6-464e9f1ca0fa',
    qty: 0,
  },
  {
    title: 'Bag - Regular Kraft 20 Lb',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    price: 14.56,
    id: 'eb807821-483d-4435-a970-c9156086b78c',
    qty: 0,
  },
  {
    title: 'Coffee Cup 16oz Foam',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    price: 33.3,
    id: '47e5c159-1bbe-4865-92fc-fa480b981096',
    qty: 0,
  },
  {
    title: 'Butter Sweet',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 98.58,
    id: '8558896f-a779-4689-918f-9da1a4287d52',
    qty: 1,
  },
  {
    title: 'Gatorade - Fruit Punch',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    price: 69.42,
    id: '8362a8fc-aaae-4d13-919d-24a4acf835f9',
    qty: 0,
  },
  {
    title: 'Trueblue - Blueberry 12x473ml',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    price: 57.57,
    id: '06cafff8-f48d-4ebe-b9de-a486df9aae69',
    qty: 0,
  },
  {
    title: 'Dasheen',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    price: 38.96,
    id: '056a45fe-bb76-43e5-92c4-650019c9f28e',
    qty: 0,
  },
  {
    title: 'Cheese - Brie',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    price: 19.88,
    id: '3c1d0774-d84e-482d-9320-45ed36b5d67b',
    qty: 3,
  },
  {
    title: 'Beans - Turtle, Black, Dry',
    description:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 73.47,
    id: '84731f8c-6947-4e33-9038-50b30486a179',
    qty: 0,
  },
  {
    title: 'Sauce - Soy Low Sodium - 3.87l',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    price: 80.67,
    id: 'e18e77fd-1ab9-489d-84f2-35cc92af2cb3',
    qty: 0,
  },
  {
    title: 'Sauce - Hoisin',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    price: 54.87,
    id: '2b755f57-5ca6-4179-b15c-12f48e704c24',
    qty: 0,
  },
  {
    title: 'Noodles - Steamed Chow Mein',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    price: 55.98,
    id: '23e80331-4a3c-4c64-a6c7-0d249065c5dc',
    qty: 0,
  },
  {
    title: 'Danishes - Mini Cheese',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    price: 81.42,
    id: '31e9b193-5ae3-4668-9371-1f3231cb595e',
    qty: 2,
  },
  {
    title: 'Sauce - Plum',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    price: 49.28,
    id: '960cbcb0-0ca2-4937-85cf-acf5806f3ee6',
    qty: 0,
  },
  {
    title: 'Bread - Triangle White',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    price: 47.45,
    id: '2a546817-79a4-4774-9085-a1ec361a7c3e',
    qty: 0,
  },
  {
    title: 'Cake - Pancake',
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    price: 72.33,
    id: '82f1a588-1752-4c31-8132-33937ea8695a',
    qty: 0,
  },
  {
    title: 'Wine - White, Chardonnay',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    price: 45.15,
    id: '778dae13-1e78-4975-9b9e-33d4feecfa5e',
    qty: 0,
  },
  {
    title: 'Soup - Canadian Pea, Dry Mix',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 57.42,
    id: '368a4495-c643-4afb-9b0a-fba695c3822c',
    qty: 0,
  },
  {
    title: 'Danishes - Mini Cheese',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    price: 66.25,
    id: '39ee4028-b807-4d5e-8338-eb966a5d541c',
    qty: 0,
  },
  {
    title: 'Cheese - Grie Des Champ',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    price: 63.4,
    id: 'b85b39ae-99c5-4f34-8b25-5a60f85ffe95',
    qty: 0,
  },
  {
    title: 'Wine - Ej Gallo Sierra Valley',
    description:
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 55.64,
    id: '7f03fcd3-1367-47c9-99ab-18cb9c9cfe82',
    qty: 0,
  },
  {
    title: 'Container - Foam Dixie 12 Oz',
    description:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    price: 94.52,
    id: '2bfe1b80-7c8d-46c3-8ee1-52a482c3602a',
    qty: 0,
  },
  {
    title: 'Pineapple - Canned, Rings',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    price: 95.18,
    id: '6449fb97-fc64-4f67-afd5-52368c1c81f7',
    qty: 0,
  },
  {
    title: 'Chevere Logs',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    price: 47.98,
    id: 'f7845265-bc43-45e0-b868-b21a18b8e0d4',
    qty: 0,
  },
  {
    title: 'Wine - Niagara Peninsula Vqa',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    price: 17.34,
    id: '96bac89c-aa88-48a0-821e-62254cbf031c',
    qty: 0,
  },
];

function Menu() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(
    null
  );
  const [selectedProductId, setSelectedProductId] = useState<null | string>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (selectedProductId) {
      setIsPopupOpen(true);
    }
  }, [selectedProductId]);

  const onCategoryBtnClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  const onProductClick = (id: string) => {
    setSelectedProductId(id);
  };

  const onClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProductId(null);
  };

  const selectedProduct = useMemo(
    () =>
      PRODUCTS.find((product) => product.id === selectedProductId) ??
      PRODUCTS[0],
    [selectedProductId]
  );

  return (
    <Base bg={welcomeBG}>
      <ProductModal
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        product={selectedProduct}
      />

      <Row
        className='min-h-screen justify-center md:justify-around menu-page '
        align='middle'
      >
        <Col xs={22} md={18}>
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
                    !selectedCategoryId ? 'selected' : ''
                  } `}
                  onClick={() => onCategoryBtnClick('')}
                >
                  All
                </button>
              </SwiperSlide>

              {CATEGORY.map((cty) => (
                <SwiperSlide key={cty.id} style={{ width: 'auto' }}>
                  <button
                    className={`single-menu-category ${
                      selectedCategoryId === cty.id ? 'selected' : ''
                    } `}
                    onClick={() => onCategoryBtnClick(cty.id)}
                  >
                    {cty.title}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Row
            gutter={{ xs: 0, md: 20 }}
            align='middle'
            className='menu-wrapper'
            style={{
              backgroundImage: `url('${columnBG}')`,
            }}
          >
            {PRODUCTS.map((product) => (
              <Col xs={24} md={12} key={product.id}>
                <SingleMenuItem
                  product={product}
                  onProductClick={onProductClick}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Base>
  );
}

export default Menu;
