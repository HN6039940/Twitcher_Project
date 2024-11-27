import { useNavigate } from "react-router-dom";

import NotResult from "../../assets/image/NotResult.svg";
import BoxWrapper from "../../components/common/BoxWrapper";

const Error = () => {
  const navigate = useNavigate();
  // トップページに戻る
  const handleClick = () => {
    navigate("/");
  };
  return (
    <BoxWrapper>
      <div className="error-container">
        <div className="error-wrapper">
          <h1>404</h1>
          <h2>お探しのページが見つかりません</h2>
          <img className="error-image" src={NotResult} alt="Not Result" />
          <div className="error-btn">
            <button onClick={handleClick}>トップページに戻る</button>
          </div>
        </div>
      </div>
    </BoxWrapper>
  );
};

export default Error;
