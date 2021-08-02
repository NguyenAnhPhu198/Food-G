import PropTypes from "prop-types";

import useFirestoreComments from "hooks/useFirestoreComments";

// material ui core
import { Button } from "@material-ui/core";

// material ui icons
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import PrimaryButton from "components/PrimaryButton";
import Checkbox from "components/Checkbox";

import "./DetailContent.scss";

function DetailContent(props) {
  const {
    product,
    paramsName,
    dataOptions,
    handleFuncs,
    selectedRadio,
    price,
    qnt,
    handleAddToFirestore,
  } = props;

  const { name, country, dsc, rate } = product ? product : "";
  const { handleOptionChange, handleIncreaseQnt, handleDecreaseQnt } =
    handleFuncs;

  const { comments } = useFirestoreComments();

  const onHandleOptionChange = (e, percentOff) => {
    handleOptionChange(e, percentOff);
  };

  const onHandleAddToFirestore = (type, product) => {
    handleAddToFirestore(type, product);
  };

  return (
    <div className="detail-content">
      <h2 className="detail-content__title">{name}</h2>

      <div className="detail-content__rate">
        <div className="detail-content__stars">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          {rate === 5 ? <StarIcon /> : <StarBorderIcon />}
        </div>
        <div className="detail-content__reviews">
          <span className="detail-content__reviews-qnt">{comments.length}</span>
          <span> Customer Reviews</span>
        </div>
      </div>

      <div className="detail-content__price">
        <strong>${price}</strong>
      </div>

      <div className="detail-content__tags">
        <div className="detail-content__tag">
          <span className="detail-content__tag-label">Category:</span>
          <span className="detail-content__tag-detail category">
            {paramsName}
          </span>
        </div>
        <div className="detail-content__tag">
          <span className="detail-content__tag-label">Country:</span>
          <span className="detail-content__tag-detail">{country}</span>
        </div>
      </div>

      <p className="detail-content__description">{dsc}</p>

      <form className="detail-content__form">
        <div className="detail-content__form-title">Choose your options</div>
        {dataOptions.map(({ content, percentOff }) => (
          <Checkbox
            key={content}
            checked={selectedRadio === content}
            content={content}
            value={content}
            handleOptionChange={(e) => onHandleOptionChange(e, percentOff)}
          />
        ))}
      </form>

      <div className="detail-content__btns">
        <div className="detail-content__btn-handle ">
          <Button
            onClick={handleDecreaseQnt}
            className="detail-content__btn-inc btn-circle"
          >
            <RemoveIcon />
          </Button>

          <span className="detail-content__btn-qnt">{qnt}</span>
          <Button
            onClick={handleIncreaseQnt}
            className="detail-content__btn-dec btn-circle"
          >
            <AddIcon />
          </Button>
        </div>

        <div
          onClick={() => onHandleAddToFirestore("success", product)}
          className="detail-content__add"
        >
          <PrimaryButton subClass="red">
            <AddShoppingCartOutlinedIcon />
            <span>Add to cart</span>
          </PrimaryButton>
        </div>

        <Button
          onClick={() => onHandleAddToFirestore("wishlist", product)}
          className="detail-content__btn-like btn-circle"
        >
          <FavoriteBorderIcon />
        </Button>
      </div>

      <div className="detail-content__commits">
        <div className="detail-content__commit">
          <LocalShippingOutlinedIcon />
          <span>Free global shipping on all orders</span>
        </div>
        <div className="detail-content__commit">
          <EventAvailableOutlinedIcon />
          <span>2 hours easy returns if you change your mind</span>
        </div>
        <div className="detail-content__commit">
          <LocalOfferOutlinedIcon />
          <span>Order before noon for same day dispatch</span>
        </div>
      </div>
    </div>
  );
}

DetailContent.propTypes = {
  product: PropTypes.object.isRequired,
  dataOptions: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  qnt: PropTypes.number.isRequired,
  handleAddToFirestore: PropTypes.func.isRequired,

  paramsName: PropTypes.string,
  handleFuncs: PropTypes.object,
  selectedRadio: PropTypes.string,
};

DetailContent.defaultProps = {
  paramsName: "",
  handleFuncs: null,
  selectedRadio: "",
};

export default DetailContent;
