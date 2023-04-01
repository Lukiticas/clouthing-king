import Button from "../button-component/button.component";
import "./ProductCard.styles.scss";

const ProductCard = () => {
  return (
    <div className="product-card-container">
      <img />
      <Button
        colors={{ primary: "black", secundary: "white" }}
        type="submit"
        hasOutline={true}
      >
        Sign Up!
      </Button>
      <footer>
        <pan className="name"></pan>
        <pan className="price"></pan>
      </footer>
    </div>
  );
};

export default ProductCard;
