import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext"; // Make sure path is correct

const Navbar = () => {
  const { cart } = useProductContext();
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logoLink}>
        <h1 style={styles.logo}>MINTMADE</h1>
      </Link>

      
      <div style={styles.buttonGroup}>
        <Link to="/add-product" style={styles.addButton}>
          Add Items
        </Link>

        
        <Link to="/cart" style={styles.cartLink}>
          <FaShoppingCart size={24} style={styles.cartIcon} />
          {cartItemCount > 0 && (
            <span style={styles.cartBadge}>{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoLink: {
    textDecoration: "none",
  },
  logo: {
    fontFamily: "'Ovo', serif",
    fontSize: "1.8rem",
    color: "#4e2c69",
    margin: 0,
    letterSpacing: "1px",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  addButton: {
    fontFamily: "'Arial', serif", 
    backgroundColor:" #800080",
    color: "white",
    padding: "0.5rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer",
  },
  addButtonHover: {
    backgroundColor: "#800080",
  },
  cartLink: {
    position: "relative",
    textDecoration: "none",
    color: "#333",
  },
  cartIcon: {
    verticalAlign: "middle",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#ff4757",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.7rem",
  },
};

export default Navbar;