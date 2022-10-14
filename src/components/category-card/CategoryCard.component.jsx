import "./CategoryCard.styles.scss";

const CategoryCard = ({ title, imgsrc }) => {
  return (
    <div className="categories__item">
      <div
        className="categories__item__img"
        style={{
          backgroundImage: `url(${imgsrc})`,
        }}
      />
      <section className="categories__item__body">
        <h2>{title}</h2>
        <p>Shop now!</p>
      </section>
    </div>
  );
};

export default CategoryCard;
