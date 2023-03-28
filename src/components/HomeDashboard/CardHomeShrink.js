import { useRouter } from "next/router";

const CardHomeShrink = ({ imgLink, title, subtitle, buttonText, buttonRoute }) => {
  const Router = useRouter();

  const handleRoute = () => {
    Router.push(buttonRoute);
  };

  return (
    <div class="card w-96 bg-base-100 shadow-xl image-full mb-10 mt-10 z-1">
        <figure className="h-[200px]">
            <img src={imgLink} className="object-fill" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{subtitle}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary bg-dark-green hover:bg-dark-green-hover border-none" onClick={handleRoute}>
                {buttonText}
                </button>
            </div>
        </div>
    </div>
  );
};

export default CardHomeShrink;
