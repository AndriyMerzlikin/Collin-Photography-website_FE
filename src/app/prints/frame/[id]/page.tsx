'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import BackLink from '@/components/general/BackLink/BackLink';
import { ROUTES } from '@/constants/routes';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/cartContext';
import { CalendarsDataItem } from '@/types/calendarsDataTypes';
import { calendarsData } from '@/constants/calendarsData';
import Typography from '@/components/general/Typography/Typography';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={styles.nextArrow} onClick={onClick}>
    <FaChevronRight size={22} />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className={styles.prevArrow} onClick={onClick}>
    <FaChevronLeft size={22} />
  </button>
);

const CalendarItemPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { addToCart } = useCart();

  const [item, setItem] = useState<CalendarsDataItem | null>(null);
  const [counter, setCounter] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundItem = calendarsData.find(
        (calendar) => calendar._id.toString() === id,
      );
      setItem(foundItem || null);
      if (foundItem) setMainImage(foundItem.imgUrl[0]);
    }
  }, [id]);

  if (!item) {
    return (
      <div className={styles.container}>
        <BackLink href={ROUTES.FRAME} title="Back to Calendars" />
        <Typography variant="h3">Calendar not found 😢</Typography>
      </div>
    );
  }

  const handleIncrease = () => setCounter((prev) => prev + 1);

  const handleDecrease = () => {
    if (counter > 1) setCounter((prev) => prev - 1);
  };

  const totalPrice = (item.price * counter).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      _id: String(item._id),
      title: item.title,
      price: item.price,
      previewImageUrl: item.imgUrl[0],
      quantity: counter,
    });

    toast.success(`${item.title} added to cart 🛒`, {
      position: 'top-center',
      style: {
        background: '#333',
        color: '#fff',
      },
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className={styles.container}>
      <BackLink href={ROUTES.FRAME} title="Back to Calendars" />
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <PhotoProvider>
            <div className={styles.imgWrapper}>
              <PhotoView src={mainImage!}>
                <Image
                  src={mainImage!}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </PhotoView>
            </div>

            {item.imgUrl.map((img, index) =>
              img !== mainImage ? (
                <PhotoView src={img} key={index}>
                  <span style={{ display: 'none' }} />
                </PhotoView>
              ) : null,
            )}
          </PhotoProvider>

          <div className={styles.sliderContainer}>
            <Slider {...sliderSettings}>
              {item.imgUrl.map((img, index) => (
                <div key={index} className={styles.thumbWrapper}>
                  <div
                    className={`${styles.thumbBox} ${mainImage === img ? styles.activeThumb : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      width={150}
                      height={100}
                      className={styles.thumbImage}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <Typography variant="h2">{item.title}</Typography>
          <p className={styles.price}>€{totalPrice}</p>
          <div className={styles.quantityBox}>
            <Typography variant="body-small" className={styles.quantityText}>
              Amount
            </Typography>
            <div className={styles.counterBox}>
              <button
                className={styles.counterBtn}
                onClick={handleDecrease}
                disabled={counter === 1}
              >
                <FiMinus />
              </button>
              <div className={styles.counterText}>{counter}</div>
              <button className={styles.counterBtn} onClick={handleIncrease}>
                <FiPlus />
              </button>
            </div>
          </div>
          <button className={styles.cartButton} onClick={handleAddToCart}>
            Add to cart
          </button>
          <div className={styles.descriptionBox}>
            <Typography variant="h3">{item.title} (ENGLISH)</Typography>
            <Typography variant="body-large" className={styles.descriptionText}>
              {item.description}{' '}
            </Typography>
            <Typography variant="h4">Product details:</Typography>
            <ul className={styles.detailsList}>
              {item.details?.map((detail, index) => (
                <li key={index} className={styles.detailItem}>
                  <Typography variant="body-large">– {detail}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarItemPage;
