import css from "./HomePageHeader.module.css";

const HomePage = () => {
  return (
    <div className={css.header}>
      <h1>
        Not sure what to watch?
        <br /> Start exploring.
        <br /> Let the perfect movie find you.
      </h1>
    </div>
  );
};

export default HomePage;
