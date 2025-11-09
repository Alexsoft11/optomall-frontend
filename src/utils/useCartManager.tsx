import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import useQueryApiClient from "@/utils/useQueryApiClient";
import {
  CartItemInterface,
  CartOrderItemInterface,
  CreateOrderDataInterface,
} from "@/features/Cart/interface";

export function useCartManager(initialData: CartItemInterface[], isBasketDataLoading: boolean) {
  const cookie = new Cookies()
  const [cartItems, setCartItems] = useState<CartItemInterface[]>(initialData)
  const [selectedItems, setSelectedItems] = useState<CartItemInterface[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const { appendData: removeFromServer, isLoading: isRemoving } = useQueryApiClient({
    request: {
      url: "remove",
      method: "DELETE",
      disableOnMount: true,
    },
    onSuccess(res) {
      setCartItems(res.original)
      setSelectedItems([])
      setSelectAll(false)
    },
  })

  useEffect(() => {
    if (initialData) setCartItems(initialData)
  }, [initialData])

  const toggleSelectItem = (item: CartItemInterface, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, item] : prev.filter((el) => el.sku_id !== item.sku_id)
    )
  }

  const toggleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    setSelectedItems(checked ? [...cartItems] : [])
  }

  const changeQuantity = (quantity: number, item: CartItemInterface) => {
    if (quantity === 0 && cookie.get("token")) {
      removeFromServer({ basket_ids: [item.id] })
      return
    }

    setCartItems((prev) =>
      prev.map((el) => (el.sku_id === item.sku_id ? { ...el, quantity } : el))
    )

    setSelectedItems((prev) =>
      prev.map((el) => (el.sku_id === item.sku_id ? { ...el, quantity } : el))
    )
  }

  const deleteSelected = () => {
    if (!selectedItems.length) return
    const ids = selectedItems.map((el) => el.id)
    removeFromServer({ basket_ids: ids })
  }

  const totalPrice = useMemo(
    () => selectedItems.reduce((sum, el) => sum + el.price * el.quantity, 0),
    [selectedItems]
  )

  const itemCount = useMemo(
    () => selectedItems.reduce((sum, el) => sum + el.quantity, 0),
    [selectedItems]
  )

  // 🔥 Build order payload properly
  const createOrderData: CreateOrderDataInterface = useMemo(() => {
    const items: CartOrderItemInterface[] = selectedItems.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      image_url: item.image_url,
      title: item.title,
      provider: item.provider,
      product_url: item.product_url,
      seller_id: item.seller_id,
      sku_id: item.sku_id,
      price: item.price,
      properties: item.properties,
      quantity: item.quantity,
      product_info: item.product_info,
    }))
    return { total_price: totalPrice, items }
  }, [selectedItems, totalPrice])

  useEffect(() => {
    setSelectAll(selectedItems.length === cartItems.length && cartItems.length > 0)
  }, [selectedItems, cartItems])

  return {
    cartItems,
    selectedItems,
    setCartItems,
    selectAll,
    toggleSelectAll,
    toggleSelectItem,
    changeQuantity,
    deleteSelected,
    totalPrice,
    itemCount,
    createOrderData,
    isRemoving,
    isBasketDataLoading,
  }
}