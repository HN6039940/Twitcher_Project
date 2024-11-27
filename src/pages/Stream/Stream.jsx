import { useSelector } from "react-redux";
import { TwitchEmbed } from "react-twitch-embed";
const Stream = () => {
  const { streamsKeys } = useSelector((state) => state.setStream);
  return (
    <>
      {streamsKeys.length === 0 && (
        <section>
          <h1>ストリームがありません</h1>
        </section>
      )}
      <section className="stream-box">
        {streamsKeys.map((key, index) => {
          return (
            <div key={index} style={{ marginBottom: "2rem" }}>
              <h3>{key}が配信中...📡</h3>
              <TwitchEmbed
                channel={key}
                id={String(index + 1)}
                width={"100%"}
                height={"600px"}
                withChat={true}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Stream;
