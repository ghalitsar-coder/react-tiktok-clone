import React from "react";

import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ data, mt }: { data: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {data.map((item) => (
      <p
        key={item}
        className="text-gray-400 text-sm hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List data={footerList1} mt={false} />
      <List data={footerList2} mt />
      <List data={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2022 Ghalitsar Tiktok</p>
    </div>
  );
};

export default Footer;
