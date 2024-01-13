import { useEffect } from "react";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import useCustomer from "../../hooks/useCustomer.js";
import "./home.scss";
import useProduct from "../../hooks/useProduct.js";
import useOrder from "../../hooks/useOrder.js";

const Home = () => {
  const { getCustomerAnalytics, customerAnalytics } = useCustomer();
  const { getProductAnalytics, productsAnalytics } = useProduct();
  const { getOrderAnalytics, orderAnalytics } = useOrder();

  useEffect(() => {
    getCustomerAnalytics();
    getProductAnalytics();
    getOrderAnalytics();
  }, []);

  console.log(orderAnalytics);
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser(customerAnalytics)} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct(productsAnalytics)} />
      </div>
      <div className="box box4">
        <PieChartBox orderAnalytics={orderAnalytics} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion(orderAnalytics)} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue(orderAnalytics)} />
      </div>
      <div className="box box7">
        <BigChartBox orderAnalytics={orderAnalytics} />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
