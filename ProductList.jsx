import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, selectCartItems } from "./CartSlice.jsx";

const fallbackImage = "/plant-fallback.svg";
const imageIds = [
  "photo-1593691509543-c55fb32e5cee", "photo-1632207691143-643e2a2a3a87",
  "photo-1614594975525-e45190c55d0b", "photo-1572688484438-313a6e50c333",
  "photo-1509423350716-97f9360b4e09", "photo-1497250681960-ef046c08a56e",
  "photo-1501004318641-b39e6451bec6", "photo-1518531933037-91b2f5f229cc",
  "photo-1485955900006-10f4d324d411", "photo-1459411552884-841db9b3cc2a",
];
const plant = (id, name, description, price, imageIndex) => ({
  id, name, description, price, image: imageIds[imageIndex % imageIds.length],
});

const categories = [
  {
    id: "easy-care",
    name: "Easy does it",
    note: "Low-fuss favorites for every kind of plant parent.",
    plants: [
      plant("snake-plant", "Snake Plant", "Architectural leaves and a wonderfully easy-going nature.", 28, 0),
      plant("zz-plant", "ZZ Plant", "Glossy foliage that thrives even when life gets busy.", 32, 1),
      plant("pothos", "Golden Pothos", "A trailing classic that brings a soft touch of green.", 22, 2),
      plant("spider-plant", "Spider Plant", "A cheerful, fast-growing favorite with arching leaves.", 24, 3),
      plant("jade-plant", "Jade Plant", "A sculptural little succulent made for a sunny sill.", 18, 4),
      plant("peace-lily", "Peace Lily", "Elegant deep-green leaves and graceful white blooms.", 34, 5),
    ],
  },
  {
    id: "tropical",
    name: "Tropical state of mind",
    note: "Big, beautiful leaves with a little holiday energy.",
    plants: [
      plant("monstera", "Monstera Deliciosa", "Iconic split leaves bring instant jungle character.", 46, 6),
      plant("bird-of-paradise", "Bird of Paradise", "A bold, upright beauty that loves a bright room.", 68, 7),
      plant("rubber-plant", "Rubber Plant", "Polished, oversized leaves with a striking silhouette.", 42, 8),
      plant("calathea", "Calathea Orbifolia", "Soft silver-green stripes make every leaf a showstopper.", 38, 9),
      plant("philodendron", "Heartleaf Philodendron", "Sweet heart-shaped leaves that trail beautifully.", 26, 5),
      plant("boston-fern", "Boston Fern", "A cloud of feathery green for a bright, humid corner.", 30, 3),
    ],
  },
  {
    id: "statement",
    name: "Make a statement",
    note: "Distinctive forms for corners that deserve a little drama.",
    plants: [
      plant("fiddle-leaf-fig", "Fiddle Leaf Fig", "Sculptural, fiddle-shaped leaves with a gallery feel.", 74, 6),
      plant("alocasia", "Alocasia Polly", "Dramatic arrow-shaped leaves traced with bright veins.", 44, 5),
      plant("dragon-tree", "Dragon Tree", "A striking upright plant with slender, colorful foliage.", 58, 4),
      plant("cactus", "Desert Cactus", "A sculptural, sun-loving accent with character to spare.", 36, 9),
      plant("parlor-palm", "Parlor Palm", "A graceful, feathery palm with timeless good looks.", 40, 3),
      plant("anthurium", "Anthurium", "Heart-shaped leaves and vibrant blooms steal the scene.", 48, 7),
    ],
  },
];

function PlantCard({ plant: item, alreadyAdded, onAdd }) {
  return (
    <article className="plant-card">
      <div className="plant-image-wrap">
        <img
          className="plant-image"
          src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=80`}
          alt={item.name}
          loading="lazy"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }}
        />
        <span className="plant-tag">A little green</span>
      </div>
      <div className="plant-card-content">
        <div className="plant-heading"><h3>{item.name}</h3><span className="plant-price">${item.price.toFixed(2)}</span></div>
        <p>{item.description}</p>
        <button className={`button add-button${alreadyAdded ? " added" : ""}`} type="button" onClick={() => onAdd(item)} disabled={alreadyAdded}>
          {alreadyAdded ? "Added to cart ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartIds = new Set(cartItems.map((item) => item.id));

  return (
    <main className="products-page content-width">
      <section className="page-heading">
        <p className="eyebrow">Find your green</p>
        <h1>A plant for <em>everywhere.</em></h1>
        <p>Good company for your windowsill, your workday, and everything in between.</p>
      </section>
      <div className="collection-bar"><span>OUR PLANT COLLECTION</span><span>18 thoughtful picks <span aria-hidden="true">✳</span></span></div>
      {categories.map((category, index) => (
        <section className="plant-category" key={category.id}>
          <div className="category-heading">
            <div className="category-title"><span className="category-number">0{index + 1}</span><div><h2>{category.name}</h2><p>{category.note}</p></div></div>
            <Link className="text-link" to="/cart">View cart <span aria-hidden="true">→</span></Link>
          </div>
          <div className="plant-grid">
            {category.plants.map((item) => (
              <PlantCard key={item.id} plant={item} alreadyAdded={cartIds.has(item.id)} onAdd={(selected) => dispatch(addItem(selected))} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
