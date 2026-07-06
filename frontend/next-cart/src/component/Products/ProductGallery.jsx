import { useState } from "react";
import { Expand } from "lucide-react";

export const ProductGallery = ({ product }) => {

  const images = product.images?.length
    ? product.images
    : [product.imageUrl];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row">

      {/* Thumbnails */}

      <div className="flex gap-4 overflow-x-auto lg:flex-col">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              h-20
              w-20
              shrink-0
              overflow-hidden
              rounded-2xl
              border-2
              bg-white
              transition-all
              duration-300

              ${
                selectedImage === img
                  ? "border-black shadow-lg"
                  : "border-gray-200 hover:border-gray-400"
              }
            `}
          >

            <img
              src={img}
              alt=""
              className="h-full w-full object-cover"
            />

          </button>

        ))}

      </div>

      {/* Main Image */}

      <div
        className="
          group
          relative
          flex-1
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-gradient-to-br
from-gray-50
via-white
to-gray-100
          P-6
        "
      >
        <div
  className="
    absolute
    left-5
    top-5
    z-10
    rounded-full
    bg-black
    px-4
    py-2
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-white
  "
>
  🔥 Best Seller
</div>

        <img
          src={selectedImage}
          alt={product.name}
          className="
h-[350px]
w-full
object-contain
drop-shadow-[0_25px_40px_rgba(0,0,0,0.18)]
p-6
transition-transform
duration-500
group-hover:scale-110
group-hover:-rotate-1
md:h-[450px]
lg:h-[500px]
"
        />

        {/* Expand Icon */}

        <button
          className="
            absolute
            right-5
            top-5
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white
border
border-gray-200
            shadow-lg
            backdrop-blur
            transition
            hover:bg-black
hover:text-white
          "
        >

          <Expand size={20} />

        </button>

      </div>

    </div>
  );
};