"use client";
import React, { useContext } from "react";
import { BohnenContext } from "@/app/BohnenProvider";
import { useTranslations } from "next-intl";
import BohnenRow from "@/components/bohnen/BohnenRow";

export const Bohnen = () => {
  const { bohnen } = useContext(BohnenContext);
  const t = useTranslations("beanOverview");

  return (
    <div className="tableContainer">
      <table className="border-separate border-spacing-2">
        <thead className="text-1xl text-gray-700 font-bold mb-5">
          <tr>
            <th>{t("beanType")}</th>
            <th>{t("ekp")}</th>
            <th>{t("marge")}</th>
            <th>{t("discount")}</th>
            <th>{t("vkpWithoutDiscount")}</th>
            <th>{t("aiPredictedSalesPrices")}</th>
            <th>{t("salesPrices")}</th>
          </tr>
        </thead>
        <tbody>
          {bohnen &&
            bohnen.map((bohne) => <BohnenRow key={bohne.id} bohne={bohne} />)}
        </tbody>
      </table>
    </div>
  );
};
