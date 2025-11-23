// QuantitySelector.tsx

import React, { useEffect, useRef, useState } from "react";
import styles from "./QuantitySelector.module.scss";
import { message } from "antd";
import { useTranslations } from "next-intl";
import { MinusSvg, PlusSvg } from "$/assets/images";
import Image from "next/image";

type Props = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99999999,
  step = 1,
  disabled = false,
  className = "",
}: Props) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState<string>(
    String(Math.max(min, Math.min(max, Math.floor(value || 0))))
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations();

  useEffect(() => {
    setLocal(String(Math.max(min, Math.min(max, Math.floor(value || 0)))));
  }, [value, min, max]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function clamp(n: number) {
    if (Number.isNaN(n)) return min;
    return Math.max(min, Math.min(max, Math.floor(n)));
  }

  function commitFromLocal() {
    const n = clamp(Number(local));
    if (Number(local) > max) {
      setLocal(String(max));
      onChange(max - 1);

      message.warning({
        type: "warning",
        content: `${t("Product-detail.isMaxQuantity")}, ${max}`,
      });
      return setEditing(false);
    }
    setLocal(String(n));
    if (n !== value) onChange(n);
    setEditing(false);
  }

  function increment(delta: number) {
    if (disabled) return;
    const n = clamp(Number(value) + delta);
    if (n !== value) onChange(n);
  }

  return (
    <div className={[styles.wrapper, className].join(" ")}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => increment(-step)}
        disabled={disabled}
        aria-label="decrement"
      >
        <Image src={MinusSvg} width={24} height={24} alt="#" />
      </button>
      <div
        className={styles.center}
        onClick={() => !disabled && setEditing(true)}
      >
        {editing ? (
          <input
            ref={inputRef}
            className={styles.input}
            value={local}
            onChange={(e) => setLocal(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={commitFromLocal}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitFromLocal();
              if (e.key === "Escape") {
                setLocal(String(value));
                setEditing(false);
              }
            }}
            inputMode="numeric"
          />
        ) : (
          <p className={styles.display} role="button" aria-label="quantity">
            {String(value)}
          </p>
        )}
      </div>
      <button
        className={styles.btn}
        type="button"
        onClick={() => increment(step)}
        disabled={disabled}
        aria-label="increment"
      >
        <Image src={PlusSvg} width={24} height={24} alt="#" />
      </button>
    </div>
  );
}
