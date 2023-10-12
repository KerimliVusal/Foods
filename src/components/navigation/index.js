import React, { useState, useContext, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaFire, FaShoppingCart } from "react-icons/fa";
import { MdOutlineRestaurantMenu, MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import { Badge, Drawer, Menu } from "antd";
import CartContext from "../../context";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { items } = useContext(CartContext);
    const [isVibrating, setIsVibrating] = useState(false);
  
    const toggleVibration = () => {
      setIsVibrating((prev) => !prev);
    };
  
    useEffect(() => {
      const interval = setInterval(toggleVibration, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    const vibratingEffect = useSpring({
      transform: isVibrating ? 'translate(15px, 0px)' : 'translate(0px,0px)',
    });
  const menuItems = [
    { key: "Menu", icon: <AiFillHome size={25} />, link: "/" },
    { key: "Categories", icon: <MdOutlineRestaurantMenu size={25} />, link: "/" },
    { key: "Contact", icon: <MdCategory size={25} />, link: "/" },
  ];

  // React-spring animation
  const fadeIn = useSpring({
    opacity: 0.5,
    from: { opacity: 1},
    config: { duration: 1000 },

  });

  return (
    <div className="container fixed mx-auto p-5 bg-white top-0 left-0 right-0 z-10">
      <div className="px-6">
        <div className="flex justify-between items-center lg:flex-row">
          <div className="flex gap-2 lg:gap-10 items-center">
            <AiOutlineMenu
              size={30}
              className="cursor-pointer text-black hover:shadow-wine-500 hover:shadow-sm duration-100"
              onClick={() => setNav(!nav)}
            />
            <Link to="/" className="flex items-center gap-1 cursor-pointer">
            <animated.div style={vibratingEffect}>
              <span style={{display:'flex',alignItems:'center'}}>
                <FaFire size={30} className="text-red-500" />Deligius</span>
              </animated.div>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link to="/checkout" className="flex items-center gap-3 cursor-pointer">
              <FaShoppingCart size={25} className="mr-1" />
              <Badge count={items.length} overflowCount={9}>
                <div className="w-6 h-6 rounded-full bg-orange-600 flex justify-center items-center text-white font-bold">
                  {items.length > 0 && items.length}
                </div>
              </Badge>
            </Link>
          </div>
        </div>
        <Drawer
          title={<animated.div style={fadeIn} className="text-2xl font-bold">Tasty Foods Restaurant 🍔         
           </animated.div>
        }
          placement="left"
          closable={true}
          onClose={() => setNav(false)}
          visible={nav}
          bodyStyle={{ padding: 0 }}
          width={300}
          zIndex={1000}
        >
          {/* Applying animation to the menu items */}
         
            <Menu theme="light" mode="vertical" onClick={() => setNav(false)}>
              {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.link}>{item.key}</Link>
                </Menu.Item>
              ))}
            </Menu>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;