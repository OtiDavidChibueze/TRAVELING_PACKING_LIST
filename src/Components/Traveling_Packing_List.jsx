import { useState } from "react";

export default function TravelingPackingList() {
  const [packingLists, setPackingLists] = useState([]);

  const handleDeleteItem = (id) => {
    setPackingLists((packingLists) =>
      packingLists.filter((item) => item.id !== id)
    );
  };

  const handleInputDetails = (details) => {
    setPackingLists((packingLists) => [...packingLists, details]);
  };

  const handleIsPacked = (id) => {
    setPackingLists((packingLists) =>
      packingLists.map((el) =>
        el.id === id ? { ...el, packed: !el.packed } : el
      )
    );
  };

  const handleClearLists = () => {
    const message = confirm("are you sure you want to clear your lists?");

    message && setPackingLists([]);
  };

  return (
    <div>
      <Header />
      <Input onInputDetails={handleInputDetails} />
      <PackingLists
        packingLists={packingLists}
        onDeleteItem={handleDeleteItem}
        onHandlePacked={handleIsPacked}
        onHandleClearLists={handleClearLists}
      />
      <Stats packingLists={packingLists} />
    </div>
  );
}

const Header = () => {
  return (
    <div>
      <h1>Traveling Packing List</h1>
    </div>
  );
};

const Input = ({ onInputDetails }) => {
  const [count, setCount] = useState(1);
  const [item, setItem] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    if (!item) return;

    const newInputs = {
      id: crypto.randomUUID(),
      count,
      item,
      packed: false,
    };

    onInputDetails(newInputs);

    setCount(1);
    setItem("");
  };

  return (
    <form onSubmit={handleInput}>
      <label htmlFor="">What do you need for your trip?</label>
      <select
        name=""
        id=""
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};

const PackingLists = ({
  packingLists,
  onDeleteItem,
  onHandleClearLists,
  onHandlePacked,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedPackingList;

  if (sortBy === "input") sortedPackingList = packingLists;
  console.log({ sortedPackingList });

  if (sortBy === "description")
    sortedPackingList = packingLists
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  console.log({ sortedPackingList });

  if (sortBy === "packed")
    sortedPackingList = packingLists
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <ul>
        {sortedPackingList.map((el) => (
          <Item
            key={el.id}
            item={el}
            onHandlePacked={onHandlePacked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <div>
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>

        <button onClick={onHandleClearLists}>CLEAR</button>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onHandlePacked }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onHandlePacked(item.id)}
        name=""
        id=""
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.count} {item.item}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ packingLists }) => {
  if (!packingLists.length) {
    return (
      <p>
        <em>Start adding some items to your packing lists</em>
      </p>
    );
  }

  const itemLength = packingLists.length;
  const packedItemsLength = packingLists.filter((el) => el.packed).length;
  const percentage = Math.round((packedItemsLength / itemLength) * 100);

  return (
    <div>
      <footer>
        {percentage === 100 ? (
          <em>you got everything ready to go</em>
        ) : (
          <em>
            you have {itemLength} items on your list , and you already packed{" "}
            {packedItemsLength} ({percentage}%)
          </em>
        )}
      </footer>
    </div>
  );
};
