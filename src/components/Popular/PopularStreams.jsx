import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getPopularStream } from "../../axios/axios";
import { setTopStreams } from "../../store/slice/topStreamSlice";

import PopularStream from "./PopularStream";
import Loading from "../Loading/Loading";

const PopularStreams = () => {
  const dispatch = useDispatch();
  const topStreams = useSelector((state) => state.topStreams.topStreams);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["popularStream"],
    queryFn: async () => {
      const fetchData = await getPopularStream();
      dispatch(setTopStreams(fetchData.map((stream) => stream.data)));
      return fetchData;
    },
    refetchInterval: 1000 * 300 * 1,
  });

  if (isFetching || isLoading) {
    return (
      <section className="top-stream-container">
        <Loading />
      </section>
    );
  }
  return (
    <section className="top-stream-container">
      <h2 className="top-stream-header">
        <span className="fire-icon">🔥</span> 人気の配信
      </h2>
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {topStreams.map((stream) => (
          <SwiperSlide key={stream.id}>
            <PopularStream key={stream.id} stream={stream} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularStreams;
