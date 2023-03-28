import { useRouter } from "next/router";

const CardHome = ({ imgLink, title, subtitle, buttonText, buttonRoute }) => {
  const Router = useRouter();

  const handleRoute = () => {
    Router.push(buttonRoute);
  };

  return (
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="h-[200px]">
        <img src={imgLink} className="object-fill" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary mt-5 bg-dark-green hover:bg-dark-green-hover border-none" onClick={handleRoute}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHome;

{
  /* <div class="card lg:card-side bg-base-100 shadow-xl max-w-[500px] h-[300px]">
      <figure>
        <img
          src={imgLink}
          alt="Album"
          className="fit-cover h-[300px] w-[500px] blur-sm"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div> */
}
