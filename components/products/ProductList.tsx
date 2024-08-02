"use client";

import { getMoreProducts, InitialProducts } from "@/actions/products";
import ProductItem from "./ProductItem";
import { useEffect, useRef, useState } from "react";

interface IProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 2. 요소가 100% (1.0) 화면에 보였을 경우 실행될 함수
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            // 3. 여기서 의존성 배열에 page를 넣었기 때문에 useEffect 리렌더
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );

    // 1. 렌더 후 span 값이 ref에 할당됐다면 관찰 시작
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{
            marginTop: `${page + 1 * 900}vh`,
          }}
          className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  );
}
