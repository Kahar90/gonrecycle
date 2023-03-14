import { useEffect, useState } from "react";

const CalculatorDrawer = ({ pricesArray }) => {
  const calculatePrice = (price, amount) => {
    return (price * amount).toFixed(2);
  };

  const [pricesCalculated, setpricesCalculated] = useState([]);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    let pricesObj = pricesArray?.map((item) => {
      return {
        name: item.name,
        price: item.price,
        amount: 0,
        total: 0,
      };
    });

    setTotal(0);

    setpricesCalculated(pricesObj);
  }, [pricesArray]);

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl mr-4 text-[#373737] rounded-md p-2 ">
          Calculate your price!
        </h1>
        <p className="text-sm mr-4 text-[#404040] rounded-md ml-2 w-8/12">
          Enter the amount of each material you have and we will calculate the
          approximate price for you.
        </p>
        <div class="divider mt-[-5px]"></div>

        {pricesArray.map((item, index) => {
          return (
            <div className="flex flex-col">
              <label className="text-xl font-bold text-[#373737] rounded-md p-2 text-left mb-[-10px] ml-[-10px] ">
                {item.name}
              </label>
              <label class="label">
                <span class="label-text-alt">{item.price + " per kg"}</span>
                {/* <span class="label-text-alt">Bottom Right label</span> */}
              </label>
              <div className="flex flex-row items-center gap-10">
                <input
                  onChange={(e) => {
                    let newPrices = [...pricesCalculated];
                    newPrices[index].amount = e.target.value;
                    setTotal(
                      newPrices.reduce((acc, item) => {
                        return acc + item.price * item.amount;
                      }, 0)
                    );
                    setpricesCalculated(newPrices);
                  }}
                  type="text"
                  placeholder={"calculate price"}
                  class="input w-1/3 max-w-xs bg-white border-2 border-gray-400"
                />

                <p>
                  {calculatePrice(item.price, pricesCalculated[index]?.amount)}{" "}
                  RM
                </p>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col">
          <label className="text-xl font-bold text-[#373737] rounded-md p-2 text-left mb-[-10px] ml-[-10px] ">
            Total Price : {Total.toFixed(2)} RM
          </label>
        </div>
      </div>
    </>
  );
};

export default CalculatorDrawer;
