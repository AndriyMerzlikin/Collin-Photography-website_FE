'use client'

import Image from "next/image";
import styles from './page.module.scss';
import {useCart} from "@/context/cartContext";
import Typography from "@/components/general/Typography/Typography";
import BackLink from "@/components/general/BackLink/BackLink";
import {ROUTES} from "@/constants/routes";
import {MdDelete} from "react-icons/md";
import clsx from "clsx";

const CartPage = () => {
    const {cart, removeFromCart, clearCart} = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <Typography variant='h2' className={styles.title}>Shopping Cart</Typography>
            {cart.length === 0 ? (
                <>
                    <p>Your cart is empty</p>
                    <BackLink href={ROUTES.PRINTS} title="Back To Shopping"/>
                </>
            ) : (
                <>
                    <ul className={styles.cartListBox}>
                        {cart.map((item) => (
                            <li key={item._id} className={styles.cartItemBox}>
                                <Image src={item.previewImageUrl} alt={item.title} width={100} height={100}/>
                                <div className={styles.cartItemTextBox}>
                                    <Typography variant='h4'
                                                className={styles.cartItemTitle}>"{item.title}"</Typography>
                                    <div className={styles.cartItemPriceBox}>
                                        <button className={styles.removeButton}
                                                onClick={() => removeFromCart(item._id)}><MdDelete/></button>
                                        <Typography variant='body-large'>€{item.price.toFixed(2)}</Typography>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Typography variant='h2' className={styles.totalText}>Total: €{total.toFixed(2)}</Typography>
                    <div className={styles.submitButtonsBox}>
                        <button className={styles.checkoutButton}>Order</button>
                        <button onClick={clearCart}
                                className={clsx(styles.checkoutButton, styles.clearButton)}>Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
