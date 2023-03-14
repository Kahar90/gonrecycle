const FilterComp = ({ filter, setFilter, ItemToFilter }) => {
  return (
    <div className="flex flex-row bg-white w-[1000px] mt-10 shadow-lg rounded-lg items-start justify-between p-5 border-2 border-[#1C850B] bg-blend-hard-light">
      <div>
        <p className="text-xl font-bold mr-5 text-[#373737] rounded-md p-2 w-[300px] ">
          Categories
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* flex flex-col items-start justify-center text-left gap-2 text-[#373737] p-5 bg-red-50  */}

          {ItemToFilter.map((item, index) => {
            return (
              <div class="form-control ">
                <label class="label cursor-pointer flex flex-row-reverse items-center justify-end gap-5  min-w-[150px] min-h-[50px] rounded-md p-2">
                  <span class="label-text text-left text-[#373737]">
                    {item}
                  </span>
                  <input
                    type="radio"
                    name="radio-10"
                    class="radio
                    border-2 border-[#1C850B] rounded-full
                    checked:bg-[#1C850B]
                    checked:border-0 
                    checked:ring-0
                    ring-2 
                  "
                    checked={filter.toFilterName === item}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        toFilterName: item,
                      });
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-start justify-center  text-left gap-2 text-[#373737] p-5">
        <p className="text-xl font-bold mr-5 text-[#373737] rounded-md p-2 w-[300px]">
          Price
        </p>
        <div class="flex flex-row ">
          <button
            class="btn btn-ghost"
            className={
              filter.sort === "highFirst"
                ? "bg-[#475569] text-white p-3 rounded-lg"
                : ""
            }
            onClick={() => {
              setFilter({
                ...filter,
                sort: "highFirst",
              });
            }}
          >
            Highest first
          </button>
          <span className="text-xl mt-2 mx-5">/</span>
          <button
            class="btn btn-ghost"
            className={
              filter.sort === "lowFirst"
                ? "bg-[#475569] text-white p-3 rounded-lg "
                : ""
            }
            onClick={() => {
              setFilter({
                ...filter,
                sort: "lowFirst",
              });
            }}
          >
            Lowest first
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
