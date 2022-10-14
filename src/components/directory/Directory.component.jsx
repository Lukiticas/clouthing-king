import CategoryCard from "../category-card/CategoryCard.component";

const Directory = ({ categories }) => {
  const categoriesItems = categories.map(({ id, title, imageUrl }) => {
    return <CategoryCard key={id} id={id} title={title} imgsrc={imageUrl} />;
  });

  return <main className="categories">{categoriesItems}</main>;
};

export default Directory;
