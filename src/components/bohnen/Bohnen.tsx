"use client";
import React, { useContext } from "react";
import { BohnenContext } from "@/app/BohnenProvider";
import { useTranslations } from "next-intl";
import BohnenRow from "@/components/bohnen/BohnenRow";

export const Bohnen = () => {
  const { bohnen } = useContext(BohnenContext);
  const t = useTranslations("beanOverview");

  return (
    <div>
      <table className="border-separate border-spacing-2 table-fixed">
        <thead className="text-1xl text-gray-700 font-bold mb-5">
          <tr>
            <th className="w-3 text-left align-text-top">{t("beanType")}</th>
            <th className="text-right pr-1 align-text-top">{t("ekp")}</th>
            <th className="text-right pr-1 align-text-top">{t("marge")}</th>
            <th className="text-right pr-1 align-text-top">{t("discount")}</th>
            <th className="text-right pr-1 align-text-top">
              {t("vkpWithoutDiscount")}
            </th>
            <th className="text-right pr-1 align-text-top">
              {t("aiPredictedSalesPrices")}
            </th>
            <th className="text-right pr-1 align-text-top">
              {t("salesPrices")}
            </th>
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
