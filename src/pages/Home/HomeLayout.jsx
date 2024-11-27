import { Outlet } from "react-router";

import BoxWrapper from "../../components/common/BoxWrapper";
import NavBar from "../../components/NavBar/NavBar";
import PopularStreams from "../../components/Popular/PopularStreams";

const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <PopularStreams />
      <BoxWrapper>
        <Outlet />
      </BoxWrapper>
    </>
  );
};

export default HomeLayout;
