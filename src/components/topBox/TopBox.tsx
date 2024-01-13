import "./topBox.scss";
import { topDealUsers } from "../../data.ts";
import useCustomer from "../../hooks/useCustomer.js";
import { useEffect } from "react";

const TopBox = () => {
  const { topDealCustomers, getTopDealCustomersData, loading } = useCustomer();
  useEffect(() => {
    getTopDealCustomersData();
  }, []);

  console.log(topDealCustomers);
  return (
    <div className="topBox">
      <h1>Mejores Clientes</h1>
      <div className="list">
        {!loading &&
          topDealCustomers?.length > 0 &&
          topDealCustomers.map((c) => (
            <div className="listItem" key={c?._id}>
              <div className="user">
                <img
                  src={
                    c?.img ??
                    "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"
                  }
                  alt=""
                />
                <div className="userTexts">
                  <span className="username">
                    {c?.customer?.first_name} {c?.customer?.last_name}
                  </span>
                </div>
              </div>
              <span className="amount">${c?.amount.toFixed(2)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopBox;
