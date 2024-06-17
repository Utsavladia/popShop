import { useEffect, useState } from "react";

// components
import Head from "../../components/Head";
import Product from "../../components/Product";
import { IoFilterCircleOutline } from "react-icons/io5";
import { supabase } from "../../utils/client";

function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getProducts = async () => {
    const { data } = await supabase.from('Product_table').select();
    console.log(data);
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm)
  );

  const filter = [
    {
      filterOption: "Size",
      checkbox: ["XS", "S", "M", "L", "XL"],
    },
    {
      filterOption: "Price Range",
      checkbox: [
        "below-₹1000",
        "₹1000-₹2000",
        "₹2000-₹4000",
        "₹4000-₹8000",
        "₹8000-and above",
      ],
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-12 pb-8 flex justify-center md:justify-between items-center flex-wrap">
        <Head h1="Our" h2="Store" />
        <div className="flex gap-6 mt-8 justify-center md:justify-end w-full">
          {/* The button to open modal */}
          <label
            htmlFor="my_modal_6"
            className="btn bg-mygreen hover:bg-myyellow"
          >
            <IoFilterCircleOutline className="text-3xl" />
          </label>
          {/* Modal Body */}
          <input
            type="checkbox"
            id="my_modal_6"
            className="modal-toggle w-5xl"
          />
          <div className="modal" role="dialog">
            <div className="modal-box w-[18rem] md:w-[30rem]">
              <h3 className="font-bold text-center text-lg">
                Apply your filters
              </h3>
              <div className="flex font-semiold justify-around mt-5">
                {filter.map((fil, idx) => (
                  <div key={idx}>
                    <h2 className="mb-3">{fil.filterOption}</h2>
                    {fil.checkbox.map((size, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          id={`default-checkbox${idx}${index}`}
                          type="checkbox"
                          value=""
                          className="w-4 h-4 checkbox"
                        />
                        <label
                          htmlFor={`default-checkbox${idx}${index}`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="modal-action  pe-5">
                <label
                  htmlFor="my_modal_6"
                  className="btn hover:bg-mygreen bg-myyellow"
                >
                  Apply
                </label>

                <label
                  htmlFor="my_modal_6"
                  className="btn hover:bg-myred bg-myred"
                >
                  Cancel
                </label>
              </div>
            </div>
          </div>

          <label className="input input-bordered input-success flex items-center gap-2">
            <input
              type="text"
              className="grow w-36"
              placeholder="Search"
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((elem, idx) => (
            <Product
              key={idx}
              desc={elem.Desc}
              image={elem.Image_link}
              price={elem.Price}
              name={elem.Name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
