function Card({ imageSrc, imageAlt, title, description, widthImage }) {
  return (
    <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-md">
      <img className={`w-[${widthImage}]`} src={imageSrc} alt={imageAlt} />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;