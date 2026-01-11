import React from "react"
import styles from "./CartBasketPage.module.scss"
import { useTranslations } from "next-intl"
import PageNoItems from "@/components/PageNoItems"
import { LoadingSpinner } from "@/ui/Spin"
import { CartItemInterface } from "../../interface"
import CartBasketItems from "../../components/CartBasketItems"
import CartSummary from "../../components/CartSummary"
import { useCartManager } from "@/utils/useCartManager"

interface Props {
  data: CartItemInterface[]
  isBasketDataLoading: boolean
}

export default function CartBasketPage({ data, isBasketDataLoading }: Props) {
  const t = useTranslations("Cart")

  const {
    cartItems,
    selectedItems,
    selectAll,
    toggleSelectAll,
    toggleSelectItem,
    changeQuantity,
    deleteSelected,
    totalPrice,
    itemCount,
    createOrderData,
    isRemoving,
  } = useCartManager(data, isBasketDataLoading)

  if (isBasketDataLoading) return <LoadingSpinner size="large" />

  if (!cartItems.length)
    return <PageNoItems title={t("basketNoItems")} text={t("goToBuy")} />

  return (
    <div className={styles.main}>
      {/* Left side - Cart Items (65%) */}
      <div className={styles.itemsSide}>
        <CartBasketItems
          data={cartItems}
          selected={selectedItems}
          selectAll={selectAll}
          setSelectAll={toggleSelectAll}
          changeQuantity={changeQuantity}
          onToggleItem={toggleSelectItem}
          onDeleteSelected={deleteSelected}
          isLoading={isRemoving}
        />
      </div>

      {/* Right side - Summary (35%) */}
      <div className={styles.summarySide}>
        <CartSummary
          cost={totalPrice}
          itemCount={itemCount}
          createOrderData={createOrderData}
        />
      </div>
    </div>
  )
}
