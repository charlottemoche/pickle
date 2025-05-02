export default function Card({
    image = "../src/img/maxi.png",
    name = "Silk Maxi Dress",
    subtitle = "Elegant evening wear",
    price = "$75",
    size = "L",
    offerType = "Rental"
  }) {
    return (
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm mb-6">
        <div className="flex">
            <div className="w-1/4 h-28 m-4 overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="p-4 flex flex-col justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="text-sm text-gray-500 mt-auto">Rent: {price} | Size: {size}</div>
            </div>
        </div>
        <hr className="border-gray-200 w-full" />
        <div className="p-4">
            <div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold">Offer Type:</p>
                    <p className="text-sm text-gray-500">{offerType}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold">Listed Rental Price:</p>
                    <p className="text-sm text-brand font-semibold">{price}</p>
                </div>
            </div>
        </div>
      </div>
    );
  }
